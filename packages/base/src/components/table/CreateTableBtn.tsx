import clsx from "clsx";
import { IoMdAdd } from "react-icons/io";
import { CustomTooltip } from "../tooltip/CustomTooltip";
import Button from "../button";
import Typography from "../typography";
import { useTable } from "../../helpers/contexts/TableContext";

const CreateTableBtn = () => {
  const { setModal, tableLoading } = useTable();

  return (
    <>
      <CustomTooltip content={"add"}>
        <Button
          disabled={tableLoading}
          variant="outline"
          startIcon={<IoMdAdd size={25} />}
          className={clsx("p-5 flex items-center justify-around !w-20 group")}
          onClick={() => setModal("CREATE")}
        >
          <Typography tag="p" className={clsx("mb-1 group-hover:!text-white")}>
            Add
          </Typography>
        </Button>
      </CustomTooltip>
    </>
  );
};

export default CreateTableBtn;
