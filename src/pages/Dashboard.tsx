import { selectCurrentUser } from "../redux/slice/authSlice";
import { useAppSelector } from "../redux/store/hooks";

const Dashboard = () => {
  const { user, isLoggedIn, session } = useAppSelector(selectCurrentUser);
  console.log(user, isLoggedIn, session);
  return <div>Dashboard</div>;
};

export default Dashboard;
