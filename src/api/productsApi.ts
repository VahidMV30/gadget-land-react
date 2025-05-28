import { axiosInstance } from "../lib/axios";
import { ProductsWithFiltersRequest } from "../types/productTypes";

export const fetchProductByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/products/${id}`);
  return response.data;
};

export const fetchProductsForAdminTableApi = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const fetchProductWithImagesByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/products/product-with-images/${id}`);
  return response.data;
};

export const fetchProductsWithFiltersApi = async (data: ProductsWithFiltersRequest) => {
  const params = new URLSearchParams();

  if (data.categorySlug) params.append("categorySlug", data.categorySlug);
  if (data.brandSlug) params.append("brandSlug", data.brandSlug);
  params.append("onlyDiscounted", String(data.onlyDiscounted));
  params.append("sortOrder", String(data.sortOrder));
  params.append("pageIndex", String(data.pageIndex));
  params.append("pageSize", String(data.pageSize));

  const response = await axiosInstance.get(`/products/products-with-filters?${params.toString()}`);
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

export const modifyProductImagesApi = async (data: FormData) => {
  const response = await axiosInstance.post("/products/modify-product-images", data);
  return response.data;
};
