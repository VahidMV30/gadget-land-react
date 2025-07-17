import { OrderItemResponse } from "./orderItemTypes";
import { UserDetailsResponse, UserInOrderResponse } from "./userTypes";

export enum OrderStatus {
  Pending = "Pending",
  Processing = "Processing",
  Shipped = "Shipped",
}
export type OrderDetailsResponse = {
  id: number;
  orderStatus: OrderStatus;
  discountAmount: string;
  shippingCost: string;
  subtotalAmount: string;
  totalPayableAmount: string;
  refId: number;
  orderDate: string;
};

export type OrderResponse = {
  id: number;
  user: UserInOrderResponse;
  totalPayableAmount: string;
  refId: string;
  orderDate: string;
  orderStatus: string;
};

export type OrderWithItemsAndUserResponse = {
  user: UserDetailsResponse;
  order: OrderDetailsResponse;
  orderItems: OrderItemResponse[];
};

export type ChangeOrderStatusRequest = {
  orderId: number;
  orderStatus: number;
};

export type OrderForUserPanelResponse = {
  id: number;
  orderStatus: string;
  discountAmount: string;
  shippingCost: string;
  subtotalAmount: string;
  totalPayableAmount: string;
  refId: number;
  orderDate: string;
};

export type OrderWithItemsForUserPanelResponse = {
  user: UserDetailsResponse;
  order: OrderForUserPanelResponse;
  orderItems: OrderItemResponse[];
};

export type OrderWithItemsResponse = {
  order: OrderForUserPanelResponse;
  orderItems: OrderItemResponse[];
};
