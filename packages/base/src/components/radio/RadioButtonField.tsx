import React from "react";
import { useField, useFormikContext } from "formik";
import clsx from "clsx";

interface RadioButtonFieldProps {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
  className?: string;
}

const RadioButtonField: React.FC<RadioButtonFieldProps> = ({
  label,
  name,
  value,
  disabled = false,
  className,
}) => {
  const [field, meta] = useField({ name });
  const { setFieldValue } = useFormikContext<any>();

  return (
    <div className="w-full">
      <label
        className={clsx(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={field.value === value}
          onChange={() => setFieldValue(name, value)}
          onBlur={field.onBlur}
          disabled={disabled}
          className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-green-500 transition duration-200"
        />
        <span className="text-sm">{label}</span>
      </label>

      {meta.touched && meta.error && (
        <p className=" text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default RadioButtonField;
