import { useEffect } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import classnames from "classnames";
import { useProductsWithFiltersStore } from "../../store/productsWithFiltersStore";

export const PaginationButtons = ({ totalPages }: { totalPages: number }) => {
  const { pageIndex, setPageIndex } = useProductsWithFiltersStore();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const pageIndex = searchParams.get("pageIndex");
    setPageIndex(Number(pageIndex) ? Number(pageIndex) : 1);
  }, [searchParams, setPageIndex]);

  const handlePageIndexChange = (action: "increment" | "decrement") => {
    const params = new URLSearchParams(searchParams.toString());

    let newPageIndex = pageIndex;

    if (action === "increment") newPageIndex += 1;
    else if (action === "decrement" && pageIndex > 1) newPageIndex -= 1;
    else return;

    params.set("pageIndex", String(newPageIndex));
    setPageIndex(newPageIndex);
    setSearchParams(params);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-4">
      <button
        className={classnames({
          "cursor-pointer rounded-full border-2 border-orange-300 p-1.5 hover:bg-orange-500": true,
          "disabled:cursor-default disabled:border-gray-300 disabled:hover:bg-transparent": true,
          "dark:hover:bg-orange-700 disabled:dark:border-gray-700": true,
        })}
        onClick={() => handlePageIndexChange("increment")}
        disabled={pageIndex === totalPages}
      >
        <FaArrowRight size={17} />
      </button>

      <button
        className={classnames({
          "cursor-pointer rounded-full border-2 border-orange-300 p-1.5 hover:bg-orange-500": true,
          "disabled:cursor-default disabled:border-gray-300 disabled:hover:bg-transparent": true,
          "dark:hover:bg-orange-700 disabled:dark:border-gray-700": true,
        })}
        onClick={() => handlePageIndexChange("decrement")}
        disabled={pageIndex === 1}
      >
        <FaArrowLeft size={17} />
      </button>
    </div>
  );
};
