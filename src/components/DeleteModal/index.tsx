import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import Modal from "../ui/Modal";
import Button from "../ui/Button";

type DeleteModalProps = {
  handleCancel: () => void;
  onSubmit: () => Promise<void>;
  isModalOpen: boolean;
  modalClose: () => void;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

function DeleteModal({
  handleCancel,
  onSubmit,
  isModalOpen,
  modalClose,
  status,
  error,
}: DeleteModalProps) {
  const modalRef = useOnOutsideClick(() => modalClose());

  return (
    <Modal
      isOpen={isModalOpen}
      handleClose={() => modalClose()}
      ref={modalRef}
      title="Delete Confirmation"
    >
      <div className="flex w-full gap-2 flex-col">
        <p className="text-lg">Are you sure to delete the record?</p>
        {error && <p className="text-red-500">{error}</p>}
        <div className="ml-auto flex gap-2">
          <Button btnType="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            btnType="primary"
            onClick={onSubmit}
            disabled={status === "pending"}
            loading={status === "pending"}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
