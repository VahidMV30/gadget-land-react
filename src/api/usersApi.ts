import { axiosInstance } from "../lib/axios";
import { UpdateUserAddressInfoRequest, UpdateUserAddressInfoWithCityIdRequest } from "../types/userTypes";

export const fetchUserAddressInfoApi = async () => {
  const response = await axiosInstance.get("/users/user-address-info");
  return response.data;
};

export const updateUserAddressInfoApi = async (data: UpdateUserAddressInfoWithCityIdRequest) => {
  const response = await axiosInstance.post("/users", data);
  return await response.data;
};

export const fetchUsersForAdminTableApi = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const fetchUserDetailsWithOrdersApi = async (userId: number) => {
  const response = await axiosInstance.get(`/users/user-details-with-orders/${userId}`);
  return response.data;
};

export const fetchUserDetailsApi = async () => {
  const response = await axiosInstance.get(`/users/user-details`);
  return response.data;
};

export const updateUserInfoApi = async (data: UpdateUserAddressInfoRequest) => {
  const response = await axiosInstance.put("/users", data);
  return await response.data;
};
