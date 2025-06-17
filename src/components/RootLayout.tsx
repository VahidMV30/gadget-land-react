import { Outlet } from "react-router-dom";

import { RootHeader } from "./RootHeader";

export const RootLayout = () => {
  return (
    <>
      <RootHeader />

      <main className="container mx-auto my-4 mt-20 max-w-[1280px] px-4 xl:px-0">
        <Outlet />
      </main>
    </>
  );
};
