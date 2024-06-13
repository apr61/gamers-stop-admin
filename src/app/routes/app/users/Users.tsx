import UsersHeader from "@/features/users/components/UsersHeader";
import ListUsers from "@/features/users/components/ListUsers";
import ReadUser from "@/features/users/components/ReadUser";
import AddUser from "@/features/users/components/AddUser";

const Users = () => {
  return (
    <div className="my-8">
      <UsersHeader />
      <div className="my-4">
        <ListUsers />
      </div>
      <ReadUser />
	  <AddUser />
    </div>
  );
};

export default Users;
