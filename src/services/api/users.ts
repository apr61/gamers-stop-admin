import supabase from "../../utils/supabase";
import { User } from "../../utils/types";

const listAllUsers = async () => {
	const {
		data: { users },
		error,
	} = await supabase.adminAuthClient.listUsers()
	if (error) {
		throw new Error(error.message);
	}
	const usersData = users.map(user => {
		let customUser: User = {
			email: user.email!,
			full_name: user.user_metadata.full_name,
			user_role: user.user_metadata.user_role,
			phone: user.phone!,
			id: user.id,
			created_at: user.created_at,
			lastLogin: user.last_sign_in_at!,
			last_updated: user.updated_at!,
			avatar_url: user.user_metadata.avatar_url
		}
		return customUser
	})
	const response = {
		data: usersData,
		count: usersData.length
	}
	return response;
};

export { listAllUsers };
