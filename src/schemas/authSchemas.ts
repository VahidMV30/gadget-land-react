import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "لطفا نام و نام خانوادگی را وارد نمایید.")
      .min(3, "نام و نام خانوادگی باید حداقل 3 و حداکثر 50 کاراکتر باشد.")
      .max(50, "نام و نام خانوادگی باید حداقل 3 و حداکثر 50 کاراکتر باشد."),

    email: z
      .string()
      .min(1, "لطفا ایمیل را وارد نمایید.")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "ایمیل وارد شده نامعتبر است."),

    password: z.string().min(1, "لطفا گذرواژه را وارد نمایید.").min(6, "گذرواژه باید حداقل 6 کاراکتر باشد"),

    confirmPassword: z.string().min(1, "لطفا گذرواژه را تائید نمایید."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "گذرواژه و تائید آن مطابقت ندارد.",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "لطفا ایمیل را وارد نمایید.")
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "ایمیل وارد شده نامعتبر است."),

  password: z.string().min(1, "لطفا گذرواژه را وارد نمایید."),
});
