import React from "react";
import { useField } from "formik";
import RadioButton from "./RadioButton";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  disabled?: boolean;
  direction?: "row" | "column";
  className?: string;
}

const RadioGroupField: React.FC<RadioGroupProps> = ({
  options,
  name,
  disabled = false,
  direction = "column",
  className,
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div
      className={clsx(
        "flex ",
        direction === "row" ? "flex-row gap-4" : "flex-col gap-2",
        className
      )}
    >
      <p>ssss</p>
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          name={name}
          value={option.value}
          checked={field.value === option.value}
          onChange={() => helpers.setValue(option.value)}
          disabled={disabled}
        />
      ))}

      {meta.touched && meta.error && (
        <p className="text-error-500 text-xs mt-1">{meta.error}</p>
      )}
    </div>
  );
};

export default RadioGroupField;
