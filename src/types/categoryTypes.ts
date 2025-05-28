import { z } from "zod";

import { createCategorySchema, updateCategorySchema } from "../schemas/categorySchemas";

export type CategoryResponse = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type CreateCategoryRequest = z.infer<typeof createCategorySchema>;

export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;
