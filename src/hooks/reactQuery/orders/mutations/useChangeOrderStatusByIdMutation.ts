import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { changeOrderStatusByIdApi } from "../../../../api/ordersApi";
import { ChangeOrderStatusRequest } from "../../../../types/orderTypes";

const useChangeOrderStatusByIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, AxiosError<{ errors: { description: string }[] }>, ChangeOrderStatusRequest>({
    mutationFn: (data) => changeOrderStatusByIdApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["fetchOrderWithItemsAndUserById"] });
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });
};

export default useChangeOrderStatusByIdMutation;
