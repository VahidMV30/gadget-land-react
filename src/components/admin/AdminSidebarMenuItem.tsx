import classnames from "classnames";
import { IconType } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useGlobalStore } from "../../store/useGlobalStore";

interface Props {
  href: string;
  icon: IconType;
  title: string;
}

export const AdminSidebarMenuItem = ({ href, icon, title }: Props) => {
  const { setIsAdminSidebarOpen } = useGlobalStore();

  const location = useLocation();
  const navigate = useNavigate();
  const Icon = icon;

  const handleMenuItemClick = (href: string) => {
    setIsAdminSidebarOpen(false);
    navigate(href);
  };

  return (
    <button
      className={classnames({
        "flex w-full items-center gap-2 rounded border-r-6 bg-gray-100 p-2 dark:bg-gray-800": true,
        "border-gray-300 hover:cursor-pointer hover:border-sky-500 hover:bg-sky-500/25 dark:border-gray-700": true,
        "border-teal-500 bg-teal-500/25 dark:border-teal-500 dark:bg-teal-500/25": location.pathname.startsWith(href),
      })}
      onClick={() => handleMenuItemClick(href)}
    >
      <Icon size={20} />
      <span>{title}</span>
    </button>
  );
};
