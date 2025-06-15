import { Link } from "react-router-dom";
import { IMAGE_URL } from "../../constants";
import { ProductsWithFiltersResponse } from "../../types/productTypes";

interface Props {
  product: ProductsWithFiltersResponse;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group col-span-6 rounded-xl border border-gray-300 md:col-span-4 xl:col-span-3 dark:border-gray-700"
    >
      <div className="relative m-2 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900">
        <img
          src={`${IMAGE_URL}/products/${product.image}`}
          alt={product.name}
          className="h-32 w-32 duration-200 group-hover:scale-110 md:h-40 md:w-40 lg:h-48 lg:w-48"
        />
        {product.discountPercent && (
          <span className="absolute top-2 left-2 w-10 animate-pulse rounded bg-pink-500/50 text-center text-[13.5px] font-semibold text-white">
            {product.discountPercent}%
          </span>
        )}
      </div>

      <p className="truncate p-2 text-[13.5px]">{product.name}</p>

      <div className="p-2 text-[13.5px]">
        {product.discountPrice ? (
          <div className="flex items-center justify-between">
            <div className="text-rose-500 line-through">
              <span className="mr-1">T</span>
              <span>{product.price}</span>
            </div>
            <div className="text-green-500">
              <span className="mr-1">T</span>
              <span>{product.discountPrice}</span>
            </div>
          </div>
        ) : (
          <p className="text-green-500">
            <span className="mr-1">T</span>
            <span>{product.price}</span>
          </p>
        )}
      </div>
    </Link>
  );
};
