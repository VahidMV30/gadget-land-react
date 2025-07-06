import classnames from "classnames";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

import banner from "../assets/images/banner.png";
import zarinpal from "../assets/images/zarinpal.png";
import { Divider } from "../components/Divider";
import { BrandsSwiper } from "../components/home/BrandsSwiper";
import { CategoriesSwiper } from "../components/home/CategoriesSwiper";
import { DiscountedProductsSwiper } from "../components/home/DiscountedProductsSwiper";
import { LatestProductsSwiper } from "../components/home/LatestProductsSwiper";
import { MostSellingProductsSwiper } from "../components/home/MostSellingProductsSwiper";
import useMetadata from "../hooks/useMetadata";

const HomePage = () => {
  useMetadata("صفحه اصلی");

  return (
    <div>
      <div className="rounded-3xl bg-slate-100 p-4 dark:bg-slate-800">
        <div className="grid grid-cols-12">
          <div className="col-span-8 flex flex-col justify-center gap-2">
            <h1 className="text-2xl font-bold">گجت لند</h1>
            <p className="text-sm md:text-base">مرکز تخصصی لوازم جانبی 🧐</p>
            <p className="text-sm md:text-base">
              بهترین لوازم جانبی موبایل، لپ‌تاپ و گیمینگ با قیمت عالی و ارسال سریع!
            </p>
            <p className="hidden text-sm md:block md:text-base">✅ کیفیت بالا</p>
            <p className="hidden text-sm md:block md:text-base">✅ تنوع بی نظیر</p>
            <p className="hidden text-sm md:block md:text-base">✅ ارسال سریع به سراسر کشور</p>
            <Link
              to="/products"
              className={classnames({
                "mt-2 hidden w-fit items-center gap-4 rounded bg-gradient-to-r from-lime-600": true,
                "to-amber-600 p-2 text-white transition duration-200 hover:from-amber-600": true,
                "hover:to-lime-600 md:flex": true,
              })}
            >
              <span>مشاهده محصولات</span>
              <FaArrowLeft size={17} />
            </Link>
          </div>

          <div className="col-span-4 flex items-center justify-end">
            <img src={banner} alt="گجت لند" className="w-60" />
          </div>
        </div>

        <Link
          to="/products"
          className={classnames({
            "mt-2 flex w-full items-center gap-4 rounded bg-gradient-to-r from-lime-600": true,
            "to-amber-600 p-2 text-white transition duration-200 hover:from-amber-600": true,
            "justify-center hover:to-lime-600 md:hidden": true,
          })}
        >
          <span>مشاهده محصولات</span>
          <FaArrowLeft size={17} />
        </Link>
      </div>

      <Divider className="my-4 md:my-6" />

      <CategoriesSwiper />

      <Divider className="mt-0 mb-4 md:mb-6" />

      <DiscountedProductsSwiper />

      <Divider className="my-4 md:my-6" />

      <MostSellingProductsSwiper />

      <Divider className="my-4 md:my-6" />

      <LatestProductsSwiper />

      <Divider className="my-4 md:my-6" />

      <div className="grid grid-cols-2 rounded bg-gradient-to-b from-slate-900 to-cyan-600 p-4 text-white md:bg-gradient-to-l">
        <p className="col-span-2 text-justify md:col-span-1">
          گجت‌لند یک فروشگاه اینترنتی تخصصی در زمینه فروش لوازم جانبی موبایل، گیمینگ و گجت‌های دیجیتال است. ما تلاش
          می‌کنیم با ارائه محصولاتی باکیفیت، اصل و به‌روز، تجربه‌ای لذت‌بخش و مطمئن از خرید آنلاین را برای مشتریان فراهم
          کنیم. در گجت‌لند می‌توانید انواع هدفون، کابل شارژ، پاوربانک، دسته بازی، لوازم گیمینگ و هزاران محصول کاربردی
          دیگر را با قیمت مناسب تهیه کنید. ارسال سریع، پشتیبانی پاسخ‌گو و تخفیف‌های دوره‌ای از مزایای خرید از گجت‌لند
          است. اگر به دنبال تنوع، کیفیت و قیمت منصفانه هستید، ما اینجاییم! با گجت‌لند، دنیای تکنولوژی همیشه در دسترس
          شماست.
        </p>

        <div className="col-span-2 flex items-center justify-center md:col-span-1 md:justify-end">
          <img src={zarinpal} alt="گجت لند" className="h-36 w-36" />
        </div>
      </div>

      <Divider className="my-4 md:my-6" />

      <BrandsSwiper />
    </div>
  );
};

export default HomePage;
