import React from "react";
import clsx from "clsx";


export interface CardProps {
    children: React.ReactNode;
    className?: string;
    padding?: 'sm' | 'md' | 'lg';
  }
  

const FeatureCart: React.FC<CardProps> = ({
  children,
  className,
  padding = "md",
}) => {
  return (
    <div
      className={clsx(
        "h-full bg-white rounded-lg shadow-md border border-gray-200",
        {
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
};

export default FeatureCart;
