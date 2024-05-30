import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  Category,
  CategoryFormValues,
  CrudType,
  QueryType,
  TableName,
} from "../../utils/types";
import { RootState } from "../store/store";
import {
  createCategory,
  deleteCategory,
  getCategories,
  searchCategories,
  updateCategory,
} from "../../services/api/categories";

export type CurrentType = {
  action: "create" | "read" | "update" | "delete";
  record: Category | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

interface CategoryState {
  list: {
    data: Category[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
    search: {
      data: Category[],
      totalItems: number
    }
  };
  current: CurrentType;
}

const initialState: CategoryState = {
  list: {
    data: [],
    status: "idle",
    error: null,
    search: {
      data: [],
      totalItems: 0
    }
  },
  current: {
    action: "create",
    record: null,
    status: "idle",
    error: null,
  },
};

export const categorySearch = createAsyncThunk(
  "category/search",
  async (query: QueryType, { rejectWithValue }) => {
    try {
      const response = await searchCategories(query);
      if (response) {
        const data = {
          data: response.data as Category[],
          totalItems: response.count,
        };
        return data;
      }
      return {
        data: [],
        totalItems: 0,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return []
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "category/readAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addCategory = createAsyncThunk(
  "category/create",
  async (
    {
      formData,
    }: {
      formData: CategoryFormValues;
      tableName: TableName;
    },
    { rejectWithValue }
  ) => {
    try {
      const newEntity = await createCategory(formData);
      return newEntity;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeCategory = createAsyncThunk(
  "category/delete",
  async (data: CrudType, { rejectWithValue }) => {
    try {
      const deletedId = await deleteCategory(data.id);
      return deletedId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

export const editCategory = createAsyncThunk(
  "category/edit",
  async (
    {
      formData,
      id,
    }: {
      formData: CategoryFormValues;
      tableName: TableName;
      id: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await updateCategory(id, formData);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setCategoryActionType: (
      state,
      action: PayloadAction<Omit<CurrentType, "status" | "error">>
    ) => {
      state.current.record = action.payload.record;
      state.current.action = action.payload.action;
    },
    resetCategoryActionType: (state) => {
      state.current = {
        action: "create",
        record: null,
        status: "idle",
        error: null,
      };
    },
    resetCategoryState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categorySearch.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.search.data = action.payload?.data!;
        state.list.search.totalItems = action.payload?.totalItems!;
      })
      .addCase(categorySearch.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(categorySearch.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.search = {
          data: [],
          totalItems: 0
        };
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.list.status = "succeeded";
        state.list.data = action.payload!;
      })
      .addCase(fetchCategories.pending, (state) => {
        state.list.status = "pending";
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.list.status = "failed";
        state.list.error = action.payload as string;
        state.list.search = {
          data: [],
          totalItems: 0
        };
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data.unshift(action.payload!);
      })
      .addCase(addCategory.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.filter(
          (item) => item.id !== action.payload!
        );
      })
      .addCase(removeCategory.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.map((item) => {
          if (item.id === action.payload?.id) return action.payload as Category;
          return item;
        });
      })
      .addCase(editCategory.pending, (state) => {
        state.current.status = "pending";
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload as string;
      });
  },
});

export const selectCategories = (state: RootState) => state.categories.list;
export const selectCategoryCurrentItem = (state: RootState) =>
  state.categories.current;

export const { setCategoryActionType, resetCategoryActionType, resetCategoryState } =
  categorySlice.actions;

export default categorySlice.reducer;
