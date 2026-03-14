import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, LogIn, Mail } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { GoogleAuth } from '@/components/GoogleAuth';


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
        .string()
})


const LoginPage = () => {
  const navigate = useNavigate()
  const { isLoggingIn, logIn, authUser } = useAuthStore();
	const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  const [showPassword, setShowPassword ] = useState(false);
  const [authData, setAuthData] = useState(null);
  
  const {	register, handleSubmit, setError, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async( data ) => {	
    try {
      if(!data.email || !data.password){
				throw new Error("Missing fields.")
			}
			const response = await logIn(data);
			
    } catch (error) {
      setError("root", { message: "All fields required."})
    }
  }
  return (
  <>
   <form className='w-96  card bg-base-200 drop-shadow-purple-950 shadow-sm flex items-center gap-5 p-6 z-2 left-80' onSubmit={handleSubmit(onSubmit)}> 
      <div className='h-10 w-10'>
				<img src="codeher.svg" alt="Logo" className='text-black' />
			</div>
      <div className='flex flex-col items-center justify-center'>
        <span className="card-title flex items-center justify-center text-2xl p-0">Welcome Back </span>
        <span className="card-body flex items-center justify-center opacity-50 p-0">Login to your account!</span>
      </div>
      
        <div className='flex flex-col gap-5 items-center'>
          <div className='flex flex-col w-full relative'>
            <div className='relative w-full'>
              <Mail className="h-5 w-5 text-base-content/40 -translate-y-1/2 top-1/2 left-3 absolute z-10 pointer-events-none" />
              <input 
                type='email' 
                placeholder='Email' 
                {...register("email")} 
                className='input input-primary pl-10'
                autoComplete='current-email'
              />
            </div>
            {errors.email && <div className='text-error'>{errors.email.message}</div>}
          </div>

          <div className='flex flex-col w-full '>
            <div className='relative w-full'>
              <Lock className="h-5 w-5 text-base-content/40 -translate-y-1/2 top-1/2 left-3 absolute z-10 pointer-events-none" />
              <input type={
              showPassword ? "text" : "password"
              } placeholder='Password' {...register("password")} className='input input-primary z-0 pl-10' autoComplete='current-password'/>
              <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-2 z-10'
              onClick={() => {setShowPassword(!showPassword)}}>
                {showPassword ? 
                <Eye className="h-5 w-5 text-base-content/40"/> :
                <EyeOff className="h-5 w-5 text-base-content/40"/>}
              </button>
            </div>
            {errors.password && <div className='text-red-700'>{errors.password.message}</div>}
          </div>

          {errors.root && <div className='text-red-500'>{errors.root.message}</div>}

          <button type='submit' className='btn btn-primary w-80' disabled={isLoggingIn} >
            { isLoggingIn ? 
              <span className="loading loading-dots loading-lg" style={{backgroundColor:"#DB7093"}} ></span> : "Log In"}
          </button>
          
              <div className='flex w-full gap-4 items-center justify-center bg-white rounded-xl'>
					
         <div className='w-full max-w-full overflow-hidden flex justify-center'>
         <GoogleAuth></GoogleAuth>
           {authData && (
             <div>
               <p>Credential: {authData.credential}</p>
               <p>Select By: {authData.select_by}</p>
             </div>
           )}
         </div>
		
					</div>
					
        </div>
        <span>Don't have an account? <Link to="/signup" className='link link-primary link-hover'>Sign Up</Link> </span>
      </form>
  </>
  )
}


export default LoginPage