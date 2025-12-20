import clsx from "clsx";
import CreateTableBtn from "./CreateTableBtn";
import RefreshTableBtn from "./RefreshTableBtn";
import ExportTableBtn from "./ExportTableBtn";
import Typography from "../typography";

interface ITableButtonsAndTitle {
  hasCreateBtn: boolean;
  hasRefreshBtn: boolean;
  hasExcel: boolean;
  extraBtn: React.ReactNode;
  title: string;
  subTitle?: string;
}

const TableButtonsAndTitle = ({
  extraBtn,
  hasCreateBtn,
  hasExcel,
  hasRefreshBtn,
  subTitle,
  title,
}: ITableButtonsAndTitle) => {
  return (
    <div className={clsx(" h-16 flex items-center")}>
      <div className={clsx("w-[50%] flex items-center h-full gap-5")}>
        {/* Create Button */}
        {hasCreateBtn ? <CreateTableBtn /> : ""}
        {/* Refresh Button */}
        {hasRefreshBtn ? <RefreshTableBtn /> : ""}
        {/* Export Button */}
        {hasExcel ? <ExportTableBtn /> : ""}
        {/* extra BTN */}
        {extraBtn ? <div>{extraBtn}</div> : ""}
      </div>
      <div
        className={clsx(
          "w-[50%] flex items-center h-full gap-5 flex-row-reverse"
        )}
      >
        {/* Table Title */}
        <div className={clsx("flex flex-col text-right")}>
          <Typography tag="h2" className={clsx("font-bold text-[18px]")}>
            {title}
          </Typography>
          {subTitle ? (
            <Typography tag="p" className={clsx("text-[15px]")}>
              {subTitle}
            </Typography>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TableButtonsAndTitle;
