import { useQuery } from "@tanstack/react-query";
import { ProductWithImagesType } from "../../../../types/productTypes";
import { fetchProductWithImagesByIdApi } from "../../../../api/productsApi";

const useFetchProductWithImagesByIdQuery = (id: number) => {
  const fetchProductWithImagesById = useQuery<ProductWithImagesType>({
    queryKey: ["fetchProductWithImagesById", id],
    queryFn: () => fetchProductWithImagesByIdApi(id),
  });

  return fetchProductWithImagesById;
};

export default useFetchProductWithImagesByIdQuery;
