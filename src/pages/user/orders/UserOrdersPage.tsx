import axios from "axios";
import { Spinner } from "../../../components/Spinner";
import useFetchOrdersByUserIdQuery from "../../../hooks/reactQuery/orders/queries/useFetchOrdersByUserIdQuery";
import useMetadata from "../../../hooks/useMetadata";
import { Link } from "react-router-dom";
import { FaCartShopping, FaEye } from "react-icons/fa6";
import { Divider } from "../../../components/Divider";
import { OrderStatus } from "../../../types/orderTypes";

const UserOrdersPage = () => {
  useMetadata("سفارشات من");
  const { data, isLoading, isError, error } = useFetchOrdersByUserIdQuery();

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
    <>
      <h4 className="flex items-center justify-center gap-1.5 rounded bg-gray-200 p-4 dark:bg-gray-800">
        <FaCartShopping size={17} />
        <span>سفارشات من</span>
      </h4>

      <Divider className="mb-0" />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse overflow-hidden">
          <thead className="border-b border-gray-300 text-right dark:border-gray-700">
            <tr>
              <th className="p-3">#</th>
              <th className="truncate p-3">تخفیف</th>
              <th className="truncate p-3">هزینه ارسال</th>
              <th className="truncate p-3">جمع کل</th>
              <th className="truncate p-3">با تخفیف</th>
              <th className="truncate p-3">شماره پیگیری</th>
              <th className="truncate p-3">تاریخ سفارش</th>
              <th className="truncate p-3">وضعیت سفارش</th>
              <th className="truncate p-3">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((order) => (
                <tr
                  key={order.id}
                  className="odd:bg-gray-100/50 hover:bg-gray-200/50 odd:dark:bg-gray-800/50 dark:hover:bg-gray-700/50"
                >
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.discountAmount}</td>
                  <td className="p-3">{order.shippingCost}</td>
                  <td className="p-3">{order.subtotalAmount}</td>
                  <td className="truncate p-3">{order.totalPayableAmount}</td>
                  <td className="truncate p-3">{order.refId}</td>
                  <td className="truncate p-3">{order.orderDate}</td>
                  {order.orderStatus === OrderStatus.Pending ? (
                    <td className="truncate p-3 text-sm font-semibold text-rose-500">در انتظار بررسی</td>
                  ) : order.orderStatus === OrderStatus.Processing ? (
                    <td className="truncate p-3 text-sm font-semibold text-sky-500">در حال پردازش</td>
                  ) : (
                    <td className="truncate p-3 text-sm font-semibold text-green-500">ارسال شد</td>
                  )}
                  <td className="truncate p-3">
                    <Link to={`/user/orders/${order.id}`} className="text-sky-500">
                      <FaEye size={17} />
                    </Link>
                  </td>
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
    </>
  );
};

export default UserOrdersPage;
