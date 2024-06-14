import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ItemsViewType, CustomUser, UserFormData } from "@/types/api";
import { RootState } from "@/redux/store/store";
import { createUser, deleteUser, updateUser } from "@/services/api/users";
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
	itemsView: ItemsViewType;
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
	itemsView: "GRID",
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

export const addUser = createAsyncThunk(
	"users/add",
	async (data: UserFormData, { rejectWithValue }) => {
		try {
			const response = await createUser(data);
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return null;
		}
	},
);

export const editUser = createAsyncThunk(
	"users/edit",
	async (
		{ data, id }: { data: UserFormData; id: string },
		{ rejectWithValue },
	) => {
		try {
			const response = await updateUser(id, data);
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return null;
		}
	},
);

export const removeUser = createAsyncThunk(
	"users/remove",
	async (id: string, { rejectWithValue }) => {
		try {
			const response = await deleteUser(id);
			return response;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return null;
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
		setUserItemsView: (state, action: PayloadAction<ItemsViewType>) => {
			state.itemsView = action.payload;
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
			.addCase(addUser.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				const user = action.payload;
				if (user) {
					state.search.data.unshift(user);
				}
			})
			.addCase(addUser.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(addUser.rejected, (state, action) => {
				state.list.status = "failed";
				state.current.error = action.payload as string;
			})
			.addCase(editUser.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				const user = action.payload;
				if (user) {
					state.search.data = state.search.data.map((u) => {
						if (u.id === user.id) {
							return user;
						}
						return u;
					});
				}
			})
			.addCase(editUser.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(editUser.rejected, (state, action) => {
				state.list.status = "failed";
				state.current.error = action.payload as string;
			})
			.addCase(removeUser.fulfilled, (state, action) => {
				state.list.status = "succeeded";
				const id = action.payload;
				if (id) {
					state.search.data = state.search.data.filter((u) => u.id !== id);
				}
			})
			.addCase(removeUser.pending, (state) => {
				state.current.status = "pending";
			})
			.addCase(removeUser.rejected, (state, action) => {
				state.list.status = "failed";
				state.current.error = action.payload as string;
			});
	},
});

export const selectUsers = (state: RootState) => state.users.list;
export const selectUsersSearch = (state: RootState) => state.users.search;
export const selectUserCurrentItem = (state: RootState) => state.users.current;
export const selectUserItemsView = (state: RootState) => state.users.itemsView;

export const {
	setUserCurrentItem,
	resetUserCurrentItem,
	resetUserState,
	setUserItemsView,
} = userSlice.actions;

export default userSlice.reducer;
