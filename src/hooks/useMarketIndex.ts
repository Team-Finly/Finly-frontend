import { useQuery } from "@tanstack/react-query";
import { marketApi } from "@/apis/marketApi";

export const useMarketIndex = () => {
  return useQuery({
    queryKey: ["marketIndex"],
    queryFn: marketApi.getMarketIndex,
    staleTime: 60 * 1000,
  });
};