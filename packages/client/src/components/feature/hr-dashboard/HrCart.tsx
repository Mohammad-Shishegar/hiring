import Box from "#base/src/components/box";
import Typography from "#base/src/components/typography";
import clsx from "clsx";
import { number } from "yup";

interface IHrCart {
  icon: React.ReactNode;
  title: string;
  description: string;
  onCLick?: () => void;
  className?: string;
  number?: string;
}

const HrCart = ({
  icon,
  description,
  title,
  className,
  number,
  onCLick,
}: IHrCart) => {
  return (
    <Box
      onClick={() => onCLick && onCLick?.()}
      className={clsx(
        "bg-white border flex items-center gap-x-3 justify-center flex-row-reverse border-emerald-300 rounded-lg shadow-sm p-4",
        className
      )}
    >
      {icon && icon}
      <div className="w-[60%] text-right">
        <Typography tag="p" className="font-semibold text-[18px]">
          {title}
        </Typography>
        <Typography tag="p" className="text-green-400 text-[15px]">
          {description}
        </Typography>
      </div>
      <Typography tag="p" className="text-[20px]">
        {number && number}
      </Typography>
    </Box>
  );
};

export default HrCart;
