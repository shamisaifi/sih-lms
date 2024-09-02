import { create } from "zustand";

export const useGlobalStore = create((set) => ({
    userType: "student",
    setUserType: (userType) => set({ userType }),
}));