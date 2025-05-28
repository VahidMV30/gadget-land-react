import { useQuery } from "@tanstack/react-query";

import { fetchAllCategoriesApi } from "../../../../api/categoriesApi";
import { CategoryResponse } from "../../../../types/categoryTypes";

const useFetchAllCategoriesQuery = () => {
  const fetchAllCategories = useQuery<CategoryResponse[]>({
    queryKey: ["fetchAllCategories"],
    queryFn: fetchAllCategoriesApi,
  });

  return fetchAllCategories;
};

export default useFetchAllCategoriesQuery;
