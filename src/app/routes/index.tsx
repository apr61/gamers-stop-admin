import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Orders from "@/pages/orders";
import Categories from "./app/categories";
import Users from "@/pages/users";
import Login from "@/app/routes/auth/login";
import SignUp from "@/app/routes/auth/signup";
import RequireAuth from "@/layout/RequireAuth";
import Unautorized from "@/pages/Unauthorized";
import Addresses from "@/pages/addresses";
import Brands from "@/pages/brands";
import SingleOrder from "@/pages/SingleOrder";
import { NotFoundRoute } from "./not-found";
import AppRoot from "./app/root";
import {
  Products,
  SingleProduct,
  ProductEdit,
  ProductNew,
} from "./app/products";

const router = createBrowserRouter([
  {
    element: <RequireAuth allowedRoles={["ADMIN"]} />,
    children: [
      {
        element: <AppRoot />,
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
                element: <ProductNew />,
              },
              {
                path: ":id/show",
                element: <SingleProduct />,
              },
              {
                path: ":id/edit",
                element: <ProductEdit />,
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
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    element: <SignUp />,
  },
  {
    path: "/unauthorized",
    element: <Unautorized />,
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
]);

export default router;
