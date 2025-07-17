import axios from "axios";
import useFetchAdminDashboardWidgetsQuery from "../../../hooks/reactQuery/reports/queries/useFetchAdminDashboardWidgetsQuery";

export const AdminWidgets = () => {
  const { data, isLoading, isError, error } = useFetchAdminDashboardWidgetsQuery();

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
        <span>تعداد محصولات</span>
        <span>{data?.productsCount}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-green-500 p-2 text-center text-white">
        <span>تعداد کاربران</span>
        <span>{data?.usersCount}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-yellow-500 p-2 text-center text-white">
        <span>تعداد سفارشات</span>
        <span>{data?.ordersCount}</span>
      </div>

      <div className="flex flex-col gap-2 rounded-lg bg-purple-500 p-2 text-center text-white">
        <span>مجموع فروش کل</span>
        <span>T {data?.totalSales}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-blue-500 p-2 text-center text-white">
        <span>فروش این ماه</span>
        <span>T {data?.currentMonthSales}</span>
      </div>
      <div className="flex flex-col gap-2 rounded-lg bg-slate-500 p-2 text-center text-white">
        <span>فروش امروز</span>
        <span>T {data?.todaySales}</span>
      </div>
    </div>
  );
};
