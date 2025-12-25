import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create (( set, get ) => ({
	executingCode : false,
	executionOutput: "",
	testcaseOutput: [],
	submittingCode: false,

	submitCode : async( value ) => {
		try {
			console.log(JSON.stringify(value));
			set({ submittingCode: true })
			const res = await axiosInstance.post( '/execute-code/submit/', value)
			if(res){
				console.log(res.data);
				toast.success("Submitted")
			}
			set({ executionOutput: res.data.data.status })
			set({ testcaseOutput: res.data.data.testcases})
			set({ submittingCode: false })
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!')	
			set({ submittingCode: false })		
		} 
	},

	executeCode : async( value ) => {
		try {
			console.log(JSON.stringify(value));
			set({ executingCode: true })
			const res = await axiosInstance.post( '/execute-code/', value)
			if(res){
				console.log(res.data);
			}
			set({ executionOutput: res.data.data.statusSum })
			set({ testcaseOutput: res.data.data})
			set({ executingCode: false })
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!')	
			set({ executingCode: false })		
		} 
	}
}))