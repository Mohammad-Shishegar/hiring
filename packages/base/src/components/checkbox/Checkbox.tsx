import React from "react";

interface CheckboxFieldProps {
  id: string;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
  value?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const Checkbox = (props: CheckboxFieldProps) => {
  const {
    id,
    label,
    required = false,
    className,
    value,
    onChange = () => {},
    ...rest
  } = props;

  return (
    <div className="flex flex-row gap-2">
      <div className={`flex items-center h-5 `}>
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={onChange}
          className={` w-5 h-5 !accent-primary-600 outline-none  bg-white border-2 border-gray-300 rounded-sm  checked:accent-primary-600 cursor-pointer transition duration-200 ${className}`}
          {...rest}
        />
      </div>
      <div className="flex flex-row items-center gap-1">
        <label htmlFor={id} className="text-gray-400 text-sm cursor-pointer">
          {label}
          {required && <span className="text-error-500">*</span>}
        </label>
      </div>
    </div>
  );
};
export default Checkbox;
