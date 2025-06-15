import { zodResolver } from "@hookform/resolvers/zod";
import classnames from "classnames";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { LuImagePlus, LuTrash } from "react-icons/lu";

import { Divider } from "../../../components/Divider";
import { FormErrorMessage } from "../../../components/FormErrorMessage";
import { SearchableSelect } from "../../../components/SearchableSelect";
import { Spinner } from "../../../components/Spinner";
import useFetchAllBrandsQuery from "../../../hooks/reactQuery/brands/queries/useFetchAllBrandsQuery";
import useFetchAllCategoriesQuery from "../../../hooks/reactQuery/categories/queries/useFetchAllCategoriesQuery";
import useCreateProductMutation from "../../../hooks/reactQuery/products/mutations/useCreateProductMutation";
import useMetadata from "../../../hooks/useMetadata";
import { createProductSchema } from "../../../schemas/productSchemas";
import { CreateProductRequest } from "../../../types/productTypes";
import formatPrice from "../../../utils/formatPrice";
import slugify from "../../../utils/slugify";

const CreateProductPage = () => {
  useMetadata("ایجاد محصول");

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
    error: categoriesError,
  } = useFetchAllCategoriesQuery();

  const {
    data: brandsData,
    isLoading: isLoadingBrands,
    isError: isBrandsError,
    error: brandsError,
  } = useFetchAllBrandsQuery();

  const { mutate, isPending } = useCreateProductMutation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);

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
  } = useForm<CreateProductRequest>({ resolver: zodResolver(createProductSchema) });

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

  const onSubmit = (data: CreateProductRequest) => {
    if (!selectedCategory) return toast.error("انتخاب دسته بندی الزامی است.");
    if (!selectedBrand) return toast.error("انتخاب برند الزامی است.");

    if (!image.file) return toast.error("انتخاب عکس محصول الزامی است.");

    const formData = new FormData();
    formData.append("categoryId", selectedCategory.toString());
    formData.append("brandId", selectedBrand.toString());
    formData.append("name", data.name);
    formData.append("slug", data.slug);
    formData.append("image", image.file);
    formData.append("price", data.price);
    formData.append("discountPrice", data.discountPrice ? data.discountPrice : "");
    formData.append("quantityInStock", data.quantityInStock);
    formData.append("description", data.description);

    mutate(formData);
  };

  return (
    <>
      {image.previewUrl ? (
        <div className="flex items-center justify-center">
          <div className="relative w-60">
            <img src={image.previewUrl} />
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

      <Divider />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 flex flex-col gap-1 md:col-span-6">
            <div className="flex flex-col gap-1">
              <label>دسته بندی</label>
              <SearchableSelect
                title="انتخاب دسته بندی"
                data={categoriesData!}
                isLoading={isLoadingCategories}
                isError={isCategoriesError}
                error={categoriesError}
                disabled={isPending}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>

          <div className="col-span-12 flex flex-col gap-1 md:col-span-6">
            <div className="flex flex-col gap-1">
              <label>برند</label>
              <SearchableSelect
                title="انتخاب برند"
                data={brandsData!}
                isLoading={isLoadingBrands}
                isError={isBrandsError}
                error={brandsError}
                disabled={isPending}
                onSelect={setSelectedBrand}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 flex flex-col gap-1 md:col-span-6">
            <div className="flex flex-col gap-1">
              <label>نام محصول</label>
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

          <div className="col-span-12 flex flex-col gap-1 md:col-span-6">
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
        </div>

        <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageChange} />

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 flex flex-col gap-1 md:col-span-4">
            <div className="flex flex-col gap-1">
              <label>قیمت</label>
              <input
                type="text"
                {...register("price", {
                  onChange: (e) => {
                    const formatted = formatPrice(e.target.value);
                    setValue("price", formatted);
                  },
                })}
                className={classnames(
                  "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.price,
                  },
                )}
                disabled={isPending}
              />
            </div>
            <FormErrorMessage error={errors.price} className="text-[13px]" />
          </div>

          <div className="col-span-12 flex flex-col gap-1 md:col-span-4">
            <div className="flex flex-col gap-1">
              <label>تخفیف</label>
              <input
                type="text"
                {...register("discountPrice", {
                  onChange: (e) => {
                    const formatted = formatPrice(e.target.value);
                    setValue("discountPrice", formatted);
                  },
                })}
                className={classnames(
                  "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.discountPrice,
                  },
                )}
                disabled={isPending}
              />
            </div>
            <FormErrorMessage error={errors.discountPrice} className="text-[13px]" />
          </div>

          <div className="col-span-12 flex flex-col gap-1 md:col-span-4">
            <div className="flex flex-col gap-1">
              <label>موجودی انبار</label>
              <input
                type="text"
                {...register("quantityInStock", {
                  onChange: (e) => {
                    let val = e.target.value.replace(/\D/g, "");
                    if (val.length > 1 && val.startsWith("0")) val = "0";
                    setValue("quantityInStock", val);
                  },
                })}
                className={classnames(
                  "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                  {
                    "border-rose-500 ring-rose-500 dark:border-rose-500": errors.quantityInStock,
                  },
                )}
                disabled={isPending}
              />
            </div>
            <FormErrorMessage error={errors.quantityInStock} className="text-[13px]" />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1">
            <label>توضیحات</label>
            <textarea
              {...register("description")}
              className={classnames(
                "rounded border border-gray-300 p-2 focus:ring-2 focus:outline-none dark:border-gray-700",
                {
                  "border-rose-500 ring-rose-500 dark:border-rose-500": errors.description,
                },
              )}
              disabled={isPending}
            ></textarea>
          </div>
          <FormErrorMessage error={errors.description} className="text-[13px]" />
        </div>

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
              <FaPlus size={17} />
              <span>ایجاد محصول</span>
            </>
          )}
        </button>
      </form>
    </>
  );
};

export default CreateProductPage;
