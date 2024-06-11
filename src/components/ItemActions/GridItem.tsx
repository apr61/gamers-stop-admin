import { useOnOutsideClick } from "@/hooks/useOnClickOutside";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";

type GridItemsActionsProps<T> = {
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
}: GridItemsActionsProps<T>) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useOnOutsideClick(() => setDropDown(false));
  const dropDownItems = [
    {
      label: "Show",
      icon: <EyeOutlined />,
      key: "read",
      className: "bg-blue-200 text-blue-500 hover:bg-blue-500",
    },
    {
      label: "Edit",
      icon: <EditOutlined />,
      key: "update",
      className: "bg-purple-200 text-purple-500 hover:bg-purple-500",
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      key: "delete",
      className: "bg-red-200 text-red-500 hover:bg-red-500",
    },
  ];
  const handleDropdownOnClick = (key: string, record: T) => {
    switch (key) {
      case "read": {
        readFn(record);
        break;
      }
      case "update": {
        editFn(record);
        break;
      }
      case "delete": {
        deleteFn(record);
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className="relative">
      <Button
        btnType="icon"
        type="button"
        className="text-xl absolute -top-2 right-0 px-1 py-1 hover:bg-gray-100"
        onClick={() => setDropDown(true)}
      >
        <EllipsisOutlined />
      </Button>
      <Dropdown
        ref={dropDownRef}
        onItemClick={(label) => handleDropdownOnClick(label, record)}
        items={dropDownItems}
        className={`right-0 top-2 ${!dropDown ? "hidden" : ""}`}
      />
    </div>
  );
};
