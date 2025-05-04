import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { RegisterType, UserType } from "../../../../types/authTypes";
import { registerApi } from "../../../../api/authApi";
import { useAuthStore } from "../../../../store/useAuthStore";

const useRegisterMutation = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const register = useMutation<UserType, AxiosError<{ errors: { description: string }[] }>, RegisterType>({
    mutationFn: (data: RegisterType) => registerApi(data),
    onSuccess: (data) => {
      setUser(data);
      setIsAuthenticated(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 0);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.errors[0]?.description;
        if (errorMessage) toast.error(errorMessage);
      }
    },
  });

  return register;
};

export default useRegisterMutation;
