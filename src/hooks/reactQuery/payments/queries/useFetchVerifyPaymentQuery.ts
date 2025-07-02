import { useQuery } from "@tanstack/react-query";

import { fetchVerifyPaymentApi } from "../../../../api/paymentsApi";
import { VerifyPaymentRequest, VerifyPaymentResponse } from "../../../../types/paymentTypes";

const useFetchVerifyPaymentQuery = (data: VerifyPaymentRequest) => {
  const fetchVerifyPayment = useQuery<VerifyPaymentResponse>({
    queryKey: ["fetchVerifyPayment", data.authority],
    queryFn: () => fetchVerifyPaymentApi(data),
    enabled: !!data.status || !!data.authority,
    retry: false,
  });

  return fetchVerifyPayment;
};

export default useFetchVerifyPaymentQuery;
