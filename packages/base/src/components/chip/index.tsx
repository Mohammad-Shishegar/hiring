import clsx from "clsx";
import React from "react";

interface ChipProps {
  children: React.ReactNode;
  className?: string;
}

const Chip = (props: ChipProps) => {
  const { children, className, ...rest } = props;

  return (
    <div
      className={clsx(
        "flex flex-row items-center justify-center rounded-full h-[52px] p-5 bg-green-300",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Chip;
