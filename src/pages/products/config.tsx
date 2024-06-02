import { ColumnConfig, Product } from "../../utils/types";

const columns: ColumnConfig<Product>[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Image",
    dataIndex: "images",
    render: (record: Product) =>
      record.images && record.images.length > 0 ? (
        <img src={record.images[0]} alt={record.name} className="w-10 h-10" />
      ) : (
        ""
      ),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (record: Product) => `$${record.price}`,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (record: Product) =>
      record && record.category ? record.category!.category_name : "",
  },
];

const readItem: ColumnConfig<Product>[] = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Image",
    dataIndex: "images",
    render: (record: Product) =>
      record.images && record.images.length > 0 ? (
        <div className="flex gap-2 flex-wrap">
          {record.images.map((img) => (
            <img key={img} src={img} alt={record.name} className="w-10 h-10" />
          ))}
        </div>
      ) : (
        ""
      ),
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (record: Product) => `$${record.price}`,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (record: Product) =>
      record && record.category ? record.category!.category_name : "",
  },
];

export { readItem, columns };
