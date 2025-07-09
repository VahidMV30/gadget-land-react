import { useQuery } from "@tanstack/react-query";
import { OrderResponse } from "../../../../types/orderTypes";
import { fetchAllOrdersApi } from "../../../../api/ordersApi";

const useFetchAllOrdersQuery = () => {
  return useQuery<OrderResponse[]>({
    queryKey: ["fetchAllOrders"],
    queryFn: fetchAllOrdersApi,
  });
};

export default useFetchAllOrdersQuery;
