import { useOnOutsideClick } from "@/hooks/useOnClickOutside";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { PropsWithChildren, useState } from "react";
import Button from "../ui/Button";
import {
  DropDownItem,
  DropDownList,
  DropDownMenu,
} from "../ui/Dropdown";

type GridItemsActionsProps<T> = PropsWithChildren & {
  readFn: (record: T) => void;
  editFn: (record: T) => void;
  deleteFn: (record: T) => void;
  record: T;
};

export const GridItemsAction = <T,>({
  readFn,
  record,
  editFn,
  deleteFn,
  children,
}: GridItemsActionsProps<T>) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useOnOutsideClick(() => setDropDown(false));
  return (
    <article className="border p-4 shadow-md bg-white rounded-md">
      <div className="relative" ref={dropDownRef}>
        <Button
          btnType="icon"
          type="button"
          className="text-xl absolute -top-2 right-0 p-1 hover:bg-gray-100"
          onClick={() => setDropDown((prev) => !prev)}
        >
          <EllipsisOutlined />
        </Button>
        <DropDownMenu
          className={`right-0 top-6 border min-w-fit ${dropDown ? "max-h-96" : "border-0"}`}
        >
          <DropDownList className="gap-0">
            <DropDownItem className="px-1">
              <Button
                className="flex gap-2 w-full text-blue-500 hover:bg-blue-400 hover:text-white"
                btnType="icon"
                onClick={() => readFn(record)}
              >
                <EyeOutlined />
                Show
              </Button>
            </DropDownItem>
            <DropDownItem className="px-1">
              <Button
                className="flex gap-2 w-full text-purple-500 hover:bg-purple-500 hover:text-white"
                btnType="icon"
                onClick={() => editFn(record)}
              >
                <EditOutlined />
                Edit
              </Button>
            </DropDownItem>
            <DropDownItem className="px-1">
              <Button
                className="flex gap-2 w-full text-red-500 hover:bg-red-500 hover:text-white"
                btnType="icon"
                onClick={() => deleteFn(record)}
              >
                <DeleteOutlined />
                Delete
              </Button>
            </DropDownItem>
          </DropDownList>
        </DropDownMenu>
      </div>
      {children}
    </article>
  );
};
