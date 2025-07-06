import { FaRegCopyright } from "react-icons/fa";
import { Outlet } from "react-router-dom";

import { RootHeader } from "./RootHeader";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <RootHeader />

      <main className="container mx-auto my-4 mt-20 max-w-[1280px] flex-1 px-4 xl:px-0">
        <Outlet />
      </main>

      <footer className="container mx-auto max-w-[1280px] text-center text-gray-500 dark:text-gray-400">
        <div className="mx-4 flex items-center justify-center gap-1 border-t border-gray-300 py-4 xl:mx-0 dark:border-gray-700">
          <FaRegCopyright size={15} className="mb-0.5" />
          <span>2025 گجت لند. تمامی حقوق محفوظ است.</span>
        </div>
      </footer>
    </div>
  );
};
