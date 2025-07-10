import { z } from "zod";

import { updateUserAddressInfoSchema } from "../schemas/userSchemas";
import { OrderDetailsResponse } from "./orderTypes";

export type UserAddressInfoResponse = {
  provinceId?: number;
  provinceName?: string;
  cityId?: number;
  cityName?: string;
  fullName: string;
  email: string;
  mobile?: string;
  postalCode?: string;
  address?: string;
};

export type UpdateUserAddressInfoRequest = z.infer<typeof updateUserAddressInfoSchema>;

export type UpdateUserAddressInfoWithCityIdRequest = UpdateUserAddressInfoRequest & { cityId: number };

export type UsersForAdminTableResponse = {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  province: string;
  city: string;
  registerDate: string;
};

export type UserDetailsResponse = {
  id: number;
  provinceId: number;
  province: string;
  cityId: number;
  city: string;
  fullName: string;
  email: string;
  mobile: string;
  postalCode: string;
  address: string;
  registerDate: string;
};

export type UserDetailsWithOrdersResponse = {
  user: UserDetailsResponse;
  orders: OrderDetailsResponse[];
};

export type UserInOrderResponse = {
  fullName: string;
  mobile: string;
};
