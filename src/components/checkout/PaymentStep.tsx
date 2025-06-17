import axios from "axios";
import classnames from "classnames";
import { useMemo } from "react";
import { FaCircleArrowRight, FaCreditCard } from "react-icons/fa6";

import useFetchCartProductsByIdsQuery from "../../hooks/reactQuery/products/queries/useFetchCartProductsByIdsQuery";
import useFetchSettingsQuery from "../../hooks/reactQuery/settings/queries/useFetchSettingsQuery";
import useFetchUserAddressInfoQuery from "../../hooks/reactQuery/users/queries/useFetchUserAddressInfoQuery";
import { useCartStore } from "../../store/cartStore";
import { Spinner } from "../Spinner";
import { AddressSummary } from "./payment-step/AddressSummary";
import { OrderSummary } from "./payment-step/OrderSummary";
import { PaymentSummary } from "./payment-step/PaymentSummary";

export const PaymentStep = ({ onBack }: { onBack: () => void }) => {
  const { items: cartItems } = useCartStore();
  const ids = useMemo(() => cartItems.map((item) => item.productId), [cartItems]);
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
    error: productsError,
  } = useFetchCartProductsByIdsQuery(ids);
  const {
    data: settings,
    isLoading: isSettingsLoading,
    isError: isSettingsError,
    error: settingsError,
  } = useFetchSettingsQuery();
  const {
    data: address,
    isLoading: isAddressLoading,
    isError: isAddressError,
    error: addressError,
  } = useFetchUserAddressInfoQuery();

  if (isProductsLoading || isSettingsLoading || isAddressLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size={25} />
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  if (isProductsError) {
    if (axios.isAxiosError(productsError)) {
      const errorMessage = productsError.response?.data.errors[0]?.description;
      return <p className="text-center text-rose-500">{errorMessage}</p>;
    }
  }

  if (isSettingsError) {
    if (axios.isAxiosError(settingsError)) {
      const errorMessage = settingsError.response?.data.errors[0]?.description;
      return <p className="text-center text-rose-500">{errorMessage}</p>;
    }
  }

  if (isAddressError) {
    if (axios.isAxiosError(addressError)) {
      const errorMessage = addressError.response?.data.errors[0]?.description;
      return <p className="text-center text-rose-500">{errorMessage}</p>;
    }
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="order-1 col-span-12 lg:order-2 lg:col-span-3">
        <PaymentSummary products={products!} settings={settings!} />
      </div>

      <div className="order-1 col-span-12 rounded border border-gray-300 lg:order-1 lg:col-span-9 dark:border-gray-700">
        <div>
          <AddressSummary address={address!} />
        </div>
      </div>

      <div className="order-3 col-span-12">
        <OrderSummary products={products!} />
      </div>

      <div className="order-4 col-span-12 flex items-center justify-between">
        <button
          type="button"
          className={classnames({
            "mt-2 flex items-center justify-center gap-1.5 rounded-tr-2xl rounded-br-2xl text-white": true,
            "bg-blue-600 p-2 hover:cursor-pointer hover:bg-blue-500 disabled:cursor-default": true,
          })}
          onClick={onBack}
        >
          <FaCircleArrowRight size={17} className="mt-0.5" />
          <span>مرحله قبل</span>
        </button>

        <button
          type="button"
          className={classnames({
            "mt-2 flex items-center justify-center gap-1.5 rounded-tl-2xl rounded-bl-2xl text-white": true,
            "bg-blue-600 p-2 hover:cursor-pointer hover:bg-blue-500 disabled:cursor-default": true,
          })}
        >
          <span>پرداخت</span>
          <FaCreditCard size={17} className="mt-0.5" />
        </button>
      </div>
    </div>
  );
};
