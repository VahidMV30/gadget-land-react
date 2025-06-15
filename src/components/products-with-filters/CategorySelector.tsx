import { useEffect } from "react";
import { FaTags } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";

import useFetchAllCategoriesQuery from "../../hooks/reactQuery/categories/queries/useFetchAllCategoriesQuery";
import { useGlobalStore } from "../../store/globalStore";
import { useProductsWithFiltersStore } from "../../store/productsWithFiltersStore";
import { CustomCheckbox } from "../CustomCheckbox";
import { Spinner } from "../Spinner";

export const CategorySelector = () => {
  const { data, isLoading } = useFetchAllCategoriesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsProductsFilterSidebarOpen } = useGlobalStore();
  const { selectedCategorySlug, setSelectedCategorySlug } = useProductsWithFiltersStore();

  useEffect(() => {
    const categorySlug = searchParams.get("categorySlug");
    setSelectedCategorySlug(categorySlug);
  }, [searchParams, setSelectedCategorySlug]);

  const handleCategorySlugChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategorySlug === categorySlug) {
      params.delete("categorySlug");
      setSelectedCategorySlug(null);
    } else if (categorySlug) {
      params.set("categorySlug", categorySlug);
      setSelectedCategorySlug(categorySlug);
    }

    setSearchParams(params);
    setIsProductsFilterSidebarOpen(false);
  };

  return (
    <div className="rounded border border-gray-300 dark:border-gray-700">
      <p className="flex items-center gap-2 bg-gray-100 p-2 dark:bg-gray-800">
        <FaTags size={17} />
        <span>دسته بندی ها</span>
      </p>

      {!isLoading ? (
        <div className="flex flex-col gap-2 p-2">
          {data?.map((category) => (
            <CustomCheckbox
              key={category.slug}
              label={category.name}
              className="border-violet-500 bg-violet-500"
              checked={selectedCategorySlug === category.slug}
              onChange={() => handleCategorySlugChange(category.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-4 text-violet-300">
          <Spinner size={20} />
        </div>
      )}
    </div>
  );
};
