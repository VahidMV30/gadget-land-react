import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createBrandsApi } from "../../../../api/brandsApi";

const useCreateBrandMutation = () => {
  const navigate = useNavigate();

  const createBrand = useMutation<{ message: string }, AxiosError<{ errors: { description: string }[] }>, FormData>({
    mutationFn: (data: FormData) => createBrandsApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/admin/brands");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return createBrand;
};

export default useCreateBrandMutation;
