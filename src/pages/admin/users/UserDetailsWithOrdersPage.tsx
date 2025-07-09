import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaUser, FaCartShopping } from "react-icons/fa6";

import useFetchUserDetailsWithOrdersQuery from "../../../hooks/reactQuery/users/queries/useFetchUserDetailsWithOrdersQuery";
import { Spinner } from "../../../components/Spinner";
import { OrderStatus } from "../../../types/orderTypes";
import useMetadata from "../../../hooks/useMetadata";
import { FaEye } from "react-icons/fa";

const UserDetailsWithOrdersPage = () => {
  useMetadata("جزئیات کاربر");
  const { id } = useParams();
  const parsedId = Number(id);
  const userId = id && parsedId && !isNaN(parsedId) ? parsedId : 0;
  const { data, isLoading, isError, error } = useFetchUserDetailsWithOrdersQuery(userId);

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
        <p className="flex items-center gap-1.5 rounded-tl rounded-tr bg-gray-100 p-4 dark:bg-gray-800">
          <FaCartShopping size={17} />
          <span className="mt-0.5">سفارشات</span>
        </p>

        <div className="overflow-x-auto p-4 text-sm">
          <table className="w-full border-collapse overflow-hidden rounded-lg">
            <thead className="bg-gray-100 text-right dark:bg-gray-800">
              <tr>
                <th className="p-3">#</th>
                <th className="p-3">وضعیت</th>
                <th className="p-3">تخفیف</th>
                <th className="truncate p-3">هزینه ارسال</th>
                <th className="truncate p-3">جمع کل</th>
                <th className="truncate p-3">با تخفیف</th>
                <th className="truncate p-3">شماره پیگیری</th>
                <th className="truncate p-3">تاریخ سفارش</th>
                <th className="truncate p-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {data && data?.orders.length > 0 ? (
                data.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-300 last:border-none hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
                  >
                    <td className="p-3">{order.id}</td>
                    {order.orderStatus === OrderStatus.Pending ? (
                      <td className="truncate p-3 text-rose-500">در حال بررسی</td>
                    ) : order.orderStatus === OrderStatus.Processing ? (
                      <td className="truncate p-3 text-sky-500">در حال پردازش</td>
                    ) : (
                      <td className="truncate p-3 text-green-500">ارسال شد</td>
                    )}

                    <td className="p-3">{order.discountAmount}</td>
                    <td className="p-3">{order.shippingCost}</td>
                    <td className="p-3">{order.subtotalAmount}</td>
                    <td className="p-3">{order.totalPayableAmount}</td>
                    <td className="p-3">{order.refId}</td>
                    <td className="truncate p-3">{order.orderDate}</td>
                    <td className="p-3">
                      <Link to={`/admin/orders/${order.id}`}>
                        <FaEye size={17} className="text-sky-500" />
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
      </div>
    </div>
  );
};

export default UserDetailsWithOrdersPage;
