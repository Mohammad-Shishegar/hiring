import Select from "react-select";
import Typography from "../typography";
import clsx from "clsx";

interface DropDownObj {
  label: string;
  value: string;
}

interface DropDownProps {
  value?: DropDownObj;
  defaultValue?: DropDownObj;
  errorMessage?: string;
  onChange: (e?: any) => void;
  errorMessageClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  isClearable?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  isSearchable?: boolean;
  options: Array<DropDownObj>;
  required?: boolean;
  isRtl?: boolean;
  placeholder?: string;
  NoOptionsMessage?: string;
  LoadingMessage?: string;
  [key: string]: any;
}

const Dropdown = (props: DropDownProps) => {
  const {
    value,
    onChange = () => {},
    defaultValue,
    errorMessage,
    errorMessageClassName,
    helperText,
    helperTextClassName,
    isClearable = true,
    disabled = false,
    isLoading = false,
    isMulti = false,
    isSearchable = false,
    NoOptionsMessage = "No Options...",
    LoadingMessage = "Loading...",
    options = [],
    required = false,
    isRtl = false,
    placeholder = "",
    ...rest
  } = props;

  return (
    <div className="w-full">
      {helperText ? (
        <Typography tag="p" className={clsx("my-3", helperTextClassName)}>
          {helperText}
        </Typography>
      ) : (
        ""
      )}
      <Select
        value={value}
        isSearchable={isSearchable}
        onChange={onChange}
        placeholder={placeholder}
        defaultValue={defaultValue}
        isDisabled={disabled}
        isLoading={isLoading}
        classNamePrefix="react-select"
        isClearable={isClearable}
        isMulti={isMulti}
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
          // IndicatorSeparator: () => (
          //   <p className="p-1 text-center text-sm text-gray-500">
          //     گزینه‌fffای وجود ندارد.
          //   </p>
          // ),
          NoOptionsMessage: () => (
            <p className="p-1 text-center text-sm text-gray-500">
              {NoOptionsMessage ? NoOptionsMessage : ""}
            </p>
          ),
          LoadingMessage: () => (
            <p className="p-1 text-center text-sm text-gray-500">
              {LoadingMessage ? LoadingMessage : ""}
            </p>
          ),
        }}
        isRtl={isRtl}
        options={options}
        {...rest}
      />
      {errorMessage && (
        <div className={clsx(errorMessageClassName)}>
          <span className="text-xs leading-4 text-error-500">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
