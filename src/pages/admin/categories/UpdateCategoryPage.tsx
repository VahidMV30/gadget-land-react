import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaPenClip } from "react-icons/fa6";
import { LuImagePlus, LuTrash } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { FormErrorMessage } from "../../../components/FormErrorMessage";
import { Spinner } from "../../../components/Spinner";
import { IMAGE_URL } from "../../../constants";
import useUpdateCategoryMutation from "../../../hooks/reactQuery/categories/mutations/useUpdateCategoryMutation";
import useFetchCategoryByIdQuery from "../../../hooks/reactQuery/categories/queries/useFetchCategoryByIdQuery";
import { updateCategorySchema } from "../../../schemas/categorySchemas";
import { UpdateCategoryRequest } from "../../../types/categoryTypes";
import slugify from "../../../utils/slugify";
import useMetadata from "../../../hooks/useMetadata";

const UpdateCategoryPage = () => {
  useMetadata("ویرایش دسته بندی");

  const { id } = useParams();
  const parsedId = Number(id);
  const categoryId = id && parsedId && !isNaN(parsedId) ? parsedId : 0;

  const { data, isLoading, isError, error } = useFetchCategoryByIdQuery(categoryId);
  const { mutate, isPending } = useUpdateCategoryMutation();

  const [image, setImage] = useState<{ file: File | null; previewUrl: string | null }>({
    file: null,
    previewUrl: null,
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UpdateCategoryRequest>({ resolver: zodResolver(updateCategorySchema) });

  useEffect(() => {
    if (data) {
      setValue("id", data.id);
      setValue("name", data.name);
      setValue("slug", data.slug);
      if (data.image) setImage({ file: null, previewUrl: data.image });
    }
  }, [data, setValue]);

  const nameValue = watch("name");
  const hasTyped = useRef(false);

  useEffect(() => {
    if (nameValue?.trim()) {
      hasTyped.current = true;
      const slug = slugify(nameValue);
      setValue("slug", slug, { shouldValidate: true, shouldTouch: true });
    } else {
      setValue("slug", "", {
        shouldValidate: hasTyped.current,
        shouldTouch: hasTyped.current,
      });
    }
  }, [nameValue, setValue]);

  useEffect(() => {
    return () => {
      if (image.previewUrl) {
        URL.revokeObjectURL(image.previewUrl);
      }
    };
  }, [image.previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImage({ file, previewUrl });

    if (e.target) {
      e.target.value = "";
    }
  };

  const onSubmit = (data: UpdateCategoryRequest) => {
    const formData = new FormData();

    formData.append("id", data.id.toString());
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    if (image.file) formData.append("image", image.file);

    mutate(formData);
  };

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
    <div className="grid grid-cols-12 gap-8">
      <div className="order-2 col-span-12 md:order-1 md:col-span-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label>نام دسته بندی</label>
              <input
                type="text"
                {...register("name")}
                className={classnames(
                  "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.name,
                  },
                )}
                disabled={isPending}
              />
            </div>
            <FormErrorMessage error={errors.name} className="text-[13px]" />
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label>اسلاگ</label>
              <input
                type="text"
                {...register("slug")}
                className={classnames(
                  "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.slug,
                  },
                )}
                disabled={true}
              />
            </div>
            <FormErrorMessage error={errors.slug} className="text-[13px]" />
          </div>

          <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageChange} />

          <button
            className={classnames({
              "mt-2 flex items-center justify-center gap-1.5 rounded border border-sky-300": true,
              "bg-sky-500/25 p-2 hover:cursor-pointer hover:bg-sky-500/30 dark:border-sky-700": true,
              "disabled:cursor-default disabled:hover:bg-sky-500/25": true,
            })}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner size={17} />
                <span>در حال پردازش</span>
              </>
            ) : (
              <>
                <FaPenClip size={17} />
                <span>ویرایش دسته بندی</span>
              </>
            )}
          </button>
        </form>
      </div>

      <div className="order-1 col-span-12 flex items-center justify-center md:order-2 md:col-span-6">
        {image.previewUrl ? (
          <div className="relative w-60">
            <img src={image.file ? image.previewUrl : `${IMAGE_URL}/categories/${data?.image}`} />
            <button
              className={classnames("absolute top-1 right-1 cursor-pointer text-rose-500", {
                "!cursor-default": isPending,
              })}
              onClick={() => setImage({ file: null, previewUrl: null })}
              disabled={isPending}
            >
              <LuTrash size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <button
              className="flex h-60 w-60 cursor-pointer flex-col items-center justify-center gap-2 rounded bg-gray-100 dark:bg-gray-800"
              onClick={() => fileInputRef.current?.click()}
            >
              <LuImagePlus size={40} className="animate-bounce" />
              <p>انتخاب عکس</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCategoryPage;
