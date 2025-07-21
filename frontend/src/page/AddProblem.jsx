import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, Outlet } from 'react-router-dom'
import CreateProblemForm from '../components/CreateProblemForm'

const AddProblem = () => {

	return (
		<CreateProblemForm/>
)
}

export default AddProblem