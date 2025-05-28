import { useQuery } from "@tanstack/react-query";

import { ProductForAdminTableResponse } from "../../../../types/productTypes";
import { fetchProductsForAdminTableApi } from "../../../../api/productsApi";

const useFetchProductsForAdminTableQuery = () => {
  const fetchProductsForAdminTable = useQuery<ProductForAdminTableResponse[]>({
    queryKey: ["fetchProductsForAdminTable"],
    queryFn: fetchProductsForAdminTableApi,
  });

  return fetchProductsForAdminTable;
};

export default useFetchProductsForAdminTableQuery;
