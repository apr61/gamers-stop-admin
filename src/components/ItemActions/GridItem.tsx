import { useOnOutsideClick } from "@/hooks/useOnClickOutside";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { PropsWithChildren, useState } from "react";
import Button from "../ui/Button";
import { DropDownItem, DropDownList, DropDownMenu } from "../ui/Dropdown";
import { ItemActionsType } from "@/types/api";

type GridItemsActionsProps<T> = PropsWithChildren & {
  readFn?: (record: T) => void;
  editFn?: (record: T) => void;
  deleteFn?: (record: T) => void;
  record: T;
  allowedActions?: ("READ" | "UPDATE" | "DELETE")[];
};

export const GridItemsAction = <T,>({
  readFn,
  record,
  editFn,
  deleteFn,
  children,
  allowedActions = ["READ", "UPDATE", "DELETE"],
}: GridItemsActionsProps<T>) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useOnOutsideClick(() => setDropDown(false));
  let dropDownItems: ItemActionsType[] = [
    {
      label: "Show",
      icon: <EyeOutlined />,
      key: "READ",
      className: "text-blue-500 hover:bg-blue-400 hover:text-white",
    },
    {
      label: "Edit",
      icon: <EditOutlined />,
      key: "UPDATE",
      className: "text-purple-500 hover:bg-purple-500 hover:text-white",
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      key: "DELETE",
      className: "text-red-500 hover:bg-red-500 hover:text-white",
    },
  ];
  const handleDropdownOnClick = (key: string, record: T) => {
    switch (key) {
      case "READ": {
        readFn && readFn(record);
        break;
      }
      case "UPDATE": {
        editFn && editFn(record);
        break;
      }
      case "DELETE": {
        deleteFn && deleteFn(record);
        break;
      }
      default: {
        break;
      }
    }
  };
  dropDownItems = dropDownItems.filter(
    (dropDown) => allowedActions.indexOf(dropDown.key) !== -1,
  );
  return (
    <article className="border border-border bg-dimBlack p-4 shadow-md  rounded-md">
      <div className="relative" ref={dropDownRef}>
        <Button
          btnType="icon"
          type="button"
          className="text-xl absolute -top-2 right-0 p-1 hover:bg-accent"
          onClick={() => setDropDown((prev) => !prev)}
        >
          <EllipsisOutlined />
        </Button>
        <DropDownMenu
          className={`right-0 top-6 bg-dimBlack border border-border min-w-fit ${dropDown ? "max-h-96" : "border-0"}`}
        >
          <DropDownList className="gap-0">
            {dropDownItems.map((item) => (
              <DropDownItem className="px-1" key={item.key}>
                <Button
                  className={`flex gap-2 w-full ${item.className}`}
                  btnType="icon"
                  onClick={() => handleDropdownOnClick(item.key, record)}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </DropDownItem>
            ))}
          </DropDownList>
        </DropDownMenu>
      </div>
      {children}
    </article>
  );
};
