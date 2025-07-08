import React, { useEffect } from 'react'
import useProblemStore from '@/store/useProblemStore'
import { Loader, Navigation } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const HomePage = () => {

  const { problems, getAllProblems, isProblemsLoading, getProblemById } = useProblemStore()
  const navigation = useNavigate()

  useEffect(() => {
    getAllProblems()
  }, [])

  const checkbox = () => {

  }

  const handleClick = (problem) => {
    console.log(problem);
    
    navigation(`/problem/id/${problem.id}`)
    getProblemById(problem.id)
  }
  
  return (
    <div className='flex items-center mt-5 text-white '>
      {
        isProblemsLoading ? <Loader/> : 
      <div className='flex items-center mt-5 w-full'>
      <div className='h-full w-1/6 bg-green-'>
        heyyy
      </div>
      <div className='text-secondary-content h-full w-full items-center '>
      {
        problems.map((problem) => (
          <div 
            key={problem.id} 
            className='grid grid-cols-[1fr_auto_1fr] w-full m-5 text-md font-medium  items-center text-white p-2 rounded-lg justify-between bg-base-200 cursor-pointer'
            onClick={() => handleClick(problem)}  
          >
            <div className='flex flex-1'>
            <input type='checkbox' disabled onChange={checkbox} className='mx-10'/>
            <div className='mx-5 flex-1'>
              {problem.title}
            </div>
            </div>

            <div className={`w-60 text-right
             ${problem.difficulty === "EASY" ? "text-green-600" : problem.difficulty === "MEDIUM" ? "text-orange-500" : "text-red-500"}
              `}>
              {problem.difficulty}
            </div>
            <div className='flex flex-row mx-10 justify-end '>
              
                <div className='mx-5 bg-amber-600 rounded-4xl p-2 min-w-20 flex items-center justify-center text-sm'>{problem.tags[0]}</div>
                <div className='mx-5 bg-amber-600 rounded-4xl p-2 min-w-20 flex items-center justify-center text-sm'>{problem.tags[1]}</div>
              
            </div>
          </div>
        ))
      }
      </div>
      </div> 
}
    </div>
   

    
  
  )
}
