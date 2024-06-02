import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import {
  closeDeleteModal,
  selectDeleteModal,
} from "../../redux/slice/uiActionsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { CrudConfig } from "../../utils/types";

type DeleteModalProps<T> = {
  config: CrudConfig<T>;
};

function DeleteModal<T>({ config }: DeleteModalProps<T>) {
  const dispatch = useAppDispatch();
  const modalRef = useOnOutsideClick(() => dispatch(closeDeleteModal()));
  const deleteModal = useAppSelector(selectDeleteModal);
  const { record, status, error } = config.entity.current;
  const handleCancel = () => {
    dispatch(closeDeleteModal());
    config.entity.resetEntityStateFn();
  };
  const handleDelete = async () => {
    if (record) {
      await config.entity.deleteFn(record);
      dispatch(closeDeleteModal());
      config.entity.resetEntityStateFn();
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
