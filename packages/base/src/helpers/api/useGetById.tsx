import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getMethod } from "./Interseptor/RequestMethods";

export const useGetById = (
  url: string,
  id: string,
  queryKey: string[],
  enabled = true,
  requestConfig?: any,
  config?: {}
) => {
  const finalURL = `${url}?id=${id}`;
  return useQuery<any, Error>({
    queryKey: [...queryKey, id],
    queryFn: async () => await getMethod(finalURL, requestConfig),
    enabled,
    ...config,
  } as UseQueryOptions<any, Error>);
};
