import React from 'react'

export const Editorial = ({ problem }) => {
  return (
	<div className='rounded-2xl m-5 text-md'>
		{ problem.editorial}
	</div>
  )
}
