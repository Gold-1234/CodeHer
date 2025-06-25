import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";

export const getAllSubmissions = async( req, res ) => {
	try {
		const userId = req.user.id;

		const submissions = await db.Submission.findMany({
			where: {
				userId
			}
		})

		return res.status(200).json(
			new ApiResponse(200, submissions, "Submissions fetched succesfully.")
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
				new ApiResponse(500, error.message, "Error getting submissions.")
			)
		}
	}
}

export const getSubmissionForProblem = async( req, res ) => {
	try {
		const { problemId } = req.params
		const userId = req.user.id;

		const submissions = await db.Submission.findMany({
			where: {
				problemId,
				userId
			}
		})

		return res.status(200).json(
			new ApiResponse(200, submissions, "Submissions for problem fetched.")
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
				new ApiResponse(500, error.message, "Error fetching submissions.")
			)
		}
	}
}

export const getSubmissionForProblemCount = async( req, res ) => {
	try {
		const { problemId } = req.params;
		const userId = req.user.id;

		const submissionCount = await db.Submission.count({
			where: {
				problemId			}
		})
		return res.status(200).json(
			new ApiResponse(200, submissionCount, "Submission count fetched.")
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
				new ApiResponse(500, error.message, "Error fetching submissions.")
			)
		}
	}
}