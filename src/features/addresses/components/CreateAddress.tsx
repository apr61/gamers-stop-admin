import Drawer from "@/components/ui/Drawer";
import AddressForm from "./AddressForm";
import {
	addAddress,
	resetAddressCurrentItem,
	selectAddressCurrentItem,
} from "../addressSlice";
import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import { AddressFormValues } from "@/types/api";
import { useAuth } from "@/hooks/useAuth";

const CreateAddress = () => {
	const { action } = useAppSelector(selectAddressCurrentItem);
	const { isOpen, close, open } = useDisclosure();
	const dispatch = useAppDispatch();
	const { user } = useAuth();

	useEffect(() => {
		if (action === "create") {
			open();
		}
	}, [action]);

	const handleClose = () => {
		dispatch(resetAddressCurrentItem());
		close();
	};
	const handleSave = async (data: AddressFormValues) => {
		await dispatch(addAddress({ formData: { ...data, userId: user?.id! } }));
		close();
		dispatch(resetAddressCurrentItem());
	};
	return (
		<Drawer isDrawerOpen={isOpen} closeDrawer={handleClose} title="Address">
			<AddressForm title="Add new address" onSaveFn={handleSave} />
		</Drawer>
	);
};

export default CreateAddress;
