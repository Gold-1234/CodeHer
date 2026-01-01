import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, LogIn, Mail } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { GoogleAuth } from '@/components/GoogleAuth';


const signupSchema = z.object({
	email: z.string().email("Enter a valid email"),
	password: z
				.string()
				.min(6, "Password must be atleast 6 characters ")
				.regex(/(?=.*?[A-Z])/, "Password must contain atleast one Uppercase character.")
				.regex(/(?=.*?[a-z])/, "Password must contain atleast one lowercase character")
				.regex(/(?=.*?[0-9])/, "Password must contain atleast one number")
				.regex(/(?=.*?[!@#$%^&*_-])/, "Password must contain atleast one special character"),
	name: z.string().min(3, "Name must be at least 3 charcters.")
})


const SignupPage = () => {

	const { signUp, isSigningUp, authUser } = useAuthStore();
	const navigate = useNavigate()

	const [showPassword, setShowPassword ] = useState(false);

	const {	register, handleSubmit, setError, formState: { errors }} = useForm({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: "",
			email: "",
			password: ""
		}
	})

	const onSubmit = async( data ) => {	
		try {
			console.log("data in signup", data);
			const response = await signUp(data);
			console.log("on submit response in signup", response);
			
			if(!data.name || !data.email || !data.password){
				throw new Error("Missing fields.")
			}
				setTimeout(() => {try {
						navigate('/login')
						console.log('redirected');
						
				} catch (error) {
					console.log(error);	
					}
				}, 500);
		} catch (error) {
			setError("root", { message: "All fields required."})
			console.log(error);
			
		}
	} 
  return (
	<>
		<form className='w-96 card bg-base-200 drop-shadow-purple-950 shadow-sm flex items-center gap-5 p-6 z-2 left-80' onSubmit={handleSubmit(onSubmit)}> 
			<div className='h-10 w-10'>
				<img src="codeher.svg" alt="Logo" className='text-black' />
			</div>
			<div className='flex flex-col items-center justify-center'>
				<span className="card-title flex items-center justify-center text-2xl p-0">Join CodeHer </span>
				<span className="card-body flex items-center justify-center opacity-50 p-0">Create an account to continue</span>
			</div>
			
				<div className='flex flex-col gap-5 items-center'>

					<div className='flex flex-col w-full '>
						<div className='relative w-full'>
						<Code className="h-5 w-5 text-base-content/40 -translate-y-1/2 top-1/2 left-3 absolute z-10 pointer-events-none" />
						<input type='text' placeholder='Name' {...register("name")} className='input input-primary pl-10'/>
						</div>
						{errors.name && <div className='text-error'>{errors.name.message}</div>}
					</div>

					<div className='flex flex-col w-full relative'>
						<div className='relative w-full'>
							<Mail className="h-5 w-5 text-base-content/40 -translate-y-1/2 top-1/2 left-3 absolute z-10 pointer-events-none" />
							<input 
								type='email' 
								placeholder='Email' 
								{...register("email")} 
								className='input input-primary pl-10'
							/>
						</div>
						{errors.email && <div className='text-error'>{errors.email.message}</div>}
					</div>

					<div className='flex flex-col w-full '>
						<div className='relative w-full'>
							<Lock className="h-5 w-5 text-base-content/40 -translate-y-1/2 top-1/2 left-3 absolute z-10 pointer-events-none" />
							<input type={
							showPassword ? "text" : "password"
							} placeholder='Password' {...register("password")} className='input input-primary z-0 pl-10'/>
							<button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-2 z-10'
							onClick={() => {setShowPassword(!showPassword)}}>
								{showPassword ? 
								<Eye className="h-5 w-5 text-base-content/40"/> :
								<EyeOff className="h-5 w-5 text-base-content/40"/>}
							</button>
						</div>
						{errors.password && <div className='text-error'>{errors.password.message}</div>}
					</div>

					

					<button type='submit' className='btn btn-primary w-80' disabled={isSigningUp} >
						{ isSigningUp ? 
							<span className="loading loading-dots loading-lg bg-white" style={{ backgroundColor: '#5654df' }}></span> : "Sign up"}
					</button>
					{errors.root && <div className='text-error'>{errors.root.message}</div>}
					<div className='flex w-full gap-4 items-center justify-center bg-white rounded-3xl'>
					
						
					</div>
					
					{errors.root && <div className='text-error'>{errors.root.message}</div>}
					<GoogleAuth></GoogleAuth>
				</div>
				<span>Already have an account? <Link to="/login" className='link link-primary link-hover'>Log In</Link> </span>
			</form>
	</>
  )
}


export default SignupPage