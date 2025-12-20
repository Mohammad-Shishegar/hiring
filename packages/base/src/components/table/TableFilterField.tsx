import { Form, Formik } from "formik";
import { useTable } from "../../helpers/contexts/TableContext";
import { paramType } from "./helperTypes";
import { useEffect, useState } from "react";

interface ITableFilterField {
  children: React.ReactNode;
}

const TableFilterField = ({ children }: ITableFilterField) => {
  const { setMeta, columns } = useTable();
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    const temp = columns.reduce((initialValues, col) => {
      const key = Object.keys(col)[0];
      initialValues[key] = "";
      return initialValues;
    }, {} as Record<string, string>);
    setInitialValues(temp);
  }, [columns]);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values: any) => {
        let customValues: paramType[] = [];
        columns?.forEach((item) => {
          const key: string = Object.keys(item)?.[0];
          const type = item?.[key]?.type;
          if (values[key]) {
            if (type === "dropdown")
              customValues.push({ name: key, value: values[key]?.value, type: type });
            else
              customValues.push({ name: key, value: values[key], type: type });
          }
          return null;
        });
        setMeta((cv: object) => ({ ...cv, Tablefilters: customValues }));
      }}
    >
      <Form className="form">{children}</Form>
    </Formik>
  );
};

export default TableFilterField;
