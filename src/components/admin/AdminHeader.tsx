import { Link } from "react-router-dom";

import logo from "../../assets/vite.svg";
import { ThemeSwitcher } from "../ThemeSwitcher";
import { AuthButton } from "../AuthButton";

export const AdminHeader = () => {
  return (
    <header className="mx-4 h-16 xl:mx-0">
      <div className="container mx-auto flex h-full max-w-[1280px] items-center justify-between border-b border-gray-300 dark:border-gray-700">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="گجت لند" className="h-9 w-9" />
          <h1 className="mt-1 font-semibold">گجت لند</h1>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
