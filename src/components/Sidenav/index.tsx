import {
  BookOutlined,
  CloseOutlined,
  ClusterOutlined,
  DashboardOutlined,
  EnvironmentOutlined,
  ProductOutlined,
  TrademarkOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "../ui/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectSideNav, setSideNav } from "../../redux/slice/uiActionsSlice";
import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import useWindowSize from "../../hooks/useWindowSize";

const Sidenav = () => {
  const dispatch = useAppDispatch();
  const navItems = [
    {
      href: "/dashboard",
      text: "Dashboard",
      icon: <DashboardOutlined />,
    },
    {
      href: "/users",
      text: "Users",
      icon: <UserOutlined />,
    },
    {
      href: "/products",
      text: "Products",
      icon: <ProductOutlined />,
    },
    {
      href: "/categories",
      text: "Categories",
      icon: <ClusterOutlined />,
    },
    {
      href: "/orders",
      text: "Orders",
      icon: <BookOutlined />,
    },
    {
      href: "/addresses",
      text: "Addresses",
      icon: <EnvironmentOutlined />,
    },
    {
      href: "/brands",
      text: "Brands",
      icon: <TrademarkOutlined />,
    },
  ];
  const sidenavOpen = useAppSelector(selectSideNav);

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
          ? `fixed md:static top-0 bottom-0 left-0 right-0 opacity-100 bg-black bg-opacity-20 z-50`
          : ""
      }
    >
      <aside
        className={`bg-white min-h-screen p-4 flex flex-col w-[16rem] sm:w-[18rem] top-0 bottom-0 absolute lg:sticky z-50 overflow-y-auto transition-all shadow-lg ${
          !sidenavOpen ? "-ml-[18rem] " : ""
        }`}
        ref={sideNavRef}
      >
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="text-2xl 2xl:text-4xl block">
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
      >
        <span className="text-xl">{Icon}</span>
        {text}
      </NavLink>
    </li>
  );
};
