import { Outlet } from "react-router-dom";

import { UserHeader } from "./UserHeader";
import { UserSidebar } from "./UserSidebar";

export const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <main className="container mx-auto my-4 mt-20 max-w-[1280px] px-4 xl:px-0">
        <div className="grid grid-cols-12 gap-4">
          <UserSidebar />

          <div className="col-span-12 h-fit rounded border border-gray-300 p-4 lg:col-span-9 dark:border-gray-700">
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default UserLayout;
