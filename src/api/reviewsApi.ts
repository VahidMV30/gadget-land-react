import { axiosInstance } from "../lib/axios";
import { CreateReviewRequest } from "../types/reviewTypes";

export const fetchHasUserReviewedApi = async (productId: number) => {
  const response = await axiosInstance.get(`/reviews/has-user-reviewed/${productId}`);
  return response.data;
};

export const createReviewApi = async (data: CreateReviewRequest) => {
  const response = await axiosInstance.post("/reviews", data);
  return response.data;
};
