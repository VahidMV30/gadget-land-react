import { useQuery } from "@tanstack/react-query";

import { fetchCartProductsByIdsApi } from "../../../../api/productsApi";
import { CartProductResponse } from "../../../../types/productTypes";

const useFetchCartProductsByIdsQuery = (ids: number[]) => {
  const fetchCartProductsByIds = useQuery<CartProductResponse[]>({
    queryKey: ["fetchCartProductsByIds", ids],
    queryFn: () => fetchCartProductsByIdsApi(ids),
    refetchInterval: 5000,
  });

  return fetchCartProductsByIds;
};

export default useFetchCartProductsByIdsQuery;
