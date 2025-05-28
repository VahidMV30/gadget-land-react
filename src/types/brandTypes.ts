import { z } from "zod";

import { createBrandSchema, updateBrandSchema } from "../schemas/brandSchemas";

export type BrandResponse = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type CreateBrandRequest = z.infer<typeof createBrandSchema>;

export type UpdateBrandRequest = z.infer<typeof updateBrandSchema>;
