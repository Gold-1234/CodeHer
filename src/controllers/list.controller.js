import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js"

export const getAllLists = async ( req, res ) => {

	const userId = req.user.id;
	console.log('fetching lists')
	try {
		const lists = await db.List.findMany({
			where: {
				userId
			},
			include: {
				problems: {
					include: {
						problem : true
					}
				}
			}
		});
		console.log(lists.problems?.name);
		
		return res.status(200).json(
			new ApiResponse(200, lists, "Lists fetched.")
		)
	} catch (error) {
		console.log(error);
		return res.status(200).json(
			new ApiResponse(400, error.message, "Error fetching lists.")		
		)	
	}
}

export const getListDetails = async ( req, res ) => {
	const listId = req.params.id
	
	try{
		const list = await db.List.findUnique({
			where: {
				id: listId
			},
			include: {
				problems: {
					include: {
						problem: true
					}
				}
			}
		})
		console.log(list);
		
		if ( !list ){
			throw new ApiError(400, "List not found.")
		}

		return res.status(200).json(
			new ApiResponse(200, list, "List fetched.")
		)
	} catch (error) {
		console.log(error);
		return res.status(error.statusCode).json(
			 new ApiResponse(400, error.message, "Error fetching list.")
		)
	}
}

export const createList = async ( req, res ) => {
	const userId = req.user.id;

	const { name, description } = req.body;

	try {
		const existingList = await db.List.findUnique({
			where: {
				name_userId :{
					name, 
					userId
				}
			}
		})
	
		if( existingList ){
			return new ApiError(403, "List with same name already exists. Please try a different name.")
		}
	
		const list = await db.List.create({
			data: {
				userId,
				name,
				description
			}
		})
		return res.status(200).json(
			new ApiResponse(200, list, "List created.")
		)
	} catch (error) {
		console.log(error);
		if( error instanceof ApiError){
			return new ApiResponse(error.statusCode, null, error.message);
		}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
	}
}

export const updateList = async ( req, res ) => {
	const listId = req.params.id;

	const { name, description } = req.body;

	try{
		const list = await db.List.update({
			where: {
				id: listId
			},
			data :{
				name,
				description
			}
		})
		return res.status(200).json(
				new ApiResponse(200, list, "List created.")
			)
	} catch (error) {
		console.log(error);
		if( error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
				)
			}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
	}
}

export const addProblemToList = async ( req, res ) => {
	console.log('request in add problem, problems : ', req.body.problems);
	
	const { problems } = req.body;
	const listId  = req.params.id;
	
	const problemIds = problems.map((p) => p.id);
	
	try {
		const addedProblems = [];
		for(const problemId of problemIds){
			const problem = await db.ProblemInList.upsert({
				where: {
					listId_problemId: {
						listId,
						problemId
					}
				},
				update: {},
				create: {
					listId,
					problemId
				}
			})
			addedProblems.push(problem)
		}
		return res.status(200).json(
			new ApiResponse(200, addedProblems, "Problem added.")
		)
	 } catch (error) {
		console.log(error);
		if( error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
	}

}
export const removeProblemFromList = async ( req, res ) => {

	const id = req.params.id.trim()
	

	try {
		const deletedProblem = await db.ProblemInList.delete({
			where: {
				id
			}
		})

		if( !deletedProblem ){
			throw new ApiError(403, "Problem not in List.")
		}

		return res.status(200).json(
			new ApiResponse(200, "Problem deleted.")
		)
	} catch (error) {
		console.log(error);
		if( error instanceof ApiError){
			return new ApiResponse(error.statusCode, null, error.message);
		}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
	}
}

export const deleteList = async ( req, res ) => {

	const listId = req.params.id;

	try {
		const list = await db.List.findUnique({
			where: {
				id: listId
			}
		})
		if(!list){
			throw new ApiError(400, "List not found.")
		}
		const deletedList = await db.List.delete({
			where: {
				id : listId
			}
		})

		if( !deletedList ){
			throw new ApiError(403, "List not found.")
		}

		return res.status(200).json(
			new ApiResponse(200, "List deleted.")
		)
	} catch (error) {
		console.log(error);
		if( error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
	}
}