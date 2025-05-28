import { useQuery } from "@tanstack/react-query";

import { fetchCategoryByIdApi } from "../../../../api/categoriesApi";
import { CategoryResponse } from "../../../../types/categoryTypes";

const useFetchCategoryByIdQuery = (id: number) => {
  const fetchCategoryById = useQuery<CategoryResponse>({
    queryKey: ["fetchCategoryById", id],
    queryFn: () => fetchCategoryByIdApi(id),
  });

  return fetchCategoryById;
};

export default useFetchCategoryByIdQuery;
