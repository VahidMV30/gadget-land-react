import { useQuery } from "@tanstack/react-query";
import { BrandResponse } from "../../../../types/brandTypes";
import { fetchBrandByIdApi } from "../../../../api/brandsApi";

const useFetchBrandByIdQuery = (id: number) => {
  const fetchBrandById = useQuery<BrandResponse>({
    queryKey: ["fetchBrandById", id],
    queryFn: () => fetchBrandByIdApi(id),
  });

  return fetchBrandById;
};

export default useFetchBrandByIdQuery;
