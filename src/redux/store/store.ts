import { configureStore } from "@reduxjs/toolkit";
import fileHandlingSlice from "../slice/fileHandlingSlice";
import crudSlice from "../slice/crudSlice";
import categorySlice from "../slice/categorySlice";
import productsSlice from "../slice/productsSlice";
import uiActionsSlice from "../slice/uiActionsSlice";

export const store = configureStore({
  reducer: {
    crud: crudSlice,
    uiActions: uiActionsSlice,
    fileHandling: fileHandlingSlice,
    categories: categorySlice,
    products: productsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
