import Drawer from "@/components/ui/Drawer";
import CategoryForm from "./CategoryForm";
import {
	resetCategoryCurrentItem,
	selectCategoryCurrentItem,
} from "../categorySlice";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

const CreateCategory = () => {
	const { action } = useAppSelector(selectCategoryCurrentItem);
	const { isOpen, close, open } = useDisclosure();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (action === "create") {
			open();
		}
	}, [action]);

	const handleClose = () => {
		dispatch(resetCategoryCurrentItem());
		close();
	};
	return (
		<Drawer
			isDrawerOpen={isOpen}
			closeDrawer={handleClose}
			title="Category"
			className="bg-dimBlack"
		>
			<CategoryForm title="Add new category" />
		</Drawer>
	);
};

export default CreateCategory;
