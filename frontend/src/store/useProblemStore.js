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

	getAllProblems : async () => {
		try {
			set({ isProblemsLoading : true })
			const res = await axiosInstance.get('/problem/get')
			
			set({ problems : res.data.data })  
		} catch (error) {
			console.log("error getting all problems", error);
			toast.error( error.message )
		} finally {
			set({ isProblemsLoading : false })
		}
	},

	getProblemById : async (id) => {
		try {
			set({ isProblemLoading : true })
			const res = await axiosInstance.get(`/problem/id/${id}`)
			console.log(res.data.data);
			
			set({ problem : res.data.data  })
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