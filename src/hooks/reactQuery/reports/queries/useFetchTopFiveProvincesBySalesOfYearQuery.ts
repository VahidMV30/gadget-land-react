import { useQuery } from "@tanstack/react-query";
import { TopFiveProvincesBySalesOfYearResponse } from "../../../../types/reportTypes";
import { fetchTopFiveProvincesBySalesOfYearApi } from "../../../../api/reportsApi";

const useFetchTopFiveProvincesBySalesOfYearQuery = () => {
  return useQuery<TopFiveProvincesBySalesOfYearResponse[]>({
    queryKey: ["fetchTopFiveProvincesBySalesOfYear"],
    queryFn: fetchTopFiveProvincesBySalesOfYearApi,
  });
};

export default useFetchTopFiveProvincesBySalesOfYearQuery;
