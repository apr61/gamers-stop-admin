import UsersHeader from "@/features/users/components/UsersHeader";
import ListUsers from "@/features/users/components/ListUsers";

const Users = () => {
	return (
		<div className="my-8">
			<UsersHeader />
			<div className="my-4">
				<ListUsers />
			</div>
		</div>
	);
};

export default Users;
