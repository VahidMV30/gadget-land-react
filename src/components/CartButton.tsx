import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import classnames from "classnames";

import { useCartStore } from "../store/cartStore";

export const CartButton = () => {
  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  return (
    <Link
      to="/cart"
      className={classnames({
        "relative flex cursor-pointer justify-end rounded border border-gray-300 p-1.5 dark:border-gray-700": true,
        "w-14": totalQuantity > 0,
      })}
    >
      <LuShoppingCart size={17} />
      {totalQuantity > 0 && (
        <p className="absolute top-[5px] right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pt-0.5 text-[13px] font-semibold text-white">
          {totalQuantity}
        </p>
      )}
    </Link>
  );
};
