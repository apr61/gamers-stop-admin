import {
	addressSearch,
	selectAddresses,
	selectAddressSearch,
	setAddressCurrentItem,
} from "../addressSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Address, ColumnConfig, QueryType } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { TableActions } from "@/components/ItemActions";
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
						record?.user.avatar_url ? record?.user.avatar_url : BlankUserProfile
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
			<div className="">
				<Table columns={tableColumns} data={data as Address[]} />
			</div>

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
