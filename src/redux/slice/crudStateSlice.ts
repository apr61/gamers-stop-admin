import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type CrudState = {
  drawer: boolean;
  deleteModal: boolean;
};

const initialState: CrudState = {
  drawer: false,
  deleteModal: false,
};

const crudStateSlice = createSlice({
  name: "crudState",
  initialState: initialState,
  reducers: {
    openDrawer: (state) => {
      state.drawer = true;
    },
    closeDrawer: (state) => {
      state.drawer = false;
    },
    openDeleteModal: (state) => {
      state.deleteModal = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModal = false;
    },
    resetCrudState: (state) => {
      (state.drawer = false), (state.deleteModal = false);
    },
  },
});

export const selectDrawer = (state: RootState) => state.crudState.drawer;
export const selectDeleteModal = (state: RootState) =>
  state.crudState.deleteModal;

export const {
  openDrawer,
  closeDeleteModal,
  closeDrawer,
  openDeleteModal,
  resetCrudState,
} = crudStateSlice.actions;

export default crudStateSlice.reducer;
