import { RouteObject, createBrowserRouter } from "react-router-dom";
import RequireAuth from "@/components/layouts/RequireAuth";
import AdminRoot from "./admin/root";
import * as React from "react";
import PageLoader from "@/components/PageLoader";

// const Dashboard = React.lazy(() => import("./admin/dashboard/dashboard"));
const Login = React.lazy(() => import("./auth/login"));
const SignUp = React.lazy(() => import("./auth/signup"));
const Unauthorized = React.lazy(() => import("./unauthorized"));
const NotFoundRoute = React.lazy(() => import("./not-found"));

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: (
      <RequireAuth allowedRoles={["admin"]}>
        <AdminRoot />
      </RequireAuth>
    ),
    children: [
      {
        path: "",
        lazy: async () => {
          const { Dashboard } = await import("./admin/dashboard/dashboard");
          return { Component: Dashboard };
        },
      },
      {
        path: "users",
        lazy: async () => {
          const { Users } = await import("./admin/users/Users");
          return { Component: Users };
        },
      },
      {
        path: "products",
        children: [
          {
            path: "",
            lazy: async () => {
              const { Products } = await import("./admin/products/Products");
              return { Component: Products };
            },
          },
          {
            path: "new",
            lazy: async () => {
              const { ProductNew } = await import(
                "./admin/products/ProductNew"
              );
              return { Component: ProductNew };
            },
          },
          {
            path: ":id/show",
            lazy: async () => {
              const { Product } = await import("./admin/products/Product");
              return { Component: Product };
            },
          },
          {
            path: ":id/edit",
            lazy: async () => {
              const { ProductEdit } = await import(
                "./admin/products/ProductEdit"
              );
              return { Component: ProductEdit };
            },
          },
        ],
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            lazy: async () => {
              const { Orders } = await import("./admin/orders/Orders");
              return { Component: Orders };
            },
          },
          {
            path: ":id/show",
            lazy: async () => {
              const { Order } = await import("./admin/orders/Order");
              return { Component: Order };
            },
          },
          {
            path: ":id/edit",
            lazy: async () => {
              const { Order } = await import("./admin/orders/Order");
              return { Component: Order };
            },
          },
        ],
      },
      {
        path: "categories",
        lazy: async () => {
          const { Categories } = await import("./admin/categories");
          return { Component: Categories };
        },
      },
      {
        path: "brands",
        lazy: async () => {
          const { Brands } = await import("./admin/brands/Brands");
          return { Component: Brands };
        },
      },
    ],
  },
];

const commonRoutes: RouteObject[] = [
  {
    path: "/",
    element: <h1>Home</h1>,
  },
  {
    path: "/auth/login",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <Login />
      </React.Suspense>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <SignUp />
      </React.Suspense>
    ),
  },
  {
    path: "/unauthorized",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <Unauthorized />
      </React.Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <React.Suspense fallback={<PageLoader />}>
        <NotFoundRoute />
      </React.Suspense>
    ),
  },
];

const router = createBrowserRouter([...commonRoutes, ...adminRoutes]);

export default router;
