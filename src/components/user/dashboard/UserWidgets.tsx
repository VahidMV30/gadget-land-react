import axios from "axios";
import useFetchUserDashboardWidgetsQuery from "../../../hooks/reactQuery/reports/queries/useFetchUserDashboardWidgetsQuery";

export const UserWidgets = () => {
  const { data, isLoading, isError, error } = useFetchUserDashboardWidgetsQuery();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
        <div className="flex flex-col gap-2 rounded-lg bg-rose-500 p-2 text-center text-white">
          <span className="h-6 w-full animate-pulse rounded-lg bg-rose-300"></span>
          <span className="h-6 w-full animate-pulse rounded-lg bg-rose-300"></span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-green-500 p-2 text-center text-white">
          <span className="h-6 w-full animate-pulse rounded-lg bg-green-300"></span>
          <span className="h-6 w-full animate-pulse rounded-lg bg-green-300"></span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-yellow-500 p-2 text-center text-white">
          <span className="h-6 w-full animate-pulse rounded-lg bg-yellow-300"></span>
          <span className="h-6 w-full animate-pulse rounded-lg bg-yellow-300"></span>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-purple-500 p-2 text-center text-white">
          <span className="h-6 w-full animate-pulse rounded-lg bg-purple-300"></span>
          <span className="h-6 w-full animate-pulse rounded-lg bg-purple-300"></span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-blue-500 p-2 text-center text-white">
          <span className="h-6 w-full animate-pulse rounded-lg bg-blue-300"></span>
          <span className="h-6 w-full animate-pulse rounded-lg bg-blue-300"></span>
        </div>
        <div className="flex flex-col gap-2 rounded-lg bg-slate-500 p-2 text-center text-white">
          <span className="h-6 w-full animate-pulse rounded-lg bg-slate-300"></span>
          <span className="h-6 w-full animate-pulse rounded-lg bg-slate-300"></span>
        </div>
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
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <div className="flex flex-col gap-2 rounded-lg bg-rose-500 p-2 text-center text-white">
        <span>تعداد سفارشات</span>
        <span>{data?.totalOrders}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-green-500 p-2 text-center text-white">
        <span>مبلغ کل خرید</span>
        <span>T {data?.totalPurchase}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-yellow-500 p-2 text-center text-white">
        <span>خرید ماه جاری</span>
        <span>T {data?.currentMonthPurchase}</span>
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-purple-500 p-2 text-center text-white">
        <span>در انتظار بررسی</span>
        <span>{data?.pendingOrders}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-blue-500 p-2 text-center text-white">
        <span>در حال پردازش</span>
        <span>{data?.processingOrders}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-slate-500 p-2 text-center text-white">
        <span>ارسال شده</span>
        <span>{data?.shippedOrders}</span>
      </div>
    </div>
  );
};
