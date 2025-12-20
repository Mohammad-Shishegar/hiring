import { useQuery } from "@tanstack/react-query";
import { getMethod } from "./Interseptor/RequestMethods";

type queryType1 = "text" | "number" | "fromDate" | "toDate" | "dropdown";

type paramType = { name: string; value: string; type: queryType1 };

export const useGetWithFilterQuery = (
  url: string,
  queryParams?: paramType[],
  filterParams?: paramType[],
  queryKey?: (string | number)[],
  enabled = true,
  requestConfig?: any,
  config?: {}
) => {
  const handleParams = (params: paramType[]) => {
    return params.reduce((acc, param) => {
      const { type, value, name } = param;
      const operator = {
        text: "=*",
        number: "=",
        fromDate: ">=",
        toDate: "<=",
        dropdown: "=",
      }[type];
      acc[name] = `${operator}${value}`;
      return acc;
    }, {} as Record<string, string>);
  };

  const changeURL = () => {
    if (
      (!queryParams || queryParams.length === 0) &&
      (!filterParams || filterParams.length === 0)
    )
      return url;

    let finalURL = url;
    if (queryParams) {
      const params = handleParams(queryParams);
      const result = Object.entries(params)
        .map(([key, value]) => `${key}${encodeURIComponent(value)}`)
        .join("&");
      finalURL = finalURL + "?" + result;
    }
    if (filterParams?.length !== 0 && filterParams !== undefined) {
      if (queryParams?.length !== 0 && queryParams !== undefined)
        finalURL = finalURL + "&filter:";
      else finalURL = finalURL + "filter:";
      const params = handleParams(filterParams);
      const result = Object.entries(params)
        .map(([key, value]) => `${key}${encodeURIComponent(value)}`)
        .join(",");
      finalURL = finalURL + result;
    }
    return finalURL;
  };
  const finalURL = changeURL();
  return useQuery({
    queryKey: queryKey || [finalURL],
    queryFn: async () => await getMethod(finalURL, requestConfig),
    enabled,
    ...config,
  });
};
