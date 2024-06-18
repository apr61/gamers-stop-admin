import BrandForm from "./BrandForm";
import { useDisclosure } from "@/hooks/useDisclosure";
import Modal from "@/components/ui/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	editBrand,
	resetBrandCurrentItem,
	selectBrandCurrentItem,
} from "../brandsSlice";
import { useEffect } from "react";
import { BrandFormValues } from "@/types/api";

const CreateBrand = () => {
	const { isOpen, open, close } = useDisclosure();
	const { action, record } = useAppSelector(selectBrandCurrentItem);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		close();
		dispatch(resetBrandCurrentItem());
	};

	useEffect(() => {
		if (action === "update") {
			open();
		}
	}, [action]);
	if (record === null) return;

	const onSave = async (data: BrandFormValues) => {
		await dispatch(editBrand({ formData: data, id: record.id }));
		dispatch(resetBrandCurrentItem());
	};

	return (
		<Modal isOpen={isOpen} handleClose={handleClose} title="Brand">
			<div className="min-w-[20rem]">
				<BrandForm
					title="Edit brand"
					onSavefn={onSave}
					brand={{ brand_name: record.brand_name } as BrandFormValues}
				/>
			</div>
		</Modal>
	);
};

export default CreateBrand;
