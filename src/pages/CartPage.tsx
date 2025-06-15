import axios from "axios";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus, FaTrash, FaBagShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

import { Divider } from "../components/Divider";
import { Spinner } from "../components/Spinner";
import { IMAGE_URL } from "../constants";
import useFetchCartProductsByIdsQuery from "../hooks/reactQuery/products/queries/useFetchCartProductsByIdsQuery";
import useMetadata from "../hooks/useMetadata";
import { useCartStore } from "../store/cartStore";
import { parsePriceToString } from "../utils/formatPrice";

const CartPage = () => {
  useMetadata("سبد خرید");
  const {
    items: cartItems,
    getTotalQuantity,
    getQuantityByProductId,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
  } = useCartStore();
  const ids = useMemo(() => cartItems.map((item) => item.productId), [cartItems]);
  const { data, isLoading, isError, error } = useFetchCartProductsByIdsQuery(ids);

  useEffect(() => {
    if (!data) return;

    data.forEach((product) => {
      const quantityInCart = getQuantityByProductId(product.id);

      if (quantityInCart > product.quantityInStock) {
        setQuantity(product.id, product.quantityInStock);

        toast.error(`تعداد محصول «${product.name}» به ${product.quantityInStock} کاهش یافت.`, { duration: 5000 });
      }
    });
  }, [data, getQuantityByProductId, setQuantity]);

  const handleIncreaseQuantity = (productId: number, quantityInStock: number) => {
    const existingQuantity = getQuantityByProductId(productId);
    if (existingQuantity === quantityInStock) return;

    increaseQuantity(productId);
  };

  const totalDiscount = data?.reduce((acc, item) => {
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
    return data?.reduce((acc, item) => {
      const cartItem = cartItems.find((x) => x.productId === item.id);
      if (!cartItem) return acc;

      const unitPrice = item.discountPrice ?? item.price;
      return acc + unitPrice * cartItem.quantity;
    }, 0);
  }, [data, cartItems]);

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size={25} />
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return <p className="text-center text-rose-500">{errorMessage}</p>;
    }
  }

  return (
    <div>
      <h4 className="rounded-xl border border-cyan-500 bg-cyan-500/25 p-4 text-center font-semibold">🛒 سبد خرید</h4>

      <Divider />

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>🤔 سبد خرید شما خالی است !</p>
          <Link to="/products" className="animate-pulse text-sky-500">
            بریم لیست محصولات ؟
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          <div className="order-2 col-span-12 h-fit overflow-x-auto rounded border border-gray-300 lg:order-1 lg:col-span-9 dark:border-gray-700">
            <table className="w-full min-w-[700px] table-fixed text-right">
              <thead className="bg-gray-200 dark:bg-gray-800">
                <tr>
                  <th className="w-72 p-4 font-medium">نام محصول</th>
                  <th className="w-20 p-4 font-medium">عکس</th>
                  <th className="w-32 p-4 font-medium">قیمت (تومان)</th>
                  <th className="w-28 p-4 font-medium">موجودی</th>
                  <th className="w-32 p-4 font-medium">تعداد</th>
                  <th className="w-40 p-4 font-medium">قیمت کل (تومان)</th>
                  <th className="w-28 p-4 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-700">
                {data.map((item) => (
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
                    <td className="truncate px-4 py-2">{item.quantityInStock}</td>

                    <td className="truncate px-4 py-2">
                      <div className="flex items-center">
                        <button
                          className="cursor-pointer rounded bg-green-500 p-1 text-white disabled:cursor-default"
                          disabled={getQuantityByProductId(item.id) === item.quantityInStock}
                          onClick={() => handleIncreaseQuantity(item.id, item.quantityInStock)}
                        >
                          <FaPlus />
                        </button>

                        <span className="w-7 text-center">{getQuantityByProductId(item.id) ?? 0}</span>

                        <button
                          className="cursor-pointer rounded bg-rose-500 p-1 text-white disabled:cursor-default"
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={getQuantityByProductId(item.id) === 1}
                        >
                          <FaMinus />
                        </button>
                      </div>
                    </td>

                    <td className="truncate px-4 py-2">
                      {(() => {
                        const cartItem = cartItems.find((x) => x.productId === item.id);
                        const totalPrice = item.discountPrice
                          ? cartItem && cartItem.quantity * item.discountPrice
                          : cartItem && cartItem.quantity * item.price;

                        return parsePriceToString(totalPrice!);
                      })()}
                    </td>
                    <td className="truncate px-4 py-2">
                      <button className="cursor-pointer text-red-500" onClick={() => deleteItem(item.id)}>
                        <FaTrash size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="order-1 col-span-12 flex h-fit flex-col gap-4 rounded border border-gray-300 p-4 lg:order-2 lg:col-span-3 dark:border-gray-700">
            <p>🔢 تعداد کل محصولات : {getTotalQuantity()}</p>
            <p>💰 تخفیف : {parsePriceToString(totalDiscount!)} تومان</p>
            <p>💵 مبلغ کل : {parsePriceToString(totalPrice!)} تومان</p>

            <div className="border-b border-gray-300 dark:border-gray-700"></div>

            <Link
              to="/checkout"
              className="flex items-center justify-center gap-1.5 rounded border border-teal-300 bg-teal-500/25 p-2 hover:bg-teal-500/30 dark:border-teal-700"
            >
              <FaBagShopping size={17} />
              <span>تکمیل فرآیند خرید</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
