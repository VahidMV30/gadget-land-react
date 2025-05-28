import { create } from "zustand";

interface GlobalState {
  isAdminSidebarOpen: boolean;
  isProductsFilterSidebarOpen: boolean;
  setIsAdminSidebarOpen: (value: boolean) => void;
  setIsProductsFilterSidebarOpen: (value: boolean) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isAdminSidebarOpen: false,
  isProductsFilterSidebarOpen: false,
  setIsAdminSidebarOpen: (value) => set({ isAdminSidebarOpen: value }),
  setIsProductsFilterSidebarOpen: (value) => set({ isProductsFilterSidebarOpen: value }),
}));
