import { useQuery } from "@tanstack/react-query";
import { getAuthorize, getSales } from "../lib/api";

// Token hook
export function useAuthToken() {
  return useQuery({
    queryKey: ["authToken"],
    queryFn: getAuthorize,
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
  });
}

// Sales hook
export function useSalesQuery(filters) {
  const auth = useAuthToken();
  const token = auth.data;

  return useQuery({
    queryKey: ["sales", filters],
    queryFn: async () => {
      if (!token)
        return { results: { Sales: [], TotalSales: [] }, pagination: {} };
      return getSales({ token, params: filters });
    },
    enabled: !!token,
    keepPreviousData: true,
  });
}
