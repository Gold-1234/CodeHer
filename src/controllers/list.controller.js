import { db } from "../libs/db.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js"

export const getAllLists = async ( req, res ) => {

	const userId = req.user.id;
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
		
		return res.status(200).json(
			new ApiResponse(200, lists, "Lists fetched.")
		)
	} catch (error) {
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
		
		if ( !list ){
			throw new ApiError(400, "List not found.")
		}

		return res.status(200).json(
			new ApiResponse(200, list, "List fetched.")
		)
	} catch (error) {
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
		if( error instanceof ApiError){
			return new ApiResponse(error.statusCode, null, error.message);
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
		if( error instanceof ApiError){
			return new ApiResponse(error.statusCode, null, error.message);
		}
		return res.status(400).json(
				new ApiResponse(400, null, error.message)
			)
	}
}

export const addProblemToList = async ( req, res ) => {
}

export const updateList = async ( req, res ) => {
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
