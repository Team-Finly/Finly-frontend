import { useQuery } from "@tanstack/react-query";
import { marketApi } from "@/apis/marketApi";

export const useMarketInsight = () => {
  return useQuery({
    queryKey: ["marketInsight"],
    queryFn: marketApi.getMarketInsight,
    staleTime: 30 * 1000,
  });
};