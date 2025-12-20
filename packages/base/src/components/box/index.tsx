import React from "react";

interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Box = (props: BoxProps) => {
  const { children, className = "", ...rest } = props;
  return (
    <div
      className={` relative flex flex-col min-w-0 break-words
        shadow-xl rounded-2xl bg-clip-border 
       ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Box;
