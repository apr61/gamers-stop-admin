import { CloseOutlined } from "@ant-design/icons";
import { ReactElement } from "react";
import Button from "../Button";

type DrawerProps = {
  children: ReactElement[] | ReactElement;
  isDrawerOpen: boolean;
  closeDrawer: () => void;
  title?: string;
};

const Drawer = ({
  children,
  isDrawerOpen,
  closeDrawer,
  title = "",
}: DrawerProps) => {
  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
  return (
    <div
      className={
        isDrawerOpen
          ? "fixed top-0 bottom-0 left-0 right-0 opacity-100 bg-black bg-opacity-20 z-50"
          : "hidden"
      }
      onClick={closeDrawer}
    >
      <div
        className="opacity-100 fixed top-0 bottom-0 right-0 bg-white max-w-sm w-full p-4"
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
