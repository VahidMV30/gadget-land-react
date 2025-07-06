import { useQuery } from "@tanstack/react-query";
import { ProductCardResponse } from "../../../../types/productTypes";
import { fetchDiscountedProductsApi } from "../../../../api/productsApi";

const useFetchDiscountedProductsQuery = () => {
  return useQuery<ProductCardResponse[]>({
    queryKey: ["fetchDiscountedProducts"],
    queryFn: fetchDiscountedProductsApi,
  });
};

export default useFetchDiscountedProductsQuery;
