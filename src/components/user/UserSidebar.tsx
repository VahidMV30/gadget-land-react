import classnames from "classnames";
import { FaCartShopping, FaUserGear } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";
import { MdSpaceDashboard } from "react-icons/md";

import { useAuthStore } from "../../store/authStore";
import { useGlobalStore } from "../../store/globalStore";
import { Divider } from "../Divider";
import { SidebarLogoutButton } from "../SidebarLogoutButton";
import { SidebarMenuItem } from "../SidebarMenuItem";

export const UserSidebar = () => {
  const { isUserSidebarOpen, setIsUserSidebarOpen } = useGlobalStore();
  const { user } = useAuthStore();

  return (
    <>
      <div
        className={classnames("fixed inset-0 bg-gray-500/50 lg:hidden", {
          hidden: !isUserSidebarOpen,
        })}
        onClick={() => setIsUserSidebarOpen(!isUserSidebarOpen)}
      />
      <div
        className={classnames({
          "fixed inset-0 -right-72 col-span-0 w-72 rounded-tl-xl rounded-bl-xl bg-white duration-200": true,
          "border-gray-300 lg:static lg:col-span-3 lg:w-full lg:rounded lg:border dark:border-gray-700": true,
          "z-50 p-4 transition-[right] lg:h-fit dark:bg-gray-950": true,
          "right-0": isUserSidebarOpen,
        })}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full border-2 border-gray-300 p-2 dark:border-gray-700">
            <LuUser size={25} />
          </div>
          <div className="flex flex-col gap-0.5 text-sm">
            <p>{user?.fullName}</p>
            <p>{user?.email}</p>
          </div>
        </div>

        <Divider />

        <ul className="flex flex-col gap-2">
          <li>
            <SidebarMenuItem href="/user/dashboard" icon={MdSpaceDashboard} title="داشبورد" />
          </li>
          <li>
            <SidebarMenuItem href="/user/details" icon={FaUserGear} title="اطلاعات کاربری" />
          </li>
          <li>
            <SidebarMenuItem href="/user/orders" icon={FaCartShopping} title="سفارشات" />
          </li>
          <li>
            <SidebarLogoutButton />
          </li>
        </ul>
      </div>
    </>
  );
};
