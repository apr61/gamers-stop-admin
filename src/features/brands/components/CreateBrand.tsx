import BrandForm from "./BrandForm";
import { useDisclosure } from "@/hooks/useDisclosure";
import Modal from "@/components/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addBrand, resetBrandCurrentItem, selectBrandCurrentItem } from "../brandsSlice";
import { useEffect } from "react";
import { BrandFormValues } from "@/types/api";

const CreateBrand = () => {
	const { isOpen, open, close } = useDisclosure();
	const { action } = useAppSelector(selectBrandCurrentItem);
	const dispatch = useAppDispatch();
	const handleClose = () => {
		dispatch(resetBrandCurrentItem());
		close();
	};
	useEffect(() => {
		if (action === "create") {
			open();
		}
	}, [action]);
	const onSave = async (data : BrandFormValues) => {
		await dispatch(addBrand(data))
	}
	return (
		<Modal isOpen={isOpen} handleClose={handleClose} title="Brand">
			<div className="min-w-[20rem]">
				<BrandForm title="Add new brand" onSavefn={onSave} />
			</div>
		</Modal>
	);
};

export default CreateBrand;
