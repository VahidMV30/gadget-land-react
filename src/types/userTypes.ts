import { z } from "zod";

import { updateUserAddressInfoSchema } from "../schemas/userSchemas";

export type UserAddressInfoResponse = {
  provinceId?: number;
  provinceName?: string;
  cityId?: number;
  cityName?: string;
  fullName: string;
  mobile?: string;
  postalCode?: string;
  address?: string;
};

export type UpdateUserAddressInfoRequest = z.infer<typeof updateUserAddressInfoSchema>;

export type UpdateUserAddressInfoWithCityIdRequest = UpdateUserAddressInfoRequest & { cityId: number };
