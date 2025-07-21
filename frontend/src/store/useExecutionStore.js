import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useExecutionStore = create (( set, get ) => ({
	
	executeCode : async( value ) => {
		try {
			const res = axiosInstance.post('/api/v1/execute-code/', value)
			if(res){
				console.log(res);
				toast.success("submitted")
			}
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong!')			
		}
	}
}))