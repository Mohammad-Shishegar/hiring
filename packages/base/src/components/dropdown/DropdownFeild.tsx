import { useField, useFormikContext } from "formik";
import Select from "react-select";
import clsx from "clsx";
import Typography from "../typography";
import { useEffect } from "react";

interface DropDownObj {
  label: string;
  value: string;
}

interface DropDownProps {
  name: string;
  errorMessageClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  isClearable?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  disabled?: boolean;
  options: DropDownObj[];
  required?: boolean;
  isRtl?: boolean;
  placeholder?: string;
  NoOptionsMessage?: string;
  LoadingMessage?: string;
  onClearable?: (e?: any) => void;
  [key: string]: any;
}

const DropdownField = (props: DropDownProps) => {
  const {
    name,
    errorMessageClassName,
    helperText,
    helperTextClassName,
    isClearable = true,
    isLoading = false,
    isMulti = false,
    isSearchable = true,
    disabled = false,
    options = [],
    required = false,
    isRtl = false,
    placeholder = "",
    NoOptionsMessage = "No Options...",
    LoadingMessage = "Loading...",
    onClearable = () => {},
    ...rest
  } = props;

  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const formik = useFormikContext();

  const handleChange = (selectedOption: any) => {
    setValue(selectedOption);
  };

  useEffect(() => {
    if (!field?.value) onClearable?.(formik);
  }, [field?.value]);

  return (
    <div className="w-full">
      {helperText && (
        <Typography tag="p" className={clsx("my-3", helperTextClassName)}>
          {helperText}
        </Typography>
      )}
      <Select
        value={field.value}
        onChange={handleChange}
        placeholder={placeholder}
        isDisabled={disabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isMulti={isMulti}
        isSearchable={isSearchable}
        options={options}
        isRtl={isRtl}
        classNamePrefix="react-select"
        styles={{
          control: (provided: any, state: any) => ({
            ...provided,
            borderColor: required ? "red" : "#888",
            boxShadow: "none",
            "&:hover": {
              borderColor: "none",
            },
          }),
        }}
        components={{
          NoOptionsMessage: () => (
            <p className="p-1 text-center text-sm text-gray-500">
              {NoOptionsMessage}
            </p>
          ),
          LoadingMessage: () => (
            <p className="p-1 text-center text-sm text-gray-500">
              {LoadingMessage}
            </p>
          ),
        }}
        {...rest}
      />
      {meta.touched && meta.error && (
        <div className={clsx(errorMessageClassName)}>
          <span className="text-xs leading-4 text-error-500">{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export default DropdownField;
