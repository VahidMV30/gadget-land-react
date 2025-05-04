import { create } from "zustand";

import { UserType } from "../types/authTypes";

interface AuthState {
  user: UserType | null;
  isAuthenticated: boolean;
  isAuthCheckComplete: boolean;
  isFetchingUserProfile: boolean;
  setUser: (data: UserType | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsAuthCheckComplete: (value: boolean) => void;
  setIsFetchingUserProfile: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isAuthCheckComplete: false,
  isFetchingUserProfile: false,
  setUser: (data) => set({ user: data }),
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setIsAuthCheckComplete: (value) => set({ isAuthCheckComplete: value }),
  setIsFetchingUserProfile: (value) => set({ isFetchingUserProfile: value }),
}));
