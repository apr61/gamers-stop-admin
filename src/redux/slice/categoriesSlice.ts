import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category, CategoryFormValues } from "../../utils/types";
import { RootState } from "../store/store";
import {
  deleteCategoryById,
  insertCategory,
  updateCategory,
} from "../../services/api/categories";
import { readAllRecords } from "../../services/api/crud";

type KEY_STATE = {
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

export type CurrentType = {
  action: "create" | "read" | "update" | "delete";
  record: Category | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
};

type CategoryState = {
  list: {
    data: Category[];
    status: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
  };
  read: KEY_STATE;
  create: KEY_STATE;
  update: KEY_STATE;
  delete: KEY_STATE;
  current: CurrentType;
};

const initialState: CategoryState = {
  list: {
    data: [],
    status: "idle",
    error: null,
  },
  read: {
    status: "idle",
    error: null,
  },
  create: {
    status: "idle",
    error: null,
  },
  update: {
    status: "idle",
    error: null,
  },
  delete: {
    status: "idle",
    error: null,
  },
  current: {
    action: "create",
    record: null,
    status: "idle",
    error: null,
  },
};

export const fetchCategories = createAsyncThunk(
  "categories/read",
  async (_, { rejectWithValue }) => {
    try {
      const response = await readAllRecords("categories");
      return response as Category[];
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createNewCategory = createAsyncThunk(
  "categories/create",
  async (formData: CategoryFormValues, { rejectWithValue }) => {
    try {
      const newCategory = await insertCategory(formData);
      return newCategory;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const removeCategory = createAsyncThunk(
  "categories/delete",
  async (category: Category, { rejectWithValue }) => {
    try {
      const deletedId = await deleteCategoryById(category);
      return deletedId;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

type EditCategoryType = {
  category: Category;
  categoryForm: CategoryFormValues;
};

export const editCategory = createAsyncThunk(
  "categories/edit",
  async ({ category, categoryForm }: EditCategoryType, { rejectWithValue }) => {
    try {
      const data = await updateCategory(category, categoryForm);
      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setActionType: (state, action: PayloadAction<CurrentType>) => {
      state.current = action.payload;
    },
    resetActionType: (state) => {
      state.current = {
        action: "create",
        record: null,
        status: "idle",
        error: null,
      };
    },
  },
  extraReducers(builder) {
    builder
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
        state.list.data = [];
      })
      .addCase(createNewCategory.fulfilled, (state, action) => {
        state.create.status = "succeeded";
        state.list.data.push(action.payload as Category);
      })
      .addCase(createNewCategory.pending, (state) => {
        state.create.status = "pending";
      })
      .addCase(createNewCategory.rejected, (state, action) => {
        state.create.status = "failed";
        state.create.error = action.payload as string;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.current.status = "succeeded";
        state.list.data = state.list.data.filter(
          (item) => item.id !== action.payload
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
          if (item.id === action.payload?.id) return action.payload;
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

export const selectListItems = (state: RootState) => state.categories.list;
export const selectCreatedItem = (state: RootState) => state.categories.create;
export const selectCurrentItem = (state: RootState) => state.categories.current;

export const { setActionType, resetActionType } = categoriesSlice.actions;

export default categoriesSlice.reducer;
