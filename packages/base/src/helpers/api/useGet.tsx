import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMethod } from "./Interseptor/RequestMethods";

export const useGet = (
  url: string,
  queryKey: any[],
  enabled: boolean = true,
  requestConfig?: any,
  config?: {}
) => {
  return useQuery<any, Error>({
    queryKey,
    queryFn: async () => await getMethod(url, requestConfig),
    enabled,
    ...config,
  } as UseQueryOptions<any, Error>);
};
