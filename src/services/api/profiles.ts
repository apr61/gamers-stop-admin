import supabase from "../../utils/supabase";
import { CustomUser } from "../../utils/types";

export async function getProfiles() {
	try {
		const { data, error } = await supabase()
			.from("profiles")
			.select("*");

		if (error) throw error;

		return data as CustomUser[];
	} catch (error) {
		console.error("Error fetching profiles:", error);
		throw error;
	}
}

