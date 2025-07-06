import axios from "axios";
import classnames from "classnames";
import { LuFilter } from "react-icons/lu";

import { Divider } from "../components/Divider";
import { PaginationButtons } from "../components/products-with-filters/PaginationButtons";
import { ProductCard } from "../components/products-with-filters/ProductCard";
import { ProductsFiltersSidebar } from "../components/products-with-filters/ProductsFiltersSidebar";
import { SortOrderSelector } from "../components/products-with-filters/SortOrderSelector";
import { Spinner } from "../components/Spinner";
import useFetchProductsWithFiltersQuery from "../hooks/reactQuery/products/queries/useFetchProductsWithFiltersQuery";
import useMetadata from "../hooks/useMetadata";
import { useGlobalStore } from "../store/globalStore";
import { useProductsWithFiltersStore } from "../store/productsWithFiltersStore";

const ProductsPage = () => {
  useMetadata("محصولات");

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
              "bg-violet-500/25 p-2 hover:bg-violet-500/30 lg:hidden dark:border-violet-700": true,
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
                  {data.products.length > 0 ? (
                    data.products.map((product) => <ProductCard key={product.slug} product={product} />)
                  ) : (
                    <div className="col-span-12 text-center text-yellow-500 dark:text-yellow-300">
                      محصولی یافت نشد! 🫤
                    </div>
                  )}
                </div>

                <Divider />

                <PaginationButtons totalPages={data.totalPages} disableNextPage={data.products.length === 0} />
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
