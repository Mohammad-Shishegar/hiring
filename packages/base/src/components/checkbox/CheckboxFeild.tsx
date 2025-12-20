import { Field } from "formik";
import React, { useEffect } from "react";

interface CheckboxFieldProps {
  id: string ;
  label: React.ReactNode;
  required?: boolean;
  name: string;
  className?: string;
  field?: any;
  form?: any;
  value?: { name: string };
  defaultChecked?: boolean;
  [key: string]: any;
}

const Checkbox = (props: CheckboxFieldProps) => {
  const {
    id,
    label,
    defaultChecked = false,
    required = false,
    className,
    value,
    field,
    form,
    ...rest
  } = props;

  useEffect(() => {
    if (defaultChecked) form.setFieldValue(field?.name, true);
  }, [defaultChecked]);

  return (
    <div className="flex flex-row gap-2">
      <div className={`flex items-center h-5 `}>
        <input
          type="checkbox"
          id={id}
          checked={value}
          defaultChecked={defaultChecked ?? false}
          onChange={(e) => {
            form.setFieldValue(`${field.name}`, e.target.checked);
          }}
          className={` w-5 h-5 !accent-primary-600 outline-none  bg-white border-2 border-gray-300 rounded-sm  checked:accent-primary-600 cursor-pointer transition duration-200 ${className}`}
          {...rest}
          {...field}
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

const CheckboxField = (props: CheckboxFieldProps) => {
  const {
    id,
    label,
    required = false,
    defaultChecked = false,
    className = "",
    name,
    value,
    field,
    form,
    ...rest
  } = props;
  return (
    <Field
      name={name}
      // id={id}
      label={label}
      required={required}
      defaultChecked={defaultChecked}
      component={Checkbox}
      className={""}
      {...rest}
    />
  );
};

export default CheckboxField;
