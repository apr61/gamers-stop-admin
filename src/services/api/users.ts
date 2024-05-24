import supabase from "../../utils/supabase";

const listAllUsers = async () => {
	const {
		data: { users },
		error,
	} = await supabase.adminAuthClient.listUsers();
	if (error) {
		throw new Error(error.message);
	}
	return users;
};

export { listAllUsers };
