import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const useProblemStore = create (( set ) => ({
	problems : [],
	problem : null,
	solvedProblems : [],
	isProblemsLoading : false,
	isProblemLoading : false,
	isSolvedProblemsLoading : false,
	isCreatingProblem : false,
	isSubmitted : false,


	submitProblem : async ( value, navigation ) => {
    console.log("submitting....");
    try {
      set({ isCreatingProblem : true })
      
      const res = await axiosInstance.post('/problem/create', value)

      if(res) toast.success(res.data.message || "Problem created successfully.")
      console.log(res.data);
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

	getAllProblem : async () => {
		try {
			set({ isProblemsLoading : true })
			const res = axiosInstance.get('/problem/getAllProblems')
			console.log(res);
			
			set({ problems : res.data.problems })  
			toast.success( res.message )
		} catch (error) {
			console.log("error getting all problems", error);
			toast.error( error.message )
		} finally {
			set({ isProblemsLoading : false })
		}
	},

	getProblemById : async () => {
		try {
			set({ isProblemLoading : true })
			const res = await axiosInstance.get(`/problem/id/${id}`)
			console.log(res);
			
			set({ problem : res.data.problem  })
			toast.success( res.message )
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