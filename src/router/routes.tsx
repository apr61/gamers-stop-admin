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
import RequireAuth from "../layout/RequireAuth";
import Unautorized from "../pages/Unauthorized";
import { Suspense } from "react";
import PageLoader from "../components/PageLoader";
import Addresses from "../pages/addresses";

const routes = createBrowserRouter([
  {
    element: <RequireAuth allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminLayout />
          </Suspense>
        ),
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
          {
            path: "/admin/addresses",
            element: <Addresses />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unautorized />,
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
