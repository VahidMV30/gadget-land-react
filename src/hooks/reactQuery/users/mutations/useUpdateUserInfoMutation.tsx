import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { updateUserInfoApi } from "../../../../api/usersApi";
import { UpdateUserAddressInfoWithCityIdRequest } from "../../../../types/userTypes";

export const useUpdateUserInfoMutation = () => {
  const updateUserInfo = useMutation<
    { message: string },
    AxiosError<{ errors: { description: string }[] }>,
    UpdateUserAddressInfoWithCityIdRequest
  >({
    mutationFn: (data) => updateUserInfoApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return updateUserInfo;
};
