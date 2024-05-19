import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import {
  removeEntity,
  resetActionType,
  selectCurrentItem,
} from "../../redux/slice/crudSlice";
import {
  closeDeleteModal,
  selectDeleteModal,
} from "../../redux/slice/crudActionsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Modal from "../Modal";
import Button from "../ui/Button";
import { CrudConfig, CrudType } from "../../utils/types";

type DeleteModalProps = {
  config: CrudConfig
}

const DeleteModal = ({config} : DeleteModalProps) => {
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
      const data : CrudType = {
        id: record.id,
        tableName: config.TABLE_NAME,
        data: record,
        withFile: true
      }
      await dispatch(removeEntity(data));
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
