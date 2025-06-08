import { z } from "zod";

import { createReviewSchema } from "../schemas/reviewSchemas";

export type ReviewResponse = {
  id: number;
  userFullName: string;
  productName: string;
  rating: number;
  isConfirmed: boolean;
  createdAt: string;
};

export type ReviewDetailsResponse = {
  id: number;
  userFullName: string;
  productName: string;
  rating: number;
  comment: string;
  isConfirmed: boolean;
  createdAt: string;
};

export type CreateReviewRequest = z.infer<typeof createReviewSchema>;
