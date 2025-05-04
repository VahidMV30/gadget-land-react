import { Outlet } from "react-router-dom";

import { AdminHeader } from "./AdminHeader";

export const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main className="container mx-auto my-4 max-w-[1280px] px-4 xl:px-0">
        <Outlet />
      </main>
    </>
  );
};
