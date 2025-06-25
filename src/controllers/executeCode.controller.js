import { pollBatchResults, submitBatch, getLanguageName } from "../libs/judge0.libs.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { db } from "../libs/db.js";
import { Status } from "../generated/prisma/index.js";

export const executeCode = async (req, res) => {
	try {
		const { source_code, stdin, expected_outputs, language_id, problemId} = req.body;

		const userId = req.user.id;
		console.log(userId);
		console.log(problemId);
		
		
		
		// Validate test cases
		if(
			!Array.isArray(stdin) ||
			stdin.length === 0 ||
			!Array.isArray(expected_outputs) ||
			expected_outputs.length !== stdin.length
		){
			throw new ApiError(400, "Invalid or missing test cases.")
		}
		
		// prepare each test case for judge0batch
		const submissions = stdin.map((input) => ({
			source_code,
			language_id,
			stdin: input
		}))

		// send batch to judge0 for submission to get tokens
		const submitResponse = await submitBatch(submissions);
		const tokens = submitResponse.map((res) => res.token);

		const results = await pollBatchResults(tokens);
		// console.log(results);
		
		let allPassed = true;

		const detailedResult = results.map((result, i) => {
			const stdout = result.stdout?.trim(); 
			const expected_output = expected_outputs[i].trim();
			const passed = stdout === expected_output;
		
			if(!passed) allPassed = false;

			return {
			testcase: i+1,
			passed,
			stdout,
			expected_output,
			stderr: result.stderr?.trim() || null,
			compile_output: result.compile_output?.trim() || null,
			status: result.status.description,
			status_id: result.status.id,
			memory: result.memory ? `${result.memory} KB` : undefined,
			time: result.time ? `${result.memory} s` : undefined,
		}
		})

		console.log(detailedResult);

		const submission = await db.Submission.create({
			data : {
				// userId,
				// problemId,
				user: {
					connect: {
						id: userId
					}
				},
				problem: {
					connect: {
						id: problemId
					}
				},
				sourceCode: source_code,
				language: getLanguageName(language_id),
				stdin: stdin.join("\n"),
				stdout: JSON.stringify(detailedResult.map((r) => r.stdout)),
				stderr: detailedResult.some((r) => r.stderr) ? JSON.stringify(detailedResult.some((r) => r.stderr)): null,
				compileOutput : detailedResult.some((r) => r.compile_output) ? JSON.stringify(detailedResult.map((r) => r.compile_output)): null,
				status: allPassed ? Status.Accepted : Status.Wrong_Answer,
				memory: detailedResult.some((r) => r.memory) ? JSON.stringify(detailedResult.map((r) => r.memory)): null,
				time: detailedResult.some((r) => r.time) ? JSON.stringify(detailedResult.map((r) => r.time)): null,
			}
		})
		
		if(allPassed){
			 await db.solvedProblem.upsert({
				where: {
					userId_problemId:
					{
						userId,
						problemId
					}
				},
				update: {
					submissionId: submission.id,
				},
				create:{
					userId,
					problemId,
					submissionId: submission.id,
				}
			 })
		}

		const testcaseResults = detailedResult.map((result) => ({
			submissionId : submission.id,
			testCase: result.testcase,
			stdout : result.stdout,
			expected : result.expected_output,
  			stderr: result.stderr,
			status : result.status,
			memory : result.memory,
			time : result.time
		}))

		await db.TestcasesResult.createMany({
			data: testcaseResults
		})

		const submissionWithTestcases = await db.Submission.findUnique({
			where:{
				id: submission.id
			},
			include: {
				testcases: true
			}
		})
		return res.status(200).json(
			new ApiResponse(200, submissionWithTestcases, "Code execution successfull.")
		)
	} catch (error) {
		console.log(error);
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		}
		else{
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error executing code.")
			)
		}
	}
}