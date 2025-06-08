import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { deleteReviewApi } from "../../../../api/reviewsApi";

const useDeleteReviewMutation = () => {
  const navigate = useNavigate();

  const deleteReviewMutation = useMutation<
    { message: string },
    AxiosError<{ errors: { description: string }[] }>,
    { id: number }
  >({
    mutationFn: ({ id }) => deleteReviewApi(id),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/admin/reviews");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return deleteReviewMutation;
};

export default useDeleteReviewMutation;
