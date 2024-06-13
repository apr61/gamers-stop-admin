import {
	addressSearch,
	selectAddresses,
	selectAddressSearch,
	selectAddressItemsView,
	setAddressCurrentItem,
} from "../addressSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Address, ColumnConfig, QueryType } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { GridItemsAction, TableActions } from "@/components/ItemActions";
import ItemsGridLayout from "@/components/layouts/ItemsGridLayout";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";

const columns: ColumnConfig<Address>[] = [
	{
		title: "ID",
		dataIndex: "id",
	},
	{
		title: "Customer",
		render: (record: Address) => (
			<div className="flex gap-2 items-center">
				<img
					className="w-10 h-10 rounded-full"
					src={
						record?.user.avatar_url
							? record?.user.avatar_url
							: BlankUserProfile
					}
					alt={record?.user.full_name}
				/>
				<p>{record.user.full_name}</p>
			</div>
		),
	},
	{
		title: "Default",
		dataIndex: "isDefault",
		render: (record: Address) => (record.isDefault ? "Yes" : "No"),
	},
	{
		title: "Phone Number",
		dataIndex: "phoneNumber",
	},
	{
		title: "Created at",
		dataIndex: "created_at",
		render: (record: Address) =>
			new Date(record.created_at).toLocaleDateString(),
	},
	{
		title: "User Id",
		render: (record: Address) => record?.user.id.substring(0, 10),
	},
];

const AddressList = () => {
	const { data, totalItems } = useAppSelector(selectAddressSearch);
	const { status, error } = useAppSelector(selectAddresses);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || 1;
	const search = searchParams.get("search") || "";
	const itemsPerPage = 6;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const dispatch = useAppDispatch();
	const itemsView = useAppSelector(selectAddressItemsView);

	const handleRead = (record: Address) => {
		dispatch(setAddressCurrentItem({ record: record, action: "read" }));
	};
	const handleUpdate = (record: Address) => {
		dispatch(setAddressCurrentItem({ record: record, action: "update" }));
	};
	const handleDelete = (record: Address) => {
		dispatch(setAddressCurrentItem({ record: record, action: "delete" }));
	};

	const tableColumns: ColumnConfig<Address>[] = [
		...columns,
		{
			title: "Actions",
			render: (record: Address) => (
				<TableActions
					record={record}
					readFn={handleRead}
					deleteFn={handleDelete}
					editFn={handleUpdate}
				/>
			),
		},
	];

	useEffect(() => {
		const from = (+page - 1) * itemsPerPage;
		const to = from + itemsPerPage - 1;
		const query: QueryType<Address> = {
			pagination: {
				from: from,
				to: to,
			},
			search: {
				query: "name",
				with: search,
			},
			tableName: "categories",
		};
		dispatch(addressSearch(query));
	}, [page, search]);

	const setPage = (newPage: number) => {
		setSearchParams((prev) => {
			prev.set("page", newPage.toString());
			return prev;
		});
	};
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="mt-2">
			{itemsView === "LIST" ? (
				<div className="bg-white">
					<Table columns={tableColumns} data={data as Address[]} />
				</div>
			) : (
				<AddressGridView
					data={data}
					readFn={handleRead}
					editFn={handleUpdate}
					deleteFn={handleDelete}
				/>
			)}
			<div className="flex w-full mt-4 justify-between">
				<p>
					Page {+page} of {totalPages}
				</p>
				<Pagination
					currentPage={+page}
					totalPages={totalPages}
					setPage={setPage}
				/>
			</div>
		</div>
	);
};

export default AddressList;

type AddressGridViewProps = {
	data: Address[];
	readFn: (record: Address) => void;
	editFn: (record: Address) => void;
	deleteFn: (record: Address) => void;
};

const AddressGridView = ({ data, ...props }: AddressGridViewProps) => {
	return (
		<ItemsGridLayout>
			{data.map((address) => (
				<GridItemsAction key={address.id} record={address} {...props}>
					<div className="mt-6 flex gap-2 flex-col items-center">
						<div className="w-16 h-16 rounded-full overflow-hidden">
							<img
								src={
									address?.user.avatar_url
										? address?.user.avatar_url
										: BlankUserProfile
								}
								className="w-full h-full object-cover"
								loading="lazy"
								alt={address?.user.full_name}
							/>
						</div>
						<p className="text-lg font-semibold">{address.name}</p>
						<p>+91-{address.phoneNumber}</p>
						<p className="truncate w-[15ch]">{address.address}, {address.townLocality}, {address.cityDistrict}</p>
					</div>
				</GridItemsAction>
			))}
		</ItemsGridLayout>
	);
};
