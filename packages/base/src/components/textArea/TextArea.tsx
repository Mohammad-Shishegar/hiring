import clsx from "clsx";
import React, { useState } from "react";

type Variant = "outlined" | "filled" | "standard";

interface TextFieldProps {
  label: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  variant?: Variant;
  className?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
}

const TextArea: React.FC<TextFieldProps> = ({
  label,
  value,
  onChange = () => {},
  onFocus = () => {},
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
    "block w-full  appearance-none bg-transparent px-3 pt-5 pb-2 text-sm placeholder-transparent focus:outline-none transition-all";

  const variants: Record<Variant, string> = {
    outlined:
      "border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
    filled:
      "bg-gray-100 border-b border-gray-400 rounded-t-md focus:ring-2 focus:ring-blue-500",
    standard:
      "border-b border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  };

  const labelVariants: Record<Variant, string> = {
    outlined: "left-3 top-2 text-gray-500",
    filled: "left-3 top-2 text-gray-600",
    standard: "left-0 top-2 text-gray-600",
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
        <textarea
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          className={clsx(baseClasses, variants[variant], "pt-7", {
            " !border-error-500": required,
          })}
          placeholder={label}
        />
      </div>
      <label
        className={clsx(
          "absolute text-sm transition-all right-0 pointer-events-none",
          labelVariants[variant],
          {
            "text-xs -top-2  px-1 text-blue-500":
              isFloating && variant === "outlined",
            "text-xs -top-2  px-1 text-blue-600":
              isFloating && variant === "filled",
            "text-xs -top-2 text-blue-600":
              isFloating && variant === "standard",
          }
        )}
      >
        {label}
      </label>
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

export default TextArea;
