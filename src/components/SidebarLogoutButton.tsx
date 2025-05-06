import classnames from "classnames";
import { LuLogOut } from "react-icons/lu";

import useLogoutMutation from "../hooks/reactQuery/auth/mutations/useLogoutMutation";

export const SidebarLogoutButton = () => {
  const { mutate } = useLogoutMutation();

  return (
    <button
      className={classnames({
        "flex w-full items-center gap-2 rounded border-r-6 bg-gray-100 p-2 dark:bg-gray-800": true,
        "border-gray-300 hover:border-sky-500 hover:bg-sky-500/25 dark:border-gray-700": true,
        "duration-100 hover:cursor-pointer": true,
      })}
      onClick={() => mutate()}
    >
      <LuLogOut size={20} />
      <span>خروج</span>
    </button>
  );
};
