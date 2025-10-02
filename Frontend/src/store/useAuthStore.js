import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSignedIn: false,
  isloggedIn: false,
  isupdatedProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });   // 👈 loading start
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data, isSignedIn: true });
    } catch (error) {
      console.error("Error signing up:", error);
      set({ authUser: null });
    } finally {
      set({ isSigningUp: false });   // 👈 loading end
    }
  },
}));
