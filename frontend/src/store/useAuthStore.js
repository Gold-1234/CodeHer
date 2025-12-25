import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";


export const useAuthStore = create( (set) => ({

	authUser : null,
	isSigningUp : false,
	isLoggingIn : false,
	isCheckingAuth : true,

	checkAuth : async() => {
		set({ isCheckingAuth : true })
		try {
			const res = await axiosInstance.get('/auth/check')
			console.log(`check auth response: `, res.data);

			
			set({ authUser : res.data.data.user})
			
		} catch (error) {
			console.log(`Error checking user.`, error);
			set({ authUser : null })
		} finally {
			set({ isCheckingAuth : false })
		}
	},

	signUp : async( data ) => {
		set({ isCheckingAuth : true })
		try {
			const res = await axiosInstance.post('/auth/register', data)
			console.log(`Register response:`, res.data);

			set({ authUser : res.data.user})
			if(!res.data.success){
				toast.error(res.data.message)
			} else {
				toast.success(res.data.message)
			}
			
		} catch (error) {
			console.log(`Error registering user.`, error);
			set({ authUser : null })
			toast.error(res.data.message)
		} finally {
			set({ isCheckingAuth : false })
		}
	},

	logIn : async( data ) => {
		set({ isCheckingAuth : true })
		try {
			const res = await axiosInstance.post('/auth/login', data)
			console.log(`Login response:`, res);

			console.log(res.data.data.user);
			console.log(res.data.message);
			
			set({ authUser : res.data.data.user})
			if(!res.data.success){
				toast.error(res.data.message)
			} else {
				toast.success(res.data.message)
			}
		} catch (error) {
			console.log(`Error logging user.`, error);
			set({ authUser : null })
			toast.error(error.response.data.message)
		} finally {
			set({ isCheckingAuth : false })
		}
	},

	logout : async( data ) => {
		set({ isCheckingAuth : true })
		try {
			const res = await axiosInstance.post('/auth/logout', data)
			console.log(`Logout response:`, res);

			console.log(res.data.message);
			
			set({ authUser : null})
			if(!res.data.success){
				toast.error(res.data.message)
			} else {
				toast.success(res.data.message)
			}
		} catch (error) {
			console.log(`Error logging out.`, error);
			toast.error(error.response.data.message)
		} finally {
			set({ isCheckingAuth : false })
		}
	}
}))