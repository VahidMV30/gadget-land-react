import { useQuery } from "@tanstack/react-query";

import { ProductType } from "../../../../types/productTypes";
import { fetchProductByIdApi } from "../../../../api/productsApi";

const useFetchProductByIdQuery = (id: number) => {
  const fetchProductById = useQuery<ProductType>({
    queryKey: ["fetchProductById", id],
    queryFn: () => fetchProductByIdApi(id),
  });

  return fetchProductById;
};

export default useFetchProductByIdQuery;
