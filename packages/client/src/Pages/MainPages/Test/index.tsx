import PersianDatePickerInputField from "#base/src/components/datePicker/PersianDatePickerField";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  birthDate: Yup.string().required("تاریخ لازم است"),
});
function Test() {
  return (
    <div>
      {/* <CustomeDatePicker
        onChange={(e) => {
          if (e) {
            console.log(e.format("YYYY/MM/DD T HH:MM:SS"));
          }
        }}
      /> */}
      <Formik
        initialValues={{ birthDate: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => console.log(values)}
      >
        <Form>
          <PersianDatePickerInputField
            name="birthDate"
            label="تاریخ تولد"
            hasTime={false}
            format="YYYY/MM/DD"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Test;
