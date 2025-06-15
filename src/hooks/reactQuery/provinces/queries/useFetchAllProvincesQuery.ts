import { useQuery } from "@tanstack/react-query";

import { fetchAllProvincesApi } from "../../../../api/provincesApi";
import { ProvinceResponse } from "../../../../types/provinceTypes";

const useFetchAllProvincesQuery = () => {
  const fetchAllProvinces = useQuery<ProvinceResponse[]>({
    queryKey: ["fetchAllProvinces"],
    queryFn: fetchAllProvincesApi,
  });

  return fetchAllProvinces;
};

export default useFetchAllProvincesQuery;
