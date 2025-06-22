import { db } from "../libs/db.js"
import { getJudge0languageId, pollBatchResults, submitBatch } from "../libs/judge0.libs.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const createProblem = async(req, res) => {
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

export const getAllProblems = async() => {

}

export const getProblemById = async() => {

}

export const deleteProblem = async() => {

}

export const getProblemSolvedByUser = async() => {

}

export const updateProblem = async() => {

}
