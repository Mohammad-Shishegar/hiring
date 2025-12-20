import React from "react";
import clsx from "clsx";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  bold?: boolean;
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "xxl";
  variant?:
    | "white"
    | "gray"
    | "danger"
    | "black"
    | "null"
    | "primary"
    | "success";
}

const Typography: React.FC<TypographyProps> = ({
  children,
  tag: Tag = "p",
  className,
  bold = false,
  size = "base",
  variant = "black",
  ...rest
}) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    xxl: "text-2xl",
  };

  const variantClasses = {
    white: "text-white",
    gray: "text-gray-500",
    danger: "text-error-500",
    black: "text-black",
    null: "text-gray-500",
    primary: "text-primary-500",
    success: "text-success-500",
  };

  return (
    <Tag
      className={clsx(
        sizeClasses[size],
        variantClasses[variant],
        bold && "font-bold",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Typography;
