import React from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";
import { IoMdClose } from "react-icons/io";

interface TextAreaFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
  labelClassName?: string;
  onReset?: (form: any) => void;
}

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  disabled = false,
  rows = 4,
  className,
  onReset,
  required,
  labelClassName,
}) => {
  const [field, meta] = useField(name);
  const hasError = meta.touched && meta.error;
  const form = useFormikContext();

  const handleReset = () => {
    if (meta?.initialValue) form.setFieldValue(name, meta?.initialValue);
    else form.setFieldValue(name, "");
    onReset && onReset(form);
  };
  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label
        htmlFor={name}
        className={clsx(
          "text-sm font-medium",
          labelClassName,
          disabled && "text-gray-400",
          hasError && "text-error-600"
        )}
      >
        {label}
      </label>
      <textarea
        {...field}
        id={name}
        rows={rows}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-lg border text-right px-3 py-2 text-sm transition focus:outline-none focus:ring-2",
          hasError
            ? "border-error-500 focus:ring-error-500"
            : "border-gray-300 focus:ring-primary-500",
          disabled && "bg-gray-100 cursor-not-allowed",
          required && "border-error-500 focus:ring-error-500",
          className
        )}
      ></textarea>

      <span
        className={clsx("absolute top-8 left-2 cursor-pointer")}
        onClick={handleReset}
      >
        <IoMdClose />
      </span>
      {hasError && <span className="text-xs text-error-500">{meta.error}</span>}
    </div>
  );
};

export default TextAreaField;
