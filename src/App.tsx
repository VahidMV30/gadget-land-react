import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RootHeader } from "./components/RootHeader";
import { RootLayout } from "./components/RootLayout";
import { Spinner } from "./components/Spinner";
import { ADMIN_ROLE, USER_ROLE } from "./constants";
import useFetchUserProfileQuery from "./hooks/reactQuery/auth/queries/useFetchUserProfileQuery";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import CategoriesPage from "./pages/admin/categories/CategoriesPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import HomePage from "./pages/HomePage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import { useAuthStore } from "./store/useAuthStore";

const App = () => {
  useFetchUserProfileQuery();
  const { isAuthenticated, isAuthCheckComplete, isFetchingUserProfile } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("/login") && !location.pathname.includes("/register")) {
      localStorage.removeItem("callbackUrl");
    }
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (!isAuthCheckComplete || isFetchingUserProfile) {
    return (
      <>
        {!isAdminRoute ? (
          <>
            <RootHeader />
            <main className="container mx-auto my-4 max-w-[1280px] px-4 xl:px-0">
              <div className="flex items-center justify-center">
                <Spinner size={25} />
              </div>
            </main>
          </>
        ) : (
          <>
            <AdminLayout />
            <main className="container mx-auto my-4 max-w-[1280px] px-4 xl:px-0">
              <Spinner />
            </main>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<ForbiddenPage />} />
          <Route path="/auth/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" replace />} />
          <Route path="/auth/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLE} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={USER_ROLE} />}>
          <Route element={<RootLayout />}>
            <Route path="/dashboard" element={<UserDashboardPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
