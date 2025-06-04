import { zodResolver } from "@hookform/resolvers/zod";
import classnames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaCommentMedical, FaXmark } from "react-icons/fa6";

import { CustomSelect } from "../../components/CustomSelect";
import useFetchHasUserReviewedQuery from "../../hooks/reactQuery/reviews/queries/useFetchHasUserReviewedQuery";
import { createReviewSchema } from "../../schemas/reviewSchemas";
import { useAuthStore } from "../../store/useAuthStore";
import { CreateReviewRequest } from "../../types/reviewTypes";
import { Divider } from "../Divider";
import { FormErrorMessage } from "../FormErrorMessage";
import useCreateReviewMutation from "../../hooks/reactQuery/reviews/mutations/useCreateReviewMutation";
import { Spinner } from "../Spinner";

export const ReviewForm = ({ productId }: { productId: number }) => {
  const { data } = useFetchHasUserReviewedQuery(productId ?? 0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const [selectedRating, setSelectedRating] = useState<{ title: string; value: number } | null>(null);
  const { mutate, isPending } = useCreateReviewMutation(productId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReviewRequest>({ resolver: zodResolver(createReviewSchema) });

  const onSubmit = (data: CreateReviewRequest) => {
    if (!selectedRating) return toast.error("لطفا امتیاز دیدگاه را انتخاب نمایید.");

    mutate({ productId: productId, rating: selectedRating.value, comment: data.comment });
  };

  if (!isAuthenticated) {
    return (
      <p className="mb-4 rounded border border-cyan-300 bg-cyan-500/25 p-2 text-center">
        برای ارسال دیدگاه لطفا وارد شوید. 🤔
      </p>
    );
  }

  if (data === true) {
    return (
      <p className="mb-4 rounded border border-teal-300 bg-teal-500/25 p-2 text-center">
        شما قبلا دیدگاه خود را ارسال کرده اید. (نمایش در صورت تائید) 🙂
      </p>
    );
  }

  return (
    <div className="mb-4">
      {showReviewForm ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <CustomSelect
              items={[
                { title: "0.5 امتیاز 😡", value: 0.5 },
                { title: "1 امتیاز 😠", value: 1 },
                { title: "1.5 امتیاز 😵‍💫", value: 1.5 },
                { title: "2 امتیاز 😵", value: 2 },
                { title: "2.5 امتیاز 🙄", value: 2.5 },
                { title: "3 امتیاز 🙃", value: 3 },
                { title: "3.5 امتیاز 😊", value: 3.5 },
                { title: "4 امتیاز 😁", value: 4 },
                { title: "4.5 امتیاز 🥰", value: 4.5 },
                { title: "5 امتیاز 😍", value: 5 },
              ]}
              selected={selectedRating}
              onSelect={(title: string, value: number) => setSelectedRating({ title, value })}
              disabled={isPending}
            />
            <div>
              <textarea
                rows={4}
                className="w-full rounded border border-gray-300 p-2 outline-none focus:ring-2 dark:border-gray-700"
                {...register("comment")}
                disabled={isPending}
              ></textarea>
              <FormErrorMessage error={errors.comment} className="text-[13px]" />
            </div>

            <div className="flex w-full items-center gap-4">
              <button
                type="submit"
                className={classnames({
                  "flex cursor-pointer items-center gap-1.5 rounded border border-cyan-300": true,
                  "bg-cyan-500/25 p-2 hover:bg-cyan-500/30 dark:border-cyan-700": true,
                  "disabled:cursor-default disabled:hover:bg-cyan-500/25": true,
                })}
                disabled={isPending}
                onClick={() => setShowReviewForm(true)}
              >
                {isPending ? (
                  <>
                    <Spinner size={17} />
                    <span>در حال پردازش</span>
                  </>
                ) : (
                  <>
                    <FaCommentMedical size={17} />
                    <span>ارسال دیدگاه</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className={classnames({
                  "flex cursor-pointer items-center gap-1.5 rounded border border-rose-300": true,
                  "bg-rose-500/25 p-2 hover:bg-rose-500/30 dark:border-rose-700": true,
                  "disabled:cursor-default disabled:hover:bg-rose-500/25": true,
                })}
                disabled={isPending}
                onClick={() => {
                  setShowReviewForm(false);
                  setSelectedRating(null);
                  reset();
                }}
              >
                <FaXmark size={17} />
                <span>انصراف</span>
              </button>
            </div>
          </form>

          <Divider />
        </>
      ) : (
        <button
          className={classnames({
            "flex cursor-pointer items-center gap-1.5 rounded-tr-xl border border-cyan-300": true,
            "rounded-bl-xl bg-cyan-500/25 p-2 hover:bg-cyan-500/30 dark:border-cyan-700": true,
          })}
          onClick={() => setShowReviewForm(true)}
        >
          <FaCommentMedical size={17} />
          <span>ارسال دیدگاه</span>
        </button>
      )}
    </div>
  );
};
