import { Link, useParams } from "react-router-dom";
import useFetchOrderWithItemsByIdQuery from "../../../hooks/reactQuery/orders/queries/useFetchOrderWithItemsByIdQuery";
import useMetadata from "../../../hooks/useMetadata";
import { Spinner } from "../../../components/Spinner";
import axios from "axios";
import { OrderStatus } from "../../../types/orderTypes";

const UserOrderDetailsPage = () => {
  useMetadata("جزئیات سفارش");
  const { id } = useParams();
  const parsedId = Number(id);
  const orderId = id && parsedId && !isNaN(parsedId) ? parsedId : 0;

  const { data, isLoading, isError, error } = useFetchOrderWithItemsByIdQuery(orderId);

  if (isLoading) {
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
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between rounded-lg bg-slate-200 p-4 dark:bg-slate-800">
        <div>
          <span>کد سفارش : </span>
          <span>{data?.order.id}</span>
        </div>
        <div>
          <span>وضعیت : </span>
          {data?.order.orderStatus === OrderStatus.Pending ? (
            <span className="rounded-tr-xl rounded-bl-xl bg-pink-500/50 p-1.5 text-sm text-pink-800 dark:bg-pink-500/25 dark:text-pink-300">
              در انتظار بررسی
            </span>
          ) : data?.order.orderStatus === OrderStatus.Processing ? (
            <span className="rounded-tr-xl rounded-bl-xl bg-cyan-500/50 p-1.5 text-sm text-cyan-800 dark:bg-cyan-500/25 dark:text-cyan-300">
              در حال پردازش
            </span>
          ) : (
            <span className="rounded-tr-xl rounded-bl-xl bg-lime-500/50 p-1.5 text-sm text-lime-800 dark:bg-lime-500/25 dark:text-lime-300">
              ارسال شد
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-200 p-4 dark:bg-slate-800">
        <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
          <p>نام و نام خانوادگی : {data?.user.fullName}</p>
          <p>ایمیل : {data?.user.email}</p>
          <p>موبایل : {data?.user.mobile}</p>
        </div>
        <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
          <p>استان : {data?.user.province}</p>
          <p>شهر : {data?.user.city}</p>
          <p>کد پستی : {data?.user.postalCode}</p>
        </div>
        <p className="col-span-2 text-justify">آدرس : {data?.user.address}</p>
      </div>

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

export default UserOrderDetailsPage;
