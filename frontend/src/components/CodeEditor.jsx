import React, { useEffect, useState } from 'react'
import Editor from "@monaco-editor/react";


const CodeEditor = ({ value, onChange, language }) => {

	const [ theme, setTheme ] = useState( () => {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? "hc-black" : "vs-dark"
	})

  return (
	<Editor
		height={'400px'}
		value={value}
		onChange={onChange}
		language={language}
		options={ { minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: "on",
                                  roundedSelection: false,
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true}}
		theme={theme}
	/>
  )
}

export default CodeEditor;
