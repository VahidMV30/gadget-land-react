import classnames from "classnames";
import toast from "react-hot-toast";
import { FaCartPlus, FaXmark, FaBasketShopping } from "react-icons/fa6";

import { useCartStore } from "../../store/useCartStore";
import { ProductDetailsResponse } from "../../types/productTypes";

interface Props {
  data: ProductDetailsResponse;
}

export const AddToCartButton = ({ data }: Props) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItem = useCartStore((state) => state.items.find((item) => item.productId === data?.id));

  const handleAddToCart = () => {
    if (cartItem?.productId == data.id) return;

    addToCart(data.id, 1);
    toast.success("محصول به سبد خرید اضافه شد.");
  };

  if (cartItem?.productId === data.id) {
    return (
      <button className="rounded border border-green-300 p-2">
        <div className="flex items-center gap-1.5">
          <FaBasketShopping size={17} />
          <span>تو سبد خریدته</span>
        </div>
      </button>
    );
  }

  return (
    <button
      className={classnames({
        "cursor-pointer rounded border border-yellow-300 p-2 hover:bg-yellow-500/25": true,
        "disabled:cursor-default disabled:hover:bg-transparent": true,
      })}
      onClick={handleAddToCart}
      disabled={data.quantityInStock === 0}
    >
      {data.quantityInStock === 0 ? (
        <div className="flex items-center gap-1.5">
          <FaXmark size={17} className="text-rose-500" />
          <span>اتمام موجودی</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <FaCartPlus size={17} />
          <span>افزودن به سبد خرید</span>
        </div>
      )}
    </button>
  );
};
