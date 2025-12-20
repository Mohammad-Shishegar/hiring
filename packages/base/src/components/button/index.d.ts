import React from "react";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?:
    | "primary"
    | "outline-primary"
    | "secondary"
    | "outline-secondary"
    | "light"
    | "success"
    | "outline-success"
    | "error"
    | "outline-error"
    | "warning"
    | "outline-warning"
    | "grey";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}
declare const Button: (
  props: ButtonProps
) => import("react/jsx-runtime").JSX.Element;
export default Button;
