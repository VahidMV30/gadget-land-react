import { LuMenu } from "react-icons/lu";
import { Link } from "react-router-dom";

import logo from "../../assets/vite.svg";
import { useGlobalStore } from "../../store/globalStore";
import { AuthButton } from "../AuthButton";
import { CartButton } from "../CartButton";
import { ThemeSwitcher } from "../ThemeSwitcher";

export const UserHeader = () => {
  const { setIsUserSidebarOpen } = useGlobalStore();

  return (
    <header className="fixed inset-0 h-16 px-4 backdrop-blur-md xl:px-0">
      <div className="container mx-auto flex h-full max-w-[1280px] items-center justify-between border-b border-gray-300 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="گجت لند" className="h-9 w-9" />
          <h1 className="mt-1 font-semibold">گجت لند</h1>
        </Link>

        <div className="flex items-center gap-2">
          <CartButton />
          <ThemeSwitcher />
          <AuthButton />
          <button
            className="cursor-pointer rounded border border-gray-300 p-1.5 lg:hidden dark:border-gray-700"
            onClick={() => setIsUserSidebarOpen(true)}
          >
            <LuMenu size={17} />
          </button>
        </div>
      </div>
    </header>
  );
};
