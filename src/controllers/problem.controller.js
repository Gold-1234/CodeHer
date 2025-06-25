import { db } from "../libs/db.js"
import { getJudge0languageId, pollBatchResults, submitBatch } from "../libs/judge0.libs.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const createProblem = async( req, res ) => {
	const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions, hints, editorial} = req.body;

	const user = req.user;

	if(user.role !== "ADMIN"){
		throw new ApiError(400, "Access Denied, Admin only.")
	}

	try {		
		for(const [language, solutionCode] of Object.entries(referenceSolutions)){
			
			const languageId = getJudge0languageId(language);
			if(!languageId){
				throw new ApiError(400, `Language ${language} not supported.`)
			}

			const submissions = testcases.map(({input, output}) => ({
				source_code: solutionCode,
				language_id: languageId,
				stdin: input,
				expected_output: output,
			})) 
			// get tokens
			const submissionResults = await submitBatch(submissions);			
			const tokens = submissionResults.map((res) => res.token);

			// poll for results
			const results = await pollBatchResults(tokens)
			
			for(let i = 0; i < results.length; i++){

				const result = results[i]
				if(result.status.id !== 3){
					throw new ApiError(400, `Testcase ${i+1} failed.`)
				}
				console.log(`Result -- ${JSON.stringify(result)}`);
			}

			const problem = await db.problem.create({
				data:{
					title,
					description, 
					difficulty, 
					tags, 
					examples, 
					constraints, 
					testcases, 
					referenceSolutions, 
					hints, 
					editorial, 
					codeSnippets,
					userId: req.user.id
				}
			})

			return res.status(200).json(
				new ApiResponse(200, problem, "Problem created.")
			)
		}
		
	} catch (error) {
		console.log(error);
		if(error instanceof ApiError){
			return res.status(200).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} 
		else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error creating problem.")
			)			
		}
	}
}

export const getAllProblems = async( req, res ) => {
	try {
		const problems = await db.problem.findMany();
		if(!problems) {
			throw new ApiError(404, "No problems found.")
		}
		return res.status(200).json(
			new ApiResponse("200", problems, "Problems found.")
		)
	} catch (error) {
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error getting problems.")
			)
		}
	}

}

export const getProblemById = async( req, res ) => {
	const id = req.params.id;
	try {
		const problem = await db.problem.findUnique({
			where:{
				id: id
			}
		});

		if(!problem) {
			throw new ApiError(404, "No problems found.")
		}

		return res.status(200).json(
			new ApiResponse("200", problem, "Problem found.")
		)

	} catch (error) {

		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error fetching problem.")
			)
		}
	}
}

export const deleteProblem = async( req, res ) => {
	const id = req.params.id
	try {
		const problem = await db.problem.delete({
			where: {
				id: id
			}
		});
		if(!problem) {
			throw new ApiError(404, "Problem not found.")
		}
		return res.status(200).json(
			new ApiResponse("200", "Problem deleted.")
		)
	} catch (error) {
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error deleting problem.")
			)
		}
	}
}

export const updateProblem = async(	req, res ) => {
	const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions, hints, editorial} = req.body;

	const user = req.user;
	const id = req.params.id;
	const problem = await db.problem.findUnique({
		where: {
			id: id
		}
	})

	if(!problem){
		throw new ApiError(404, "Problem not found.");
	}

	if(user.role !== "ADMIN"){
		throw new ApiError(400, "Access Denied, Admin only.");
	}

	try {		
		if (referenceSolutions) {
			console.log("running the if block for reference solution change");
			
			for(const [language, solutionCode] of Object.entries(referenceSolutions)){
				
				const languageId = getJudge0languageId(language);
				if(!languageId){
					throw new ApiError(400, `Language ${language} not supported.`)
				}

				const newTestcases = testcases || problem.testcases;
	
				const submissions = newTestcases.map(({input, output}) => ({
					source_code: solutionCode,
					language_id: languageId,
					stdin: input,
					expected_output: output,
				})) 
	
				const submissionResults = await submitBatch(submissions);			
	
				const tokens = submissionResults.map((res) => res.token);
	
				const results = await pollBatchResults(tokens)
				
				for(let i = 0; i < results.length; i++){
	
					const result = results[i]
					if(result.status.id !== 3){
						throw new ApiError(400, `Testcase ${i+1} failed.`)
					}
					console.log(`Result -- ${JSON.stringify(result)}`);
				}
			}
		}
		const result = await db.problem.update(
			{
				where: {
					id: req.params.id
				},
				data:{
					title ,
					description, 
					difficulty, 
					tags, 
					examples, 
					constraints, 
					testcases, 
					referenceSolutions, 
					hints, 
					editorial, 
					codeSnippets,
				}
			})

			return res.status(200).json(
				new ApiResponse(200, result, "Problem updated.")
			)
		
		
	} catch (error) {
		console.log(error);
		if(error instanceof ApiError){
			return res.status(200).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} 
		else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error updating problem.")
			)			
		}
	}
}

export const getProblemSolvedByUser = async( req, res ) => {
	const userId = req.user.id; 
	console.log('getProblemSolvedByUser');
	
	try {
		const solvedProblems = await db.Problem.findMany({
			where: {
				solvedBy: {
					some: {
						userId
					}
				}
			},
			include: {
				solvedBy: {
					where: {
						userId
					}
				}
			}
		})
	
		return res.status(200).json(
			new ApiResponse(200, solvedProblems, "Solved problems found.")
		)
	} catch (error) {
		console.log(error);
		
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
		
	}

}