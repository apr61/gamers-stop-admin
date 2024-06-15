import {
  removeProduct,
  resetProductCurrentItem,
  selectProdcutsCurrentItem,
} from "../productSlice";
import { useEffect } from "react";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import DeleteModal from "@/components/DeleteModal";

const CategoryDelete = () => {
  const { isOpen, close, open } = useDisclosure();
  const { status, action, record, error } = useAppSelector(
    selectProdcutsCurrentItem
  );
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    close();
    dispatch(resetProductCurrentItem());
  };
  const handleSubmit = async () => {
    if (record) {
      await dispatch(removeProduct(record.id));
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
