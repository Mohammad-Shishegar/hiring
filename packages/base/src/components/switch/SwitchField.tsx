import React from "react";
import { useField } from "formik";
import clsx from "clsx";

interface SwitchFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
}

const SwitchField: React.FC<SwitchFieldProps> = ({
  name,
  label,
  disabled = false,
  className,
  labelClassName,
}) => {
  const [field, meta, helpers] = useField<boolean>(name);
  const { setValue } = helpers;
  const hasError = meta.touched && meta.error;

  return (
    <div className="flex flex-col gap-1 w-fit">
      <div className="flex items-center justify-start gap-4">
        <label
          className={clsx(
            "text-sm",
            labelClassName,
            disabled && "text-gray-400 cursor-not-allowed",
            Boolean(hasError && !disabled) && "text-error-600"
          )}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={() => !disabled && setValue(!field.value)}
          className={clsx(
            "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
            field.value ? "bg-success-600" : "bg-gray-300",
            Boolean(hasError && !disabled) && "ring-2 ring-error-500",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <span
            className={clsx(
              "inline-block h-4 w-4 transform rounded-full bg-white transition",
              field.value ? "translate-x-6" : "translate-x-1"
            )}
          />
        </button>
      </div>
      {Boolean(hasError && !disabled) && (
        <span className="text-xs text-error-500">{meta.error}</span>
      )}
    </div>
  );
};

export default SwitchField;
