import axios from "axios";
import classnames from "classnames";
import { FaEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import useFetchLatestProductsQuery from "../../hooks/reactQuery/products/queries/useFetchLatestProductsQuery";
import { Spinner } from "../Spinner";
import { ProductSwiperCard } from "./ProductSwiperCard";

export const LatestProductsSwiper = () => {
  const { data, isLoading, isError, error } = useFetchLatestProductsQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <Spinner size={25} />
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return <p className="text-center text-rose-500">{errorMessage}</p>;
    }
  }

  return (
    <div className="rounded-xl border border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between rounded-tl-xl rounded-tr-xl bg-gray-100 px-4 py-3 dark:bg-gray-800">
        <h4 className="flex items-center gap-1">
          <span className="mt-1 text-xl">🚀</span>
          <span>جدیدترین ها</span>
        </h4>

        <Link
          to={`/products?onlyDiscounted=true`}
          className={classnames({
            "flex items-center justify-center gap-2 rounded bg-gradient-to-r from-gray-600": true,
            "to-red-600 p-2 text-white transition duration-200 hover:from-red-600": true,
            "hover:to-gray-600": true,
          })}
        >
          <FaEye size={17} />
        </Link>
      </div>

      <div className="p-4">
        <Swiper
          spaceBetween={20}
          modules={[Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            0: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {data?.map((product) => (
            <SwiperSlide key={product.slug}>
              <ProductSwiperCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
