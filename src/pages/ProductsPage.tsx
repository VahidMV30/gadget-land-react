import axios from "axios";
import classnames from "classnames";
import { LuFilter } from "react-icons/lu";

import { Divider } from "../components/Divider";
import { ProductCard } from "../components/ProductsWithFilters/ProductCard";
import { ProductsFiltersSidebar } from "../components/ProductsWithFilters/ProductsFiltersSidebar";
import { Spinner } from "../components/Spinner";
import useFetchProductsWithFiltersQuery from "../hooks/reactQuery/products/queries/useFetchProductsWithFiltersQuery";
import { useGlobalStore } from "../store/useGlobalStore";
import { useProductsWithFiltersStore } from "../store/useProductsWithFiltersStore";
import { PaginationButtons } from "../components/ProductsWithFilters/PaginationButtons";
import { SortOrderSelector } from "../components/ProductsWithFilters/SortOrderSelector";

const ProductsPage = () => {
  const { setIsProductsFilterSidebarOpen } = useGlobalStore();
  const { selectedCategorySlug, selectedBrandSlug, isOnlyDiscounted, sortOrder, pageIndex } =
    useProductsWithFiltersStore();
  const { data, isLoading, isError, error } = useFetchProductsWithFiltersQuery({
    categorySlug: selectedCategorySlug,
    brandSlug: selectedBrandSlug,
    onlyDiscounted: isOnlyDiscounted,
    sortOrder,
    pageIndex,
    pageSize: 12,
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <ProductsFiltersSidebar />

      <div className="col-span-12 h-fit rounded border border-gray-300 p-4 lg:col-span-9 dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <SortOrderSelector />

          <button
            className={classnames({
              "flex cursor-pointer items-center gap-1.5 rounded border border-violet-300": true,
              "bg-violet-500/25 p-1.5 hover:bg-violet-500/30 lg:hidden dark:border-violet-700": true,
            })}
            onClick={() => setIsProductsFilterSidebarOpen(true)}
          >
            <LuFilter size={17} />
          </button>
        </div>

        <Divider />

        {isError ? (
          <p className="text-center text-rose-500">
            {axios.isAxiosError(error) && error.response?.data.errors[0]?.description}
          </p>
        ) : (
          <>
            {!isLoading && data ? (
              <>
                <div className="grid grid-cols-12 gap-4">
                  {data?.products.map((product) => <ProductCard key={product.slug} product={product} />)}
                </div>

                <Divider />

                <PaginationButtons totalPages={data.totalPages} />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2">
                <Spinner size={25} />
                <span>در حال بارگذاری ...</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
