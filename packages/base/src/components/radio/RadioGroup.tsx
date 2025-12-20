import React from "react";
import RadioButton from "./RadioButton";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  direction?: "row" | "column";
  className?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  disabled = false,
  direction = "column",
  className,
}) => {
  return (
    <div
      className={`flex ${
        direction === "row" ? "flex-row gap-4" : "flex-col gap-2"
      } ${className}`}
    >
      {options.map((option) => (
        <RadioButton
          key={option.value}
          label={option.label}
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default RadioGroup;
