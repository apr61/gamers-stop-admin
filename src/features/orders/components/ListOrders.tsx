import {
	orderSearch,
	selectOrders,
	selectOrderSearch,
	setOrderCurrentItem,
} from "../orderSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Order, ColumnConfig, QueryType } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { TableActions } from "@/components/ItemActions";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import { currencyFormatter } from "@/utils/currencyFormatter";

const columns: ColumnConfig<Order>[] = [
	{
		title: "Order Number",
		dataIndex: "order_number",
	},
	{
		title: "Customer",
		render: (record: Order) => (
			<div className="flex gap-2 items-center">
				<img
					className="w-10 h-10 rounded-full"
					src={
						record?.user?.avatar_url
							? record?.user.avatar_url
							: BlankUserProfile
					}
					alt={record?.user?.full_name}
				/>
				<p>{record.user?.full_name}</p>
			</div>
		),
	},
	{
		title: "Total Price",
		dataIndex: "total_price",
		render: (record: Order) => `${currencyFormatter(record.total_price)}`,
	},
	{
		title: "Order Status",
		dataIndex: "order_status",
	},
	{
		title: "Order Date",
		dataIndex: "order_date",
		render: (record: Order) => new Date(record.order_date).toLocaleDateString(),
	},
];

const ListOrders = () => {
	const { data, totalItems } = useAppSelector(selectOrderSearch);
	const { status, error } = useAppSelector(selectOrders);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || 1;
	const search = searchParams.get("search") || "";
	const itemsPerPage = 6;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const dispatch = useAppDispatch();
	const navigate = useNavigate()
	
	const handleRead = (record: Order) => {
		dispatch(setOrderCurrentItem({ record: record, action: "read" }));
		navigate(`./${record.id}/show`)
	};
	const handleUpdate = (record: Order) => {
		dispatch(setOrderCurrentItem({ record: record, action: "update" }));
		navigate(`./${record.id}/edit`)
	};
	const handleDelete = (record: Order) => {
		dispatch(setOrderCurrentItem({ record: record, action: "delete" }));
	};

	const tableColumns: ColumnConfig<Order>[] = [
		...columns,
		{
			title: "Actions",
			render: (record: Order) => (
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
		const query: QueryType<Order> = {
			pagination: {
				from: from,
				to: to,
			},
			search: {
				query: "order_status",
				with: search,
			},
			tableName: "categories",
		};
		dispatch(orderSearch(query));
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
					<Table columns={tableColumns} data={data as Order[]} />
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

export default ListOrders;