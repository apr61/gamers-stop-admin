import ReadItem from "../../components/ReadItem";
import { ColumnConfig, CustomUser, Order } from "../../utils/types";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";
import { currencyFormatter } from "../../utils/currencyFormatter";

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
    render: (record: Order) => `$${record.total_price}`,
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
  {
    title: "Payment status",
    dataIndex: "payment_status",
  },
  {
    title: "User Details",
    render: (record: Order) => (
      <ReadItem<CustomUser> record={record.user!} readItem={UserReadItem} />
    ),
  },
];

export { columns, readItem };
