import { z } from "zod";

import { createProductSchema, updateProductSchema } from "../schemas/productSchemas";

export type ProductForAdminTableType = {
  id: number;
  categoryName: string;
  brandName: string;
  name: string;
  image: string;
  price: string;
  discountPrice: string;
  quantityInStock: number;
};

export type ProductType = {
  id: number;
  categoryId: number;
  categoryName: string;
  brandId: number;
  brandName: string;
  name: string;
  slug: string;
  image: string;
  price: string;
  discountPrice: string;
  quantityInStock: string;
  description: string;
};

export type ProductWithImagesType = {
  id: number;
  name: string;
  images: string[];
};

export type ProductsForAdminTableType = ProductForAdminTableType[];

export type CreateProductType = z.infer<typeof createProductSchema>;

export type UpdateProductType = z.infer<typeof updateProductSchema>;
