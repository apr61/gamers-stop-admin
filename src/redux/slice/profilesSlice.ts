import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomUser } from "../../utils/types";
import { RootState } from "../store/store";
import { getProfiles } from "../../services/api/profiles";

type ProfileState = {
	users: CustomUser[];
	status: "idle" | "pending" | "succeeded" | "failed";
	error: string | null;
};

const initialState: ProfileState = {
	users: [],
	status: "idle",
	error: null,
};

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

const profileSlice = createSlice({
	name: "users",
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.pending, (state) => {
				state.status = "pending";
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				(state.users = action.payload),
					(state.status = "succeeded"),
					(state.error = null);
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.users = [];
				state.error = action.payload as string;
				state.status = "failed";
			});
	},
});

export const selectUsers = (state: RootState) => state.profiles;

export default profileSlice.reducer;
