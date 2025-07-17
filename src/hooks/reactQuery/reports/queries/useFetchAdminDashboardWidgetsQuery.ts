import { useQuery } from "@tanstack/react-query";

import { fetchAdminDashboardWidgetsApi } from "../../../../api/reportsApi";
import { AdminDashboardWidgetsResponse } from "../../../../types/reportTypes";

const useFetchAdminDashboardWidgetsQuery = () => {
  return useQuery<AdminDashboardWidgetsResponse>({
    queryKey: ["fetchAdminDashboardWidgets"],
    queryFn: fetchAdminDashboardWidgetsApi,
  });
};

export default useFetchAdminDashboardWidgetsQuery;
