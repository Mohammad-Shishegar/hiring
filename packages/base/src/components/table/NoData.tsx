import clsx from "clsx";
import Image from "../image";
import Typography from "../typography";

const NoData = () => {
  return (
    <tbody className={clsx("divide-y divide-gray-200")}>
      <td colSpan={12}>
        <div className="flex items-center flex-col justify-center">
          <Image
            src="/Images/nodata.jpg"
            alt="ssdss"
            className="w-[350px] h-[350px] animate-pulse"
          />
          <Typography
            tag="p"
            className="my-4 text-error-500 text-[21px] font-bold animate-bounce"
          >
            There is No Data
          </Typography>
        </div>
      </td>
    </tbody>
  );
};

export default NoData;
