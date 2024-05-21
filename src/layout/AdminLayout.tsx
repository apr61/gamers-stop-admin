import { Outlet } from "react-router-dom";
import Sidenav from "../components/Sidenav";

const AdminLayout = () => {
  return (
    <div className="flex gap-2 p-2 2xl:p-4 min-h-screen bg-gray-200">
      <Sidenav />
      <main className="max-w-3xl xl:max-w-4xl 2xl:max-w-7xl mx-auto w-full my-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
