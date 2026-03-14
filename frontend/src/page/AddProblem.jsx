import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import CreateProblemForm from '../components/CreateProblemForm'
import useProblemStore from '@/store/useProblemStore'

const AddProblem = () => {
	const { id } = useParams()
	const { getProblemById, problem } = useProblemStore() 
	const [ mode, setMode ] = useState('add')
	const defaultValues = {
      hints: [""],
      description : "",
      testcases: [{ input: "", output: "" }],
      tags: [""],
      constraints :[""],
      examples: 
        [{ input: "", output: "", explanation: "" }]
      ,
      codeSnippets: {
        javascript: "function solution() {\n  // Write your code here\n}",
        python: "def solution():\n    # Write your code here\n    pass",
        java: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        javascript: "// Add your reference solution here",
        python: "# Add your reference solution here",
        java: "// Add your reference solution here",
      }
  }
	const [ data, setData ] = useState( defaultValues )

	useEffect(() => {
		if ( id ){
			getProblemById( id )
			setMode('edit')
		}
	}, [ ])

	useEffect(() => {
		if( id ){
			setData( problem )
		} else {
			setData( defaultValues )
		}
	}, [ problem ] )

	return (
		<CreateProblemForm formData={ data } mode={mode}/>
)
}

export default AddProblem