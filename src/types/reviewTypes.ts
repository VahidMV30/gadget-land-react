import { z } from "zod";

import { createReviewSchema } from "../schemas/reviewSchemas";

export type CreateReviewRequest = z.infer<typeof createReviewSchema>;
