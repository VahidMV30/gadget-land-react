import { create } from "zustand";

import { UserResponse } from "../types/authTypes";

interface AuthState {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isAuthCheckComplete: boolean;
  isFetchingUserProfile: boolean;
  setUser: (data: UserResponse | null) => void;
  setIsAuthenticated: (value: boolean) => void;
  setIsAuthCheckComplete: (value: boolean) => void;
  setIsFetchingUserProfile: (value: boolean) => void;

  setUserFullName: (fullName: string) => void;
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

  setUserFullName: (fullName) => set((state) => ({ user: state.user ? { ...state.user, fullName: fullName } : null })),
}));
