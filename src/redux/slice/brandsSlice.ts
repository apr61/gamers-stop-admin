import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	Brand,
	BrandFormValues,
	QueryType,
	TableName,
} from "../../utils/types";
import { RootState } from "../store/store";
import {
	createBrand,
	deleteBrand,
	getBrands,
	searchBrands,
	updateBrand,
} from "../../services/api/brand";

export type CurrentType = {
	action: "create" | "read" | "update" | "delete";
	record: Brand | null;
	status: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
};

interface BrandState {
	list: {
		data: Brand[];
		status: "idle" | "pending" | "succeeded" | "failed";
		error: string | null;
	};
	search: {
		data: Brand[];
		totalItems: number;
	};
	current: CurrentType;
}

const initialState: BrandState = {
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

export const brandSearch = createAsyncThunk(
	"brand/search",
	async (query: QueryType<Brand>, { rejectWithValue }) => {
		try {
			const response = await searchBrands(query);
			if (response) {
				const data = {
					data: response.data as Brand[],
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
	},
);

export const fetchBrands = createAsyncThunk(
	"brand/readAll",
	async (_, { rejectWithValue }) => {
		try {
			const response = await getBrands();
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
		}
	},
);

export const addBrand = createAsyncThunk(
	"brand/create",
	async (
		{
			formData,
		}: {
			formData: BrandFormValues;
			tableName: TableName;
		},
		{ rejectWithValue },
	) => {
		try {
			const newEntity = await createBrand(formData);
			return newEntity;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
		}
	},
);

export const removeBrand = createAsyncThunk(
	"brand/delete",
	async (id: number, { rejectWithValue }) => {
		try {
			const deletedId = await deleteBrand(id);
			return deletedId;
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
		}
	},
);

export const editBrand = createAsyncThunk(
	"brand/edit",
	async (
		{
			formData,
			id,
		}: {
			formData: BrandFormValues;
			tableName: TableName;
			id: number;
		},
		{ rejectWithValue },
	) => {
		try {
			const data = await updateBrand(id, formData);
			return data;
		} catch (err) {
			if (err instanceof Error) {
				return rejectWithValue(err.message);
			}
		}
	},
);

const brandSlice = createSlice({
	name: "brands",
	initialState: initialState,
	reducers: {
		setBrandCurrentItem: (
			state,
			action: PayloadAction<Omit<CurrentType, "status" | "error">>,
		) => {
			state.current.record = action.payload.record;
			state.current.action = action.payload.action;
		},
		resetBrandCurrentItem: (state) => {
			state.current = {
				action: "create",
				record: null,
				status: "idle",
				error: null,
			};
		},
		resetBrandState: (state) => {
			state = initialState;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(brandSearch.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				state.search.data = action.payload?.data!;
				state.search.totalItems = action.payload?.totalItems!;
			})
			.addCase(brandSearch.pending, (state) => {
				state.list.status = "pending";
			})
			.addCase(brandSearch.rejected, (state, action) => {
				state.list.status = "failed";
				state.list.error = action.payload as string;
				state.search = {
					data: [],
					totalItems: 0,
				};
			})
			.addCase(fetchBrands.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				state.list.data = action.payload!;
			})
			.addCase(fetchBrands.pending, (state) => {
				state.list.status = "pending";
			})
			.addCase(fetchBrands.rejected, (state, action) => {
				state.list.status = "failed";
				state.list.error = action.payload as string;
				state.list.data = [];
			})
			.addCase(addBrand.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data.unshift(action.payload!);
			})
			.addCase(addBrand.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(addBrand.rejected, (state, action) => {
				state.current.status = "failed";
				state.current.error = action.payload as string;
			})
			.addCase(removeBrand.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data = state.search.data.filter(
					(item) => item.id !== action.payload!,
				);
			})
			.addCase(removeBrand.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(removeBrand.rejected, (state, action) => {
				state.current.status = "failed";
				state.current.error = action.payload as string;
			})
			.addCase(editBrand.fulfilled, (state, action) => {
				state.current.status = "succeeded";
				state.search.data = state.search.data.map((item) => {
					if (item.id === action.payload?.id)
						return action.payload as Brand;
					return item;
				});
			})
			.addCase(editBrand.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(editBrand.rejected, (state, action) => {
				state.current.status = "failed";
				state.current.error = action.payload as string;
			});
	},
});

export const selectBrands = (state: RootState) => state.brands.list;
export const selectBrandsSearch = (state: RootState) => state.brands.search;
export const selectBrandCurrentItem = (state: RootState) =>
	state.brands.current;

export const { setBrandCurrentItem, resetBrandCurrentItem, resetBrandState } =
	brandSlice.actions;

export default brandSlice.reducer;