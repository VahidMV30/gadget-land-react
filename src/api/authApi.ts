import { axiosInstance } from "../lib/axios";
import { LoginRequest, RegisterRequest } from "../types/authTypes";

export const registerApi = async (data: RegisterRequest) => {
  const response = await axiosInstance.post("/auth/register", data);
  return response.data;
};

export const loginApi = async (data: LoginRequest) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const fetchUserProfileApi = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response.data;
};

export const logoutApi = async () => {
  await axiosInstance.post("/auth/logout");
};
