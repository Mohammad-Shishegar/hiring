import React from "react";
import clsx from "clsx";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label: string;
  labelClassName?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  disabled = false,
  className,
  labelClassName,
  label,
}) => {
  return (
    <div className="flex items-center p-1 justify-center gap-5  w-fit">
      <label
        className={clsx(
          labelClassName,
          disabled && "text-gray-400 cursor-not-allowed"
        )}
      >
        {label}
      </label>
      <button
        type="button"
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
          checked ? "bg-success-600" : "bg-gray-300",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white transition",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>
    </div>
  );
};

export default Switch;
