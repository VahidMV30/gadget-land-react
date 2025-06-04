import { useQuery } from "@tanstack/react-query";

import { fetchHasUserReviewedApi } from "../../../../api/reviewsApi";
import { useAuthStore } from "../../../../store/useAuthStore";

const useFetchHasUserReviewedQuery = (productId: number) => {
  const { isAuthenticated } = useAuthStore();

  const fetchHasUserReviewed = useQuery<boolean>({
    queryKey: ["fetchHasUserReviewed", productId],
    queryFn: () => fetchHasUserReviewedApi(productId),
    enabled: isAuthenticated,
  });

  return fetchHasUserReviewed;
};

export default useFetchHasUserReviewedQuery;
