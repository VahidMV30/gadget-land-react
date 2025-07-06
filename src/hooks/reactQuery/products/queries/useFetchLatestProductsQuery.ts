import { useQuery } from "@tanstack/react-query";
import { ProductCardResponse } from "../../../../types/productTypes";
import { fetchLatestProductsApi } from "../../../../api/productsApi";

const useFetchLatestProductsQuery = () => {
  return useQuery<ProductCardResponse[]>({
    queryKey: ["fetchLatestProducts"],
    queryFn: fetchLatestProductsApi,
  });
};

export default useFetchLatestProductsQuery;
