import { useDelete } from "../../helpers/api/useDelete";
import { useTable } from "../../helpers/contexts/TableContext";
import Modal, { modalSizeType } from "../modal";
import DeleteModal from "../modal/DeleteModal";
import { toast } from "react-toastify";

interface IModalContainer {
  formModal?: React.ReactNode;
  detailModal?: React.ReactNode;
  extraModal?: React.ReactNode;
  formModalSize?: modalSizeType;
  detailModalSize?: modalSizeType;
  formModalTitle?: string;
}

const ModalContainer = ({
  detailModal,
  detailModalSize,
  formModal,
  formModalSize,
  formModalTitle,
  extraModal,
}: IModalContainer) => {
  const { setModal, modalStatus, handleCloseModal, api, rowData, queryKey } =
    useTable();

  const handlecloseDeleteModal = () => {
    setModal(false);
  };

  const { mutate } = useDelete(api + "/delete", queryKey);

  const handleDeleteRow = () => {
    if (rowData?.id) {
      mutate(rowData?.id, {
        onSuccess: () => {
          toast.success("User deleted successfully ✅");
        },
        onError: () => {
          toast.error("User deleted Unsuccessfully ❌");
        },
      });
    } else toast.warning("There is No Id to Delete ⚠️");
  };

  const handleFormModalTitle = () => {
    if (modalStatus === "CREATE") return "Create " + formModalTitle;
    else return "Update " + formModalTitle;
  };

  return (
    <>
      {/* Form Modal */}
      <Modal
        title={handleFormModalTitle()}
        size={formModalSize}
        isOpen={Boolean(modalStatus === "CREATE" || modalStatus === "UPDATE")}
        onClose={handleCloseModal}
      >
        {formModal}
      </Modal>

      {/* Detail Modal */}
      <Modal
        size={detailModalSize}
        isOpen={Boolean(modalStatus === "DETAIL")}
        onClose={handleCloseModal}
      >
        {detailModal}
      </Modal>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={Boolean(modalStatus === "DELETE")}
        onClose={() => handlecloseDeleteModal()}
        massage="Are you Sure Want To Delete This Row?"
        onClick={() => {
          handleDeleteRow();
        }}
      ></DeleteModal>

      {/* Extra Modal */}
      <Modal
        isOpen={Boolean(modalStatus === "EXTRA")}
        onClose={handleCloseModal}
      >
        {extraModal}
      </Modal>
    </>
  );
};

export default ModalContainer;
