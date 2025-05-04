import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { fetchUserProfileApi } from "../../../../api/authApi";
import { useAuthStore } from "../../../../store/useAuthStore";
import { UserType } from "../../../../types/authTypes";

const useFetchUserProfileQuery = () => {
  const { setUser, setIsAuthenticated, setIsAuthCheckComplete, setIsFetchingUserProfile } = useAuthStore();

  const fetchUserProfile = useQuery<UserType, Error>({
    queryKey: ["fetchUserProfile"],
    queryFn: async () => {
      setIsAuthCheckComplete(false);
      setIsFetchingUserProfile(true);
      return await fetchUserProfileApi();
    },
    retry: false,
  });

  useEffect(() => {
    if (fetchUserProfile.data) {
      setUser(fetchUserProfile.data);
      setIsAuthenticated(true);
      setIsAuthCheckComplete(true);
      setIsFetchingUserProfile(false);
    }
    if (fetchUserProfile.error) {
      setUser(null);
      setIsAuthenticated(false);
      setIsAuthCheckComplete(true);
      setIsFetchingUserProfile(false);
    }
  }, [
    setUser,
    setIsAuthenticated,
    setIsAuthCheckComplete,
    setIsFetchingUserProfile,
    fetchUserProfile.data,
    fetchUserProfile.error,
  ]);

  return fetchUserProfile;
};

export default useFetchUserProfileQuery;
