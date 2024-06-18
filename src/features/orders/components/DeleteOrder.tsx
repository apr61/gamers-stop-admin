import DeleteModal from "@/components/DeleteModal";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
	removeOrder,
	resetOrderCurrentItem,
	selectOrdersCurrentItem,
} from "../orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const DeleteOrder = () => {
	const { isOpen, close, open } = useDisclosure();
	const { status, action, record, error } = useAppSelector(
		selectOrdersCurrentItem
	);
	const dispatch = useAppDispatch();
	const handleCancel = () => {
		close();
		dispatch(resetOrderCurrentItem());
	};
	const handleSubmit = async () => {
		if (record) {
			await dispatch(removeOrder(record.id));
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

export default DeleteOrder;
