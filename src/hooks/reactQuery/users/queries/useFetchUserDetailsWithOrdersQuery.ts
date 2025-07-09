import { useQuery } from "@tanstack/react-query";
import { UserDetailsWithOrdersResponse } from "../../../../types/userTypes";
import { fetchUserDetailsWithOrdersApi } from "../../../../api/usersApi";

const useFetchUserDetailsWithOrdersQuery = (userId: number) => {
  return useQuery<UserDetailsWithOrdersResponse>({
    queryKey: ["fetchUserDetailsWithOrders"],
    queryFn: () => fetchUserDetailsWithOrdersApi(userId),
    enabled: !!userId,
  });
};

export default useFetchUserDetailsWithOrdersQuery;
