import useProblemStore from '@/store/useProblemStore';
import { Check, Loader2 } from 'lucide-react'
import React, { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';

export const ProblemList = ( { filters } ) => {
  const { selectedTags = [], difficulty = "", searchText = "" } = filters;
  const { getAllProblems, totalPages, problems, resetProblem } = useProblemStore()
  const [ page, setPage ] = useState(1)
  const [ loading, setLoading ] = useState(false)
  const [ allProblems, setAllProblems ] = useState([])

	const navigation = useNavigate()

	const handleClick = (problem) => {
		navigation(`/problem/id/${problem.id}`)
  }
  const limit = 12;

  useEffect(() => {
    resetProblem()
    getAllProblems( page, limit )
  }, [ page ])

  useEffect(() => {
    const newProblems = problems.filter(( newP ) => !allProblems.some(( problem ) => problem.id === newP.id ))
    setAllProblems([ ...allProblems, ...newProblems ])
  }, [ problems ])
  
  useEffect(() => {
    console.log(allProblems);
  }, [ allProblems ])
  

  const filteredProblems = useMemo(() => {
      return allProblems
              .filter(( problem ) => selectedTags.length === 0 || selectedTags.some(( tag ) => problem.tags.includes( tag )))
              .filter((problem) => difficulty === "" || problem.difficulty === difficulty)
              .filter(( problem ) => (searchText === "" || problem.title.toLowerCase().includes( searchText ))) 
    }, [ allProblems, selectedTags, difficulty, searchText ])


  const scrollRef = useRef( null );
  

  // const paginatedProblems = useMemo(() => {
  //   return filteredProblems.slice( 0, page * limit )
  // }, [ page, filteredProblems ])
  // useEffect(() => {
  //   console.log(paginatedProblems);
    
  // }, [ filteredProblems ])

  // useEffect(() => {
  //   const el = scrollRef.current    
  //   if( !el || !totalPages ) return;    
  //   const handleScroll = () => {
  //     if( el.scrollTop + el.clientHeight + 100 >= el.scrollHeight && !loading )
  //       {
  //         console.log('setting loading. to true');
  //         setLoading( true )
  //     }
  //   }

  //   const debounce = ( fn, delay ) => {
  //     let timeoutId;
  //     return function(...args){
  //       if( timeoutId ) clearTimeout(timeoutId)
  //       timeoutId = setTimeout(() => {
  //         fn(...args)
  //       }, delay);
  //     }
  //   }
  //   const debounceHandler = debounce( handleScroll, 500 )
  //   el.addEventListener( "scroll", debounceHandler )
  //   return () => el.removeEventListener("scroll", debounceHandler )

  // }, [ page, problems ]);

  useEffect(() => {
    const el = scrollRef.current  
    console.log(el);
    if( !el || !totalPages ) return;  
    console.log( totalPages );

    const handleScroll = () => {
      console.log('scrolling')
      if( el.scrollTop + el.clientHeight + 300 >= el.scrollHeight && !loading )
        {
          console.log('setting loading to true');
          setLoading( true )
      }
    }
    el.addEventListener( 'scroll', handleScroll )
    return () => el.removeEventListener('scroll', handleScroll )
  }, [ totalPages ])

  useEffect(() => {
    if (loading && page < totalPages) {
      console.log('updating page');
      setPage((prev) => prev + 1);
    } else {
      console.log('loading false');
      setLoading(false);
    }
  }, [loading, page, totalPages]);


  return (
	<div ref={scrollRef} className='w-full h-180 overflow-auto' id='scroll'>
		{
         filteredProblems.map(( problem, index ) => (
          <div 
            key={problem.id} 
            className='grid grid-cols-[1fr_auto_1fr] p-2 my-5 text-md font-medium text-black dark:text-white items-center pl-6 rounded-lg justify-between bg-base-200 cursor-pointer ml-5'
            onClick={() => handleClick(problem)}  
          >
            <div className='flex flex-1'>
            <Check/>
            <div className='mx-5 flex-1'> 
              { index }. { problem.title}
            </div>
            </div>

            <div className={`w-60 text-right font-light
             ${problem.difficulty === "EASY" ? "text-green-400" : problem.difficulty === "MEDIUM" ? "text-orange-400" : "text-red-400"}
              `}>
              {problem.difficulty.toLowerCase()}
            </div>
            <div className='flex flex-row mx-10 justify-end text-white'>
              
                <div className='mx-2 bg-secondary rounded-4xl p-2 min-w-20 flex items-center justify-center text-sm'>{problem.tags[0]}</div>
                <div className='mx-2 bg-secondary rounded-4xl p-2 min-w-20 flex items-center justify-center text-sm'>{problem.tags[1]}</div>              
            </div>
          </div>
        ))
    }
    {
       loading &&   
       <div 
          className='flex items-center justify-center p-2 my-5 text-md font-medium text-black dark:text-white pl-6 rounded-lg cursor-pointer'>
            <Loader2 className='animate-spin'/>
      </div> 
    }
     
	</div>
  )
}
