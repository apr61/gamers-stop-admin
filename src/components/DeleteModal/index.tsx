import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import {
  closeDeleteModal,
  selectDeleteModal,
} from "../../redux/slice/crudStateSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Modal from "../Modal";
import Button from "../ui/Button";

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const modalRef = useOnOutsideClick(() => dispatch(closeDeleteModal()));
  const deleteModal = useAppSelector(selectDeleteModal);
  return (
    <Modal
      isOpen={deleteModal}
      handleClose={() => dispatch(closeDeleteModal())}
      ref={modalRef}
      title="Delete Confirmation"
    >
      <div className="flex w-full gap-2 flex-col">
        <p className="text-lg">Are you sure to delete the record?</p>
        <div className="ml-auto flex gap-2">
          <Button btnType="ghost">Cancel</Button>
          <Button btnType="primary">Yes, Delete</Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
