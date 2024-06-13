import { configureStore } from "@reduxjs/toolkit";
import fileHandlingSlice from "../slice/fileHandlingSlice";
import crudSlice from "../slice/crudSlice";
import uiActionsSlice from "../slice/uiActionsSlice";
import profilesSlice from "../slice/profilesSlice";

import categorySlice from "@/features/categories/categorySlice";
import productsSlice from "@/features/products/productSlice";
import addressSlice from "@/features/addresses/addressSlice";
import ordersSlice from "@/features/orders/orderSlice";
import brandsSlice from "@/features/brands/brandsSlice";
import authSlice from "@/features/auth/authSlice";
import usersSlice from "@/features/users/usersSlice";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
    uiActions: uiActionsSlice,
    fileHandling: fileHandlingSlice,
    profiles: profilesSlice,
    users: usersSlice,
    categories: categorySlice,
    products: productsSlice,
    auth: authSlice,
    address: addressSlice,
    orders: ordersSlice,
    brands: brandsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
