import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMethod } from "./Interseptor/RequestMethods";

export const usePost = (
  url: string,
  queryKey: string[],
  requestConfig?: any,
  ...config: any
) => {
  const queryClient = useQueryClient();
  return useMutation<any, unknown, Record<string, any>>({
    mutationFn: async (body: object) => {
      const response = await postMethod(url, body, requestConfig);
      return response;
    },
    onSuccess: (data) => {
      queryKey?.map((item: string) =>
        queryClient.invalidateQueries({ queryKey: [item] })
      );
      config?.onSuccess?.(data);
    },
    onError: (error) => {
      console.error("Post request failed", error);
      config?.onError?.(error);
    },
    ...config,
  });
};
