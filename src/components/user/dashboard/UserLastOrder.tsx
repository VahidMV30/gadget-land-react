import axios from "axios";
import { Link } from "react-router-dom";

import useFetchOrderWithItemsByUserIdQuery from "../../../hooks/reactQuery/orders/queries/useFetchOrderWithItemsByUserIdQuery";
import { Spinner } from "../../Spinner";

export const UserLastOrder = () => {
  const { data, isLoading, isError, error } = useFetchOrderWithItemsByUserIdQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <h4 className="rounded-lg bg-teal-500/25 p-4 text-center">آخرین سفارش من</h4>
        <div className="flex flex-col items-center justify-center gap-2">
          <Spinner size={25} />
          <span>در حال بارگذاری ...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return (
        <div className="flex flex-col gap-4">
          <h4 className="rounded-lg bg-teal-500/25 p-4 text-center">آخرین سفارش من</h4>
          <p className="bg-slate-300 p-2 text-center text-rose-500 dark:bg-slate-700">{errorMessage}</p>
        </div>
      );
    }
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <h4 className="rounded-lg bg-teal-500/25 p-4 text-center">آخرین سفارش من</h4>

      <div className="grid grid-cols-2 rounded-lg bg-slate-200 p-4 dark:bg-slate-800">
        <div className="col-span-2 mb-2 flex flex-col gap-2 md:col-span-1 md:mb-0">
          <p>تخفیف : {data?.order.discountAmount}</p>
          <p>جمع کل : {data?.order.subtotalAmount}</p>
          <p>تاریخ سفارش : {data?.order.orderDate}</p>
        </div>

        <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
          <p>هزینه ارسال : {data?.order.shippingCost}</p>
          <p>با تخفیف : {data?.order.totalPayableAmount}</p>
          <p>شماره پیگیری : {data?.order.refId}</p>
        </div>
      </div>

      <div className="overflow-x-auto text-sm">
        <table className="w-full border-collapse overflow-hidden rounded-lg">
          <thead className="bg-gray-100 text-right dark:bg-gray-800">
            <tr>
              <th className="p-3">نام محصول</th>
              <th className="p-3">تعداد</th>
              <th className="truncate p-3">قیمت</th>
              <th className="truncate p-3">با تخفیف</th>
              <th className="truncate p-3">جمع کل تخفیف</th>
              <th className="truncate p-3">جمع کل</th>
              <th className="truncate p-3">با تخفیف</th>
            </tr>
          </thead>
          <tbody>
            {data?.orderItems.map((orderItem) => (
              <tr
                key={orderItem.id}
                className="border-b border-gray-300 last:border-none hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <td className="truncate p-3">
                  <Link to={`/products/${orderItem.productSlug}`} className="text-sky-500">
                    {orderItem.productName}
                  </Link>
                </td>
                <td className="p-3">{orderItem.quantity}</td>
                <td className="p-3">{orderItem.unitPrice}</td>
                <td className="p-3">{orderItem.unitDiscount}</td>
                <td className="p-3">{orderItem.totalDiscountAmount}</td>
                <td className="truncate p-3">{orderItem.subtotalAmount}</td>
                <td className="truncate p-3">{orderItem.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
