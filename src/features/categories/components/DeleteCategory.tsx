import DeleteModal from "@/components/DeleteModal";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  removeCategory,
  resetCategoryCurrentItem,
  selectCategoryCurrentItem,
} from "../categorySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const CategoryDelete = () => {
  const { isOpen, close, open } = useDisclosure();
  const { status, action, record, error } = useAppSelector(
    selectCategoryCurrentItem
  );
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    close();
    dispatch(resetCategoryCurrentItem());
  };
  const handleSubmit = async () => {
    if (record) {
      await dispatch(removeCategory(record.id));
    }
  };
  useEffect(() => {
    if (action === "delete") {
      open();
    }
  }, [action]);
  useEffect(() => {
    if (status === "succeeded" && action === "delete") {
      close();
    }
  }, [status]);
  return (
    <DeleteModal
      handleCancel={handleCancel}
      onSubmit={handleSubmit}
      status={status}
      error={error}
      isModalOpen={isOpen}
    />
  );
};

export default CategoryDelete;
