import { useQuery } from "@tanstack/react-query";
import { ProductCardResponse } from "../../../../types/productTypes";
import { fetchTopSellingProductsApi } from "../../../../api/productsApi";

const useFetchTopSellingProductsQuery = () => {
  return useQuery<ProductCardResponse[]>({
    queryKey: ["fetchMostSellingProducts"],
    queryFn: fetchTopSellingProductsApi,
  });
};

export default useFetchTopSellingProductsQuery;
