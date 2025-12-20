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
  onClick: (e: any) => void;
  massage: string;
  isOpen: boolean;
  alt?: string;
  imageSrc?: string;
}

const ConfirmModal = ({
  onClose,
  onClick,
  isOpen,
  size = "auto",
  massage = "are you sure?",
  title = "Approve Modal",
  alt = "Approve Modal",
  imageSrc = "/Images/ok.png",
}: DeleteModalPros) => {
  const handleClick = (e: any) => {
    onClick && onClick?.(e);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      size={size}
      variant="success"
      className="text-success-500"
      onClose={onClose}
    >
      <Grid className=" w-full gap-y-6">
        <Column sm={12} className="flex items-center justify-center">
          <Image src={imageSrc} className="!h-16 animate-bounce" alt={alt} />
        </Column>
        <Column sm={12} className="flex items-center justify-center">
          <Typography tag="p"> {massage}</Typography>
        </Column>
        <Column sm={12} className="flex gap-x-5 items-center justify-center">
          <Button onClick={handleClick} size="md" btnType="success">
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

export default ConfirmModal;
