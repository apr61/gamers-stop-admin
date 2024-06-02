import ReadItem from "../../components/ReadItem";
import { Address, ColumnConfig, Order, Product } from "../../utils/types";
import { readItem as ProductReadItem } from "../products/config";
import { readItem as AddressReadItem } from "../addresses/config";

const columns: ColumnConfig<Order>[] = [
  {
    title: "Order Number",
    dataIndex: "ordernumber",
  },
  {
    title: "Name",
    render: (record: Order) => (record.user ? record?.user.full_name : ""),
  },
  {
    title: "Total Price",
    dataIndex: "totalprice",
    render: (record: Order) => `$${record.totalprice}`,
  },
  {
    title: "Order Status",
    dataIndex: "orderstatus",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    render: (record: Order) => new Date(record.order_date).toLocaleDateString(),
  },
];

// user: CustomUser | null;

const readItem: ColumnConfig<Order>[] = [
  {
    title: "Order Number",
    dataIndex: "ordernumber",
  },
  {
    title: "Name",
    render: (record: Order) => (record.user ? record?.user.full_name : ""),
  },
  {
    title: "Total Price",
    dataIndex: "totalprice",
    render: (record: Order) => `$${record.totalprice}`,
  },
  {
    title: "Order Status",
    dataIndex: "orderstatus",
  },
  {
    title: "Order Date",
    dataIndex: "order_date",
    render: (record: Order) => new Date(record.order_date).toLocaleDateString(),
  },
  {
    title: "Quantity ordered",
    dataIndex: "quantity",
  },
  {
    title: "Payment status",
    dataIndex: "paymentstatus",
  },
  {
    title: "Quantity ordered",
    dataIndex: "quantity",
  },
  {
    title: "Products Ordered",
    render: (record: Order) =>
      record.products.map((product) => (
        <ReadItem<Product> record={product} readItem={ProductReadItem} />
      )),
  },
  {
    title: "Address",
    render: (record: Order) => (
      <ReadItem<Address> record={record.address!} readItem={AddressReadItem} />
    ),
  },
];

export { columns, readItem };
