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

export const fetchOrdersByUserIdApi = async () => {
  const response = await axiosInstance.get("/orders/orders-by-userId");
  return response.data;
};

export const fetchOrderWithItemsByIdApi = async (orderId: number) => {
  const response = await axiosInstance.get(`/orders/order-by-orderId/${orderId}`);
  return response.data;
};

export const fetchOrderWithItemsByUserIdApi = async () => {
  const response = await axiosInstance.get("/orders/last-order-with-items-userId");
  return response.data;
};
