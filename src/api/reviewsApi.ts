import { axiosInstance } from "../lib/axios";
import { CreateReviewRequest } from "../types/reviewTypes";

export const fetchAllReviewsApi = async () => {
  const response = await axiosInstance.get("/reviews");
  return response.data;
};

export const fetchReviewDetailsByIdApi = async (id: number) => {
  const response = await axiosInstance.get(`/reviews/review-details/${id}`);
  return response.data;
};

export const fetchHasUserReviewedApi = async (productId: number) => {
  const response = await axiosInstance.get(`/reviews/has-user-reviewed/${productId}`);
  return response.data;
};

export const createReviewApi = async (data: CreateReviewRequest) => {
  const response = await axiosInstance.post("/reviews", data);
  return response.data;
};

export const toggleConformationStatusApi = async (id: number) => {
  const response = await axiosInstance.put(`/reviews/${id}`);
  return response.data;
};

export const deleteReviewApi = async (id: number) => {
  const response = await axiosInstance.put(`/reviews/delete-review/${id}`);
  return response.data;
};
