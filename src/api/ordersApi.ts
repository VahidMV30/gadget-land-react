import { axiosInstance } from "../lib/axios";
import { ChangeOrderStatusRequest } from "../types/orderTypes";

export const fetchAllOrdersApi = async () => {
  const response = await axiosInstance.get("/orders");
  return response.data;
};

export const fetchOrderWithItemsAndUserByIdApi = async (orderId: number) => {
  const response = await axiosInstance.get(`/orders/order-with-items-and-user/${orderId}`);
  return response.data;
};

export const changeOrderStatusByIdApi = async (data: ChangeOrderStatusRequest) => {
  const response = await axiosInstance.put("/orders", data);
  return response.data;
};
