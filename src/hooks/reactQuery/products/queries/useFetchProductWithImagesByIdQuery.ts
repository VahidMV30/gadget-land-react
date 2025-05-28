import { useQuery } from "@tanstack/react-query";
import { ProductWithImagesResponse } from "../../../../types/productTypes";
import { fetchProductWithImagesByIdApi } from "../../../../api/productsApi";

const useFetchProductWithImagesByIdQuery = (id: number) => {
  const fetchProductWithImagesById = useQuery<ProductWithImagesResponse>({
    queryKey: ["fetchProductWithImagesById", id],
    queryFn: () => fetchProductWithImagesByIdApi(id),
  });

  return fetchProductWithImagesById;
};

export default useFetchProductWithImagesByIdQuery;
