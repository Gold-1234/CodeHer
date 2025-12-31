import React, { useCallback, useEffect, useRef, useState } from 'react'
import Editor from "@monaco-editor/react";

const CodeEditor = ({ value, onChange, language, width : parent, readOnly }) => {

	const [ theme, setTheme ] = useState("vs-dark")

	return (
		<div className='h-full w-full text-black'>
		
			<Editor
				width='100%'
				height='100%'
				value={value}
				onChange={onChange}
				language={language}
				theme={theme}
				// defaultLanguage='javascript'
				className='absolute inset-0'
				options={ { minimap: { enabled: true },
										readOnly: readOnly,
										fontSize: 16,
										lineNumbers: "on",
										roundedSelection: false,
										scrollBeyondLastLine: false,
										automaticLayout: true }}
			/>
		</div>
		
  )
}

export default CodeEditor;
