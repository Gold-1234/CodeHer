import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { OAuth2Client } from "google-auth-library";

import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

export const register = async(req, res) => {
	console.log('register request');
	
	const { email, password, name} = req.body;
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
			console.log("user exists");
			
			throw new ApiError(400, "Email already exists, Please Login.");
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await db.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
				role: UserRole.USER,
				authProvider: 'EMAIL'
			}
		})
		console.log("new user created", newUser);
		
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
				sameSite: "none",
				secure: process.env.NODE_ENV !== "development",
				maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
			}
		)
		console.log(newUser);
		
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

		if(!user){
			throw new ApiError(400, "Couldn't find your account, Please register.")
		}

		// Check if user signed up with Google (no password)
		if (user.authProvider === 'GOOGLE') {
			throw new ApiError(400, "Please sign in with Google.")
		}

		// Check if user has a password (should have one for EMAIL auth)
		if (!user.password) {
			throw new ApiError(400, "Account setup incomplete. Please contact support.")
		}

		const verifyUser = await bcrypt.compare(password, user.password)

		if(!verifyUser){
			throw new ApiError(400, "Invalid credentials")
		}

		const token = jwt.sign(
			{id: user.id},
			process.env.JWT_SECRET,
			{expiresIn: 1000 * 60 * 60 * 24 * 7}
		)
		
		res.cookie(
				"jwt",
				token, 
				{
					httpOnly: true,
					sameSite: "none",
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
		if(error instanceof ApiError){
			return res.status(400).json(
				new ApiResponse(error.statusCode, null, error.message)
			)
		} 
		else {
			console.log(error.message)

			return res.status(500).json(
				new ApiResponse(500, error.message, "Error Logging In")
			)			
		}
	}
}

export const logout = async(req, res) => {
	try {
		return res.clearCookie("jwt", {
			httpOnly: true,
			sameSite: "none",
			secure: process.env.NODE_ENV==="production"
		}).status(200).json({
			success: true,
			message: "Logout Successfull"
		})
	} catch (error) {
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


export const googleLogout = async(req, res) => {
	try {
		
	} catch (error) {
		
	}
}

export const googleAuth = async(req, res) => {
	
	try {
		const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
		
		const credential = req.body.credential;
		
		// Verify the Google JWT token
		const ticket = await client.verifyIdToken({
			idToken: credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		
		const payload = ticket.getPayload();

		if (!payload) {
			throw new ApiError(400, 'Invalid Google token');
		}
		
		const { sub: googleId, email, name, picture: image } = payload;

		let user = await db.user.findFirst({
			where: {
				OR: [
					{ email: email },
					
				]
			}
		});
	
		if (!user) {
			user = await db.user.create({
				data: {
					email,
					name,
					image: image || null,
					role: UserRole.USER,
					authProvider: 'GOOGLE',
					googleId: googleId
				}
			});
		} else {
			const updateData = {};
			if (!user.image && image) updateData.image = image;
			if (!user.googleId) updateData.googleId = googleId;
			if (user.authProvider !== 'GOOGLE') updateData.authProvider = 'GOOGLE';

			if (Object.keys(updateData).length > 0) {
				user = await db.user.update({
					where: { id: user.id },
					data: updateData
				});
			}
		}

		// Generate JWT token for your app
		const token = jwt.sign(
			{ id: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		res.cookie(
			"jwt",
			token,
			{
				httpOnly: true,
				sameSite: "none",
				secure: process.env.NODE_ENV !== "development",
				maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
			}
		);
		
		res.status(200).json(
			new ApiResponse(200, {
				user: {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
					role: user.role,
					createdAt: user.createdAt
				}
			}, "Google authentication successful")
		);

	} catch (error) {
		if (error instanceof ApiError) {
			return res.status(error.statusCode).json(
				new ApiResponse(error.statusCode, null, error.message)
			);
		} else {
			return res.status(400).json(
				new ApiResponse(400, null, 'Google authentication failed')
			);
		}
	}
}
