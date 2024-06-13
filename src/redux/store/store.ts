import { configureStore } from "@reduxjs/toolkit";
import fileHandlingSlice from "../slice/fileHandlingSlice";
import crudSlice from "../slice/crudSlice";
import uiActionsSlice from "../slice/uiActionsSlice";
import authSlice from "../slice/authSlice";
import profilesSlice from "../slice/profilesSlice";
import ordersSlice from "../slice/ordersSlice";
import usersSlice from "../slice/usersSlice";
import brandsSlice from "../slice/brandsSlice";
import categorySlice from "@/features/categories/categorySlice";
import productsSlice from "@/features/products/productSlice";
import addressSlice from "@/features/addresses/addressSlice";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
    uiActions: uiActionsSlice,
    fileHandling: fileHandlingSlice,
    categories: categorySlice,
    products: productsSlice,
    auth: authSlice,
    profiles: profilesSlice,
    address: addressSlice,
    orders: ordersSlice,
    users: usersSlice,
    brands: brandsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
