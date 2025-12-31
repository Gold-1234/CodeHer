import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useListStore = create((set, get) => ({
	list : {},
	userLists : [],
	loadingLists: false,
	fetchList : async() => {
		try {
			set({loadingLists: true})
			const res = await axiosInstance.get('/list/all');
			set({userLists : res.data.data})
		} catch (error) {
			console.log(error);
		}finally{
			set({loadingLists: false})
		}
	},
	getCurrentList : async(listId) => {
		try {
			const res = await axiosInstance.get(`/list/getList/${listId}`)
			const data = res.data
			console.log(res);
			
			set({list: data})
		} catch (error) {
			console.log(error);
			toast.error("Something went wrong")
		}
	}
})) 
