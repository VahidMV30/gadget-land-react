import { useQuery } from "@tanstack/react-query";

import { fetchReviewDetailsByIdApi } from "../../../../api/reviewsApi";
import { ReviewDetailsResponse } from "../../../../types/reviewTypes";

const useFetchReviewDetailsByIdQuery = (id: number) => {
  const fetchReviewDetailsById = useQuery<ReviewDetailsResponse>({
    queryKey: ["fetchReviewDetailsById", id],
    queryFn: () => fetchReviewDetailsByIdApi(id),
  });

  return fetchReviewDetailsById;
};

export default useFetchReviewDetailsByIdQuery;
