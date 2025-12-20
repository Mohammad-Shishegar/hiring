import clsx from "clsx";
import React from "react";

interface GridProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export const Grid = ({ children, className = "" }: GridProps) => {
  return (
    <div className={clsx("grid  grid-cols-12 gap-4 ", className)}>
      {children}
    </div>
  );
};

export default Grid;
