import clsx from "clsx";
import React from "react";
interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  variant?:
    | "gray"
    | "primary"
    | "danger"
    | "null"
    | "white"
    | "black"
    | "success"
    | "secondary";

  onClick?: React.MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantClasses = {
  gray: "bg-gray-500",
  primary: "bg-primary-500",
  danger: "bg-error-500",
  null: "bg-gray-500",
  white: "bg-white",
  black: "bg-black",
  success: "bg-success-500",
  secondary: "bg-secondary-500",
};

const Badge = (props: BadgeProps) => {
  const {
    variant = "primary",
    disabled,
    className,
    onClick = () => {},
    children,
    ...rest
  } = props;
  return (
    <>
      <span
        className={clsx(
          "py-1 px-4 text-white text-center rounded-lg transition-colors",
          disabled
            ? "bg-slate-400 cursor-not-allowed"
            : variantClasses[variant],
          className
        )}
        onClick={(e) => {
          if (disabled) {
            e?.preventDefault();
            e?.stopPropagation();
            return;
          }
          onClick?.(e);
        }}
        {...rest}
      >
        {children}
      </span>
    </>
  );
};
export default Badge;
