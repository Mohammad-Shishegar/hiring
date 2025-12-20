import { useState } from "react";
import { useGet } from "./useGet";

type queryType1 = "text" | "number" | "fromDate" | "toDate" | "dropdown";

type paramType = { name: string; value: string; type: queryType1 };

const useTableGet = (
  url: string,
  queryKey: string[],
  queryData?: {
    page?: number;
    pageSize?: number;
    Tablefilters?: [];
    orderBy?: [];
  },
  queryParams?: paramType[],
  enabled: boolean = true,
  requestConfig?: {}
) => {
  const [meta, setMeta] = useState({
    pageSize: queryData?.pageSize?.toString() || "10",
    page: queryData?.page?.toString() || "1",
    Tablefilters: [],
    orderBy: [],
  });

  const [enabledReq, setEnabledReq] = useState(false);

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
    const customParamsArray: paramType[] = queryParams || [];
    customParamsArray?.push({
      name: "page",
      type: "number",
      value: meta?.page?.toString(),
    });
    customParamsArray?.push({
      name: "pageSize",
      type: "number",
      value: meta?.pageSize?.toString(),
    });

    if (
      (!customParamsArray || customParamsArray.length === 0) &&
      (!queryData?.Tablefilters || queryData?.Tablefilters.length === 0)
    )
      return url;

    let finalURL = url;
    if (customParamsArray.length > 0) {
      const params = handleParams(customParamsArray);
      const result = Object.entries(params)
        .map(([key, value]) => `${key}${encodeURIComponent(value)}`)
        .join("&");
      finalURL = finalURL + "?" + result;
    }
    if (meta?.Tablefilters?.length !== 0 && meta?.Tablefilters !== undefined) {
      if (customParamsArray?.length !== 0 && customParamsArray !== undefined)
        finalURL = finalURL + "&filter:";
      else finalURL = finalURL + "filter:";
      const params = handleParams(meta?.Tablefilters);
      const result = Object.entries(params)
        .map(([key, value]) => `${key}${encodeURIComponent(value)}`)
        .join(",");
      finalURL = finalURL + result;
    }
    if (meta?.orderBy?.length !== 0 && meta?.orderBy !== undefined) {
      let temp = meta?.orderBy
        .filter((obj) => Object.values(obj)[0] !== "")
        .map((obj) => {
          const key = Object.keys(obj)[0];
          const value = obj[key];
          return `${key}${encodeURIComponent("=" + value)}`;
        })
        .join(" , ");

      if (temp) finalURL = finalURL + "&orderBy:" + temp;
    }
    return finalURL;
  };
  const finalURL = changeURL();

  const { data, ...requestParam } = useGet(
    finalURL,
    [...queryKey, meta],
    Boolean(meta?.orderBy?.length > 0 && enabled),
    requestConfig,
    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, ...requestParam, meta, setMeta };
};
export default useTableGet;
