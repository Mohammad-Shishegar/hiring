import clsx from "clsx";
import React from "react";

type columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TSpans = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IResponsiveScreens {
  xs?: TSpans;
  sm?: TSpans;
  md?: TSpans;
  lg?: TSpans;
  xl?: TSpans;
  xxl?: TSpans;
}

interface ColumnProps extends IResponsiveScreens {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e?: any) => void;
}

const Column: React.FC<ColumnProps> = (props: ColumnProps) => {
  const {
    children,
    xs = 12,
    sm,
    md,
    lg,
    xl,
    xxl,
    className = "",
    disabled = false,
    onClick = () => {},
  } = props;

  const columnClassMaker = (screen: string, columns?: columns): string =>
    screen === "xs" ? `col-span-${columns}` : `${screen}:col-span-${columns}`;

  const classNames = [
    xs ? columnClassMaker("xs", xs) : "",
    sm ? columnClassMaker("sm", sm) : "",
    md ? columnClassMaker("md", md) : "",
    lg ? columnClassMaker("lg", lg) : "",
    xl ? columnClassMaker("xl", xl) : "",
    xxl ? columnClassMaker("2xl", xxl) : "",
    className,
  ]
    ?.join(" ")
    ?.trim();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div
      className={clsx(classNames, {
        "cursor-not-allowed  opacity-40": disabled,
      })}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
export default Column;
