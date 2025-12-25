import { useSubimissionStore } from '@/store/useSubmissionStore'
import React, { useEffect } from 'react'

export const Submissions = ({ problem, testcaseOutput, executionOutput }) => {

	const { problemSubmissions, getUserSubmissionsToProblem } = useSubimissionStore()

	useEffect(() => {
		getUserSubmissionsToProblem( problem.id )
	}, [])

	const total = ( array ) => JSON.parse( array )
					.reduce(( acc, curr ) => {	
					 	return acc + parseFloat(curr.replace(/[^\d]/g, ""), 10);
					}, 0 )

  return (
	<div className='rounded-2xl m-5 text-md w-full flex flex-col items-center'>
  <div className='grid grid-cols-4 font-bold px-5 py-2 text-lg w-full text-center border-b border-secondary'>
    <div>Status</div>
    <div>Language</div>
    <div>Memory</div>
    <div>Time</div>
  </div>

  {
    problemSubmissions?.map((submission, index) => {
      const avgMemory = total(submission.memory) / submission.memory.length;
      const avgTime = total(submission.time) / submission.time.length;

      return (
        <div
          key={index}
          className='grid grid-cols-4 p-3 w-full text-center bg-base-200 dark:text-secondary-content'
        >
          <div className={`${submission.status === 'Accepted' ? 'text-green-400' : 'text-red-400'}`}>
            {submission.status}
          </div>
          <div
            className={`${
              submission.language === 'JAVASCRIPT'
                ? 'text-[#F1E05A]'
                : submission.language === 'PYTHON'
                ? 'text-[#3572A5]'
                : 'text-[#B07219]'
            }`}
          >
            {submission.language}
          </div>
          <div>{avgMemory.toFixed(2)} KB</div>
          <div>{avgTime.toFixed(2)} s</div>
        </div>
      );
    })
  }
</div>
  )
}
