import { useEffect } from "react";
import { LuFactory } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";

import useFetchAllBrandsQuery from "../../hooks/reactQuery/brands/queries/useFetchAllBrandsQuery";

import { useGlobalStore } from "../../store/globalStore";
import { useProductsWithFiltersStore } from "../../store/productsWithFiltersStore";
import { CustomCheckbox } from "../CustomCheckbox";
import { Spinner } from "../Spinner";

export const BrandSelector = () => {
  const { data, isLoading } = useFetchAllBrandsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsProductsFilterSidebarOpen } = useGlobalStore();
  const { selectedBrandSlug, setSelectedBrandSlug } = useProductsWithFiltersStore();

  useEffect(() => {
    const brandSlug = searchParams.get("brandSlug");
    setSelectedBrandSlug(brandSlug);
  }, [searchParams, setSelectedBrandSlug]);

  const handleBrandSlugChange = (brandSlug: string | null) => {
    const params = new URLSearchParams(searchParams);

    if (selectedBrandSlug === brandSlug) {
      params.delete("brandSlug");
      setSelectedBrandSlug(null);
    } else if (brandSlug) {
      params.set("brandSlug", brandSlug);
      setSelectedBrandSlug(brandSlug);
    }

    setSearchParams(params);
    setIsProductsFilterSidebarOpen(false);
  };

  return (
    <div className="rounded border border-gray-300 dark:border-gray-700">
      <p className="flex items-center gap-2 bg-gray-100 p-2 dark:bg-gray-800">
        <LuFactory size={17} />
        <span>برند ها</span>
      </p>

      {!isLoading ? (
        <div className="flex flex-col gap-2 p-2">
          {data?.map((brand) => (
            <CustomCheckbox
              key={brand.slug}
              label={brand.name}
              className="border-green-500 bg-green-500"
              checked={selectedBrandSlug === brand.slug}
              onChange={() => handleBrandSlugChange(brand.slug)}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-4 text-green-300">
          <Spinner size={20} />
        </div>
      )}
    </div>
  );
};
