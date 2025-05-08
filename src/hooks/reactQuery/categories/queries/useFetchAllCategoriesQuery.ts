import { useQuery } from "@tanstack/react-query";

import { fetchAllCategoriesApi } from "../../../../api/categoriesApi";
import { CategoryType } from "../../../../types/categoryTypes";

const useFetchAllCategoriesQuery = () => {
  const fetchAllCategories = useQuery<CategoryType[]>({
    queryKey: ["fetchAllCategories"],
    queryFn: fetchAllCategoriesApi,
  });

  return fetchAllCategories;
};

export default useFetchAllCategoriesQuery;
