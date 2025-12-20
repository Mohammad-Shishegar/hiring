import React from "react";
import clsx from "clsx";

interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
  className,
}) => {
  return (
    <div className={clsx("w-full ")}>
      <label
        className={clsx(
          "inline-flex items-center gap-2 cursor-pointer select-none",
          disabled && "opacity-50 !cursor-not-allowed",
          className
        )}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="appearance-none h-4 w-4 border border-gray-300 rounded-full checked:bg-secondary-500 focus:outline-none transition duration-200"
        />
        <span className="text-sm">{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
