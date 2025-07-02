import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

import useFetchVerifyPaymentQuery from "../hooks/reactQuery/payments/queries/useFetchVerifyPaymentQuery";
import { Spinner } from "../components/Spinner";
import { useEffect } from "react";

const CheckoutVerifyPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("Status");
  const authority = searchParams.get("Authority");
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useFetchVerifyPaymentQuery({
    status: status || "",
    authority: authority || "",
  });

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/checkout/payment-result", {
        state: { success: true, orderId: data.orderId, message: data.message },
      });
    }

    if (isError && axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors?.[0]?.description;
      navigate("/checkout/payment-result", {
        state: { success: false, message: errorMessage },
      });
    }
  }, [data, error, isError, isSuccess, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size={25} />
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  return null;
};

export default CheckoutVerifyPaymentPage;
