import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import {useNavigate, useParams} from "react-router-dom";

const useProblemStore = create (( set, get ) => ({
	problems : [],
	problem : null,
	solvedProblems : [],
	isProblemsLoading : false,
	isProblemLoading : false,
	isSolvedProblemsLoading : false,
	isCreatingProblem : false,
	isSubmitted : false,
	totalPages: 1,
	submissions: [],
	deletingProblem: [],
	isUpdating : false,

	resetProblem: () => set({ problems : [], totalPages : 1 }),
	
	submitProblem : async ( value, navigation ) => {
		try {
			set({ isCreatingProblem : true })
			console.log(value.referenceSolutions.javascript);
			
			const res = await axiosInstance.post('/problem/create', value)
			
			if(res) toast.success(res.data.message || "Problem created successfully.")
			set({ isSubmitted : true })
			setTimeout(() => {
				navigation("/")
			}, 500);
		} catch (error) {
			const err = error.response.data.message
			toast.error(err)
		} finally {
			set({ isCreatingProblem : false })
		}
		},

	getAllProblems : async ( page, limit ) => {
		
		try {
			set({ isProblemsLoading : true })
			const res = await axiosInstance.get(`/problem/get?page=${page}&limit=${limit}`)
			const { problems : newProblems, totalPages } = res.data.data
			
			const existingProblems = get().problems

			const merged = [...existingProblems, ...newProblems.filter((p) => !existingProblems.some((e) => e.id === p.id))]
			
			set({ 
				problems : merged,
				totalPages : totalPages,
				// deletingProblem : newProblems.map(() => false )
			})
			
		  } catch (error) {
		  } finally {
			set({ isProblemsLoading : false })
		  }
	},

	getProblemById : async (id) => {
		try {
			set({ isProblemLoading : true })
			const res = await axiosInstance.get(`/problem/id/${id}`)
			
			set({ problem : res.data.data })
		} catch (error) {
			toast.error( error.message )
		} finally {
			set({ isProblemLoading : false })
		}
	},

	getSolvedProblems : async () => {
		try {
			set({ isSolvedProblemsLoading : true })
			const res = await axiosInstance.get('/problem/solved')
			set({ solvedProblems : res.data })
			toast.success( res.message )
		} catch (error) {
			toast.error( error.message )
		} finally {
			set({ isSolvedProblemsLoading : false })
		}
	},

	deleteProblem : async ( id, index ) => {
		try {
			const curr = get().deletingProblem
			
			const updated = [...curr]
			updated[index] = true
			set({ deletingProblem : updated })
			const res = await axiosInstance.delete(`/problem/delete/${id}`)
			set(( state ) => ({ problems : state.problems.filter(( problem ) => problem.id !== id )}))
			toast.success( res.data.data )
			
		} catch (error) {
			toast.error( error.message)
		} finally {
			const curr = get().deletingProblem
			const updated = [...curr]
			updated[index] = false
			set({ deletingProblem : updated })
		}
	},

	updateProblem : async ( value, navigation, id ) => {
		try {
			const res = await axiosInstance.put(`/problem/update/${id}`, value)
			if(res) toast.success(res.data.message || "Problem updated successfully.")

			set({ isUpdating : true })

			setTimeout(() => {
				navigation("/")
			}, 500);
		
		} catch (error) {
			toast.error(error.message)
		}
	}
}))

export default useProblemStore