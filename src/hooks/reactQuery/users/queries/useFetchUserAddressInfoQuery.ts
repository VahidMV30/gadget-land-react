import { useQuery } from "@tanstack/react-query";

import { UserAddressInfoResponse } from "../../../../types/userTypes";
import { fetchUserAddressInfoApi } from "../../../../api/usersApi";

const useFetchUserAddressInfoQuery = () => {
  const fetchUserAddressInfo = useQuery<UserAddressInfoResponse>({
    queryKey: ["fetchUserAddressInfo"],
    queryFn: fetchUserAddressInfoApi,
  });

  return fetchUserAddressInfo;
};

export default useFetchUserAddressInfoQuery;
