import { axiosInstance } from "../lib/axios";

export const fetchAllBrandsApi = async () => {
  const response = await axiosInstance.get("/brands");
  return response.data;
};

export const fetchBrandByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/brands/${id}`);
  return response.data;
};

export const createBrandsApi = async (data: FormData) => {
  const response = await axiosInstance.post("/brands", data);
  return response.data;
};

export const updateBrandApi = async (data: FormData) => {
  const response = await axiosInstance.put("/brands", data);
  return response.data;
};
