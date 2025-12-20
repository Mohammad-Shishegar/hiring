import clsx from "clsx";

interface ITableFilterCell {
  children?: React.ReactNode;
}

const TableFilterCell = ({ children }: ITableFilterCell) => {
  
    return (
    
   
      <th className={clsx("px-6 py-3 border-b text-sm font-medium")}>
        <div
          className={clsx(
            "flex w-full items-center justify-between flex-row-reverse"
          )}
        >
          {children}
        </div>
      </th>
 
  );
};

export default TableFilterCell;
