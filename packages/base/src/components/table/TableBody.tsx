import clsx from "clsx";

const TableBody = ({ children }: any) => {
  return <tbody className={clsx("divide-y divide-gray-200")}>{children}</tbody>;
};

export default TableBody;
