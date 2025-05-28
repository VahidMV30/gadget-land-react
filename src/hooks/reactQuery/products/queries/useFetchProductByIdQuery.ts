import { useQuery } from "@tanstack/react-query";

import { ProductResponse } from "../../../../types/productTypes";
import { fetchProductByIdApi } from "../../../../api/productsApi";

const useFetchProductByIdQuery = (id: number) => {
  const fetchProductById = useQuery<ProductResponse>({
    queryKey: ["fetchProductById", id],
    queryFn: () => fetchProductByIdApi(id),
  });

  return fetchProductById;
};

export default useFetchProductByIdQuery;
