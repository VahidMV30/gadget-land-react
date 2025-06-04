import { z } from "zod";

export const createReviewSchema = z.object({
  productId: z.number().optional(),

  rating: z.number().optional(),

  comment: z
    .string()
    .min(1, { message: "لطفا متن دیدگاه را وارد نمایید." })
    .min(10, "متن دیدگاه باید حداقل 10 و حداکثر 256 کاراکتر باشد.")
    .max(256, "متن دیدگاه باید حداقل 10 و حداکثر 256 کاراکتر باشد."),
});
