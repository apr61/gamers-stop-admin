import { Brand, ColumnConfig } from "../../utils/types";

const columns: ColumnConfig<Brand>[] = [
	{
		title: "Name",
		dataIndex: "brand_name",
	},
];

const readItem: ColumnConfig<Brand>[] = [
	{
		title: "Name",
		dataIndex: "brand_name",
	},
];

export { columns, readItem };
