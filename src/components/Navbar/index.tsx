import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { selectSideNav, setSideNav } from "../../redux/slice/uiActionsSlice";
import { logOutUser, selectCurrentUser, setAuthStatus } from "../../redux/slice/authSlice";
import BlankUserProfile from "../../assets/blank-profile-picture.webp";
import { useOnOutsideClick } from "@/hooks/useOnClickOutside";
import {
  DropDownMenu,
  DropDownList,
  DropDownItem,
  DropDownSeparator,
} from "../ui/Dropdown";
import { useState } from "react";

const Navbar = () => {
  const sidenavOpen = useAppSelector(selectSideNav);
  const dispatch = useAppDispatch();

  return (
    <nav
      className={`${
        sidenavOpen ? "md:pl-[18.5rem] lg:pl-2" : ""
      } sticky top-0 z-20 flex items-center bg-white w-full p-2 shadow-md`}
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
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useAppDispatch()
  const dropDownRef = useOnOutsideClick(() => setDropDown(false));
  
  if (status === "pending" || session === null) {
    return;
  }
  const userData = session.user.user_metadata;
  const userProfilePic = userData.avatar_url
    ? userData.avatar_url
    : BlankUserProfile;
  
  const handleLogout = async () => {
    await dispatch(logOutUser());
    dispatch(setAuthStatus("idle"));
  };
  
  return (
    <div ref={dropDownRef} className="relative">
      <Button
        btnType="icon"
        className="w-10 h-10 overflow-hidden rounded-full p-0 focus:outline-gray-400"
        title={userData.full_name}
        onClick={() => setDropDown((prev) => !prev)}
      >
        <img
          src={userProfilePic}
          alt={userData.full_name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </Button>
      <DropDownMenu
        className={`top-14 right-0 min-w-[10rem] ${dropDown ? "max-h-96 p-1" : "max-h-0"}`}
      >
        <DropDownList>
          <DropDownItem>
            <div className="flex gap-2 items-center">
              <img
                src={userProfilePic}
                alt={userData.full_name}
                loading="lazy"
                className="w-8 h-8 object-cover rounded-full"
              />
              <p>{userData.full_name}</p>
            </div>
          </DropDownItem>
          <DropDownSeparator />
          <DropDownItem>
            <Button
              btnType="danger"
              className="w-full flex gap-2 justify-center items-center py-1"
              onClick={handleLogout}
            >
              <>
                <span className="text-xl">
                  <LoginOutlined />
                </span>
                Logout
              </>
            </Button>
          </DropDownItem>
        </DropDownList>
      </DropDownMenu>
    </div>
  );
};
