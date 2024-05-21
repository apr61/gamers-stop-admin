import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import Products from "../pages/products";
import Orders from "../pages/orders";
import Categories from "../pages/categories";
import Users from "../pages/users";
import NotFound from "../components/NotFound";

const routes = createBrowserRouter([
  {
    element: <AdminLayout />,
    path: "/admin",
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/users",
        element: <Users />,
      },
      {
        path: "/admin/products",
        element: <Products />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        path: "/admin/categories",
        element: <Categories />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
