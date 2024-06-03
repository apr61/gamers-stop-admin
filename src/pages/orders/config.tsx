import ReadItem from "../../components/ReadItem";
import {
  Address,
  ColumnConfig,
  CustomUser,
  Order,
  Product,
} from "../../utils/types";
import { readItem as ProductReadItem } from "../products/config";
import { readItem as AddressReadItem } from "../addresses/config";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";

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

const UserReadItem: ColumnConfig<CustomUser>[] = [
  {
    title: "UserId",
    dataIndex: "id",
  },
  {
    title: "Pic",
    render: (record: CustomUser) => (
      <img
        className="w-10 h-10 rounded-full"
        src={record.avatar_url ? record.avatar_url : BlankUserProfile}
        alt={record.full_name}
      />
    ),
  },
  {
    title: "Name",
    dataIndex: "full_name",
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
  {
    title: "User Details",
    render: (record: Order) => (
      <ReadItem<CustomUser> record={record.user!} readItem={UserReadItem} />
    ),
  },
];

export { columns, readItem };
