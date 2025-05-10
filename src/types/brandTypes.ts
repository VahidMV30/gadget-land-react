import { z } from "zod";

import { createBrandSchema, updateBrandSchema } from "../schemas/brandSchemas";

export type BrandType = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type BrandsType = BrandType[];

export type CreateBrandType = z.infer<typeof createBrandSchema>;

export type UpdateBrandType = z.infer<typeof updateBrandSchema>;
