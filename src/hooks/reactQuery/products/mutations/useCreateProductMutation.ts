import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { createProductApi } from "../../../../api/productsApi";

const useCreateProductMutation = () => {
  const navigate = useNavigate();

  const createProduct = useMutation<{ message: string }, AxiosError<{ errors: { description: string }[] }>, FormData>({
    mutationFn: (data: FormData) => createProductApi(data),
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

  return createProduct;
};

export default useCreateProductMutation;
