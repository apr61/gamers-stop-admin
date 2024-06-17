import {
	brandSearch,
	selectBrandsSearch,
	selectBrands,
	setBrandCurrentItem,
} from "../brandsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Brand, ColumnConfig, QueryType } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { TableActions } from "@/components/ItemActions";

const columns: ColumnConfig<Brand>[] = [
	{
		title: "ID",
		dataIndex: "id",
	},
	{
		title: "Name",
		dataIndex: "brand_name",
	},
];

const ListBrands = () => {
	const { data, totalItems } = useAppSelector(selectBrandsSearch);
	const { status, error } = useAppSelector(selectBrands);
	const [searchParams, setSearchParams] = useSearchParams();
	const page = searchParams.get("page") || 1;
	const search = searchParams.get("search") || "";
	const itemsPerPage = 6;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const dispatch = useAppDispatch();

	const handleUpdate = (record: Brand) => {
		dispatch(setBrandCurrentItem({ record: record, action: "update" }));
	};
	const handleDelete = (record: Brand) => {
		dispatch(setBrandCurrentItem({ record: record, action: "delete" }));
	};

	const tableColumns: ColumnConfig<Brand>[] = [
		...columns,
		{
			title: "Actions",
			render: (record: Brand) => (
				<TableActions
					record={record}
					deleteFn={handleDelete}
					editFn={handleUpdate}
					allowedActions={["DELETE", "UPDATE"]}
				/>
			),
		},
	];

	useEffect(() => {
		const from = (+page - 1) * itemsPerPage;
		const to = from + itemsPerPage - 1;
		const query: QueryType<Brand> = {
			pagination: {
				from: from,
				to: to,
			},
			search: {
				query: "brand_name",
				with: search,
			},
			tableName: "categories",
		};
		dispatch(brandSearch(query));
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
				<Table columns={tableColumns} data={data as Brand[]} />
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

export default ListBrands;
