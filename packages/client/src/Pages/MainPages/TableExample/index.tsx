import { ho } from "#base/src/components/table/helperTypes";
import TableBody from "#base/src/components/table/TableBody";
import TableContainer from "#base/src/components/table/TableContainer";
import TableRow from "#base/src/components/table/TableRow";
import useTableGet from "#base/src/helpers/api/useTableGet";
import {
  permissionGateFunction,
  PermissionGate,
} from "#base/src/helpers/permission/PermissionGate";
import TableCell from "../../../../../base/src/components/table/TableCell";
import TableCellAction from "../../../../../base/src/components/table/TableCellAction";
import CreateUpdateData from "./CreateUpdateData";
import Detail from "./Detail";
import TestFilterRow from "./TestFilterRow";

const Test = () => {
  const loading = true;
  const showFilter = true;
  const { data, isFetching, ...table } = useTableGet(
    "https://jsonplaceholder.typicode.com/users",
    ["table"],
    {},
    [{ name: "ali", type: "number", value: "22" }],
    true,
    {}
  );
  return (
    <TableContainer
      api="https://jsonplaceholder.typicode.com/users"
      formModalSize="sm"
      filterRow={
        <PermissionGate permissions={["ADMIN"]}>
          <TestFilterRow />
        </PermissionGate>
      }
      columns={[
        // ho("id", "", "", false, false, false, true),
        ho(
          "name",
          "name",
          "dropdown",
          true,
          true,
          true,
          permissionGateFunction(["ADMIN"])
        ),
        ho("username", "username", "dropdown", true, true, true, true),
        ho("age", "age", "number", true, true, true, true),
        ho("city", "city", "text", true, true, true, true),
        ho("job", "job", "dropdown", true, true, true, true),
        ho("id", "", "", false, false, false, true),
      ]}
      tableLoading={isFetching}
      title="test"
      subTitle="this is subTitle"
      hasCreateBtn={permissionGateFunction(["ADMIN"])}
      hasExcel={false}
      showPageSize={true}
      showPageNumber={true}
      data={data}
      queryKey={["table"]}
      requestData={table}
      detailModal={<Detail />}
      formModal={<CreateUpdateData />}
    >
      <TableBody>
        {data?.map((item: any, index: number) => (
          <TableRow index={index}>
            <PermissionGate permissions={["ADMIN"]} key={index}>
              <TableCell>
                <TableCellAction
                  index={index}
                  showDetailbtn={false}
                  showExtrabtn={false}
                  showEditbtn={true}
                  showDeletebtn={true}
                  rowData={item}
                />
              </TableCell>
            </PermissionGate>
            <TableCell>{item?.name}</TableCell>
            <TableCell>{item?.username}</TableCell>
            <TableCell>{item?.phone}</TableCell>
            <TableCell>{item?.id}</TableCell>
            <TableCell>
              <TableCellAction
                index={index}
                showEditbtn={false}
                showDeletebtn={false}
                showDetailbtn={true}
                showExtrabtn={true}
                rowData={item}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export default Test;
