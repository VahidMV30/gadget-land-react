import { useQuery } from "@tanstack/react-query";

import { fetchAllBrandsApi } from "../../../../api/brandsApi";
import { BrandsType } from "../../../../types/brandTypes";

const useFetchAllBrandsQuery = () => {
  const fetchAllBrands = useQuery<BrandsType>({
    queryKey: ["fetchAllBrands"],
    queryFn: fetchAllBrandsApi,
  });

  return fetchAllBrands;
};

export default useFetchAllBrandsQuery;
