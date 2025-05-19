import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { updateProductApi } from "../../../../api/productsApi";

const useUpdateProductMutation = () => {
  const navigate = useNavigate();

  const updateProduct = useMutation<{ message: string }, AxiosError<{ errors: { description: string }[] }>, FormData>({
    mutationFn: (data: FormData) => updateProductApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/admin/products");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return updateProduct;
};

export default useUpdateProductMutation;
