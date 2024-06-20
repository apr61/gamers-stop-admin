import {
  DollarOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { currencyFormatter } from "@/utils/currencyFormatter";
import Table from "@/components/ui/Table";
import { Link } from "react-router-dom";
import { ColumnConfig, CustomUser, Order, ProductsOrdered } from "@/types/api";
import BlankUserProfile from "@/assets/blank-profile-picture.webp";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  getRecentOrders,
  getRecentProfiles,
  getTopSellingProducts,
} from "@/services/api/dashboard";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const Dashboard = () => {
  return (
    <div className="flex gap-4 flex-col">
      <DashboardCard />
      <RecentOrders />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentUsers />
        <TopSellingProducts />
      </div>
    </div>
  );
};

export default Dashboard;

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <div className="p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05] bg-dimBlack">
        <div className="p-4 bg-amber-300 dark:bg-amber-400 rounded-sm">
          <UserOutlined className="bg-amber-400 dark:bg-amber-600 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize dark:text-white">
            Total Users
          </p>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">
            {numberWithCommas(1000)}
          </h3>
        </div>
      </div>
      <div className="  p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05] bg-dimBlack">
        <div className="p-4 bg-violet-300 dark:bg-violet-400 rounded-sm">
          <ShoppingCartOutlined className="bg-violet-400 dark:bg-violet-600 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize dark:text-white">
            Total Orders
          </p>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">
            {numberWithCommas(5000)}
          </h3>
        </div>
      </div>
      <div className="  p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05] bg-dimBlack">
        <div className="p-4 bg-emerald-300 dark:bg-emerald-400 rounded-sm">
          <DollarOutlined className="bg-emerald-400 dark:bg-emerald-600 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize dark:text-white">
            Total Revenue
          </p>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">
            {currencyFormatter(50000)}
          </h3>
        </div>
      </div>
      <div className="  p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05] bg-dimBlack">
        <div className="p-4 bg-fuchsia-300 dark:bg-fuchsia-400 rounded-sm">
          <ProductOutlined className="bg-fuchsia-400 dark:bg-fuchsia-600 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 dark:text-white capitalize">
            Total Products
          </p>
          <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">
            {numberWithCommas(500)}
          </h3>
        </div>
      </div>
    </div>
  );
};

const RecentOrders = () => {
  const { data, loading, error } = useCustomQuery<Order>({
    fn: () => getRecentOrders(),
  });
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
            alt={record?.user?.full_name || ""}
          />
          <p>{record.user?.full_name}</p>
        </div>
      ),
    },
    {
      title: "Product",
      render: (record: Order) => (
        <div className="flex gap-2 items-center">
          <img
            src={record.products_ordered[0].product?.images[0]}
            alt={record.products_ordered[0].product?.name}
            className="w-10 h-10 brightness-[80%]"
          />
          <p>{record.products_ordered[0].product?.name}</p>
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
      title: "Payment Status",
      dataIndex: "payment_status",
    },
  ];
  if (error) return <h1>{error}</h1>;
  return (
    <section className=" rounded-md shadow-sm bg-dimBlack relative">
      <h2 className="p-2 text-gray-700 dark:text-white text-lg font-semibold">
        Recent Orders
      </h2>
      <Link
        to="/orders"
        className="text-blue-500 font-semibold absolute top-2 right-2 hover:underline"
      >
        See all &gt;
      </Link>
      {loading ? <h1>Loading...</h1> : <Table data={data} columns={columns} />}
    </section>
  );
};

const RecentUsers = () => {
  const { data, loading, error } = useCustomQuery<CustomUser>({
    fn: () => getRecentProfiles(),
  });
  const columns: ColumnConfig<CustomUser>[] = [
    {
      title: "Customer",
      render: (record: CustomUser) => (
        <div className="flex gap-2 items-center">
          <img
            className="w-10 h-10 rounded-full"
            src={record?.avatar_url ? record?.avatar_url : BlankUserProfile}
            alt={record?.full_name || ""}
          />
          <p>{record.full_name}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
  ];
  if (error) return <h1>{error}</h1>;
  return (
    <section className=" rounded-md shadow-sm bg-dimBlack  relative">
      <h2 className="p-2 text-gray-700 dark:text-white text-lg font-semibold">
        Recent Users
      </h2>
      {loading ? <h1>Loading...</h1> : <Table data={data} columns={columns} />}
    </section>
  );
};

const TopSellingProducts = () => {
  const { data, loading, error } = useCustomQuery<ProductsOrdered>({
    fn: () => getTopSellingProducts(),
  });

  const columns: ColumnConfig<ProductsOrdered>[] = [
    {
      title: "Product",
      render: (record: ProductsOrdered) => (
        <div className="flex gap-2 items-start">
          {record.product?.images && record.product?.images.length > 0 ? (
            <img
              src={record.product?.images[0]}
              alt={record.product?.name}
              className="w-10 h-10 brightness-[90%]"
            />
          ) : null}
          <p>{record.product?.name}</p>
        </div>
      ),
    },
    {
      title: "Price",
      render: (record: ProductsOrdered) =>
        `${currencyFormatter(record.product?.price!)}`,
    },
    {
      title: "Stock",
      render: (record: ProductsOrdered) =>
        record.product?.quantity && record.product?.quantity > 0
          ? "InStock"
          : "OutOfStock",
    },
    {
      title: "Category",
      render: (record: ProductsOrdered) =>
        record && record.product?.category
          ? record.product?.category!.category_name
          : "",
    },
    {
      title: "Total sold",
      render: (record: ProductsOrdered) =>
        record ? <span>{record.quantity_ordered}</span> : "",
    },
  ];

  if (error) return <h1>{error}</h1>;
  return (
    <section className=" rounded-md shadow-sm bg-dimBlack relative">
      <h2 className="p-2 text-gray-700 dark:text-white text-lg font-semibold">
        Top Selling products
      </h2>
      {loading ? <h1>Loading...</h1> : <Table data={data} columns={columns} />}
    </section>
  );
};
