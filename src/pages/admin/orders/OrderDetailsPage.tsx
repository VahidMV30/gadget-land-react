import axios from "axios";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";

import { Divider } from "../../../components/Divider";
import { Spinner } from "../../../components/Spinner";
import useFetchOrderWithItemsAndUserByIdQuery from "../../../hooks/reactQuery/orders/queries/useFetchOrderWithItemsAndUserByIdQuery";
import { OrderStatus } from "../../../types/orderTypes";
import { OrderStatusSelector } from "../../../components/admin/order/OrderStatusSelector";
import useMetadata from "../../../hooks/useMetadata";

const OrderDetailsPage = () => {
  useMetadata("جزئیات سفارش");
  const { id } = useParams();
  const parsedId = Number(id);
  const orderId = id && parsedId && !isNaN(parsedId) ? parsedId : 0;

  const { data, isLoading, isError, error } = useFetchOrderWithItemsAndUserByIdQuery(orderId);

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
      <div className="rounded border border-gray-300 dark:border-gray-700">
        <p className="flex items-center gap-1.5 rounded-tl rounded-tr bg-gray-100 p-4 dark:bg-gray-800">
          <FaUser size={17} />
          <span className="mt-0.5">اطلاعات کاربر</span>
        </p>

        <div className="flex flex-col gap-2 p-4">
          <p>کد کاربر : {data?.user.id}</p>
          <p>نام و نام خانوادگی : {data?.user.fullName}</p>
          <p>ایمیل : {data?.user.email}</p>
          <p>موبایل : {data?.user.mobile}</p>
          <p>استان : {data?.user.province}</p>
          <p>شهر : {data?.user.city}</p>
          <p>کد پستی : {data?.user.postalCode}</p>
          <p>تاریخ ثبت نام : {data?.user.registerDate}</p>
          <p className="text-justify">آدرس : {data?.user.address}</p>
        </div>
      </div>

      <div className="rounded border border-gray-300 dark:border-gray-700">
        <div className="flex items-center justify-between rounded-tl rounded-tr bg-gray-100 px-4 py-2.5 dark:bg-gray-800">
          <div className="flex items-center gap-1.5">
            <FaCartShopping size={17} />
            <span className="mt-0.5">اطلاعات سفارش</span>
          </div>
          {data && <OrderStatusSelector orderId={data.order.id} currentStatus={data.order.orderStatus} />}
        </div>

        <div className="grid grid-cols-2 p-4">
          <div className="col-span-2 mb-2 flex flex-col gap-2 md:col-span-1 md:mb-0">
            <p>کد سفارش : {data?.order.id}</p>
            <p>
              <span>وضعیت سفارش : </span>
              {data?.order.orderStatus === OrderStatus.Pending ? (
                <span className="rounded-full border bg-rose-500/25 p-2 text-sm font-semibold text-rose-500">
                  ⏳ در حال بررسی
                </span>
              ) : data?.order.orderStatus === OrderStatus.Processing ? (
                <span className="rounded-full border bg-sky-500/25 p-2 text-sm font-semibold text-sky-500">
                  ⚙️ در حال پردازش
                </span>
              ) : (
                <span className="rounded-full border bg-green-500/25 p-2 text-sm font-semibold text-green-500">
                  🚚 ارسال شد
                </span>
              )}
            </p>
            <p>تخفیف : {data?.order.discountAmount}</p>
            <p>هزینه ارسال : {data?.order.shippingCost}</p>
          </div>

          <div className="col-span-2 flex flex-col gap-2 md:col-span-1">
            <p>جمع کل : {data?.order.subtotalAmount}</p>
            <p>با تخفیف : {data?.order.totalPayableAmount}</p>
            <p>شماره پیگیری : {data?.order.refId}</p>
            <p>تاریخ سفارش : {data?.order.orderDate}</p>
          </div>
        </div>

        <Divider className="mx-4 mt-0" />

        <div className="m-4 overflow-x-auto text-sm">
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
              {data?.orderItems && data?.orderItems.length > 0 ? (
                data.orderItems.map((orderItem) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="p-3 pb-0 text-center text-yellow-500 dark:text-yellow-300">
                    سفارشی یافت نشد!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
