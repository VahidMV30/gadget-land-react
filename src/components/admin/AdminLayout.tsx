import { Outlet } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main className="container mx-auto my-4 max-w-[1280px] px-4 xl:px-0">
        <div className="grid grid-cols-12 gap-4">
          <AdminSidebar />

          <div className="col-span-12 rounded border border-gray-300 p-4 lg:col-span-9 dark:border-gray-700">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};
