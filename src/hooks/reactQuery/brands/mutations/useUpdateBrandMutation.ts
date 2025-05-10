import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateBrandApi } from "../../../../api/brandsApi";

const useUpdateBrandMutation = () => {
  const navigate = useNavigate();

  const updateBrand = useMutation<{ message: string }, AxiosError<{ errors: { description: string }[] }>, FormData>({
    mutationFn: (data: FormData) => updateBrandApi(data),
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

  return updateBrand;
};

export default useUpdateBrandMutation;
