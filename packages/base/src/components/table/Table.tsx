import clsx from "clsx";

const Table = ({ children }: any) => {
  return (
    <div className={clsx("mt-3")}>
      <div className={clsx("overflow-x-auto")}>
        <table
          className={clsx(
            "min-w-full bg-white border border-gray-200 border-separate "
          )}
        >
          {children}
        </table>
      </div>
    </div>
  );
};

export default Table;
