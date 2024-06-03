import {
  BookOutlined,
  CloseOutlined,
  ClusterOutlined,
  DashboardOutlined,
  GlobalOutlined,
  LoginOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { logOutUser, setAuthStatus } from "../../redux/slice/authSlice";
import { selectSideNav, setSideNav } from "../../redux/slice/uiActionsSlice";
import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import useWindowSize from "../../hooks/useWindowSize";

const Sidenav = () => {
  const dispatch = useAppDispatch();
  const navItems = [
    {
      href: "/admin",
      text: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      href: "/admin/users",
      text: "Users",
      icon: <UserOutlined />,
    },
    {
      href: "/admin/products",
      text: "Products",
      icon: <ProductOutlined />,
    },
    {
      href: "/admin/categories",
      text: "Categories",
      icon: <ClusterOutlined />,
    },
    {
      href: "/admin/orders",
      text: "Orders",
      icon: <BookOutlined />,
    },
    {
      href: "/admin/addresses",
      text: "Addresses",
      icon: <GlobalOutlined />,
    },
  ];
  const sidenavOpen = useAppSelector(selectSideNav);

  const handleLogout = async () => {
    await dispatch(logOutUser());
    dispatch(setAuthStatus("idle"));
  };
  const windowSize = useWindowSize();
  const sideNavMobile = windowSize.width > 0 && windowSize.width <= 768;
  const handleClickOutside = () => {
    if (sideNavMobile) {
      dispatch(setSideNav(false));
    }
  };
  
  const sideNavRef = useOnOutsideClick(handleClickOutside);
  return (
    <div
      className={
        sidenavOpen
          ? `fixed md:static top-0 bottom-0 left-0 right-0 opacity-100 bg-black bg-opacity-20 z-10`
          : ""
      }
    >
      <aside
        className={`bg-white h-full p-4 flex flex-col w-[16rem] sm:w-[18rem] top-0 bottom-0 absolute lg:sticky z-50 overflow-y-auto transition-all shadow-lg ${!sidenavOpen ? "-ml-[18rem] " : ""}`}
        ref={sideNavRef}
      >
        <div className="flex items-center justify-between">
          <Link to="/admin" className="text-2xl 2xl:text-4xl block">
            Gamers Stop
          </Link>
          <Button
            className="md:hidden"
            btnType="icon"
            onClick={() => dispatch(setSideNav(false))}
          >
            <CloseOutlined />
          </Button>
        </div>
        <ul className="py-2 flex flex-col">
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.href}
              href={navItem.href}
              text={navItem.text}
              Icon={navItem.icon}
            />
          ))}
        </ul>
        <div className="mt-auto">
          <Button
            btnType="danger"
            className="w-full flex gap-2 justify-center items-center"
            onClick={handleLogout}
          >
            <>
              <span className="text-xl">
                <LoginOutlined />
              </span>
              Logout
            </>
          </Button>
        </div>
      </aside>
    </div>
  );
};

export default Sidenav;

type NavItemProps = {
  href: string;
  text: string;
  Icon: ReactElement;
};

const NavItem = ({ href, text, Icon }: NavItemProps) => {
  return (
    <li className="w-full">
      <NavLink
        to={href}
        className={({ isActive }) =>
          `rounded-md p-2 flex gap-2 items-center transition-all ease-in-out duration-150 ${
            isActive
              ? "bg-blue-400 text-white hover:bg-blue-400"
              : "hover:bg-gray-100"
          }`
        }
        end
      >
        <span className="text-xl">{Icon}</span>
        {text}
      </NavLink>
    </li>
  );
};
