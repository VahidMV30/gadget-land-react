import { Link } from "react-router-dom";

import { useCartStore } from "../../../store/cartStore";
import { CartProductResponse } from "../../../types/productTypes";
import { IMAGE_URL } from "../../../constants";
import { parsePriceToString } from "../../../utils/formatPrice";

export const OrderSummary = ({ products }: { products: CartProductResponse[] }) => {
  const { items: cartItems, getQuantityByProductId } = useCartStore();

  return (
    <div className="overflow-x-auto rounded border border-gray-300 p-4 dark:border-gray-700">
      <table className="w-full min-w-[700px] table-fixed text-right">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            <th className="w-72 p-4 font-medium">نام محصول</th>
            <th className="w-20 p-4 font-medium">عکس</th>
            <th className="w-32 p-4 font-medium">قیمت (تومان)</th>
            <th className="w-32 p-4 font-medium">تعداد</th>
            <th className="w-40 p-4 font-medium">قیمت کل (تومان)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
          {products.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100 dark:hover:bg-gray-900">
              <td className="truncate px-4 py-2">
                <Link to={`/products/${item.slug}`} className="text-sky-500">
                  {item.name}
                </Link>
              </td>
              <td className="px-4 py-2">
                <img
                  src={`${IMAGE_URL}/products/${item.image}`}
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
              </td>
              <td className="truncate px-4 py-2">
                {item.discountPrice ? (
                  <div>
                    <div className="text-red-500 line-through">{item.stringPrice}</div>
                    <div className="text-green-500">{item.stringDiscountPrice}</div>
                  </div>
                ) : (
                  <div>{item.stringPrice}</div>
                )}
              </td>

              <td className="truncate px-4 py-2">{getQuantityByProductId(item.id) ?? 0}</td>

              <td className="truncate px-4 py-2">
                {(() => {
                  const cartItem = cartItems.find((x) => x.productId === item.id);
                  const totalPrice = item.discountPrice
                    ? cartItem && cartItem.quantity * item.discountPrice
                    : cartItem && cartItem.quantity * item.price;

                  return parsePriceToString(totalPrice!);
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
