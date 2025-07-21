import { ChevronDown, ChevronUp, Dot, Lightbulb, Tag, TagIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'

export const ProblemDescription = ({problem}) => {  
  const [ isTagsOpen, setIsTagsOpen ] = useState(false)
  const [ isHintOpen, SetIsHintOpen ] = useState({})
  const tagsRef = useRef(null)
  const hintRef = useRef({})

  const openTags = ( e ) => {
    setIsTagsOpen(( prev ) => !prev )
  }

  const openHint = ( index ) => {
    SetIsHintOpen(( prev ) => ({...prev, [ index ] : !prev [index] }))
  }

  useEffect(() => {
    console.log(isHintOpen);
  }, [ isHintOpen ])

  useEffect(() => {
    const tags = tagsRef.current
    tags.classList.toggle("hidden")
  }, [ isTagsOpen ])

  useEffect(() => {
    (( ) => {
      const hint = hintRef.current
      console.log(hint);
      hint.classList.toggle("hidden")
    })()
  }, [ isHintOpen ])
  
  return (
    <div className='w-full p-5 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
        <span>
          <p className='font-bold text-2xl'>{ problem.title }</p>
        </span>
        <div className='mt-5 grid grid-cols-3 w-fit gap-1'>
          <button className='btn rounded-4xl btn-sm hover:text-accent'> <Tag className='h-5'/> Topics</button>
          <button className={`btn rounded-4xl btn-sm`} style={{ color: `var(--color-${problem.difficulty.toLowerCase()})` }}> { problem.difficulty } </button>
          <button className='btn rounded-4xl btn-sm hover:text-accent'> <Lightbulb className='h-5 m-0'/> Hint</button>
        </div>
        <div className='my-5'>
          { problem.description }
        </div>
        <div className='my-5'>
          { problem.examples.map(( example, index ) => (
             <div key={ index } className='my-5'>
              <div >
                <span className='font-bold dark:text-white'> Example {index + 1}</span>
                <div className='border-l-2 px-4 m-2 border-secondary-content'>
                  <div >Input : <span className='dark:text-secondary-content'> {example.input} </span></div>
                  <div>Output : <span className='dark:text-secondary-content'> {example.output} </span></div>
                  <div>Explaination : <span className='dark:text-secondary-content'> {example.explanation} </span></div>
                </div>
              </div>
             </div>
          )) }
        </div>
         <div className='mt-10 mb-5'>
          <div>
            <span className='font-bold'>Constraints : </span>
          </div>
          { problem.constraints.map(( constraint, index ) => (
             <div key={ index } className='my-2'>
              <div className='dark:text-secondary-content flex'> 
                <Dot/> 
                <span className='rounded-lg px-4'>
                  { constraint } 
                </span>
              </div>
             </div>
          )) }
        </div>
       <div className='mt-10'>
           <div className='font-bold dark:text-white flex items-center border-t-1 border-secondary-content relative'>
            <TagIcon className='h-5'/> 
            <span className='m-2'> Topics </span>
            <div className='absolute right-0 top-2' onClick={openTags}>
              { isTagsOpen ? <ChevronDown className=' absolute right-0'/> : <ChevronUp className=' absolute right-0'/>}
            </div>
           </div>
           <div className='flex gap-2 ml-8' ref={tagsRef}>
            {
              problem.tags.map(( tag, index ) => (
                <div key={ index }>
                  <span className='bg-base-200 dark:text-secondary-content font-medium p-2 rounded-4xl text-sm'>{ tag }</span>
                </div>
              ))
            }
           </div>
        </div>
        <div className='mt-5 border-t-1 border-secondary-content'>
           <div className='flex gap-2 mt-5 w-full '>
            {
              problem.hints && problem.hints.map(( hint, index ) => (
                <div key={ index } className='w-full'>
                  <div className='relative w-full'>
                    <span className='flex items-center'><Lightbulb className='h-5'/> Hint { index + 1 } </span>
                    <div className='absolute right-0 top-2 bg-red-500' 
                      onClick={ () => openHint( index ) } 
                      
                    >
                      { isHintOpen[ index ] ? 
                      <ChevronDown className=' absolute right-0'/> 
                       : <ChevronUp className=' absolute right-0'/>} 
                    </div>
                    <p className='dark:text-secondary-content p-2 ml-5 text-wrap' ref={ hintRef }>{ hint }</p>
                  </div>
                </div>
              ))
            }
           </div>
        </div>
    </div>
  )
}
