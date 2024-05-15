import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import {
  removeCategory,
  resetActionType,
  selectCurrentItem,
} from "../../redux/slice/categoriesSlice";
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
  const { record, status, error } = useAppSelector(selectCurrentItem);
  const handleCancel = () => {
    dispatch(closeDeleteModal());
    dispatch(resetActionType());
  };
  const handleDelete = async () => {
    if (record) {
      await dispatch(removeCategory(record));
      dispatch(closeDeleteModal());
      dispatch(resetActionType());
    }
  };

  return (
    <Modal
      isOpen={deleteModal}
      handleClose={() => dispatch(closeDeleteModal())}
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
            onClick={handleDelete}
            disabled={status === "pending"}
          >
            Yes, Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
