import { useQuery } from "@tanstack/react-query";
import { OrderForUserPanelResponse } from "../../../../types/orderTypes";
import { fetchOrdersByUserIdApi } from "../../../../api/ordersApi";

const useFetchOrdersByUserIdQuery = () => {
  return useQuery<OrderForUserPanelResponse[]>({
    queryKey: ["fetchOrdersByUserId"],
    queryFn: fetchOrdersByUserIdApi,
  });
};

export default useFetchOrdersByUserIdQuery;
