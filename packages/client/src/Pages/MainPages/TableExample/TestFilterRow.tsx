import DropdownField from "#base/src/components/dropdown/DropdownFeild";
import TextField from "#base/src/components/input/TextField";
import FilterRow from "#base/src/components/table/FilterRow";
import TableFilterCell from "#base/src/components/table/TableFilterCell";
import { useTable } from "#base/src/helpers/contexts/TableContext";

const TestFilterRow = () => {
  const { tableLoading } = useTable();

  return (
    <FilterRow>
      <TableFilterCell></TableFilterCell>
      <TableFilterCell>
        <DropdownField
        
          disabled={tableLoading}
          options={[{ label: "a", value: "a" }]}
          name="name"
          label=""
        />
        {/* <TextField name="name" label="" /> */}
      </TableFilterCell>
      <TableFilterCell>
        <TextField
          disabled={tableLoading}
          name="age"
          label=""
          type="number"
        />
      </TableFilterCell>
      <TableFilterCell>
        {/* <TextField name="name" label="" /> */}
      </TableFilterCell>
      <TableFilterCell>
        {/* <TextField name="name" label="" /> */}
      </TableFilterCell>
      <TableFilterCell>
        {/* <TextField name="name" label="" /> */}
      </TableFilterCell>
    </FilterRow>
  );
};

export default TestFilterRow;
