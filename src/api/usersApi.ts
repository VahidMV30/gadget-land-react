import { axiosInstance } from "../lib/axios";
import { UpdateUserAddressInfoWithCityIdRequest } from "../types/userTypes";

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
