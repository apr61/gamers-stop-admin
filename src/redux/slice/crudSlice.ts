import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryFormValues,
  CrudType,
  Data,
  ProductFormValues,
  QueryType,
  TableName,
} from "../../utils/types";
import { RootState } from "../store/store";
import {
  deleteRecordById,
  insertRecordWithUpload,
  search,
  updateRecordByIdWithUpload,
} from "../../services/api/crud";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete";
  record: Data | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

type CrudState = {
  list: {
    data: Data[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    totalItems: number;
  };
  current: CurrentType;
};

const initialState: CrudState = {
  list: {
    data: [],
    status: "idle",
    error: null,
    totalItems: 0,
  },
  current: {
    action: "create",
    record: null,
    status: "idle",
    error: null,
  },
};

export const entitySearch = createAsyncThunk(
  "crud/read",
  async (query: QueryType, { rejectWithValue }) => {
    try {
      const response = await search(query.tableName, query);
      if (response) {
        const data = {
          data: response.data as Category[],
          totalCount: response.count,
        };
        return data;
      }
      return {
        data: [],
        totalCount: 0,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const createNewEntity = createAsyncThunk(
  "crud/create",
  async (
    {
      formData,
      tableName,
    }: {
      formData: CategoryFormValues | ProductFormValues;
      tableName: TableName;
    },
    { rejectWithValue },
  ) => {
    try {
      const newEntity = await insertRecordWithUpload(formData, tableName);
      return newEntity;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const removeEntity = createAsyncThunk(
  "crud/delete",
  async (data: CrudType, { rejectWithValue }) => {
    try {
      const deletedId = await deleteRecordById(data);
      return deletedId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

export const editEntity = createAsyncThunk(
  "crud/edit",
  async (
    {
      formData,
      tableName,
      path,
      id,
    }: {
      formData: CategoryFormValues | ProductFormValues;
      tableName: TableName;
      path: string[];
      id: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const data = await updateRecordByIdWithUpload(
        formData,
        tableName,
        path,
        id,
      );
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

const crudSlice = createSlice({
  name: "crud",
  initialState: initialState,
  reducers: {
    setActionType: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>,
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetActionType: (state) => {
      state.current = {
        action: "create",
        record: null,
        status: "idle",
        error: null,
      };
    },
    resetCrudState: (state) => {
      state.current = initialState.current;
      state.list = initialState.list;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(entitySearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.data = action.payload?.data || [];
        state.list.totalItems = action.payload?.totalCount || 0;
      })
      .addCase(entitySearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(entitySearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.data = [];
      })
      .addCase(createNewEntity.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data.unshift(action.payload as Category);
      })
      .addCase(createNewEntity.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(createNewEntity.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(removeEntity.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(removeEntity.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(removeEntity.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(editEntity.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.map((item) => {
          if (item.id === action.payload?.id) return action.payload as Category;
          return item;
        });
      })
      .addCase(editEntity.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(editEntity.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      });
  },
});

export const selectListItems = (state: RootState) => state.crud.list;
export const selectCurrentItem = (state: RootState) => state.crud.current;

export const { setActionType, resetActionType, resetCrudState } =
  crudSlice.actions;

export default crudSlice.reducer;
