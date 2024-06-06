import {
  DollarOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { recentOrders, selectOrders } from "../redux/slice/ordersSlice";
import { useEffect } from "react";
import { currencyFormatter } from "../utils/currencyFormatter";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Dashboard = () => {
  return (
    <div className="bg-white p-4 rounded-md flex gap-4 flex-col">
      <DashboardCard />
      <div className="grid grid-cols-2 gap-4">
        <RecentOrders />
        <section className="border p-4 rounded-md shadow-sm">
          <h2>Recent Users</h2>
          <ul className="flex flex-col gap-2">
            {[...Array(5)].map((_, index) => (
              <li
                key={index}
                className="p-2 border border-transparent border-b-black"
              >
                {index}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

const DashboardCard = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="border p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05]">
        <div className="p-4 bg-amber-200 rounded-sm">
          <UserOutlined className="bg-amber-400 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize">Total Users</p>
          <h3 className="text-xl font-bold text-gray-600">
            {numberWithCommas(1000)}
          </h3>
        </div>
      </div>
      <div className="border p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05]">
        <div className="p-4 bg-violet-200 rounded-sm">
          <ShoppingCartOutlined className="bg-violet-400 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize">Total Orders</p>
          <h3 className="text-xl font-bold text-gray-600">
            {numberWithCommas(5000)}
          </h3>
        </div>
      </div>
      <div className="border p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05]">
        <div className="p-4 bg-emerald-200 rounded-sm">
          <DollarOutlined className="bg-emerald-400 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize">
            Total Revenue
          </p>
          <h3 className="text-xl font-bold text-gray-600">
            {currencyFormatter(50000)}
          </h3>
        </div>
      </div>
      <div className="border p-4 rounded-sm shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.05]">
        <div className="p-4 bg-fuchsia-200 rounded-sm">
          <ProductOutlined className="bg-fuchsia-400 text-white p-2 rounded-sm" />
        </div>
        <div>
          <p className="font-semibold text-gray-500 capitalize">
            Total Products
          </p>
          <h3 className="text-xl font-bold text-gray-600">
            {numberWithCommas(500)}
          </h3>
        </div>
      </div>
    </div>
  );
};

const RecentOrders = () => {
  const { data: recentOrdersData, status: ordersStatus } =
    useAppSelector(selectOrders);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(recentOrders());
  }, []);
  return (
    <section className="border p-4 rounded-md shadow-sm">
      <h2>Recent Orders</h2>
      {ordersStatus === "pending" ? (
        <h1>Loading...</h1>
      ) : (
        <ul className="flex flex-col gap-2">
          {recentOrdersData.map((order) => (
            <li key={order.id} className="p-2 border-b border-b-slate-300">
              {order.order_date}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
