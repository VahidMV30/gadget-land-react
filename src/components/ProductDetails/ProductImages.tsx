import { useEffect, useState } from "react";
import classnames from "classnames";

import { IMAGE_URL } from "../../constants";

const productImageUrl = `${IMAGE_URL}/products`;
const productImagesUrl = `${IMAGE_URL}/productImages`;

export const ProductImages = ({ images, productName }: { images: string[]; productName: string }) => {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div>
      <div className="flex items-center justify-center">
        {selectedImage && (
          <img
            src={
              selectedImage === images[0]
                ? `${productImageUrl}/${selectedImage}`
                : `${productImagesUrl}/${selectedImage}`
            }
            alt={productName}
            className="h-[19rem] w-[19rem]"
          />
        )}
      </div>
      <div className="flex flex-row-reverse items-center justify-center gap-2">
        {images.map((image) => (
          <button
            key={image}
            className={classnames({
              "mt-4 cursor-pointer rounded-xl border-2 border-gray-300 p-1 hover:border-cyan-300 dark:border-gray-700":
                true,
              "border-green-300 dark:border-green-300": image === selectedImage,
            })}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image === images[0] ? `${productImageUrl}/${image}` : `${productImagesUrl}/${image}`}
              alt={productName}
              className="h-16 w-16"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
