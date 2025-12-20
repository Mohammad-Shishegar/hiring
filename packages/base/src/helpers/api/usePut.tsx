import { useMutation, useQueryClient } from "@tanstack/react-query";
import { putMethod } from "./Interseptor/RequestMethods";

export const usePut = (
  url: string,
  queryKey: string[],
  requestConfig?: any,
  ...config: any
) => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, Record<string, any>>({
    mutationFn: async (body: object) => {
      const response = await putMethod(url, body, requestConfig);
      return response;
    },
    onSuccess: (data) => {
      queryKey?.map((item: string) =>
        queryClient.invalidateQueries({ queryKey: [item] })
      );
      config.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Put request failed", error);
      config.onError?.(error);
    },
    ...config,
  });
};
