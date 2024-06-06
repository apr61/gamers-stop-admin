import { Category, ColumnConfig } from "../../utils/types";

const columns: ColumnConfig<Category>[] = [
  {
    title: "Name",
    dataIndex: "category_name",
  },
  {
    title: "Image",
    dataIndex: "category_image",
    render: (record: Category) => (
      <img
        src={record.category_image}
        alt={record.category_name}
        className="w-10 h-10 brightness-[90%]"
      />
    ),
  },
];

const readItem: ColumnConfig<Category>[] = [
  {
    title: "Name",
    dataIndex: "category_name",
  },
  {
    title: "Image",
    dataIndex: "category_image",
    render: (record: Category) => (
      <img
        src={record.category_image}
        alt={record.category_name}
        className="w-10 h-10"
      />
    ),
  },
];

export {columns, readItem}