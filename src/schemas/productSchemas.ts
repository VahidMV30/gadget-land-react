import { z } from "zod";

export const createProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "لطفا نام محصول را وارد نمایید.")
      .min(3, "نام محصول باید حداقل 3 و حداکثر 50 کاراکتر باشد.")
      .max(50, "نام محصول باید حداقل 3 و حداکثر 50 کاراکتر باشد."),

    slug: z
      .string()
      .min(1, "لطفا اسلاگ را وارد نمایید.")
      .min(3, "اسلاگ باید حداقل 3 و حداکثر 100 کاراکتر باشد.")
      .max(100, "اسلاگ باید حداقل 3 و حداکثر 100 کاراکتر باشد."),

    price: z
      .string()
      .min(1, "لطفا قیمت محصول را وارد نمایید.")
      .refine(
        (value) => {
          const cleaned = value.replace(/\./g, "");
          const number = parseFloat(cleaned);
          return !isNaN(number) && number > 0;
        },
        { message: "قیمت محصول باید بزرگتر از 0 باشد." },
      ),

    discountPrice: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value || value.trim() === "") return true;
          const cleaned = value.replace(/\./g, "");
          const number = parseFloat(cleaned);
          return !isNaN(number) && number > 0;
        },
        { message: "قیمت تخفیف باید بزرگتر از 0 باشد." },
      ),

    quantityInStock: z.string().min(1, "لطفا موجودی انبار را وارد نمایید."),

    description: z
      .string()
      .min(1, "لطفا توضیحات را وارد نمایید.")
      .min(20, "توضیحات باید حداقل 20 و حداکثر 1024 کاراکتر باشد.")
      .max(1024, "توضیحات باید حداقل 20 و حداکثر 1024 کاراکتر باشد."),
  })
  .superRefine(({ price, discountPrice }, ctx) => {
    if (discountPrice && discountPrice.trim() !== "") {
      const priceNum = parseFloat(price.replace(/\./g, ""));
      const discountNum = parseFloat(discountPrice.replace(/\./g, ""));
      if (discountNum >= priceNum) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "قیمت تخفیف نباید بزرگتر یا مساوی قیمت اصلی باشد.",
          path: ["discountPrice"],
        });
      }
    }
  });

export const updateProductSchema = z
  .object({
    id: z.number().min(1),

    name: z
      .string()
      .min(1, "لطفا نام محصول را وارد نمایید.")
      .min(3, "نام محصول باید حداقل 3 و حداکثر 50 کاراکتر باشد.")
      .max(50, "نام محصول باید حداقل 3 و حداکثر 50 کاراکتر باشد."),

    slug: z
      .string()
      .min(1, "لطفا اسلاگ را وارد نمایید.")
      .min(3, "اسلاگ باید حداقل 3 و حداکثر 100 کاراکتر باشد.")
      .max(100, "اسلاگ باید حداقل 3 و حداکثر 100 کاراکتر باشد."),

    price: z
      .string()
      .min(1, "لطفا قیمت محصول را وارد نمایید.")
      .refine(
        (value) => {
          const cleaned = value.replace(/\./g, "");
          const number = parseFloat(cleaned);
          return !isNaN(number) && number > 0;
        },
        { message: "قیمت محصول باید بزرگتر از 0 باشد." },
      ),

    discountPrice: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (!value || value.trim() === "") return true;
          const cleaned = value.replace(/\./g, "");
          const number = parseFloat(cleaned);
          return !isNaN(number) && number > 0;
        },
        { message: "قیمت تخفیف باید بزرگتر از 0 باشد." },
      ),

    quantityInStock: z.string().min(1, "لطفا موجودی انبار را وارد نمایید."),

    description: z
      .string()
      .min(1, "لطفا توضیحات را وارد نمایید.")
      .min(20, "توضیحات باید حداقل 20 و حداکثر 1024 کاراکتر باشد.")
      .max(1024, "توضیحات باید حداقل 20 و حداکثر 1024 کاراکتر باشد."),
  })
  .superRefine(({ price, discountPrice }, ctx) => {
    if (discountPrice && discountPrice.trim() !== "") {
      const priceNum = parseFloat(price.replace(/\./g, ""));
      const discountNum = parseFloat(discountPrice.replace(/\./g, ""));
      if (discountNum >= priceNum) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "قیمت تخفیف نباید بزرگتر یا مساوی قیمت اصلی باشد.",
          path: ["discountPrice"],
        });
      }
    }
  });
