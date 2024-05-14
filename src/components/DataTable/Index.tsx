import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Dropdown from "../../components/ui/Dropdown";
import { Category } from "../../utils/types";
import { useAppDispatch } from "../../redux/store/hooks";
import { ReactElement, Dispatch, useState } from "react";
import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import { setActionType } from "../../redux/slice/categoriesSlice";

type DataTableProps = {
  categories: Category[];
  setDrawer: Dispatch<React.SetStateAction<boolean>>;
  handleModal: () => void;
};

const DataTable = ({ categories, setDrawer, handleModal }: DataTableProps) => {
  const dispatch = useAppDispatch();

  const dropDownItems = [
    {
      label: "Read",
      icon: <EyeOutlined />,
      key: "read",
    },
    {
      label: "Update",
      icon: <EditOutlined />,
      key: "update",
    },
    {
      label: "Delete",
      icon: <DeleteOutlined />,
      key: "delete",
    },
  ];

  const handleRead = (record: Category) => {
    dispatch(setActionType({ action: "read", record: record }));
    setDrawer(true);
  };
  const handleUpdate = (record: Category) => {
    dispatch(setActionType({ action: "update", record: record }));
    setDrawer(true);
  };
  const handleDelete = (record: Category) => {
    dispatch(setActionType({ action: "delete", record: record }));
    handleModal();
  };

  const handleDropdownOnClick = (key: string, record: Category) => {
    switch (key) {
      case "read": {
        handleRead(record);
        break;
      }
      case "update": {
        handleUpdate(record);
        break;
      }
      case "delete": {
        handleDelete(record);
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className="mt-4">
      <table className="w-full rounded-md overflow-x-auto">
        <thead className="text-black bg-gray-50 border-b-[1px]">
          <tr>
            <th className="text-start p-4 font-normal">Name</th>
            <th className="text-start p-4 font-normal">Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr className="border-b-[1px]" key={category.id}>
              <td className="ext-start p-2">{category.category_name}</td>
              <td className="ext-start p-2">
                <img
                  loading="lazy"
                  src={category.category_image}
                  alt={category.category_name}
                  className="w-12 h-12"
                />
              </td>
              <td>
                <CrudActions
                  key={category.id}
                  children={
                    <Dropdown
                      onItemClick={(label) =>
                        handleDropdownOnClick(label, category)
                      }
                      items={dropDownItems}
                    />
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

type DropDownActionsProps = {
  children: ReactElement | ReactElement[];
};

const CrudActions = ({ children }: DropDownActionsProps) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useOnOutsideClick(() => setDropDown(false));
  return (
    <div className="relative w-fit" ref={dropDownRef}>
      <button className="text-2xl" onClick={() => setDropDown((prev) => !prev)}>
        <EllipsisOutlined />
      </button>
      {dropDown && children}
    </div>
  );
};
