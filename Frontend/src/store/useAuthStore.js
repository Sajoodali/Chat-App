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

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data, isloggedIn: true });
    } catch (error) {
      console.error("Error logging in:", error);
      set({ authUser: null });
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data, isSignedIn: true });
      return res.data;
    } catch (error) {
      console.error("Error signing up:", error);
      set({ authUser: null });
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isloggedIn: false, isSignedIn: false });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
