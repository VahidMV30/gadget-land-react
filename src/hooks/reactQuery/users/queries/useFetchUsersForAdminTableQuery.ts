import { useQuery } from "@tanstack/react-query";
import { UsersForAdminTableResponse } from "../../../../types/userTypes";
import { fetchUsersForAdminTableApi } from "../../../../api/usersApi";

const useFetchUsersForAdminTableQuery = () => {
  return useQuery<UsersForAdminTableResponse[]>({
    queryKey: ["fetchUsersForAdminTable"],
    queryFn: fetchUsersForAdminTableApi,
  });
};

export default useFetchUsersForAdminTableQuery;
