import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

const useSubimissionStore = create (( set, get ) => ({
	userSubmissions : [],
	loading: true,
	problemSubmissions: [],
	userSubmissionsToProblem: [],

	
}))