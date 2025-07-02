import { axiosInstance } from "../lib/axios";
import { CartItem, VerifyPaymentRequest } from "../types/paymentTypes";

export const createPaymentApi = async (data: CartItem[]) => {
  const response = await axiosInstance.post("/payments", data);
  return response.data;
};

export const fetchVerifyPaymentApi = async (data: VerifyPaymentRequest) => {
  const response = await axiosInstance.get(`/payments?status=${data.status}&authority=${data.authority}`);
  return response.data;
};
