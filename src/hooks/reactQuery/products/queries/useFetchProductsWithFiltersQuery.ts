import { useQuery } from "@tanstack/react-query";

import { PaginatedProductsWithFiltersResponse, ProductsWithFiltersRequest } from "../../../../types/productTypes";
import { fetchProductsWithFiltersApi } from "../../../../api/productsApi";

const useFetchProductsWithFiltersQuery = (data: ProductsWithFiltersRequest) => {
  const fetchProductsWithFilters = useQuery<PaginatedProductsWithFiltersResponse>({
    queryKey: [
      "fetchProductsWithFilters",
      data.categorySlug,
      data.brandSlug,
      data.onlyDiscounted,
      data.sortOrder,
      data.pageIndex,
    ],
    queryFn: () => fetchProductsWithFiltersApi(data),
  });

  return fetchProductsWithFilters;
};

export default useFetchProductsWithFiltersQuery;
