import React from 'react'
import { FloatingBackground } from '../components/floatingComponent';
import Footer from '../components/Footer';
import MainLayout from '../layout/MainLayout';

export const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center mt-14 px-4'>
      <div className="border-secondary border-2 w-50 text-center rounded-4xl shadow-[0_0_20px_rgba(220,152,155,0.6)] m-10">
        <p className='bg-base-200 opacity-70  rounded-4xl  drop-shadow-[0_0_8px_#f472b6]'>🎯 Build a habit</p>
</div>
     <h1 className='text-7xl z-10 text-center font-bold m-10'>Welcome to <h1 className='text-primary text-9xl montserrat-bold p-5'>CodeHer</h1></h1>

     <p className=' text-center lext-lg font-semibold text-gray-500 dark:text-gray-400 z-10'>
     Practice daily, grow together. Your journey to coding excellence starts here.
     </p>

     <button className='btn  text-amber-50 m-10 bg-gradient-to-bl from-primary to-secondary'>Explore Sheets</button>
   
     
    </div>
    

    
  
  )
}
