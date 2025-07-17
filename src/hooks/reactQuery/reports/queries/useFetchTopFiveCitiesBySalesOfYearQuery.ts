import { useQuery } from "@tanstack/react-query";

import { TopFiveCitiesBySalesOfYearResponse } from "../../../../types/reportTypes";
import { fetchTopFiveCitiesBySalesOfYearApi } from "../../../../api/reportsApi";

const useFetchTopFiveCitiesBySalesOfYearQuery = () => {
  return useQuery<TopFiveCitiesBySalesOfYearResponse[]>({
    queryKey: ["fetchTopFiveCitiesBySalesOfYear"],
    queryFn: fetchTopFiveCitiesBySalesOfYearApi,
  });
};

export default useFetchTopFiveCitiesBySalesOfYearQuery;
