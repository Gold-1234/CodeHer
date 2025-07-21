import React, { useEffect, useState } from 'react'
import { problemTags } from '@/assets/tagList'


export const TagSelector = ({ handleTags }) => {
	
	const [ checkboxState, setCheckboxState ] = useState(problemTags.map(() => false))

	const handleState = ( e, index ) => {
		handleTags(e)
		const newState = [...checkboxState]
		newState[index] = e.target.checked
		setCheckboxState(newState)
		
	}
	
	
	return (
		<div>
			<div>
				<span className='font-bold m-5 text-lg'>Select Tags</span>
			</div>
			<div className='h-200 overflow-auto'>
				{problemTags.map(( tag, index ) => (
				<div className='mx-2 text-gray-500' key={index} >
					<input 
						type="checkbox" 
						name={tag} 
						id="" 
						className='m-2 checkbox-primary' 
						checked={checkboxState[index]}
						onChange={(e) => handleState(e, index)}
					/>
					{tag}
				</div>
			))}
			</div>
			
		</div>
	)
}
