import { FaStar, FaStarHalfStroke, FaRegStar } from "react-icons/fa6";

export const ProductRating = ({ rating }: { rating: number }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={15} className="text-yellow-500 dark:text-yellow-300" />);
    } else if (rating >= i - 0.5) {
      stars.push(<FaStarHalfStroke key={i} size={15} className="text-yellow-500 dark:text-yellow-300" />);
    } else {
      stars.push(<FaRegStar key={i} size={15} className="text-yellow-500 dark:text-yellow-300" />);
    }
  }

  return <div className="flex flex-row-reverse gap-0.5">{stars}</div>;
};
