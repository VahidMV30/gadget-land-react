import axios from "axios";
import { Link, useParams } from "react-router-dom";

import { Divider } from "../components/Divider";
import { AddToCartButton } from "../components/ProductDetails/AddToCartButton";
import { ProductImages } from "../components/ProductDetails/ProductImages";
import { ProductRating } from "../components/ProductDetails/ProductRating";
import { ProductReviews } from "../components/ProductDetails/ProductReviews";
import { ReviewForm } from "../components/ProductDetails/ReviewForm";
import { Spinner } from "../components/Spinner";
import useFetchProductDetailsBySlugQuery from "../hooks/reactQuery/products/queries/useFetchProductDetailsBySlugQuery";
import useMetadata from "../hooks/useMetadata";

const ProductDetailsPage = () => {
  useMetadata("جزئیات محصول");
  const { slug } = useParams();
  const { data, isLoading, isError, error } = useFetchProductDetailsBySlugQuery(slug! || "");

  if (isLoading || !data) {
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
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 h-fit bg-gray-100 p-4 shadow shadow-gray-300 lg:col-span-5 dark:bg-gray-900 dark:shadow-gray-700">
        <div className="relative">
          <ProductImages productName={data.name} images={[data.image, ...data.productImages]} />
          {data.discountPrice && (
            <div className="absolute top-0 flex w-full items-center justify-between">
              <p className="text-rose-500">🔥 فروش ویژه</p>
              <div className="rounded-full bg-rose-500 px-1.5 py-0.5 font-semibold text-white">
                {data.discountPercent}%
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="col-span-12 h-fit lg:col-span-7">
        <div className="flex items-center gap-1.5 truncate">
          <Link to="/" className="text-sky-500">
            گجت لند
          </Link>
          <span>/</span>
          <Link to="/products" className="text-sky-500">
            محصولات
          </Link>
          <span>/</span>
          <p className="truncate">{data.name}</p>
        </div>

        <Divider />

        <div className="flex flex-col items-start gap-6">
          <Link to={`/products?categorySlug=${data.categorySlug}`} className="text-cyan-500">
            ({data.categoryName})
          </Link>

          <div className="flex items-center gap-2">
            <h1>{data.name}</h1>
            <span>
              <Link to={`/products?brandSlug=${data.brandSlug}`} className="text-cyan-500">
                ({data.brandName})
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ProductRating rating={data.averageRating} />
            <span className="text-[13.5px]">(از {data.totalReviewsCount} دیدگاه)</span>
          </div>

          <div>
            {data.discountPrice ? (
              <div className="flex items-center gap-10">
                <p className="font-semibold text-rose-500 line-through">{data.price} تومان</p>
                <p className="text-green-500">{data.discountPrice} تومان</p>
              </div>
            ) : (
              <p className="font-semibold text-green-500">{data.price} تومان</p>
            )}
          </div>

          <div>
            {data.quantityInStock === 0 ? (
              <div>
                <div className="flex items-center gap-1">
                  <span>😔</span>
                  <span className="mb-1">اتمام موجودی</span>
                </div>
              </div>
            ) : data.quantityInStock > 3 ? (
              <div className="flex items-center gap-1">
                <span>🟢</span>
                <span className="mb-1.5">موجود در انبار</span>
              </div>
            ) : (
              <div className="flex animate-pulse items-center gap-1">
                <span>🔴</span>
                <span className="mb-1 font-semibold text-rose-500">{data.quantityInStock} عدد موجود در انبار</span>
              </div>
            )}
          </div>

          <AddToCartButton data={data} />

          <div className="flex flex-col gap-2">
            <h4>توضیحات :</h4>
            <p className="text-justify">{data.description}</p>
          </div>
        </div>

        <Divider />

        <ReviewForm productId={data.id} />

        {data.reviews.length > 0 ? (
          <div className="flex flex-col gap-4">
            {data.reviews.map((review, index) => (
              <ProductReviews key={index} review={review} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center rounded border border-gray-300 p-2 dark:border-gray-700">
            دیدگاهی برای این محصول ارسال نشده است. 😊
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
