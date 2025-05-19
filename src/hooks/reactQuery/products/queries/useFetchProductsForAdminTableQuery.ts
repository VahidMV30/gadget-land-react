import { useQuery } from "@tanstack/react-query";

import { ProductsForAdminTableType } from "../../../../types/productTypes";
import { fetchProductsForAdminTableApi } from "../../../../api/productsApi";

const useFetchProductsForAdminTableQuery = () => {
  const fetchProductsForAdminTable = useQuery<ProductsForAdminTableType>({
    queryKey: ["fetchProductsForAdminTable"],
    queryFn: fetchProductsForAdminTableApi,
  });

  return fetchProductsForAdminTable;
};

export default useFetchProductsForAdminTableQuery;
