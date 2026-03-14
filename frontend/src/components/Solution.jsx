import React, { useState } from 'react'
import CodeEditor from './CodeEditor'

export const Solution = ({ problem }) => {

  const [ language, setLanguage ] = useState('javascript')
  
  const handleSelect = ( event ) => {
	return (
		setLanguage( event.target.value )
	)
  }
  return (
	<div className='h-5/6 w-full m-5 text-md'>
		<select onChange={handleSelect} name="language" id="language" className="p-2 font-medium rounded-3xl select-ghost mb-5">
						<option value="javascript">Javascript</option>
						<option value="java">Java</option>
						<option value="python">Python</option>
					</select>
		<CodeEditor
			value={problem.referenceSolutions[language]}
			language={language}
			readOnly='true'
		/>
	</div>
  )
}
