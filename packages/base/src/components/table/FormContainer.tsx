import { Form, Formik } from "formik";
import { useTable } from "../../helpers/contexts/TableContext";
import Grid from "../grid/Grid";
import Loading from "../loading";
import { useEffect, useState } from "react";

interface IFormContainer {
  children: React.ReactNode;
  loadingForm: boolean;
  initialValues: object;
  validationSchema: object;
  onSubmit: (values: any, resetForm: Function) => void;
  data?: any;
}

const FormContainer = ({
  children,
  loadingForm,
  initialValues,
  validationSchema,
  onSubmit,
  data,
}: IFormContainer) => {
  const { rowData, modalStatus } = useTable();
  const [runFlag, setRunFlag] = useState(false);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      key={modalStatus === "UPDATE" ? rowData?.id : "create"}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        if (onSubmit) onSubmit(values, resetForm);
      }}
    >
      {({ isSubmitting, setValues, values }) => {
        useEffect(() => {
          if (
            modalStatus === "UPDATE" &&
            data &&
            !runFlag &&
            Object.values(data).every(
              (v) => v !== undefined && v !== null && v !== ""
            )
          ) {
            setValues(data);
            setRunFlag(true);
          }
        }, [data, modalStatus]);

        return (
          <>
            {loadingForm ? (
              <Loading />
            ) : (
              <Form className="!w-full">
                <Grid className="!w-full">{children}</Grid>
              </Form>
            )}
          </>
        );
      }}
    </Formik>
  );
};

export default FormContainer;
