import classnames from "classnames";
import { FaTags } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

import { useAuthStore } from "../../store/useAuthStore";
import { useGlobalStore } from "../../store/useGlobalStore";
import { Divider } from "../Divider";
import { AdminSidebarMenuItem } from "./AdminSidebarMenuItem";
import { SidebarLogoutButton } from "../SidebarLogoutButton";

export const AdminSidebar = () => {
  const { isAdminSidebarOpen, setIsAdminSidebarOpen } = useGlobalStore();
  const { user } = useAuthStore();

  return (
    <>
      <div
        className={classnames("fixed inset-0 bg-gray-500/50 lg:hidden", {
          hidden: !isAdminSidebarOpen,
        })}
        onClick={() => setIsAdminSidebarOpen(!isAdminSidebarOpen)}
      />
      <div
        className={classnames({
          "fixed inset-0 -right-72 col-span-0 w-72 rounded-tl-xl rounded-bl-xl bg-white duration-200": true,
          "border-gray-300 lg:static lg:col-span-3 lg:w-full lg:rounded lg:border dark:border-gray-700": true,
          "p-4 transition-[right] dark:bg-gray-950": true,
          "right-0": isAdminSidebarOpen,
        })}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full border-2 border-gray-300 p-2 dark:border-gray-700">
            <RiAdminLine size={25} />
          </div>
          <div className="flex flex-col gap-0.5 text-sm">
            <p>{user?.fullName}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <Divider />

        <ul className="flex flex-col gap-2">
          <li>
            <AdminSidebarMenuItem href="/admin/dashboard" icon={MdSpaceDashboard} title="داشبورد" />
          </li>
          <li>
            <AdminSidebarMenuItem href="/admin/categories" icon={FaTags} title="دسته بندی ها" />
          </li>
          <li>
            <SidebarLogoutButton />
          </li>
        </ul>
      </div>
    </>
  );
};
