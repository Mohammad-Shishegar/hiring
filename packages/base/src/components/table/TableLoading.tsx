import clsx from "clsx";
import { useTable } from "../../helpers/contexts/TableContext";

const TableLoading = () => {
  const { columns } = useTable();
  return (
    <>
      {Array(4)
        .fill(null)
        .map((i, index) => (
          <tbody className={clsx("divide-y divide-gray-500")}>
            <tr
              key={index}
              className={clsx(
                "h-5  animate-pulse",
                index % 2 === 1 && "bg-secondary-200"
              )}
            >
              {columns?.map(() => (
                <td className={clsx("px-6 py-4 !h-[50px]")}></td>
              ))}
            </tr>
          </tbody>
        ))}
    </>
  );
};

export default TableLoading;
