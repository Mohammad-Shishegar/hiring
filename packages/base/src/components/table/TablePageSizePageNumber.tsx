import clsx from "clsx";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import Dropdown from "../dropdown/Dropdown";
import { useTable } from "../../helpers/contexts/TableContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

interface ITablePageSizePageNumber {
  showPageNumber: boolean;
  showPageSize: boolean;
}

const TablePageSizePageNumber = ({
  showPageNumber,
  showPageSize,
}: ITablePageSizePageNumber) => {
  const { meta, setMeta, noData, tableLoading } = useTable();
  const [dropdownData, setDropdownData] = useState({ label: "", value: "" });

  useEffect(() => {
    if (meta?.pageSize)
      setDropdownData({ label: meta?.pageSize, value: meta?.pageSize });
  }, [meta?.pageSize]);

  const handlePageNumber = (status: "next" | "prev") => {
    if (status === "next")
      setMeta((cv: any) => ({ ...cv, page: String(parseInt(cv?.page) + 1) }));
    if (status === "prev")
      setMeta((cv: any) => ({ ...cv, page: String(parseInt(cv?.page) - 1) }));
  };

  return (
    <div className={clsx(" mt-3 gap-x-3 h-10 flex flex-row-reverse")}>
      {showPageNumber ? (
        <div
          className={clsx(
            "w-32 flex justify-center items-center flex-row rounded border border-solid border-slate-400",
           { "bg-stone-200": noData || tableLoading }
          )}
        >
          <CustomTooltip content={"next page"}>
            <RiArrowLeftSLine
              onClick={(e) => {
                if (noData || tableLoading) {
                  e.stopPropagation();
                  e.preventDefault();
                  return;
                }
                handlePageNumber("next");
              }}
              size={25}
              className={clsx(
                "cursor-pointer hover:scale-125  transition-all duration-200",{"hover:scale-100": noData || tableLoading}
              )}
            />
          </CustomTooltip>
          <input
            disabled={noData || tableLoading}
            onChange={(e) => {
              const val = Number(e?.target?.value);
              if (!isNaN(val) && val > 0)
                setMeta((cv: any) => ({ ...cv, page: e?.target?.value }));
              else {
                setMeta((cv: any) => ({ ...cv, page: 1 }));
                toast?.error("plase insert positive number!!!");
                return;
              }
            }}
            value={meta?.page}
            className={clsx("w-10 h-5 outline-none text-center border-b-2 border-solid ")}
          />
          <CustomTooltip content={"prev page"}>
            <RiArrowRightSLine
              onClick={(e) => {
                if (noData || tableLoading) {
                  e.stopPropagation();
                  e.preventDefault();
                  return;
                }
                if (parseInt(meta?.page) === 1) return;
                handlePageNumber("prev");
              }}
              size={25}
              className={clsx(
                "cursor-pointer hover:scale-125 transition-all duration-200"
                ,{"hover:scale-100": noData || tableLoading}
              )}
            />
          </CustomTooltip>
        </div>
      ) : (
        ""
      )}
      {showPageSize ? (
        <div
          className={clsx(
            "w-32 flex justify-center items-center flex-row rounded border border-solid border-slate-400"
          )}
        >
          <Dropdown
            onChange={(e) => {
              setMeta((cv: any) => ({ ...cv, pageSize: e?.label }));
            }}
            isClearable={false}
            value={dropdownData}
            disabled={noData || tableLoading}
            options={[
              { label: "10", value: "10" },
              { label: "20", value: "20" },
              { label: "50", value: "50" },
            ]}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default TablePageSizePageNumber;
