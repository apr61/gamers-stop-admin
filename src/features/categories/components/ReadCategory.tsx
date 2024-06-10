import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
  resetCategoryCurrentItem,
  selectCategoryCurrentItem,
} from "../categorySlice";
import { useEffect } from "react";
import { useOnOutsideClick } from "@/hooks/useOnClickOutside";
import Modal from "@/components/ui/Modal";

const ReadCategory = () => {
  const { isOpen, close, open } = useDisclosure();
  const { action, record } = useAppSelector(selectCategoryCurrentItem);
  const dispatch = useAppDispatch();
  const handleCancel = () => {
    close();
    dispatch(resetCategoryCurrentItem());
  };
  const modalRef = useOnOutsideClick(() => handleCancel());

  useEffect(() => {
    if (action === "read") {
      open();
    }
  }, [action]);

  return (
    <Modal
      isOpen={isOpen}
      ref={modalRef}
      handleClose={handleCancel}
      title="Category"
    >
      <div className="max-w-sm w-full flex flex-col gap-4">
        <img
          src={record?.category_image}
          alt={record?.category_name}
          loading="lazy"
          className="w-[10rem] h-[10rem]"
        />
        <h3 className="text-xl">{record?.category_name}</h3>
      </div>
    </Modal>
  );
};

export default ReadCategory;
