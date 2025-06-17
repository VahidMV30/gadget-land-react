import { useMemo } from "react";
import { FaCreditCard } from "react-icons/fa6";

import { useCartStore } from "../../../store/cartStore";
import { CartProductResponse } from "../../../types/productTypes";
import { SettingsResponse } from "../../../types/settingTypes";
import { parsePriceToString } from "../../../utils/formatPrice";
import { Divider } from "../../Divider";

interface Props {
  products: CartProductResponse[];
  settings: SettingsResponse;
}

export const PaymentSummary = ({ products, settings }: Props) => {
  const { items: cartItems, getTotalQuantity } = useCartStore();

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

      const unitPrice = item.discountPrice ?? item.price;
      return acc + unitPrice * cartItem.quantity;
    }, 0);
  }, [products, cartItems]);

  return (
    <div className="flex flex-col gap-3 rounded bg-gray-100 p-4 dark:bg-gray-800">
      <p>🔢 تعداد کل محصولات : {getTotalQuantity()}</p>
      <p>💰 تخفیف : {parsePriceToString(totalDiscount!)} تومان</p>
      <p>🚚 هزینه ارسال : {parsePriceToString(settings.shippingCost)} تومان</p>
      <p>💵 مبلغ کل : {parsePriceToString(totalPrice! + settings.shippingCost)} تومان</p>

      <Divider />

      <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded bg-green-600 p-2 text-white hover:bg-green-500">
        <FaCreditCard size={17} />
        <span>پرداخت</span>
      </button>
    </div>
  );
};
