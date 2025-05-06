import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { logoutApi } from "../../../../api/authApi";
import { useAuthStore } from "../../../../store/useAuthStore";

const useLogoutMutation = () => {
  const { setUser, setIsAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const logout = useMutation({
    mutationFn: () => logoutApi(),
    onSuccess: () => {
      setUser(null);
      setIsAuthenticated(false);
      setTimeout(() => {
        navigate("/");
      }, 0);
    },
    onError: () => {
      setUser(null);
      setIsAuthenticated(false);
      setTimeout(() => {
        navigate("/");
      }, 0);
    },
  });

  return logout;
};

export default useLogoutMutation;
