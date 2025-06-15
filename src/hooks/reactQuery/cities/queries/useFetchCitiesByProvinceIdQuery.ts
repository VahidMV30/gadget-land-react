import { useQuery } from "@tanstack/react-query";
import { CityResponse } from "../../../../types/cityTypes";
import { fetchCitiesByProvinceIdApi } from "../../../../api/citiesApi";
import { useGlobalStore } from "../../../../store/globalStore";

const useFetchCitiesByProvinceIdQuery = () => {
  const { selectedProvinceId } = useGlobalStore();

  const fetchCitiesByProvinceId = useQuery<CityResponse[]>({
    queryKey: ["fetchCitiesByProvinceId", selectedProvinceId],
    queryFn: () => fetchCitiesByProvinceIdApi(selectedProvinceId!),
    enabled: selectedProvinceId !== null,
  });

  return fetchCitiesByProvinceId;
};

export default useFetchCitiesByProvinceIdQuery;
