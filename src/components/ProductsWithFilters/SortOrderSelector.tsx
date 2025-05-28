import { useEffect, useState } from "react";
import { LuChevronUp, LuChevronDown } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { FaSortAmountDown } from "react-icons/fa";

import { ProductSortOrderType } from "../../types/productTypes";
import { useProductsWithFiltersStore } from "../../store/useProductsWithFiltersStore";

const sortOrderItems: { title: string; sortOrder: ProductSortOrderType }[] = [
  {
    title: "📅 جدیدترین",
    sortOrder: "latest",
  },
  {
    title: "🕰️ قدیمی ترین",
    sortOrder: "oldest",
  },
  {
    title: "💸 ارزان ترین",
    sortOrder: "cheapest",
  },
  {
    title: "💰 گران ترین",
    sortOrder: "expensive",
  },
];
const validSortOrders: ProductSortOrderType[] = ["latest", "oldest", "cheapest", "expensive"];

export const SortOrderSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setSortOrder } = useProductsWithFiltersStore();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ title: string; sortOrder: ProductSortOrderType }>({
    title: "جدیدترین",
    sortOrder: "latest",
  });

  useEffect(() => {
    const sortOrder = searchParams.get("sortOrder");
    if (sortOrder && validSortOrders.includes(sortOrder as ProductSortOrderType)) {
      setSortOrder(sortOrder as ProductSortOrderType);
    } else {
      setSortOrder("latest");
    }
  }, [searchParams, setSortOrder]);

  const handleSelectSortOrder = (item: { title: string; sortOrder: ProductSortOrderType }) => {
    const params = new URLSearchParams(searchParams);

    params.set("sortOrder", item.sortOrder);

    setSelectedItem({ title: item.title, sortOrder: item.sortOrder });
    setIsOpen(false);

    setSortOrder(item.sortOrder);
    setSearchParams(params);
  };

  return (
    <div className="relative">
      <button
        className="flex w-40 cursor-pointer items-center justify-between rounded bg-gray-300 px-2 py-1.5 dark:bg-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaSortAmountDown size={17} />
        <span>{selectedItem.title}</span>
        <span className="mt-1">{isOpen ? <LuChevronUp size={17} /> : <LuChevronDown size={17} />}</span>
      </button>
      {isOpen && (
        <ul className="absolute top-11 z-20 w-full rounded bg-gray-200 p-2 dark:bg-gray-800">
          {sortOrderItems.map((item) => (
            <li key={item.sortOrder}>
              <button
                className="w-full cursor-pointer rounded p-2 hover:bg-sky-500/25"
                onClick={() => handleSelectSortOrder(item)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
