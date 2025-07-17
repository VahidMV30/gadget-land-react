import { useQuery } from "@tanstack/react-query";
import { SalesByPersianMonthOfYearResponse } from "../../../../types/reportTypes";
import { fetchSalesByPersianMonthOfYearApi } from "../../../../api/reportsApi";

const useFetchSalesByPersianMonthOfYearQuery = () => {
  return useQuery<SalesByPersianMonthOfYearResponse[]>({
    queryKey: ["fetchSalesByPersianMonthOfYear"],
    queryFn: fetchSalesByPersianMonthOfYearApi,
  });
};

export default useFetchSalesByPersianMonthOfYearQuery;
