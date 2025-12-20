import { FaEdit, FaInfo, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useTable } from "../../helpers/contexts/TableContext";
import Button from "../button";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import Typography from "../typography";

interface ITableAddDeleteBtn {
  showDeletebtn?: boolean;
  showEditbtn?: boolean;
  showDetailbtn?: boolean;
  showExtrabtn?: boolean;
  rowData: {};
  index:number
}

const TableCellAction = ({
  rowData,
  showEditbtn = false,
  showDeletebtn = false,
  showDetailbtn = false,
  showExtrabtn = false,
  index
}: ITableAddDeleteBtn) => {
  const { setModal: changeModalStatus, setRowData , meta} = useTable();

  return (
    <div className="flex items-center justify-around">

      {Boolean(!showEditbtn && !showDeletebtn && !showDetailbtn && !showExtrabtn) && <Typography tag="p">{(parseInt(meta?.page) - 1) *parseInt(meta?.pageSize) + index + 1}</Typography>
    }
      {showEditbtn ? (
        <CustomTooltip content={"Edit"}>
          <Button
            variant="outline"
            size="sm"
            btnType="success"
            className=" group"
            onClick={() => {
              setRowData(rowData);
              changeModalStatus("UPDATE");
            }}
          >
            <FaEdit
              size={18}
              className="text-success-500 group-hover:text-white"
            />
          </Button>
        </CustomTooltip>
      ) : null}

      {showDetailbtn ? (
        <CustomTooltip content={"Detail"}>
          <Button
            variant="outline"
            size="sm"
            className=" group"
            onClick={() => {
              setRowData(rowData);
              changeModalStatus("DETAIL");
            }}
          >
            <FaInfo
              size={18}
              className="text-seconary-500 group-hover:text-white"
            />
          </Button>
        </CustomTooltip>
      ) : null}

      {showDeletebtn ? (
        <CustomTooltip content={"Delete"}>
          <Button
            variant="outline"
            size="sm"
            btnType="error"
            className="group"
            onClick={() => {
              setRowData(rowData);
              changeModalStatus("DELETE");
            }}
          >
            <RiDeleteBin6Line
              size={18}
              className="text-error-500 group-hover:text-white"
            />
          </Button>
        </CustomTooltip>
      ) : null}

      {showExtrabtn ? (
        <Button
          size="md"
          className="group"
          onClick={() => {
            setRowData(rowData);
            changeModalStatus("EXTRA");
          }}
        >
          <FaPlus
            size={18}
            className="text-secondary-500 group-hover:text-white"
          />
        </Button>
      ) : null}
    </div>
  );
};

export default TableCellAction;
