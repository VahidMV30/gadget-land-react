import { axiosInstance } from "../lib/axios";

export const fetchAllProvincesApi = async () => {
  const response = await axiosInstance.get("/provinces");
  return response.data;
};
