import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import Modal from "../Modal";
import Button from "../ui/Button";
import { Dispatch } from "react";

type DeleteModalProps = {
  deleteModal: boolean;
  setDeleteModal: Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal = ({ deleteModal, setDeleteModal }: DeleteModalProps) => {
  const modalRef = useOnOutsideClick(() => setDeleteModal(false));
  return (
    <Modal
      isOpen={deleteModal}
      handleClose={() => setDeleteModal(false)}
      ref={modalRef}
    >
      <div className="flex w-full my-8 gap-2 flex-col">
        <p className="text-lg">Are you sure to delete the record?</p>
        <Button className="ml-auto">Yes, Delete</Button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
