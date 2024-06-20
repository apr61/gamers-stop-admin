import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemsViewType, CustomUser } from "@/types/api";
import { RootState } from "@/store/store";
import { getProfiles, searchProfiles } from "@/services/api/profiles";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete" | "idle";
  record: CustomUser | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

interface UserState {
  list: {
    data: CustomUser[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  search: {
    data: CustomUser[];
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
    action: "idle",
    record: null,
    status: "idle",
    error: null,
  },
};

export const userSearch = createAsyncThunk(
  "users/search",
  async (_, { rejectWithValue }) => {
    try {
      const response = await searchProfiles();
      if (response) {
        const data = {
          data: response.data as CustomUser[],
          totalItems: response.count,
        };
        return data;
      }
      return null;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return {
        data: [],
        totalItems: 0,
      };
    }
  },
);

export const fetchUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getProfiles();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return [];
    }
  },
);

const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUserCurrentItem: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>,
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetUserCurrentItem: (state) => {
      state.current = {
        action: "idle",
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
        const response = action.payload;
        if (response) {
          state.search.data = response.data;
          state.search.totalItems = response.totalItems;
        }
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
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        const data = action.payload;
        if (data) {
          state.list.data = data;
        }
      })
      .addCase(fetchUsers.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
      });
  },
});

export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersSearch = (state: RootState) => state.users.search;
export const selectUserCurrentItem = (state: RootState) => state.users.current;

export const {
  setUserCurrentItem,
  resetUserCurrentItem,
  resetUserState,
} = userSlice.actions;

export default userSlice.reducer;
