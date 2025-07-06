import axios from "axios";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { IMAGE_URL } from "../../constants";
import useFetchAllBrandsQuery from "../../hooks/reactQuery/brands/queries/useFetchAllBrandsQuery";
import { Spinner } from "../Spinner";

export const BrandsSwiper = () => {
  const { data, isLoading, isError, error } = useFetchAllBrandsQuery();

  if (isLoading) {
    return (
      <div className="mb-4 flex flex-col items-center justify-center gap-2 md:mb-6">
        <Spinner size={25} />
        <span>در حال بارگذاری ...</span>
      </div>
    );
  }

  if (isError) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data.errors[0]?.description;
      return <p className="mb-4 text-center text-rose-500 md:mb-6">{errorMessage}</p>;
    }
  }

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={5}
      modules={[Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
    >
      {data?.map((brand) => (
        <SwiperSlide key={brand.slug}>
          <Link
            to={`/products?brand=${brand.slug}`}
            className="group flex items-center justify-center rounded-xl bg-gray-100 shadow-gray-300 hover:shadow-lg md:mb-2 dark:bg-gray-800 dark:shadow-gray-700"
          >
            <img
              src={`${IMAGE_URL}/brands/${brand.image}`}
              className="w-28 transition duration-200 group-hover:scale-110"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
