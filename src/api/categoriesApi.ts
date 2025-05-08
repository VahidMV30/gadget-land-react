import { axiosInstance } from "../lib/axios";

export const fetchAllCategoriesApi = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

export const fetchCategoryByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data;
};

export const createCategoryApi = async (data: FormData) => {
  const response = await axiosInstance.post("/categories", data);
  return response.data;
};

export const updateCategoryApi = async (data: FormData) => {
  const response = await axiosInstance.put("/categories", data);
  return response.data;
};
