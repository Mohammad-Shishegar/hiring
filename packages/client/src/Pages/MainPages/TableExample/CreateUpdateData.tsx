import Button from "#base/src/components/button";
import Column from "#base/src/components/grid/Column";
import TextField from "#base/src/components/input/TextField";
import Modal from "#base/src/components/modal";
import FormContainer from "#base/src/components/table/FormContainer";
import { useGetById } from "#base/src/helpers/api/useGetById";
import { usePost } from "#base/src/helpers/api/usePost";
import { useTable } from "#base/src/helpers/contexts/TableContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LOV from "./LOV";
import { keepPreviousData } from "@tanstack/react-query";

const CreateUpdateData = () => {
  const initialValue = { name: "", age: "", person: { userName: "", id: "" } };
  const [openLOV, setOpenLOV] = useState(false);
  const handleOpenLOV = () => setOpenLOV(true);
  const handleCloseLOV = () => setOpenLOV(false);
  const [initialValues, setInitialValue] = useState(initialValue);
  const { handleCloseModal, api, queryKey, rowData, modalStatus } = useTable();
  const { data, mutate, isPending } = usePost(
    api + (modalStatus == "UPDATE" ? "/update" : "/create"),
    queryKey
  );

  const {
    data: singleData,
    refetch,
    isFetching,
  } = useGetById(
    api,
    rowData?.id!,
    queryKey,
    Boolean(modalStatus === "UPDATE" && rowData?.id)
  );
  console.log(isFetching);
  console.log(rowData?.id);
  console.log(singleData);

  const onSubmit = (values: any, resetForm: Function) => {
    const data = { name: values?.name, age: values?.age };
    mutate(data, {
      onSuccess: (data) => {
        toast.success("data create");
      },
      onError: (er) => {
        toast.error("an error occured");
      },
      onSettled: () => {
        handleCloseModal();
      },
    });
  };

  // useEffect(() => {
  //   if (singleData && modalStatus === "UPDATE")
  //     setInitialValue({
  //       name: singleData?.[0]?.name,
  //       age: singleData?.[0]?.id,
  //       id: singleData?.[0]?.id,
  //     });
  //   else setInitialValue(initialValue);
  // }, [singleData]);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(0, "Age must be positive")
      .required("Age is required"),
    person: Yup.object()
      .required()
      .shape({ userName: Yup.string(), id: Yup.string() }),
  });

  return (
    <>
      <FormContainer
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        loadingForm={isFetching}
        data={{
          name: singleData?.[0]?.name,
          age: singleData?.[0]?.id,
          id: singleData?.[0]?.id,
          person: {
            userName: singleData?.[0]?.username,
            id: singleData?.[0]?.id,
          },
        }}
      >
        <Column md={6}>
          <TextField disabled={isPending} label="name" name="name" />
        </Column>
        <Column md={6}>
          <TextField disabled={isPending} label="age" name="age" />
        </Column>
        <Column md={6}>
          <TextField
            disabled={isPending}
            handleFocus={() => handleOpenLOV()}
            label="modal"
            name="person.userName"
          />
        </Column>

        <Column md={12}>
          <Button size="md" type="submit" loading={isPending}>
            Submit
          </Button>
        </Column>
        <Modal isOpen={openLOV} onClose={handleCloseLOV} size="auto">
          <LOV closeModal={handleCloseLOV} />
        </Modal>
      </FormContainer>
    </>
  );
};

export default CreateUpdateData;
