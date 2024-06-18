import DeleteModal from "@/components/DeleteModal";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
  removeAddress,
  resetAddressCurrentItem,
  selectAddressCurrentItem,
} from "../addressSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const AddressDelete = () => {
  const { isOpen, close, open } = useDisclosure();
  const { status, action, record, error } = useAppSelector(
	selectAddressCurrentItem
  );
  const dispatch = useAppDispatch();
  const handleCancel = () => {
	close();
	dispatch(resetAddressCurrentItem());
  };
  const handleSubmit = async () => {
	if (record) {
	  await dispatch(removeAddress(record.id));
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

export default AddressDelete;
