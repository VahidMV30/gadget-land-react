import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { createPaymentApi } from "../../../../api/paymentsApi";
import { CartItem } from "../../../../types/paymentTypes";

const useCreatePaymentMutation = () => {
  const createPayment = useMutation<string, AxiosError<{ errors: { description: string }[] }>, CartItem[]>({
    mutationFn: (data) => createPaymentApi(data),
    onSuccess: (data) => {
      console.log(data);
      window.location.replace(data);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return createPayment;
};

export default useCreatePaymentMutation;
