import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { IMAGE_URL } from "../../constants";
import useFetchAllCategoriesQuery from "../../hooks/reactQuery/categories/queries/useFetchAllCategoriesQuery";
import { Spinner } from "../Spinner";

export const CategoriesSwiper = () => {
  const { data, isLoading, isError, error } = useFetchAllCategoriesQuery();

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
    <Swiper spaceBetween={10} slidesPerView={5}>
      {data?.map((category) => (
        <SwiperSlide key={category.slug}>
          <Link
            to={`/products?categorySlug=${category.slug}`}
            className="group mb-4 flex items-center justify-center rounded-xl bg-gray-100 p-4 shadow-gray-300 hover:shadow-lg md:mb-6 dark:bg-gray-800 dark:shadow-gray-700"
          >
            <img
              src={`${IMAGE_URL}/categories/${category.image}`}
              className="w-24 transition duration-200 group-hover:scale-110"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
