import { useQuery } from "@tanstack/react-query";

import { fetchAllReviewsApi } from "../../../../api/reviewsApi";
import { ReviewResponse } from "../../../../types/reviewTypes";

const useFetchAllReviewsQuery = () => {
  const fetchAllReviews = useQuery<ReviewResponse[]>({
    queryKey: ["fetchAllReviews"],
    queryFn: fetchAllReviewsApi,
  });

  return fetchAllReviews;
};

export default useFetchAllReviewsQuery;
