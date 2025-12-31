import bcrypt from "bcryptjs"
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const register = async(req, res) => {
	
	const { email, password, name} = req.body;
	console.log("req on register user route");
	if(!email || !password){
		throw new ApiError(400, "All fields required")
	}
	
	try {
		const existingUser = await db.user.findUnique({
			where:{
				email
			}
		})
		if(existingUser){
			throw new ApiError(400, "Email already exists, Please Login.");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await db.user.create({
			data: {
				email,
				password: hashedPassword, 
				name,
				role: UserRole.USER
			}
		})

		const token = jwt.sign({
			id: newUser.id,
		},
			process.env.JWT_SECRET
		,{
			expiresIn: "7d"
		}
		)

		res.cookie(
			"jwt",
			token, 
			{
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV !== "development",
				maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
			}
		)

		return res.status(201).json(
			new ApiResponse(201,
			{
				success: true,
				user:{
					email: newUser.email,
					role: newUser.role,
					id: newUser.id,
					name: newUser.name,
					image: newUser.image,
					createdAt: newUser.createdAt
				}
			},
			"Registered successfully, Please login."
		))
	} catch (error) {
		console.log(error)
		console.log(error);
		if(error instanceof ApiError){
			return res.status(200).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} 
		else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error Registering, Please retry later.")
			)			
		}
	}
}

export const login = async(req, res) => {
	const { email, password } = req.body;

	try {
		const user = await db.user.findUnique({
			where: {
				email
			}	
		})
		console.log(user);
		
		if(!user){
			throw new ApiError(400, "Couldn't find your account, Please register.")
		}
		const verifyUser = await bcrypt.compare(password, user.password)
		console.log(verifyUser);
		
		if(!verifyUser){
			throw new ApiError(400, "Invalid credentials")
		}
		
		const token = jwt.sign(
			{id: user.id},
			process.env.JWT_SECRET,
			{expiresIn: 1000 * 60 * 60 * 24 * 7}
		)
		console.log(token);
		
		res.cookie(
				"jwt",
				token, 
				{
					httpOnly: true,
					sameSite: "strict",
					secure: process.env.NODE_ENV !== "development",
					maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
				}
			)
	
		res.status(201).json(
				new ApiResponse(
					200, 
					{
						user:{
						email: user.email,
						role: user.role,
						id: user.id,
						name: user.name,
						image: user.image,
						createdAt: user.createdAt
						}
					},
					"Logged In"
				)
			)
	} catch (error) {
		console.log(error);
		console.log(error);
		if(error instanceof ApiError){
			return res.status(400).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} 
		else {
			return res.status(500).json(
				new ApiResponse(500, error.message, "Error Logging In")
			)			
		}
	}
}

export const logout = async(req, res) => {
	try {
		res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV!=="production"
		})
		res.status(200).json({
			success: true,
			message: "Logout Successfull"
		})
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: "Error logging out"
		})
	}
}

export const check = async(req, res) => {
	try {
		res.status(200).json(
			new ApiResponse(200, {
				success: true, 
				message: "User authenticated successfully",
				user: req.user
			})
		)
	} catch (error) {
		console.log(error);
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} else {
			return res.status(400).json(
				new ApiResponse(400, error.message, "Error checking user")
			)			
		}
	}
}

export const updateAvatar = async(req, res) => {
	const userId = req.user.id;
	const { imageUrl } = req.body;

	try {
		const user = await db.user.update({
			where:{
				id: userId,
			},
			data:{
				image: imageUrl,
			}
		});

		return res.status(200).json(
			new ApiResponse(200, {
				message: "Avatar updated successfully.",
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					role: user.role,
					createdAt: user.createdAt
				}
			})
		)
	} catch (error) {
		console.log(error);
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} else {
			return res.status(400).json(
				new ApiResponse(400, error.message, "Error updating avatar.")
			)
		}
	}
}

export const createAdmin = async(req, res) => {
	const userId = req.body.id;

	try {
		const user = await db.user.update({
			where:{
				id: userId,
			},
			data:{
				role: UserRole.ADMIN,
			}
		});

		return res.status(200).json(
			new ApiResponse(200, {
				message: "Admin created.",
				data: user
			})
		)
	} catch (error) {
		console.log(error);
		if(error instanceof ApiError){
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} else {
			return res.status(400).json(
				new ApiResponse(400, error.message, "Error creating admin.")
			)
		}
	}


}
