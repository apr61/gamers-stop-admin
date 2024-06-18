import { useDisclosure } from "@/hooks/useDisclosure";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
	resetAddressCurrentItem,
	selectAddressCurrentItem,
} from "../addressSlice";
import { useEffect } from "react";
import Drawer from "@/components/ui/Drawer";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";

const ReadAddress = () => {
	const { isOpen, close, open } = useDisclosure();
	const { action, record } = useAppSelector(selectAddressCurrentItem);
	const dispatch = useAppDispatch();
	const handleCancel = () => {
		close();
		dispatch(resetAddressCurrentItem());
	};

	useEffect(() => {
		if (action === "read") {
			open();
		}
	}, [action]);

	if (record === null) return;

	return (
		<Drawer
			isDrawerOpen={isOpen}
			closeDrawer={handleCancel}
			title="Shipping Address"
		>
			<div className="flex flex-col gap-2 w-full">
				<div className="flex flex-col gap-2">
					<h2 className="text-xl font-bold">Delivering to : </h2>
					<p className="text-lg">{record.name}</p>
					<p>+91-{record.phoneNumber}</p>
					<p>
						{record.address}, {record.townLocality}, {record.cityDistrict}
					</p>
					<p>
						{record.state}, {record.pincode}
					</p>
					<p>Is Default address : {record.isDefault ? "YES" : "NO"}</p>
					<p>Address Id : {record.id}</p>
				</div>
				<div className="flex flex-col gap-2">
					<h3 className="text-lg font-semibold">User Details : </h3>
					<div className="flex gap-2">
						<div className="w-12 h-12 rounded-full overflow-hidden">
							<img
								src={
									record?.user.avatar_url
										? record?.user.avatar_url
										: BlankUserProfile
								}
								className="w-full h-full object-cover"
								loading="lazy"
								alt={record?.user.full_name}
							/>
						</div>
						<div>
							<h3 className="text-xl">{record.user.full_name}</h3>
							<p>{record.user.email}</p>
							<p>{record.phoneNumber}</p>
						</div>
					</div>
				</div>
			</div>
		</Drawer>
	);
};

export default ReadAddress;
