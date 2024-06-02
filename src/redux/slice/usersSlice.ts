import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types";
import { RootState } from "../store/store";
import { listAllUsers } from "../../services/api/users";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete";
  record: User | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

interface UserState {
  list: {
    data: User[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  search: {
    data: User[];
    totalItems: number;
  };
  current: CurrentType;
}

const initialState: UserState = {
  list: {
    data: [],
    status: "idle",
    error: null,
  },
  search: {
    data: [],
    totalItems: 0,
  },
  current: {
    action: "create",
    record: null,
    status: "idle",
    error: null,
  },
};

export const userSearch = createAsyncThunk(
  "users/search",
  async (_, { rejectWithValue }) => {
    try {
      const response = await listAllUsers();
      if (response) {
        const data = {
          data: response.data as User[],
          totalItems: response.count,
        };
        return data;
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return {
        data: [],
        totalItems: 0,
      };
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUserCurrentItem: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetUserCurrentItem: (state) => {
      state.current = {
        action: "create",
        record: null,
        status: "idle",
        error: null,
      };
    },
    resetUserState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.search.data = action.payload?.data!;
        state.search.totalItems = action.payload?.totalItems!;
      })
      .addCase(userSearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(userSearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.search = {
          data: [],
          totalItems: 0,
        };
      });
  },
});

export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersSearch = (state: RootState) => state.users.search;
export const selectUserCurrentItem = (state: RootState) =>
  state.users.current;

export const { setUserCurrentItem, resetUserCurrentItem, resetUserState } =
  userSlice.actions;

export default userSlice.reducer;
