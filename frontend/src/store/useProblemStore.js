import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

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

	resetProblem: () => set({ problems : [], totalPages : 1 }),
	
	submitProblem : async ( value, navigation ) => {
		console.log("submitting....");
		try {
		set({ isCreatingProblem : true })
		
		const res = await axiosInstance.post('/problem/create', value)

		if(res) toast.success(res.data.message || "Problem created successfully.")
		set({ isSubmitted : true })
		setTimeout(() => {
			navigation("/")
		}, 2000);
		
		} catch (error) {
		console.log(error);
		toast.error("Error creating problem.")
		} finally {
		set({ isCreatingProblem : false })
		}
		},

	getAllProblems : async ( page, limit ) => {
		try {
			const res = await axiosInstance.get(`/problem/get?page=${page}&limit=${limit}`)
			const { problems : newProblems, totalPages } = res.data.data
			console.log(newProblems);
			
			const existingProblems = get().problems
			console.log(existingProblems);
			
			set({ 
				problems : newProblems,
				totalPages : totalPages
			})
			console.log(get().problems);
			
		  } catch (error) {
			console.log(error);
		  }
	},

	getProblemById : async (id) => {
		try {
			set({ isProblemLoading : true })
			const res = await axiosInstance.get(`/problem/id/${id}`)
			console.log(res.data.data);
			
			set({ problem : res.data.data })
		} catch (error) {
			console.log("Error getting problem", error);
			toast.error( error.message )
		} finally {
			set({ isProblemLoading : false })
		}
	},

	getSolvedProblems : async () => {
		try {
			set({ isSolvedProblemsLoading : true })
			const res = await axiosInstance.get('/problem/solved')
			console.log(res);
			set({ solvedProblems : res.data })
			toast.success( res.message )
		} catch (error) {
			console.log( "Error getting solved problems ", error);
			toast.error( error.message )
		} finally {
			set({ isSolvedProblemsLoading : false })
		}
	},

}))

export default useProblemStore