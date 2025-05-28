import { z } from "zod";

import { registerSchema, loginSchema } from "../schemas/authSchemas";

export type UserResponse = {
  id: number;
  role: string;
  fullName: string;
  email: string;
};

export type RegisterRequest = z.infer<typeof registerSchema>;

export type LoginRequest = z.infer<typeof loginSchema>;
