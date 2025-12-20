import Modal from ".";
import Column from "../grid/Column";
import Grid from "../grid/Grid";
import Image from "../image";
import Typography from "../typography";
import Button from "../button";

interface DeleteModalPros {
  title?: string;
  size?: "auto" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl" | "full";
  onClose: () => void;
  onClick?: (e: any) => void;
  massage?: string;
  isOpen: boolean;
}

const DeleteModal = ({
  onClose,
  onClick,
  isOpen,
  size = "auto",
  massage = "are you sure?",
  title = "Delete",
}: DeleteModalPros) => {
  const handleClick = (e: any) => {
    if (!onClick) {
    } else {
      onClick?.(e);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      size={size}
      variant="error"
      className="text-error-500"
      onClose={onClose}
    >
      <Grid className=" w-full gap-y-6">
        <Column sm={12} className="flex items-center justify-center">
          <Image
            src="/Images/delete.png"
            className="!h-16 animate-bounce"
            alt="delete"
          />
        </Column>
        <Column sm={12} className="flex items-center justify-center">
          <Typography tag="p"> {massage}</Typography>
        </Column>
        <Column sm={12} className="flex gap-x-5 items-center justify-center">
          <Button onClick={handleClick} size="md" btnType="error">
            Yes
          </Button>
          <Button size="md" onClick={onClose}>
            No
          </Button>
        </Column>
      </Grid>
    </Modal>
  );
};

export default DeleteModal;
