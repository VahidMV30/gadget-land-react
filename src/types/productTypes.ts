import { z } from "zod";

import { createProductSchema, updateProductSchema } from "../schemas/productSchemas";

export type ProductResponse = {
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

export type ProductForAdminTableResponse = {
  id: number;
  categoryName: string;
  brandName: string;
  name: string;
  image: string;
  price: string;
  discountPrice: string;
  quantityInStock: number;
};

export type ProductWithImagesResponse = {
  id: number;
  name: string;
  images: string[];
};

export type ProductsWithFiltersResponse = {
  name: string;
  slug: string;
  image: string;
  price: string;
  discountPrice?: string;
  discountPercent?: number;
};

export type PaginatedProductsWithFiltersResponse = {
  totalCount: number;
  totalPages: number;
  products: ProductsWithFiltersResponse[];
};

export type ProductSortOrderType = "latest" | "oldest" | "cheapest" | "expensive";

export type ProductsWithFiltersRequest = {
  categorySlug: string | null;
  brandSlug: string | null;
  onlyDiscounted: boolean;
  sortOrder: ProductSortOrderType;
  pageIndex: number;
  pageSize?: number;
};

export type ProductDetailsReviewResponse = {
  fullName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type ProductDetailsResponse = {
  id: number;
  categoryName: string;
  categorySlug: string;
  brandName: string;
  brandSlug: string;
  name: string;
  image: string;
  price: string;
  discountPrice: string;
  discountPercent?: number;
  quantityInStock: number;
  description: string;
  averageRating: number;
  totalReviewsCount: number;
  productImages: string[];
  reviews: ProductDetailsReviewResponse[];
};

export type CartProductResponse = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  stringPrice: string;
  discountPrice?: number;
  stringDiscountPrice: string;
  quantityInStock: number;
};

export type CreateProductRequest = z.infer<typeof createProductSchema>;

export type UpdateProductRequest = z.infer<typeof updateProductSchema>;
