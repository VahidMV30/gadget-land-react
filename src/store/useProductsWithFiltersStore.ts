import { create } from "zustand";

import { ProductSortOrderType } from "../types/productTypes";

interface ProductsWithFiltersState {
  selectedCategorySlug: string | null;
  selectedBrandSlug: string | null;
  isOnlyDiscounted: boolean;
  sortOrder: ProductSortOrderType;
  pageIndex: number;
  setSelectedCategorySlug: (value: string | null) => void;
  setSelectedBrandSlug: (value: string | null) => void;
  setIsOnlyDiscounted: (value: boolean) => void;
  setSortOrder: (value: ProductSortOrderType) => void;
  setPageIndex: (value: number) => void;
}

export const useProductsWithFiltersStore = create<ProductsWithFiltersState>((set) => ({
  selectedCategorySlug: null,
  selectedBrandSlug: null,
  isOnlyDiscounted: false,
  sortOrder: "Latest",
  pageIndex: 1,
  setSelectedCategorySlug: (value) => set({ selectedCategorySlug: value }),
  setSelectedBrandSlug: (value) => set({ selectedBrandSlug: value }),
  setIsOnlyDiscounted: (value) => set({ isOnlyDiscounted: value }),
  setSortOrder: (value) => set({ sortOrder: value }),
  setPageIndex: (value) => set({ pageIndex: value }),
}));
