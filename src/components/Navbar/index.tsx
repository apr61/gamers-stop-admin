import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { selectSideNav, setSideNav } from "../../redux/slice/uiActionsSlice";
import { selectCurrentUser } from "../../redux/slice/authSlice";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";

const Navbar = () => {
  const sidenavOpen = useAppSelector(selectSideNav);
  const dispatch = useAppDispatch();

  return (
    <nav
      className={`${
        sidenavOpen ? "md:pl-[18.5rem] lg:pl-2" : ""
      } sticky top-0 z-20 flex items-center bg-white w-full p-2 shadow-md transition-all`}
    >
      <Button
        btnType="icon"
        onClick={() => dispatch(setSideNav(!sidenavOpen))}
        title={sidenavOpen ? "Close Side Menu" : "Open Side Menu"}
      >
        <span className="text-xl hover:bg-gray-100 w-10 h-10 rounded-md grid place-content-center">
          {sidenavOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </span>
      </Button>
      <div className="ml-auto">
        <UserProfile />
      </div>
    </nav>
  );
};

export default Navbar;

const UserProfile = () => {
  const { status, session } = useAppSelector(selectCurrentUser);
  if (status === "pending" || session === null) {
    return;
  }
  const userData = session.user.user_metadata;
  const userProfilePic = userData.avatar_url
    ? userData.avatar_url
    : BlankUserProfile;
  return (
    <div
      className="w-8 h-8 rounded-full overflow-hidden"
      title={userData.full_name}
    >
      <img src={userProfilePic} alt={userData.full_name} loading="lazy" />
    </div>
  );
};
