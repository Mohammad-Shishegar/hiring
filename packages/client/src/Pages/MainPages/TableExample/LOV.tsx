import Button from "#base/src/components/button";
import Checkbox from "#base/src/components/checkbox/Checkbox";
import CheckboxField from "#base/src/components/checkbox/CheckboxFeild";
import { ho } from "#base/src/components/table/helperTypes";
import TableBody from "#base/src/components/table/TableBody";
import TableCell from "#base/src/components/table/TableCell";
import TableCellAction from "#base/src/components/table/TableCellAction";
import TableContainer from "#base/src/components/table/TableContainer";
import TableRow from "#base/src/components/table/TableRow";
import useTableGet from "#base/src/helpers/api/useTableGet";
import { useFormikContext } from "formik";
import { useEffect } from "react";

const LOV = ({ closeModal }: any) => {
  const { data, isFetching, ...table } = useTableGet(
    "https://jsonplaceholder.typicode.com/users",
    ["modal-table"],
    {},
    [{ name: "ali", type: "number", value: "22" }],
    true,
    {}
  );
  const { values, setFieldValue } = useFormikContext();

  const handleSelectData = async (item: any) => {
    await setFieldValue("person", { userName: item?.username, id: item?.id });
    closeModal();
  };

  return (
    <>
      <TableContainer
        api="https://jsonplaceholder.typicode.com/users"
        formModalSize="sm"
        //   filterRow={<TestFilterRow />}
        columns={[
          ho("id", "", "", false, false, false, true),
          ho("name", "name", "dropdown", true, true, true, true),
        ]}
        tableLoading={isFetching}
        title="test"
        subTitle="this is subTitle"
        hasCreateBtn={false}
        hasExcel={false}
        showPageSize={false}
        showPageNumber={false}
        data={data}
        queryKey={["modal-table"]}
        requestData={table}
      >
        <TableBody>
          {data?.map((item: any, index: number) => (
            <TableRow index={index}>
              <TableCell>
                <Button onClick={() => handleSelectData(item)}>select</Button>
              </TableCell>
              <TableCell>{item?.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </>
  );
};

export default LOV;
