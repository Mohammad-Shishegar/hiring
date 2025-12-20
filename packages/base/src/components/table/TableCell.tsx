import clsx from "clsx";

interface ITableCell {
  className?: string;
  children: any;
}

const TableCell = ({ children, className }: ITableCell) => {
  return (
    <td className={clsx("px-6 py-4 text-right ", className)}>{children}</td>
  );
};
export default TableCell;
