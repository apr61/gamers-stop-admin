import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AdminLayout from "../layout/AdminLayout";
import Products from "../pages/products";
import Orders from "../pages/orders";
import Categories from "../pages/categories";
import Users from "../pages/users";
import NotFound from "../components/NotFound";
import Login from "../pages/login";
import SignUp from "../pages/signup";

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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
