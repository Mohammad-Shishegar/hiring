import React, { useState } from "react";
import clsx from "clsx";
import { FaHome } from "react-icons/fa";

type Variant = "outlined" | "filled" | "standard";

type inputType =
  | "text"
  | "password"
  | "email"
  | "url"
  | "tel"
  | "search"
  | "number";

interface TextFieldProps {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: inputType;
  name?: string;
  variant?: Variant;
  className?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
}

const SimpleInput: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange = () => {},
  onFocus = () => {},
  type = "text",
  name,
  variant = "outlined",
  className,
  required = false,
  errorMessage,
  disabled = false,
}) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || Boolean(value);

  const baseClasses =
    "block w-full  appearance-none bg-transparent py-2 px-2 text-sm  focus:outline-none transition-all";

  const variants: Record<Variant, string> = {
    outlined:
      "border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
    filled:
      "bg-gray-100 border-b border-gray-400 rounded-t-md focus:ring-2 focus:ring-blue-500",
    standard:
      "border-b border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  };


  const handleFocus = (e: any) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };

  return (
    <div
      dir="rtl"
      className={clsx("relative w-full", className, { "opacity-50": disabled })}
    >
      <div className="flex">
        <input
          type={type}
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          className={clsx(baseClasses, variants[variant], {
            " !border-error-500": required,
          })}
          placeholder={label}
        />
      </div>
      <div className="absolute top-[50%] left-0">
      </div>
      {errorMessage && (
        <div>
          <span className="text-xs leading-4 text-error-500">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default SimpleInput;
