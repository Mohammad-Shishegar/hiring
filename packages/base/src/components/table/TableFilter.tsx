import clsx from "clsx";
import { useTable } from "../../helpers/contexts/TableContext";
import TextField from "../input/TextField";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { useDebounce } from "../../helpers/hooks/useDebounce";

const TableFilter = () => {
  const { columns, noData , tableLoading} = useTable();

  const {values , submitForm} = useFormikContext()
  
    const debouncedValues = useDebounce(values, 500);

  useEffect(() => {
    submitForm();
  }, [debouncedValues]);

  return (
    <tr className={clsx("border-separate bg-slate-100")}>
      {columns?.map((column: any, index) => {
        const key: string = Object.keys(column)?.[0];
        const title = column?.[key]?.title;
        const name = column?.[key]?.name;
        const type = column?.[key]?.type;
        const hasSorting = column?.[key]?.hasSorting;
        const hasFilter = column?.[key]?.hasFilter;
        const isExportable = column?.[key]?.isExportable;
        const isShow = column?.[key]?.isShow;

        if (!isShow) return;

        return (
          <th
            key={index}
            className={clsx(
              "px-6 py-3 border-b text-sm font-medium",
              index === 0 ? "text-center" : "text-left"
            )}
          >
            {hasFilter && (
              <div
                className={clsx(
                  "flex w-full items-center justify-between flex-row-reverse"
                )}
              >
                <TextField  type={type} label="" disabled={noData || tableLoading} name={key} />
              </div>
            )}
          </th>
        );
      })}
    </tr>
  );
};

export default TableFilter;
