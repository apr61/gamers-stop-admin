import DeleteModal from "@/components/DeleteModal";
import { useDisclosure } from "@/hooks/useDisclosure";
import {
	removeBrand,
	resetBrandCurrentItem,
	selectBrandCurrentItem,
} from "../brandsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const DeleteBrand = () => {
	const { isOpen, close, open } = useDisclosure();
	const { status, action, record, error } = useAppSelector(
		selectBrandCurrentItem
	);
	const dispatch = useAppDispatch();
	const handleCancel = () => {
		close();
		dispatch(resetBrandCurrentItem());
	};
	const handleSubmit = async () => {
		if (record) {
			await dispatch(removeBrand(record.id));
			dispatch(resetBrandCurrentItem());
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

export default DeleteBrand;
