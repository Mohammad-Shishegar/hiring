import clsx from "clsx";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
  label?: string;
  labelClassName?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-10 h-10 border-4",
  xl: "w-12 h-12 border-4",
};

const SimpleSpinner = ({
  size = "md",
  color = "border-white",
  className,
  label = "",
  labelClassName = "",
}: SpinnerProps) => {
  return (
    <div className="flex items-center justify-center w-fit flex-col gap-y-3 ">
      <span
        className={clsx(
          "rounded-full border-b-transparent animate-spin inline-block box-border",
          sizeMap[size],
          color,
          className
        )}
      />
      {label !== "" ? (
        <>
          <p className={labelClassName}>{label}</p>
        </>
      ) : null}
    </div>
  );
};

export default SimpleSpinner;
