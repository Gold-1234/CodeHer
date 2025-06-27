import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'; 
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Code, Eye, EyeOff, Loader2, Lock, LogIn, Mail } from 'lucide-react';
import { FloatingSymbol, FloatingBackground } from '../components/floatingComponent';
import ModelViewer from '../components/ModelViewer';


const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z
        .string()
})


const LoginPage = () => {

  const [showPassword, setShowPassword ] = useState(false);

  const {	register, handleSubmit, setError, formState: { errors, isSubmitting }} = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async( data ) => {	
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));	
      console.log(data);

      if(!data.name || !data.email || !data.password){
        throw new Error("Missing fields.")
      }
    } catch (error) {
      setError("root", { message: "All fields required."})

    }
  } 
  return (
  <>
  <div className='h-screen w-screen items-center justify-center  relative'>
    <FloatingBackground/>
    <div className='h-screen w-screen grid grid-cols-2 items-center overflow-hidden' >
      
      <form className='w-96  card bg-base-200 drop-shadow-purple-950 shadow-sm flex items-center gap-5 p-6 z-2 left-80' onSubmit={handleSubmit(onSubmit)}> 
      
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
                className='input input-secondary pl-10'
              />
            </div>
            {errors.email && <div className='text-red-700'>{errors.email.message}</div>}
          </div>

          <div className='flex flex-col w-full '>
            <div className='relative w-full'>
              <Lock className="h-5 w-5 text-base-content/40 -translate-y-1/2 top-1/2 left-3 absolute z-10 pointer-events-none" />
              <input type={
              showPassword ? "text" : "password"
              } placeholder='Password' {...register("password")} className='input input-secondary z-0 pl-10'/>
              <button type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-2 z-10'
              onClick={() => {setShowPassword(!showPassword)}}>
                {showPassword ? 
                <Eye className="h-5 w-5 text-base-content/40"/> :
                <EyeOff className="h-5 w-5 text-base-content/40"/>}
              </button>
            </div>
            {errors.password && <div className='text-red-700'>{errors.password.message}</div>}
          </div>

          

          <button type='submit' className='btn btn-secondary w-80' disabled={isSubmitting} >
            { isSubmitting ? 
              <span className="loading loading-dots loading-lg bg-white" style={{ backgroundColor: '#5654df' }}></span> : "Log In"}
          </button>
          {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
          <div className='grid grid-cols-2 w-full gap-4'>
            <button className="btn bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Google
            </button>
            <button className="btn bg-black text-white border-black">
  <svg aria-label="GitHub logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"></path></svg>
  GitHub
            </button>
          </div>
          
          {errors.root && <div className='text-red-500'>{errors.root.message}</div>}
        </div>
        <span>Don't have an account? <Link to="/signup" className='link link-secondary link-hover'>Sign Up</Link> </span>
      </form>
      <ModelViewer className='z-50'/>
    </div>
      
    
    </div>
  </>
  )
}


export default LoginPage