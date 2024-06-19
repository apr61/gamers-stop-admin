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
import { ReactElement, useEffect } from "react";
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
  const sideNavMobile = windowSize.width > 0 && windowSize.width < 1024;
  const handleClickOutside = () => {
    if (sideNavMobile) {
      dispatch(setSideNav(false));
    }
  };

  useEffect(() => {
    if(windowSize.width >= 1024){
      dispatch(setSideNav(true));
    }
  }, [windowSize])

  const sideNavRef = useOnOutsideClick(handleClickOutside);
  return (
    <div
      className={
        sideNavMobile && sidenavOpen
          ? `fixed top-0 bottom-0 left-0 right-0 opacity-100 bg-pop-over z-50`
          : ""
      }
    >
      <aside
        className={`min-h-screen flex flex-col w-[14rem] top-0 bottom-0 fixed z-50 lg:sticky overflow-y-auto transition-all  ${
          !sidenavOpen ? "-ml-[18rem] " : ""
        }`}
        ref={sideNavRef}
      >
        <div className="flex items-center justify-between w-full bg-white dark:bg-dimBlack">
          <Link to="/dashboard" className={`text-2xl 2xl:text-4xl block p-4 w-full ${!sidenavOpen ? "shadow-custom-dark" : ""}`}>
            Gamers Stop
          </Link>
          {/* <Button
            className="lg:hidden"
            btnType="icon"
            onClick={() => dispatch(setSideNav(false))}
          >
            <CloseOutlined />
          </Button> */}
        </div>
        <ul className="flex flex-col h-full px-4 md:py-4 bg-accent flex-stretch">
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
            isActive ? "bg-primary text-white" : "hover:bg-muted"
          }`
        }
      >
        <span className="text-xl">{Icon}</span>
        {text}
      </NavLink>
    </li>
  );
};
