import { FaComment } from "react-icons/fa6";

import { ProductRating } from "./ProductRating";
import { ProductDetailsReviewResponse } from "../../types/productTypes";

export const ProductReviews = ({ review }: { review: ProductDetailsReviewResponse }) => {
  return (
    <div className="rounded bg-slate-200/75 p-2 dark:bg-slate-800/75">
      <div className="flex items-center gap-2">
        <div className="rounded-full border-2 border-gray-300 p-2 text-cyan-500 dark:border-gray-700">
          <FaComment size={20} />
        </div>

        <div className="flex flex-col">
          <p className="text-[12.5px]">توسط : {review.fullName}</p>
          <p className="text-[12.5px]">مورخ : {review.createdAt}</p>
        </div>

        <div className="mr-auto">
          <ProductRating rating={review.rating} />
        </div>
      </div>

      <div className="my-2 border-b border-gray-300 dark:border-gray-700" />

      <p className="text-justify text-[14px]">{review.comment}</p>
    </div>
  );
};
