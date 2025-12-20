import clsx from "clsx";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { TbCaretUpDownFilled } from "react-icons/tb";
import { useTable } from "../../helpers/contexts/TableContext";
import Typography from "../typography";

const TableHead = () => {
  const { tableLoading, columns, meta, setMeta } = useTable();


  const cycleValue = (val: string): string => {
    switch (val) {
      case "":
        return "1";
      case "1":
        return "2";
      case "2":
        return "";
      default:
        return "";
    }
  };

  const updateField = (field: string) => {
    let temp = meta?.orderBy?.map((obj: any) => {
      const key = Object.keys(obj)[0];
      if (key === field) {
        return { [key]: cycleValue(obj[key]) };
      }
      return obj;
    });
    let temp2: any[] = [];
    temp?.forEach((item: any, index: any) => {
      const key: string = Object.keys(item)?.[0];
      if (temp[index][key] !== "") temp2?.push(temp[index]);
    });
    setMeta((cv: any) => ({ ...cv, orderBy: temp }));
  };

  const handleShowIcon = (isSorted: string) => {
    switch (isSorted) {
      case "1":
        return <FaCaretUp size={22} />;
      case "2":
        return <FaCaretDown size={22} />;
      case "":
        return <TbCaretUpDownFilled size={22} />;
    }
  };

  return (
    <thead className={clsx("bg-secondary-500  text-white")}>
      {columns?.map((column: any, index) => {
        const key: string = Object.keys(column)?.[0];
        const title = column?.[key]?.title;
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
            <div
              className={clsx(
                "flex w-full items-center justify-between flex-row-reverse"
              )}
            >
              <Typography tag="p" className={clsx("text-white")}>
                {title}
              </Typography>
              {hasSorting ? (
                <button
                  type="button"
                  className={clsx("h-10")}
                  disabled={tableLoading}
                  onClick={() => {
                    updateField(key);
                  }}
                >
                  {handleShowIcon(meta?.orderBy?.[index]?.[key])}
                </button>
              ) : (
                ""
              )}
            </div>
          </th>
        );
      })}
    </thead>
  );
};

export default TableHead;
