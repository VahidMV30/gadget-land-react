import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { createReviewApi } from "../../../../api/reviewsApi";
import { CreateReviewRequest } from "../../../../types/reviewTypes";

const useCreateReviewMutation = (productId: number) => {
  const queryClient = useQueryClient();

  const createReview = useMutation<
    { message: string },
    AxiosError<{ errors: { description: string }[] }>,
    CreateReviewRequest
  >({
    mutationFn: (data: CreateReviewRequest) => createReviewApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["fetchHasUserReviewed", productId] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return createReview;
};

export default useCreateReviewMutation;
