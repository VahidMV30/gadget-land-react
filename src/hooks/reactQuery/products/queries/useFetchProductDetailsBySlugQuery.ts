import { useQuery } from "@tanstack/react-query";

import { fetchProductDetailsBySlugApi } from "../../../../api/productsApi";
import { ProductDetailsResponse } from "../../../../types/productTypes";

const useFetchProductDetailsBySlugQuery = (slug: string) => {
  const fetchProductDetailsBySlug = useQuery<ProductDetailsResponse>({
    queryKey: ["fetchProductDetailsBySlug", slug],
    queryFn: () => fetchProductDetailsBySlugApi(slug),
    refetchInterval: 5000,
  });

  return fetchProductDetailsBySlug;
};

export default useFetchProductDetailsBySlugQuery;
