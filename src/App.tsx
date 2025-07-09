import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import { AdminHeader } from "./components/admin/AdminHeader";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RootHeader } from "./components/RootHeader";
import { RootLayout } from "./components/RootLayout";
import { Spinner } from "./components/Spinner";
import { ADMIN_ROLE, USER_ROLE } from "./constants";
import useFetchUserProfileQuery from "./hooks/reactQuery/auth/queries/useFetchUserProfileQuery";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import BrandsPage from "./pages/admin/brands/BrandsPage";
import CreateBrandPage from "./pages/admin/brands/CreateBrandPage";
import UpdateBrandPage from "./pages/admin/brands/UpdateBrandPage";
import CategoriesPage from "./pages/admin/categories/CategoriesPage";
import CreateCategoryPage from "./pages/admin/categories/CreateCategoryPage";
import UpdateCategoryPage from "./pages/admin/categories/UpdateCategoryPage";
import OrderDetailsPage from "./pages/admin/orders/OrderDetailsPage";
import OrdersPage from "./pages/admin/orders/OrdersPage";
import AdminProductsPage from "./pages/admin/products/AdminProductsPage";
import CreateProductPage from "./pages/admin/products/CreateProductPage";
import ModifyProductImagesPage from "./pages/admin/products/ModifyProductImagesPage";
import UpdateProductPage from "./pages/admin/products/UpdateProductPage";
import ReviewDetailsPage from "./pages/admin/reviews/ReviewDetailsPage";
import ReviewsPage from "./pages/admin/reviews/ReviewsPage";
import UserDetailsWithOrdersPage from "./pages/admin/users/UserDetailsWithOrdersPage";
import UsersPage from "./pages/admin/users/UsersPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CartPage from "./pages/CartPage";
import CheckoutAddressPage from "./pages/CheckoutAddressPage";
import CheckoutPaymentPage from "./pages/CheckoutPaymentPage";
import CheckoutPaymentResultPage from "./pages/CheckoutPaymentResultPage";
import CheckoutVerifyPaymentPage from "./pages/CheckoutVerifyPaymentPage";
import ForbiddenPage from "./pages/ForbiddenPage";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ProductsPage from "./pages/ProductsPage";
import UserDashboardPage from "./pages/user/UserDashboardPage";
import { useAuthStore } from "./store/authStore";

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
            <main className="container mx-auto my-4 mt-20 max-w-[1280px] px-4 xl:px-0">
              <div className="flex flex-col items-center justify-center gap-2">
                <Spinner size={25} />
                <span>در حال بارگذاری ...</span>
              </div>
            </main>
          </>
        ) : (
          <>
            <AdminHeader />
            <main className="container mx-auto my-4 mt-20 max-w-[1280px] px-4 xl:px-0">
              <div className="flex flex-col items-center justify-center gap-2">
                <Spinner size={25} />
                <span>در حال بارگذاری ...</span>
              </div>
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
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={ADMIN_ROLE} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
            <Route path="/admin/categories" element={<CategoriesPage />} />
            <Route path="/admin/categories/create" element={<CreateCategoryPage />} />
            <Route path="/admin/categories/update/:id" element={<UpdateCategoryPage />} />
            <Route path="/admin/brands" element={<BrandsPage />} />
            <Route path="/admin/brands/create" element={<CreateBrandPage />} />
            <Route path="/admin/brands/update/:id" element={<UpdateBrandPage />} />
            <Route path="/admin/products" element={<AdminProductsPage />} />
            <Route path="/admin/products/create" element={<CreateProductPage />} />
            <Route path="/admin/products/update/:id" element={<UpdateProductPage />} />
            <Route path="/admin/products/:id/modify-images" element={<ModifyProductImagesPage />} />
            <Route path="/admin/reviews" element={<ReviewsPage />} />
            <Route path="/admin/reviews/:id" element={<ReviewDetailsPage />} />
            <Route path="/admin/users" element={<UsersPage />} />
            <Route path="/admin/users/:id" element={<UserDetailsWithOrdersPage />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/orders/:id" element={<OrderDetailsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={USER_ROLE} />}>
          <Route element={<RootLayout />}>
            <Route path="/dashboard" element={<UserDashboardPage />} />
            <Route path="/checkout/address" element={<CheckoutAddressPage />} />
            <Route path="/checkout/payment" element={<CheckoutPaymentPage />} />
            <Route path="/checkout/verify-payment" element={<CheckoutVerifyPaymentPage />} />
            <Route path="/checkout/payment-result" element={<CheckoutPaymentResultPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
