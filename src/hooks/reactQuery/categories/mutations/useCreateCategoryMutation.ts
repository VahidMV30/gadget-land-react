import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createCategoryApi } from "../../../../api/categoriesApi";

const useCreateCategoryMutation = () => {
  const navigate = useNavigate();

  const createCategory = useMutation<{ message: string }, AxiosError<{ errors: { description: string }[] }>, FormData>({
    mutationFn: (data: FormData) => createCategoryApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/admin/categories");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return createCategory;
};

export default useCreateCategoryMutation;
