import { useQuery } from "@tanstack/react-query";
import { BrandType } from "../../../../types/brandTypes";
import { fetchBrandByIdApi } from "../../../../api/brandsApi";

const useFetchBrandByIdQuery = (id: number) => {
  const fetchBrandById = useQuery<BrandType>({
    queryKey: ["fetchBrandById", id],
    queryFn: () => fetchBrandByIdApi(id),
  });

  return fetchBrandById;
};

export default useFetchBrandByIdQuery;
