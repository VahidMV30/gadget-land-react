import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UpdateUserAddressInfoWithCityIdRequest } from "../../../../types/userTypes";
import { updateUserAddressInfoApi } from "../../../../api/usersApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useUpdateUserAddressInfoMutation = () => {
  const navigate = useNavigate();

  const updateUserAddressInfo = useMutation<
    { message: string },
    AxiosError<{ errors: { description: string }[] }>,
    UpdateUserAddressInfoWithCityIdRequest
  >({
    mutationFn: (data: UpdateUserAddressInfoWithCityIdRequest) => updateUserAddressInfoApi(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/checkout/payment");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response!.data.errors[0].description);
      }
    },
  });

  return updateUserAddressInfo;
};

export default useUpdateUserAddressInfoMutation;
