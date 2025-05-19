import { axiosInstance } from "../lib/axios";

export const fetchProductsForAdminTableApi = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchProductByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const createProductApi = async (data: FormData) => {
  const response = await axiosInstance.post("/products", data);
  return response.data;
};

export const updateProductApi = async (data: FormData) => {
  const response = await axiosInstance.put("/products", data);
  return response.data;
};
