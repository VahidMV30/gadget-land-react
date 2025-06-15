import axios from "axios";
import classnames from "classnames";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { LuTableProperties, LuTrash2 } from "react-icons/lu";
import { useNavigate, useParams } from "react-router-dom";

import { Divider } from "../../../components/Divider";
import { ProductRating } from "../../../components/product-details/ProductRating";
import { Spinner } from "../../../components/Spinner";
import useDeleteReviewMutation from "../../../hooks/reactQuery/reviews/mutations/useDeleteReviewMutation";
import useToggleConformationStatusMutation from "../../../hooks/reactQuery/reviews/mutations/useToggleConformationStatusMutation";
import useFetchReviewDetailsByIdQuery from "../../../hooks/reactQuery/reviews/queries/useFetchReviewDetailsByIdQuery";
import useMetadata from "../../../hooks/useMetadata";

const ReviewDetailsPage = () => {
  useMetadata("جزئیات دیدگاه");

  const { id } = useParams();
  const parsedId = Number(id);
  const reviewId = id && parsedId && !isNaN(parsedId) ? parsedId : 0;

  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useFetchReviewDetailsByIdQuery(reviewId);
  const { mutate, isPending } = useToggleConformationStatusMutation();
  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteReviewMutation();

  const handleToggleConformationStatus = () => {
    mutate({ id: reviewId });
  };

  const handleDeleteReview = () => {
    deleteMutate({ id: reviewId });
  };

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
    <div>
      <div className="grid grid-cols-12 gap-4">
        <p className="col-span-12 md:col-span-6">ارسال کننده : {data?.userFullName}</p>
        <p className="col-span-12 md:col-span-6">محصول : {data?.productName}</p>
        <div className="col-span-12 flex items-center gap-1 md:col-span-6">
          <span>امتیاز : </span>
          <ProductRating rating={data.rating} />
        </div>
        <p className="col-span-12 md:col-span-6">تاریخ ارسال : {data?.createdAt}</p>
      </div>

      <Divider />

      <div className="rounded bg-gray-200 p-4 dark:bg-gray-800">
        <span className="mb-2 inline-block">متن دیدگاه :</span>
        <p className="text-justify">{data?.comment}</p>
      </div>

      <div className="mt-4 flex items-center gap-2">
        {!data.isConfirmed ? (
          <button
            className={classnames({
              "mt-2 flex items-center justify-center gap-1.5 rounded border border-teal-300": true,
              "bg-teal-500/25 p-2 hover:cursor-pointer hover:bg-teal-500/30 dark:border-teal-700": true,
              "disabled:cursor-default disabled:hover:bg-teal-500/25": true,
            })}
            onClick={handleToggleConformationStatus}
            disabled={isPending || isDeletePending}
          >
            {isPending ? (
              <>
                <Spinner size={17} />
                <span>در حال پردازش</span>
              </>
            ) : (
              <>
                <FaCheck size={17} />
                <span>تائید</span>
              </>
            )}
          </button>
        ) : (
          <button
            className={classnames({
              "mt-2 flex items-center justify-center gap-1.5 rounded border border-yellow-300": true,
              "bg-yellow-500/25 p-2 hover:cursor-pointer hover:bg-yellow-500/30 dark:border-yellow-700": true,
              "disabled:cursor-default disabled:hover:bg-yellow-500/25": true,
            })}
            onClick={handleToggleConformationStatus}
            disabled={isPending || isDeletePending}
          >
            {isPending ? (
              <>
                <Spinner size={17} />
                <span>در حال پردازش</span>
              </>
            ) : (
              <>
                <FaXmark size={17} />
                <span>عدم تائید</span>
              </>
            )}
          </button>
        )}

        <button
          className={classnames({
            "mt-2 flex items-center justify-center gap-1.5 rounded border border-rose-300": true,
            "bg-rose-500/25 p-2 hover:cursor-pointer hover:bg-rose-500/30 dark:border-rose-700": true,
            "disabled:cursor-default disabled:hover:bg-rose-500/25": true,
          })}
          onClick={handleDeleteReview}
          disabled={isPending || isDeletePending}
        >
          {isDeletePending ? (
            <>
              <Spinner size={17} />
              <span>در حال پردازش</span>
            </>
          ) : (
            <>
              <LuTrash2 size={17} />
              <span>حذف</span>
            </>
          )}
        </button>

        <button
          className={classnames({
            "mt-2 flex items-center justify-center gap-1.5 rounded border border-cyan-300": true,
            "bg-cyan-500/25 p-2 hover:cursor-pointer hover:bg-cyan-500/30 dark:border-cyan-700": true,
            "disabled:cursor-default disabled:hover:bg-cyan-500/25": true,
          })}
          onClick={() => navigate("/admin/reviews")}
          disabled={isPending || isDeletePending}
        >
          <LuTableProperties size={17} />
          <span>دیدگاه ها</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewDetailsPage;
