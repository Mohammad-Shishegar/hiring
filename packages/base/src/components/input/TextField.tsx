import React from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";

type Variant = "outlined" | "filled" | "standard";

type InputType =
  | "text"
  | "password"
  | "email"
  | "url"
  | "tel"
  | "search"
  | "number";

interface TextInputProps {
  label: string;
  name: string;
  type?: InputType;
  variant?: Variant;
  className?: string;
  disabled?: boolean;
  onReset?: (form: any) => void;
  handleFocus?: () => void;
  [key: string]: any;
}

const TextField: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text",
  variant = "outlined",
  className,
  disabled = false,
  handleFocus,
  onReset,
}) => {
  const [field, meta] = useField(name);
  const [focused, setFocused] = React.useState(false);
  const isFloating = focused || Boolean(field.value);
  const form = useFormikContext();

  const baseClasses =
    "block w-full appearance-none bg-transparent px-3 pt-4 pb-2 text-sm placeholder-transparent focus:outline-none transition-all";

  const variants: Record<Variant, string> = {
    outlined:
      "border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500",
    filled:
      "bg-gray-100 border-b border-gray-400 rounded-t-md focus:ring-2 focus:ring-blue-500",
    standard:
      "border-b border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
  };

  const labelVariants: Record<Variant, string> = {
    outlined: "left-3 text-gray-500",
    filled: "left-3 text-gray-600",
    standard: "left-0 text-gray-600",
  };

  const handleReset = () => {
    if (meta?.initialValue) form.setFieldValue(name, meta?.initialValue);
    else form.setFieldValue(name, "");
    onReset && onReset(form);
  };

  return (
    <div dir="rtl" className={clsx("relative w-full", className)}>
      <div className="flex items-center">
        <input
          {...field}
          type={type}
          disabled={disabled}
          onFocus={() =>{
            setFocused(true)
            handleFocus?.()
          }}
          onBlur={(e) => {
            setFocused(false);
            field.onBlur(e);
          }}
          className={clsx(baseClasses, variants[variant], {
            "!border-error-500": meta.touched && meta.error,
          })}
          placeholder={label}
        />
      </div>

      <label
        className={clsx(
          "absolute text-sm top-0 transition-all right-1 pointer-events-none",
          labelVariants[variant],
          {
            "text-xs -top-[5px] py-1 px-1 ":
              isFloating && variant === "outlined",
            "text-xs -top-[5px] py-1 text-blue-600":
              isFloating && variant === "standard",
          }
        )}
      >
        {label}
      </label>
      <span
        className={clsx("absolute left-1 top-2 cursor-pointer")}
        onClick={handleReset}
      >
        <IoMdClose />
      </span>

      {meta.touched && meta.error && (
        <div>
          <span className="text-xs text-error-500">{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
