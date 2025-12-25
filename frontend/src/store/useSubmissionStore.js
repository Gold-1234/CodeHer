import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useSubimissionStore = create (( set, get ) => ({
	userSubmissions : [],
	loading: true,
	problemSubmissions: [],
	userSubmissionsToProblem: [],
	isSubmitted: [],

	getUserSubmissionsToProblem : async( id ) => {
		try {
			const res = await axiosInstance.get(`/submission/get-submissions/${id}`)
			console.log(res.data);
			set({ problemSubmissions : res.data.data })
		} catch (error) {
			console.log(error);
		}
	},

	getSubmissions : async () => {
		try {
			if( loading !== true ){
				set({ loading : true })
				const res = await axiosInstance.get(`/submission/get-all-submissions`)
				console.log(res.data, Date.now());
				set({ isSubmitted : res.data.data })
			}
		} catch (error) {
			console.log(error);
		} finally {
			set({ loading : false })
		}
	}
}))