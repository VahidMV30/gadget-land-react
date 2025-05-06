import { create } from "zustand";

interface GlobalState {
  isAdminSidebarOpen: boolean;
  setIsAdminSidebarOpen: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isAdminSidebarOpen: false,
  setIsAdminSidebarOpen: (value) => set({ isAdminSidebarOpen: value }),
}));
