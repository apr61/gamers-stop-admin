import { ReactElement } from "react";

type DrawerProps = {
  children: ReactElement[] | ReactElement;
  isDrawerOpen: boolean;
  closeDrawer: () => void;
};

const Drawer = ({ children, isDrawerOpen, closeDrawer }: DrawerProps) => {
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
        className="opacity-100 fixed top-0 bottom-0 right-0 bg-white max-w-xl w-full py-10 px-6"
        onClick={handleInnerClick}
      >
        <button
          className="text-5xl absolute top-0 right-4"
          onClick={closeDrawer}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Drawer;
