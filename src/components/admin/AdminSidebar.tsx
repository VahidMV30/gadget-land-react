import classnames from "classnames";
import { FaPallet } from "react-icons/fa";
import { FaComments, FaTags } from "react-icons/fa6";
import { LuFactory } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

import { useAuthStore } from "../../store/useAuthStore";
import { useGlobalStore } from "../../store/useGlobalStore";
import { Divider } from "../Divider";
import { SidebarLogoutButton } from "../SidebarLogoutButton";
import { AdminSidebarMenuItem } from "./AdminSidebarMenuItem";

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
          "z-50 p-4 transition-[right] lg:h-fit dark:bg-gray-950": true,
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
            <AdminSidebarMenuItem href="/admin/brands" icon={LuFactory} title="برند ها" />
          </li>
          <li>
            <AdminSidebarMenuItem href="/admin/products" icon={FaPallet} title="محصولات" />
          </li>
          <li>
            <AdminSidebarMenuItem href="/admin/reviews" icon={FaComments} title="دیدگاه ها" />
          </li>
          <li>
            <SidebarLogoutButton />
          </li>
        </ul>
      </div>
    </>
  );
};
