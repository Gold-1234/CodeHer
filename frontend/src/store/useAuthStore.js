import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useAuthStore = create( (set) => ({

	authUser : null,
	isSigningUp : false,
	isLoggingIn : false,
	isCheckingAuth : true,

	checkAuth : async() => {
		set({ isCheckingAuth : true })
		try {
			const res = await axiosInstance.get('/auth/check')
			set({ authUser : res.data.data.user})			
		} catch (error) {
			set({ authUser : null })
		} finally {
			set({ isCheckingAuth : false })
		}
	},

	signUp : async( data ) => {
		set({ isCheckingAuth : true })
		try {
			const res = await axiosInstance.post('/auth/register', data)

			set({ authUser : res.data.user})
			if(!res.data.success){
				toast.error(res.data.message)
				console.log(res.data);
				
			} else {
				toast.success(res.data.message)

			}
			
		} catch (error) {
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
			
			set({ authUser : res.data.data.user})
			if(!res.data.success){
				toast.error(res.data.message)
			} else {
				toast.success(res.data.message)
			}
		} catch (error) {
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
			set({ authUser : null})
			if(!res.data.success){
				toast.error(res.data.message)
			} else {
				toast.success(res.data.message)
			}
		} catch (error) {
			toast.error(error.response.data.message)
		} finally {
			set({ isCheckingAuth : false })
		}
	},

	updateAvatar : async( imageUrl ) => {
		try {
			const res = await axiosInstance.post('/auth/update-avatar', { imageUrl })

			set({ authUser : res.data.data.user})
			toast.success(res.data.message)
		} catch (error) {
			toast.error(error.response?.data?.message || 'Failed to update avatar')
		}
	},

	signinWithGoogle : async (credentialResponse) => {
		try {
			const res = await axiosInstance.post('/auth/user', {
				credential: credentialResponse.credential
			});
			
			set({ authUser: res.data.data.user });
			toast.success(res.data.message);
		} catch (error) {
			toast.error(error.response?.data?.message || 'Google authentication failed');
		}
	}
}))
