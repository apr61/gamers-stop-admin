import { CloseOutlined } from "@ant-design/icons";
import { ReactElement } from "react";
import Button from "../Button";
import { cn } from "@/utils/cn";

type DrawerProps = {
  children: ReactElement[] | ReactElement;
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  title?: string;
  className?: string;
};

const Drawer = ({
  children,
  isDrawerOpen,
  closeDrawer,
  title = "",
  className,
}: DrawerProps) => {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`
        ${
          isDrawerOpen
            ? "fixed top-0 bottom-0 left-0 right-0 opacity-100 bg-pop-over z-50"
            : ""
        }
      `}
      onClick={closeDrawer}
    >
      <div
        className={`${cn(
          `opacity-100 fixed top-0 bottom-0 right-0 max-w-[24rem] transition-all w-full p-4 overflow-y-auto bg-dimBlack ${
            isDrawerOpen ? "" : "-mr-[30rem]"
          }`,
          className
        )}`}
        onClick={handleInnerClick}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-lg">{title}</h2>
          <Button className="text-lg" onClick={closeDrawer} btnType="icon">
            <CloseOutlined />
          </Button>
        </div>
        <hr className="mb-4 mt-2" />
        {children}
      </div>
    </div>
  );
};

export default Drawer;
