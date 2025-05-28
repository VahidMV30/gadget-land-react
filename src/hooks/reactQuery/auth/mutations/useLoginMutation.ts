import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { loginApi } from "../../../../api/authApi";
import { ADMIN_ROLE } from "../../../../constants";
import { useAuthStore } from "../../../../store/useAuthStore";
import { LoginRequest, UserResponse } from "../../../../types/authTypes";

const useLoginMutation = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const login = useMutation<UserResponse, AxiosError<{ errors: { description: string }[] }>, LoginRequest>({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (data) => {
      setUser(data);
      setIsAuthenticated(true);
      setTimeout(() => {
        const callbackUrl = localStorage.getItem("callbackUrl");
        const navigateUrl = callbackUrl ? callbackUrl : data.role === ADMIN_ROLE ? "/admin/dashboard" : "/dashboard";
        navigate(navigateUrl);
      }, 0);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.errors[0]?.description;
        if (errorMessage) toast.error(errorMessage);
      }
    },
  });

  return login;
};

export default useLoginMutation;
