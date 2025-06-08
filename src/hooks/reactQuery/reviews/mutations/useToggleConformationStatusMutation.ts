import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { toggleConformationStatusApi } from "../../../../api/reviewsApi";

const useToggleConformationStatusMutation = () => {
  const navigate = useNavigate();

  const toggleConformationStatus = useMutation<
    { message: string },
    AxiosError<{ errors: { description: string }[] }>,
    { id: number }
  >({
    mutationFn: ({ id }) => toggleConformationStatusApi(id),
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

  return toggleConformationStatus;
};

export default useToggleConformationStatusMutation;
