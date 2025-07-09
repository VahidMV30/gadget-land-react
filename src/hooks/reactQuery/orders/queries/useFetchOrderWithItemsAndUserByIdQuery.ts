import { useQuery } from "@tanstack/react-query";
import { OrderWithItemsAndUserResponse } from "../../../../types/orderTypes";
import { fetchOrderWithItemsAndUserByIdApi } from "../../../../api/ordersApi";

const useFetchOrderWithItemsAndUserByIdQuery = (orderId: number) => {
  return useQuery<OrderWithItemsAndUserResponse>({
    queryKey: ["fetchOrderWithItemsAndUserById", orderId],
    queryFn: () => fetchOrderWithItemsAndUserByIdApi(orderId),
  });
};

export default useFetchOrderWithItemsAndUserByIdQuery;
