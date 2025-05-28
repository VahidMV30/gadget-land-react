import classnames from "classnames";

import { useGlobalStore } from "../../store/useGlobalStore";
import { Divider } from "../Divider";
import { BrandSelector } from "./BrandSelector";
import { CategorySelector } from "./CategorySelector";
import { DiscountSelector } from "./DiscountSelector";

export const ProductsFiltersSidebar = () => {
  const { isProductsFilterSidebarOpen, setIsProductsFilterSidebarOpen } = useGlobalStore();

  return (
    <>
      <div
        className={classnames("fixed inset-0 z-50 bg-gray-500/50 lg:hidden", {
          hidden: !isProductsFilterSidebarOpen,
        })}
        onClick={() => setIsProductsFilterSidebarOpen(!isProductsFilterSidebarOpen)}
      />
      <div
        className={classnames({
          "fixed inset-0 -right-72 col-span-0 w-72 rounded-tl-xl rounded-bl-xl bg-white duration-200": true,
          "border-gray-300 lg:static lg:col-span-3 lg:w-full lg:rounded lg:border dark:border-gray-700": true,
          "z-50 p-4 transition-[right] lg:h-fit dark:bg-gray-950": true,
          "right-0": isProductsFilterSidebarOpen,
        })}
      >
        <div>
          <DiscountSelector />

          <Divider />

          <CategorySelector />

          <Divider />

          <BrandSelector />
        </div>
      </div>
    </>
  );
};
