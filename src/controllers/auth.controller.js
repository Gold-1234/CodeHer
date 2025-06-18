import bcrypt from "bcryptjs"
import { db } from "../libs/db.js";
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken"

export const register = async(req, res) => {
	const { email, password, name} = req.body;
	console.log("req on register user route");
	if(!email || !password){
		res.status(400).json({error: "all fields required"});
	}
	
	try {
		const existingUser = await db.user.findUnique({
			where:{
				email
			}
		})
		if(existingUser)
			return res.status(400).json({
			error: "User already exists."
		})

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

		res.status(201).json([
			{
				success: true,
				message: "User created succesfully"
			},
			{
				user:{
					email: newUser.email,
					role: newUser.role,
					id: newUser.id,
					name: newUser.name,
					image: newUser.image
				}
			}]
		)
	} catch (error) {
		console.log(error)
		res.status(400).json(
			{error: "Error registering user"}
		)
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
			res.status(404).json({
				error: "User not found"
			})
		}
		const verifyUser = bcrypt.compare(password, user.password)
	
		if(!verifyUser){
			res.status(401).json({
				error: "Invalid credentials, Please check."
			})
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
					sameSite: "strict",
					secure: process.env.NODE_ENV !== "development",
					maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
				}
			)
	
		res.status(201).json([
				{
					success: true,
					message: "User logged in succesfully"
				},
				{
					user:{
						email: user.email,
						role: user.role,
						id: user.id,
						name: user.name,
						image: user.image
					}
				}]
			)
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Error logging in."
		})
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
			message: "logout succesfull"
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
		res.status(200).json({
			success: true, 
			message: "User authenticated successfully.",
			user: req.user
		})
	} catch (error) {
		console.log(error);
		res.status(400).json({
			error: "Error checking user."
		})
	}
}