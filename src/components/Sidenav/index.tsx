import {
  BookOutlined,
  ClusterOutlined,
  DashboardOutlined,
  LoginOutlined,
  ProductOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ReactElement } from "react";
import { Link, NavLink } from "react-router-dom";

const Sidenav = () => {
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
  ];

  return (
    <aside className="max-w-[16rem] lg:max-w-xs w-full bg-white rounded-md p-4 flex flex-col sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
      <Link to="/admin" className="text-3xl lg:text-4xl block">
        Gamers Stop
      </Link>
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
        <button className="bg-red-500 text-white w-full text-lg p-2 rounded-md hover:bg-opacity-90 flex gap-2 justify-center transition-all ease-in-out duration-150">
          <span className="text-xl">
            <LoginOutlined />
          </span>
          Logout
        </button>
      </div>
    </aside>
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
          `rounded-md p-2 flex gap-2 items-center hover:bg-gray-100 transition-all ease-in-out duration-150 ${
            isActive ? "bg-blue-400 text-white hover:bg-blue-400" : ""
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
