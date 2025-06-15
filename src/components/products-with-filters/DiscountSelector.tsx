import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useGlobalStore } from "../../store/globalStore";
import { useProductsWithFiltersStore } from "../../store/productsWithFiltersStore";
import { CustomCheckbox } from "../CustomCheckbox";

export const DiscountSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setIsProductsFilterSidebarOpen } = useGlobalStore();
  const { isOnlyDiscounted, setIsOnlyDiscounted } = useProductsWithFiltersStore();

  useEffect(() => {
    const onlyDiscounted = searchParams.get("onlyDiscounted");
    setIsOnlyDiscounted(onlyDiscounted === "true");
  }, [searchParams, setIsOnlyDiscounted]);

  const handleOnlyDiscountedChange = (checked: boolean) => {
    const params = new URLSearchParams(searchParams);
    if (checked) {
      params.set("onlyDiscounted", "true");
    } else {
      params.delete("onlyDiscounted");
    }
    setSearchParams(params);
    setIsOnlyDiscounted(checked);
    setIsProductsFilterSidebarOpen(false);
  };

  return (
    <CustomCheckbox
      label="محصولات تخفیف دار 🎯"
      className="border-pink-500 bg-pink-500"
      checked={isOnlyDiscounted}
      onChange={handleOnlyDiscountedChange}
    />
  );
};
