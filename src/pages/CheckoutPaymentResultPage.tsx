import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import classnames from "classnames";

import { Stepper } from "../components/checkout/Stepper";
import { useCartStore } from "../store/cartStore";
import useMetadata from "../hooks/useMetadata";

const CheckoutPaymentResultPage = () => {
  useMetadata("پایان سفارش");
  const location = useLocation();
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const state = location.state as { success: boolean; orderId: number; message: string } | null;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
    if (state?.success) {
      clearCart();
    }
  }, [state, navigate, clearCart]);

  if (!state) return null;

  if (!state.success) {
    return (
      <>
        <Stepper currentStep={2} isSuccess={false} />

        <p className="mt-16 rounded border border-rose-300 bg-rose-500/25 p-4 text-justify md:text-center">
          {state.message}
        </p>
      </>
    );
  }

  return (
    <>
      <Stepper currentStep={2} isSuccess={true} />

      <p className="mt-16 rounded border border-teal-300 bg-teal-500/25 p-4 text-center">
        <span>{state.message}</span>
      </p>

      <div className="mt-4 flex items-center justify-center">
        <Link
          to={`/user/orders/${state.orderId}`}
          className={classnames({
            "col-span-2 flex items-center justify-center gap-1.5 rounded bg-gradient-to-r from-green-600": true,
            "cursor-pointer to-blue-600 p-2 text-white transition hover:from-blue-600 hover:to-green-600": true,
            "disabled:cursor-default disabled:hover:from-green-600 disabled:hover:to-blue-600": true,
          })}
        >
          <FaEye size={17} />
          <span>مشاهده سفارش</span>
        </Link>
      </div>
    </>
  );
};

export default CheckoutPaymentResultPage;
