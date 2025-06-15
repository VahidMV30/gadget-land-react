import axios from "axios";

import { BASE_URL } from "../constants";
import { useAuthStore } from "../store/authStore";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const { setUser, setIsAuthenticated, setIsAuthCheckComplete } = useAuthStore.getState();

      setUser(null);
      setIsAuthenticated(false);
      setIsAuthCheckComplete(true);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
