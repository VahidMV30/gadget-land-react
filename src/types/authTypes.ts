import { z } from "zod";

import { registerSchema, loginSchema } from "../schemas/authSchemas";

export type UserType = {
  id: number;
  role: string;
  fullName: string;
  email: string;
};

export type RegisterType = z.infer<typeof registerSchema>;

export type LoginType = z.infer<typeof loginSchema>;
