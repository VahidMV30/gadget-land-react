import { useMemo } from "react";
import { FaCreditCard } from "react-icons/fa6";
import classnames from "classnames";

import { useCartStore } from "../../../store/cartStore";
import { CartProductResponse } from "../../../types/productTypes";
import { SettingsResponse } from "../../../types/settingTypes";
import { parsePriceToString } from "../../../utils/formatPrice";
import { Divider } from "../../Divider";
import { Spinner } from "../../Spinner";

interface Props {
  products: CartProductResponse[];
  settings: SettingsResponse;
}

export const PaymentSummary = ({ products, settings }: Props) => {
  const { items: cartItems, getTotalQuantity } = useCartStore();
  const isPending = false;

  const totalDiscount = products?.reduce((acc, item) => {
    const cartItem = cartItems.find((x) => x.productId === item.id);
    if (!cartItem) return acc;

    if (item.discountPrice) {
      const totalOriginal = item.price * cartItem.quantity;
      const totalWithDiscount = item.discountPrice * cartItem.quantity;
      const discount = totalOriginal - totalWithDiscount;

      return acc + discount;
    }

    return acc;
  }, 0);

  const totalPrice = useMemo(() => {
    return products?.reduce((acc, item) => {
      const cartItem = cartItems.find((x) => x.productId === item.id);
      if (!cartItem) return acc;

      return acc + item.price * cartItem.quantity;
    }, 0);
  }, [products, cartItems]);

  const totalPriceWithDiscount = useMemo(() => {
    return products?.reduce((acc, item) => {
      const cartItem = cartItems.find((x) => x.productId === item.id);
      if (!cartItem) return acc;

      const unitPrice = item.discountPrice ?? item.price;
      return acc + unitPrice * cartItem.quantity;
    }, 0);
  }, [products, cartItems]);

  return (
    <div className="bg-gray-100 p-4 dark:bg-gray-800">
      <div className="flex flex-col gap-3 rounded">
        <p>🔢 تعداد کل محصولات : {getTotalQuantity()}</p>
        <p>💰 تخفیف : {parsePriceToString(totalDiscount!)} تومان</p>
        <p>🚚 هزینه ارسال : {parsePriceToString(settings.shippingCost)} تومان</p>
        <p>💵 جمع کل : {parsePriceToString(totalPrice! + settings.shippingCost)} تومان</p>
        <p>💶 با تخفیف : {parsePriceToString(totalPriceWithDiscount! + settings.shippingCost)} تومان</p>
      </div>

      <Divider />

      <button
        type="submit"
        className={classnames({
          "flex w-full items-center justify-center gap-1.5 rounded bg-gradient-to-r from-green-600": true,
          "cursor-pointer to-blue-600 p-2 text-white transition hover:from-blue-600 hover:to-green-600": true,
          "disabled:cursor-default disabled:hover:from-green-600 disabled:hover:to-blue-600": true,
        })}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner size={17} />
            <span>در حال پردازش</span>
          </>
        ) : (
          <>
            <FaCreditCard size={17} />
            <span>پرداخت</span>
          </>
        )}
      </button>
    </div>
  );
};
