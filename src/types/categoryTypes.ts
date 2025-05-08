import { z } from "zod";

import { createCategorySchema, updateCategorySchema } from "../schemas/categorySchemas";

export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type CategoriesType = CategoryType[];

export type CreateCategoryType = z.infer<typeof createCategorySchema>;

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
