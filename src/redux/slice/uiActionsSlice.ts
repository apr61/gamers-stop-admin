import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

type uiActions = {
  drawer: boolean;
  deleteModal: boolean;
};

const initialState: uiActions = {
  drawer: false,
  deleteModal: false,
};

const uiActions = createSlice({
  name: "uiActions",
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
    resetUiState: (state) => {
      (state.drawer = false), (state.deleteModal = false);
    },
  },
});

export const selectDrawer = (state: RootState) => state.uiActions.drawer;
export const selectDeleteModal = (state: RootState) =>
  state.uiActions.deleteModal;

export const {
  openDrawer,
  closeDeleteModal,
  closeDrawer,
  openDeleteModal,
  resetUiState,
} = uiActions.actions;

export default uiActions.reducer;
