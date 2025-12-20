import React from "react";
import clsx from "clsx";
import SimpleSpinner from "../spinner/SimpleSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full" | "auto";
  variant?: "contained" | "rounded" | "outline" | "shadow";
  btnType?: "normal" | "error" | "success";
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e?: any) => void;
}

const sizeStyles = {
  xs: "xl:px-[7px] xl:py-[5px] xl:text-[13px] xl:h-[30px] md:px-[5px] md:py-[4px] md:text-[11px] md:h-[30px] max-md:px-[5px] max-md:py-[3px] max-md:text-[9px] max-md:h-[25px]",
  sm: "xl:text-[14px] xl:h-[36px] xl:min-w-[31px] md:text-[10px] md:min-w-[25px] md:h-[30px] px-[6px]",
  md: "xl:text-[14px] xl:px-[17px] xl:py-[15px] xl:h-[40px] md:px-[11px] md:py-[9px] md:text-[14px] md:h-[36px] max-md:px-[7px] max-md:py-[5px] max-md:text-[13px] max-md:h-[30px]",
  lg: "xl:px-[19px] xl:py-[17px] xl:h-[46px] md:text-[14px] md:px-[17px] md:py-[15px] md:h-[40px] max-md:px-[11px] max-md:py-[9px] max-md:text-[14px] max-md:h-[36px]",
  xl: "xl:px-6 xl:py-3.5 xl:h-12 md:px-[19px] md:py-[17px] md:h-[46px] max-md:text-[14px] max-md:px-[17px] max-md:py-[15px] max-md:h-[40px]",
  full: "w-full px-6 py-3.5 h-12",
  auto: "",
};

const variantStyles = {
  contained: `rounded-lg font-bold bg-button-background text-button-text cursor-default hover:bg-button-hover-background hover:text-button-hover-text`,
  rounded: `rounded-[50px] font-bold bg-button-background text-button-text hover:bg-button-hover-background hover:text-button-hover-text`,
  shadow: `rounded-lg shadow-[0_1px_5px_1px_rgb(221,221,221)] bg-transparent text-gray-400 hover:bg-white`,
  outline: `rounded-lg font-bold bg-transparent text-button-text border-2 border-solid border-button-text hover:bg-button-hover-background hover:text-button-hover-text`,
};

const ButtonColorType = {
  normal: ` bg-button-background text-button-text  hover:bg-button-hover-background hover:text-button-hover-text `,
  error: ` bg-error-500 text-white border-2 border-error-500 hover:bg-error-500 hover:text-white disabled:bg-error-500`,
  success: ` bg-success-500 text-white  border-2 border-success-500 hover:bg-success-500 hover:text-white  disabled:bg-success-500`,
};

const Button = ({
  className,
  type = "button",
  children,
  endIcon,
  size = "sm",
  onClick,
  startIcon,
  variant = "contained",
  disabled = false,
  loading = false,
  btnType = "normal",
  ...rest
}: ButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (type !== "submit") e.preventDefault();
    onClick && onClick(e);
  };

  const buttonClasses = clsx(
    "relative flex items-center justify-center focus:outline-none transition-colors duration-75",
    variantStyles[variant],
    sizeStyles[size],
    ButtonColorType[btnType],
    className,
    {
      "opacity-40   cursor-not-allowed": disabled || loading,
      "cursor-pointer": !(disabled || loading),
    }
  );

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={loading || disabled}
      type={type}
      {...rest}
    >
      {loading ? (
        <>
          <SimpleSpinner />
        </>
      ) : (
        <>
          {startIcon && <span className="mr-2">{startIcon}</span>}
          <span className="flex items-center">{children}</span>
          {endIcon && <span className="ml-2">{endIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
