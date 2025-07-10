import { useQuery } from "@tanstack/react-query";
import { UserDetailsResponse } from "../../../../types/userTypes";
import { fetchUserDetailsApi } from "../../../../api/usersApi";

const useFetchUserDetailsQuery = () => {
  return useQuery<UserDetailsResponse>({
    queryKey: ["fetchUserDetails"],
    queryFn: fetchUserDetailsApi,
  });
};

export default useFetchUserDetailsQuery;
