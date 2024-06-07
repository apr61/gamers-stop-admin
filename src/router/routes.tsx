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
import Brands from "../pages/brands";
import SingleOrder from "../pages/SingleOrder";
import SingleProduct from "../pages/SingleProduct";
import ProductsForm from "../components/forms/ProductsForm";

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
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/users",
            element: <Users />,
          },
          {
            path: "/products",
            children: [
              {
                path: "",
                element: <Products />,
              },
              {
                path: "new",
                element: <ProductsForm />,
              },
              {
                path: ":id/show",
                element: <SingleProduct />,
              },
              {
                path: ":id/edit",
                element: <ProductsForm />,
              },
            ],
          },
          {
            path: "/orders",
            children: [
              {
                path: "",
                element: <Orders />,
              },
              {
                path: ":id",
                element: <SingleOrder />,
              },
            ],
          },
          {
            path: "/categories",
            element: <Categories />,
          },
          {
            path: "/addresses",
            element: <Addresses />,
          },
          {
            path: "/brands",
            element: <Brands />,
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
