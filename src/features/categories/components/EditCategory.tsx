import Drawer from "@/components/ui/Drawer";
import CategoryForm from "./CategoryForm";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import {
	resetCategoryCurrentItem,
	selectCategoryCurrentItem,
} from "@/redux/slice/categorySlice";
import { useEffect } from "react";

const EditCategory = () => {
	const { action } = useAppSelector(selectCategoryCurrentItem);
	const { isOpen, close, open } = useDisclosure();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (action === "update") {
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
		>
			<CategoryForm title="Edit Category" />
		</Drawer>
	);
};

export default EditCategory;
