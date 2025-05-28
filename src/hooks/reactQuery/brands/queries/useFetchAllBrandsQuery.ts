import { useQuery } from "@tanstack/react-query";

import { fetchAllBrandsApi } from "../../../../api/brandsApi";
import { BrandResponse } from "../../../../types/brandTypes";

const useFetchAllBrandsQuery = () => {
  const fetchAllBrands = useQuery<BrandResponse[]>({
    queryKey: ["fetchAllBrands"],
    queryFn: fetchAllBrandsApi,
  });

  return fetchAllBrands;
};

export default useFetchAllBrandsQuery;
