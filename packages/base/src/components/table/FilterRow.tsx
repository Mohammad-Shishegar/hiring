import clsx from "clsx";
import { useFormikContext } from "formik";
import { useDebounce } from "../../helpers/hooks/useDebounce";
import { useEffect } from "react";

interface IFilterRow {
  children: React.ReactNode;
}

const FilterRow = ({ children }: IFilterRow) => {
  const { values, submitForm } = useFormikContext();

  const debouncedValues = useDebounce(values, 500);

  useEffect(() => {
    submitForm();
  }, [debouncedValues]);

  return <tr className={clsx("border-separate bg-slate-100")}>{children}</tr>;
};

export default FilterRow;
