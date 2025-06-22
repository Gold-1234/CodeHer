import jwt from "jsonwebtoken"
import { db } from "../libs/db.js"

export const verifyAuth = async(req, res, next) => {
	try {
		const token = req.cookies.jwt
		if(!token){
			return res.status(401).json({
				message: "Unauthorized - no token"
			})
		}
		let decodedToken;
		try {
			decodedToken = jwt.verify(token, process.env.JWT_SECRET)
		} catch (error) {
			return res.status(400).json(
				{
					message: "Unauthorized - Invalid token."
				}
			)
		} 
			
		const user = await db.user.findUnique({
			where:{
				id: decodedToken.id
			},
			select: {
				id: true,
				image: true,
				name: true,
				email: true,
				role: true
			}
		})

		if(!user){
			return res.status(404).json({
				message: "User not found."
			})
		}

		req.user = user;
		next()
	} catch (error) {
		console.log(error)
		res.status(400).json({
			error: "Error authenticating user."
		})
	}
}

export const checkAdmin = async(req, res, next) => {
	try {
		const user = req.user;
		if(user.role !== "ADMIN"){
			return res.status(403).json({
				message: "Access Denied, Admin only."
			})
		}
		next()
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			error: "Not an admin."
		})
	}
}