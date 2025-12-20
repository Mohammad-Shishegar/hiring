import clsx from "clsx";

interface ITableRow {
  children: any;
  index: number;
}

const TableRow = ({ children, index = 0 }: ITableRow) => {
  return (
    <tr
      key={index}
      className={clsx(
        "hover:bg-slate-100",
        index % 2 === 1 && "bg-secondary-100"
      )}
    >
      {children}
    </tr>
  );
};

export default TableRow;
