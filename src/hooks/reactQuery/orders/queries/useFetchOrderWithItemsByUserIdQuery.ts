import { useQuery } from "@tanstack/react-query";
import { OrderWithItemsResponse } from "../../../../types/orderTypes";
import { fetchOrderWithItemsByUserIdApi } from "../../../../api/ordersApi";

const useFetchOrderWithItemsByUserIdQuery = () => {
  return useQuery<OrderWithItemsResponse>({
    queryKey: ["fetchOrderWithItemsByUserId"],
    queryFn: fetchOrderWithItemsByUserIdApi,
    retry: false,
  });
};

export default useFetchOrderWithItemsByUserIdQuery;
