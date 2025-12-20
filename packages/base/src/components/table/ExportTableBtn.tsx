import { FaRegFileExcel } from "react-icons/fa";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import Button from "../button";
import { useTable } from "../../helpers/contexts/TableContext";

const ExportTableBtn = () => {
  const { tableLoading } = useTable();
  return (
    <>
      <CustomTooltip content={"export excel"}>
        <Button
          variant="outline"
          disabled={tableLoading}
          btnType="success"
          className="p-5 !m-0 "
          onClick={() => console.log("refresh")}
        >
          <FaRegFileExcel size={25} />
        </Button>
      </CustomTooltip>
    </>
  );
};

export default ExportTableBtn;
