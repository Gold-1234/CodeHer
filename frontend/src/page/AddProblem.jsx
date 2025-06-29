import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'
import { div } from 'three/src/nodes/TSL.js'
import CreateProblemForm from '../components/CreateProblemForm'

const AddProblem = () => {

	return (
		<div>
			<CreateProblemForm/>
		</div>
	)
}

export default AddProblem