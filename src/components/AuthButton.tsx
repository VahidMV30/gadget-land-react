import { LuLogIn, LuUser } from "react-icons/lu";
import { Link } from "react-router-dom";

import { ADMIN_ROLE } from "../constants";
import { useAuthStore } from "../store/useAuthStore";
import { Spinner } from "./Spinner";

export const AuthButton = () => {
  const { user, isAuthenticated, isFetchingUserProfile } = useAuthStore();

  if (!isAuthenticated && isFetchingUserProfile) {
    return (
      <button className="cursor-pointer rounded border border-gray-300 p-1.5 dark:border-gray-700">
        <Spinner />
      </button>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Link
          to={user?.role === ADMIN_ROLE ? "/admin/dashboard" : "/dashboard"}
          className="cursor-pointer rounded border border-gray-300 p-1.5 dark:border-gray-700"
        >
          <LuUser size={17} />
        </Link>
      ) : (
        <Link to="/auth/login" className="cursor-pointer rounded border border-gray-300 p-1.5 dark:border-gray-700">
          <LuLogIn size={17} />
        </Link>
      )}
    </>
  );
};
