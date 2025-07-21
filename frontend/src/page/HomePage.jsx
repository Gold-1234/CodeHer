import React, { useEffect, useState, useMemo, useRef } from 'react'
import useProblemStore from '@/store/useProblemStore'
import { ListPlus, Loader, Loader2, Navigation } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { TagSelector } from '@/components/TagSelector'
import { ProblemList } from '@/components/ProblemList'
import { problemTags } from '@/assets/tagList'


export const HomePage = () => {

  const { isProblemsLoading } = useProblemStore()
  const [ isSolved, setIsSolved ] = useState([])
  const [ searchText, setSearchText ] = useState("")
  const [ difficulty, setDifficulty ] = useState("")
  const [ selectedTags, setSelectedTags ] = useState([])

  const changeDifficulty = (e) => {
    setDifficulty(e)
  }
  
  const searchProblem = (e) => {
    setSearchText(e)
  }

  const handleTags = ( e ) => {    
      const checked = e.target.checked
      if( checked ){
        setSelectedTags(( prev ) => [...prev, e.target.name])
      } else {
        const tags = selectedTags.filter(( tag ) => ( tag != e.target.name ))
        setSelectedTags(tags)			
      }
  }

  return (
    <div className='flex text-black dark:text-white w-full '>
      {
        isProblemsLoading ? <Loader/> : 
      <div className='grid grid-cols-[auto_1fr] w-full h-full'>
        
          <div className='h-full w-fit'>
            <TagSelector handleTags={ handleTags }/>
          </div>
          <div className='text-secondary-content w-full flex flex-col '>
            <div className='w-full flex justify-between items-center'>
              <div className='flex w-fit p-2 gap-4'>
                <input 
                type="text" 
                className='input input-primary rounded-2xl min-w-100' 
                placeholder='Search by title'
                value={searchText}
                onChange={(e) => searchProblem(e.target.value)}
              />
              <select 
                className='text-md select h-10 w-40 font-semibold border-primary rounded-2xl'
                value={difficulty}
                onChange={(e) => changeDifficulty(e.target.value)}
              >
                <option value="">All Difficulties</option>
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
              </div>
              

            
          <button className='btn btn-primary text-white mr-5 text-md'>
            <ListPlus />
            Create List
          </button>
            </div>
            <div id='scrollDiv' className='w-full h-full'>
              {
               <ProblemList filters={{ selectedTags, difficulty, searchText }} />
              }
            </div>
          </div>
      </div>
      }
    </div>
  )
}
