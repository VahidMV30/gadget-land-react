import { useQuery } from "@tanstack/react-query";
import { OrderWithItemsForUserPanelResponse } from "../../../../types/orderTypes";
import { fetchOrderWithItemsByIdApi } from "../../../../api/ordersApi";

const useFetchOrderWithItemsByIdQuery = (orderId: number) => {
  return useQuery<OrderWithItemsForUserPanelResponse>({
    queryKey: ["fetchOrderWithItemsById", orderId],
    queryFn: () => fetchOrderWithItemsByIdApi(orderId),
    enabled: !!orderId,
  });
};

export default useFetchOrderWithItemsByIdQuery;
