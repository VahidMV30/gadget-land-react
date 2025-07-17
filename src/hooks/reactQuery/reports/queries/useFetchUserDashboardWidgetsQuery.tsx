import { useQuery } from "@tanstack/react-query";

import { UserDashboardWidgetsResponse } from "../../../../types/reportTypes";
import { fetchUserDashboardWidgetsApi } from "../../../../api/reportsApi";

const useFetchUserDashboardWidgetsQuery = () => {
  return useQuery<UserDashboardWidgetsResponse>({
    queryKey: ["fetchUserDashboardWidgets"],
    queryFn: fetchUserDashboardWidgetsApi,
  });
};

export default useFetchUserDashboardWidgetsQuery;
