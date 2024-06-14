import supabase from "../../utils/supabase";
import { CustomUser } from "@/types/api";
import errorHandler from "../errorHandler";

const getProfiles = async () => {
	const { data, error } = await supabase().from("profiles").select("*");

	if (error) return errorHandler(error.message, error.code);

	return data as CustomUser[];
};

const searchProfiles = async () => {
	const { count, error: countError } = await supabase()
		.from("profiles")
		.select("*", { count: "exact", head: true });

	if (countError) return errorHandler(countError.message, countError.code);

	const { data, error } = await supabase().from("profiles").select("*, user_role: user_roles(role)");

	if (error) return errorHandler(error.message, error.code);
	console.log(data)
	return {
		data: data as CustomUser[],
		count: count ? count : 0,
	};
};

const getProfileById = async (userId: string) => {
	const { data, error } = await supabase()
		.from("profiles")
		.select("*")
		.eq("id", userId)
		.single();
	if (error) return errorHandler(error.message, error.code);
	return data;
};

export { getProfileById, getProfiles, searchProfiles };
