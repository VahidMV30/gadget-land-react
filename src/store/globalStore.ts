import { create } from "zustand";

interface GlobalState {
  isAdminSidebarOpen: boolean;
  isProductsFilterSidebarOpen: boolean;
  selectedProvinceId: number | null;
  selectedCityId: number | null;
  setIsAdminSidebarOpen: (value: boolean) => void;
  setIsProductsFilterSidebarOpen: (value: boolean) => void;
  setSelectedProvinceId: (provinceId: number | null) => void;
  setSelectedCityId: (cityId: number | null) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  isAdminSidebarOpen: false,
  isProductsFilterSidebarOpen: false,
  selectedProvinceId: null,
  selectedCityId: null,
  setIsAdminSidebarOpen: (value) => set({ isAdminSidebarOpen: value }),
  setIsProductsFilterSidebarOpen: (value) => set({ isProductsFilterSidebarOpen: value }),
  setSelectedProvinceId: (provinceId) => set({ selectedProvinceId: provinceId }),
  setSelectedCityId: (cityId) => set({ selectedCityId: cityId }),
}));
