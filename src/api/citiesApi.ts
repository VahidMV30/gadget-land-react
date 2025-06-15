import { axiosInstance } from "../lib/axios";

export const fetchCitiesByProvinceIdApi = async (provinceId: number) => {
  const response = await axiosInstance.get(`/cities/cities-by-province-id/${provinceId}`);
  return response.data;
};
