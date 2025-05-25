import axios from "axios";
import classnames from "classnames";
import React, { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { LuImagePlus, LuTrash } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { Divider } from "../../../components/Divider";
import { Spinner } from "../../../components/Spinner";
import { IMAGE_URL } from "../../../constants";
import useModifyProductImagesMutation from "../../../hooks/reactQuery/products/mutations/useModifyProductImagesMutation";
import useFetchProductWithImagesByIdQuery from "../../../hooks/reactQuery/products/queries/useFetchProductWithImagesByIdQuery";
import useMetadata from "../../../hooks/useMetadata";

const ModifyProductImagesPage = () => {
  useMetadata("گالری تصاویر");

  const { id } = useParams();
  const parsedId = Number(id);
  const productId = id && parsedId && !isNaN(parsedId) ? parsedId : 0;

  const { data, isLoading, isError, error } = useFetchProductWithImagesByIdQuery(productId);
  const { mutate, isPending } = useModifyProductImagesMutation();

  const [newImages, setNewImages] = useState<{ file: File; previewUrl: string }[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddNewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    const file = files[0];
    const previewUrl = URL.createObjectURL(file);

    setNewImages((prev) => [...prev, { file, previewUrl }]);

    e.target.value = "";
  };

  const handleRemoveNewImage = (indexToRemove: number) => {
    setNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleRemoveExistingImage = (image: string) => {
    setRemovedImages((prev) => [...prev, image]);
  };

  const handleModifyProductImages = () => {
    const formData = new FormData();
    formData.append("id", productId.toString());

    removedImages.forEach((image) => {
      formData.append("imagesToRemove", image);
    });

    newImages.forEach((image) => {
      formData.append("newImages", image.file);
    });

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
    <>
      <h4 className="rounded bg-gray-200 p-4 text-center dark:bg-gray-800">گالری تصاویر محصول : {data?.name}</h4>

      <Divider />

      <button
        className={classnames({
          "flex cursor-pointer items-center gap-1.5 rounded border border-pink-300": true,
          "bg-pink-500/25 p-2 hover:bg-pink-500/30 dark:border-pink-700": true,
          "disabled:cursor-default disabled:bg-pink-500/25": true,
        })}
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
      >
        <LuImagePlus size={17} />
        <span>انتخاب عکس جدید</span>
      </button>

      <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleAddNewImage} />

      <Divider />

      {data?.images.length === 0 && newImages.length === 0 ? (
        <p className="flex animate-pulse items-center justify-center text-yellow-500 dark:text-yellow-300">
          عکسی برای محصول مورد نظر یافت نشد!
        </p>
      ) : (
        <div className="grid grid-cols-12 gap-4">
          {data?.images
            .filter((image) => !removedImages.includes(image))
            .map((image) => (
              <div
                key={image}
                className="relative col-span-4 rounded bg-gray-100 p-2 md:col-span-3 xl:col-span-2 dark:bg-gray-900"
              >
                <img src={`${IMAGE_URL}/productImages/${image}`} alt={data.name} />
                <button
                  className={classnames({
                    "absolute top-2 right-2 cursor-pointer text-rose-500 hover:text-yellow-500": true,
                    "disabled:cursor-default disabled:hover:text-rose-500 dark:hover:text-yellow-300": true,
                  })}
                  onClick={() => handleRemoveExistingImage(image)}
                  disabled={isPending}
                >
                  <LuTrash size={17} />
                </button>
              </div>
            ))}

          {newImages.map((newImage, index) => (
            <div
              key={index}
              className="relative col-span-4 rounded bg-gray-100 p-2 md:col-span-3 xl:col-span-2 dark:bg-gray-900"
            >
              <img src={newImage.previewUrl} />
              <button
                className={classnames({
                  "absolute top-2 right-2 cursor-pointer text-rose-500 hover:text-yellow-500": true,
                  "disabled:cursor-default disabled:hover:text-rose-500 dark:hover:text-yellow-300": true,
                })}
                onClick={() => handleRemoveNewImage(index)}
                disabled={isPending}
              >
                <LuTrash size={17} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Divider />

      <button
        className={classnames({
          "flex items-center justify-center gap-1.5 rounded border border-sky-300": true,
          "bg-sky-500/25 p-2 hover:cursor-pointer hover:bg-sky-500/30 dark:border-sky-700": true,
          "disabled:cursor-default disabled:hover:bg-sky-500/25": true,
        })}
        onClick={handleModifyProductImages}
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Spinner size={17} />
            <span>در حال پردازش</span>
          </>
        ) : (
          <>
            <FaCheck size={17} />
            <span>ذخیره تغییرات</span>
          </>
        )}
      </button>
    </>
  );
};

export default ModifyProductImagesPage;
