import { useQuery } from "@tanstack/react-query";

import { fetchCategoryByIdApi } from "../../../../api/categoriesApi";
import { CategoryType } from "../../../../types/categoryTypes";

const useFetchCategoryByIdQuery = (id: number) => {
  const fetchCategoryById = useQuery<CategoryType>({
    queryKey: ["fetchCategoryById", id],
    queryFn: () => fetchCategoryByIdApi(id),
  });

  return fetchCategoryById;
};

export default useFetchCategoryByIdQuery;
