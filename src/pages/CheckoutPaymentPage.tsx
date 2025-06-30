import axios from "axios";
import { useMemo } from "react";

import { Spinner } from "../components/Spinner";
import { Stepper } from "../components/checkout/Stepper";
import { AddressSummary } from "../components/checkout/payment/AddressSummary";
import { OrderSummary } from "../components/checkout/payment/OrderSummary";
import { PaymentSummary } from "../components/checkout/payment/PaymentSummary";
import useFetchCartProductsByIdsQuery from "../hooks/reactQuery/products/queries/useFetchCartProductsByIdsQuery";
import useFetchSettingsQuery from "../hooks/reactQuery/settings/queries/useFetchSettingsQuery";
import useFetchUserAddressInfoQuery from "../hooks/reactQuery/users/queries/useFetchUserAddressInfoQuery";
import { useCartStore } from "../store/cartStore";
import useMetadata from "../hooks/useMetadata";

const CheckoutPaymentPage = () => {
  useMetadata("مرور سفارش");
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
    <>
      <Stepper currentStep={1} />

      <div className="mt-16 grid grid-cols-12 gap-4">
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
      </div>
    </>
  );
};

export default CheckoutPaymentPage;
