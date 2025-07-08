import React from 'react'
import useProblemStore from '@/store/useProblemStore'

export const HomePage = () => {

  const {} = useProblemStore()
  
  return (
    <div className='h-screen flex items-center mt-5 text-white'>
      <div className='h-full w-1/6 bg-pink-600'>
        section
      </div>
     <div className='bg-red-500 h-full w-full'>
    hello
     </div>
    </div>
    

    
  
  )
}
