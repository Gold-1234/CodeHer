import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "@/lib/axios"

export const useHomePageStore = create((set, get) => ({
  list: [],
  isCreatingList: false,
  currentList: null,
  mode: "select",
  pushList: false,
  lists: [],

  togglePush: () => set((s) => ({ pushList: !s.pushList, mode: "select" })),
  toggleFloating: () => set((s) => ({ isCreatingList: !s.isCreatingList, mode: "select" })),

  addToList: (item) => set((s) => ({ list: [...s.list, item] })),
  removeFromList: (id) => set((s) => ({ list: s.list.filter((el) => el.id !== id) })),

  setMode: (mode) => set({ mode }),

  getList: async () => {
    try {
      const res = await axiosInstance.get("/list/")
      const lists = res?.data.data || []
      set({lists: lists})
      return lists
    } catch (err) {
      console.error("Error fetching lists:", err)
      toast.error("Failed to load lists")
      return []
    }
  },

  saveToExistingList: async (listId) => {
    console.log(listId);
    
    const { list } = get()
    if (list.length === 0) {
      toast.error("No problems to add")
      return
    }
    try {
      await axiosInstance.post(`/list/add/${listId}`, { problems: list })
      toast.success("Problems added to list!")
      set({ list: [], isCreatingList: false })
    } catch (err) {
      toast.error("Failed to add problems")
      console.error(err)
    }
  },

  saveNewList: async ({ name, description }) => {
    try {
      await axiosInstance.post("/list/create", { name, description })
      toast.success("List created successfully!")
      set({ list: [], mode: "select" })
    } catch (err) {
      toast.error("Failed to create list")
      console.error(err)
    }
  },
}))