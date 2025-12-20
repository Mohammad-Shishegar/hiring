import { MdOutlineRefresh } from "react-icons/md";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import Button from "../button";
import { useTable } from "../../helpers/contexts/TableContext";
import { useQueryClient } from "@tanstack/react-query";
import { useFormikContext } from "formik";

const RefreshTableBtn = () => {
  const queryClient = useQueryClient();
  const { queryKey, setMeta, tableLoading, setInitialMeta } = useTable();

  const { resetForm, values, initialValues } = useFormikContext();

  const handleTableInvalidateQueries = () => {
    resetForm();
    setInitialMeta();

    //refreshs with filter and prev page and page size
    // if (noData)
    queryKey?.map((item) =>
      queryClient?.invalidateQueries({ queryKey: [item] })
    );
  };

  return (
    <>
      <CustomTooltip content={"refesh"}>
        <Button
          variant="outline"
          disabled={tableLoading}
          className="p-5 !m-0"
          onClick={() => handleTableInvalidateQueries()}
        >
          <MdOutlineRefresh size={25} />
        </Button>
      </CustomTooltip>
    </>
  );
};

export default RefreshTableBtn;
