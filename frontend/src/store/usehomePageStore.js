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
  isLoading : false,

  togglePush: () => set((s) => ({ pushList: !s.pushList, mode: "select" })),
  toggleFloating: () => set((s) => ({ isCreatingList: !s.isCreatingList, mode: "select" })),

  addToList: (item) => set((s) => ({ list: [...s.list, item] })),
  removeFromList: (id) => set((s) => ({ list: s.list.filter((el) => el.id !== id) })),

  setMode: (mode) => set({ mode }),

  getList: async () => {
    try {
      set({isLoading: true})
      const res = await axiosInstance.get("/list/all")
      const lists = res?.data.data || []
      set({lists: lists})
      return lists
    } catch (err) {
      toast.error("Failed to load lists")
      return []
    } finally{
      set({isLoading: false})
    }
  },

  saveToExistingList: async (listId) => {
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
    }
  },

  saveNewList: async ({ name, description }) => {
    try {
      await axiosInstance.post("/list/create", { name, description })
      toast.success("List created successfully!")
      await get().getList()
      set({ list: [], mode: "select" })
    } catch (err) {
      toast.error("Failed to create list")
    }
  },
}))