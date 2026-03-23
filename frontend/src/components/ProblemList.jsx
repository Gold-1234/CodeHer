import { useAuthStore } from '@/store/useAuthStore';
import { useHomePageStore } from '@/store/usehomePageStore';
import useProblemStore from '@/store/useProblemStore';
import { useSubimissionStore } from '@/store/useSubmissionStore';
import { Check, Loader2, Pen, Trash } from 'lucide-react'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { CreateList } from './CreateList';

export const ProblemList = ( { filters, user } ) => {
  const { selectedTags = [], difficulty = "", searchText = "" } = filters;
  const { getAllProblems, totalPages, problems, resetProblem, deleteProblem, deletingProblem, isProblemsLoading, getProblemById } = useProblemStore()
  const { isSubmitted, getSubmissions } = useSubimissionStore()
  const [ page, setPage ] = useState(1)
  const [ admin, setAdmin ] = useState(false)
  const { isCreatingList, list, addToList, removeFromList } = useHomePageStore()
  
  const navigation = useNavigate()

  useEffect(() => {
    getSubmissions()
  }, [])

  const add = (e, problem) => {
    e.stopPropagation()
  }

  useEffect(() => {
    const fetch = async () => {
      // setLoading(true)
      const limit = 12;
      await getAllProblems(page, limit)
      // setLoading(false)
    }
    fetch()
  }, [ page ])

  useEffect(() => {
    if( user?.user?.role === 'ADMIN')
      setAdmin(true)
  }, [])

  useEffect(() => {
    const el = scrollRef.current  
    if( !el || !totalPages ) return;  

    const handleScroll = () => {
      if( el.scrollTop + el.clientHeight + 300 >= el.scrollHeight && !isProblemsLoading )
        {
          if( page < totalPages)
            setPage((prev) => prev + 1);

      }
    }
      const debounceHandler = debounce( handleScroll, 500 )
    el.addEventListener( "scroll", debounceHandler )
    return () => el.removeEventListener("scroll", debounceHandler )
  }, [ isProblemsLoading, page, totalPages ])

  const handleDelete = ( e, id, index ) => {
    deleteProblem( id, index )
  }

  const handleEdit = ( e, id ) => {
    navigation(`/problem/edit/${id}`)
  }

  const checkStatus = ( id ) => {    
    const val =  isSubmitted?.find(( submission ) => (submission.problemId) === id && submission.status === 'Accepted')
    return val
  }
	

	const handleClick = (problem) => {
		navigation(`/problem/id/${problem.id}`)
  }
 
  const filteredProblems = useMemo(() => {
      return problems
              .filter(( problem ) => selectedTags.length === 0 || selectedTags.some(( tag ) => problem.tags.includes( tag )))
              .filter((problem) => difficulty === "" || problem.difficulty === difficulty)
              .filter(( problem ) => (searchText === "" || problem.title.toLowerCase().includes( searchText ))) 
    }, [ problems, selectedTags, difficulty, searchText ])


  const scrollRef = useRef( null );
  
    const debounce = ( fn, delay ) => {
      let timeoutId;
      return function(...args){
        if( timeoutId ) clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          fn(...args)
        }, delay);
      }
    }
  

  return (
	<div ref={scrollRef} className="w-full h-[45rem] overflow-y-auto px-4 py-2">
    {/* {isCreatingList && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <CreateList/>
      </div>
    </div>
    )} */}
  {
    filteredProblems.map((problem, index) => (

      <div
        key={problem.id}
        className="grid grid-cols-[1.5fr_0.8fr_1fr_auto] gap-6 p-4 mb-3 text-sm text-black dark:text-white items-center rounded-xl bg-base-200 cursor-pointer transition hover:bg-base-300"
        onClick={() => handleClick(problem)}
      >
        
        <div className="flex items-center gap-3 min-w-0" >
          {checkStatus(problem.id) && <Check className="text-green-500 h-5 w-5 shrink-0"/> }
            {
                isCreatingList && <input type="checkbox" checked = {list.some((p => p.id === problem.id))} onChange={(e) => {
                  e.stopPropagation()
                  if(e.target.checked){
                    addToList(problem)
                  } else {
                    removeFromList(problem)
                  }
                }}/>
              }
          <span className="truncate font-medium text-base">{index + 1}. {problem.title}</span>
        </div>

        {/* Difficulty */}
        <div className={`capitalize text-right text-sm font-semibold mx-10 ${problem.difficulty === "EASY" ? "text-green-400" : problem.difficulty === "MEDIUM" ? "text-orange-400" : "text-red-400"}`}>
          {problem.difficulty.toLowerCase()}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap justify-start items-center">
          {problem.tags.slice(0, 2).map((tag, i) => (
            <div key={i} className="bg-secondary text-white text-xs px-3 py-1 rounded-full min-w-max">
              {tag}
            </div>
          ))}
        </div>

        {/* Admin actions */}
        {admin && (
          <div className="flex items-center gap-3 justify-end">
            <button disabled={true} onClick={(e) => { e.stopPropagation(); handleDelete( e, problem.id, index ) }}>
              {deletingProblem[ index ] ? <Loader2 className='animate-spin h-5 w-5'/> : <Trash className="h-5 w-5 text-red-500 hover:text-red-600" />}
            </button>
            <button onClick={(e) => { e.stopPropagation() ;handleEdit( e, problem.id ) }}>
              <Pen className="h-5 w-5 text-gray-500 hover:text-blue-600" />
            </button>
          </div>
        )}
        
      </div>
      
    ))
    
  }

  {/* Loader */}
  {isProblemsLoading && page > 1 && (
  <div className="flex items-center justify-center p-4">
    <Loader2 className="animate-spin h-6 w-6 text-gray-500" />
  </div>
)}
</div>
  )
}
