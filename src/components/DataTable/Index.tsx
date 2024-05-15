import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Dropdown from "../../components/ui/Dropdown";
import { Category } from "../../utils/types";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { ReactElement, useEffect, useState } from "react";
import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import {
  fetchCategories,
  selectListItems,
  setActionType,
} from "../../redux/slice/categoriesSlice";
import Table from "../ui/Table";
import { openDeleteModal, openDrawer } from "../../redux/slice/crudStateSlice";

const DataTable = () => {
  const dispatch = useAppDispatch();
  const { data: categories, error, status } = useAppSelector(selectListItems);

  const dropDownItems = [
    {
      label: "Show",
      icon: <EyeOutlined />,
      key: "read",
    },
    {
      label: "Edit",
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
    dispatch(openDrawer());
  };
  const handleUpdate = (record: Category) => {
    dispatch(setActionType({ action: "update", record: record }));
    dispatch(openDrawer());
  };
  const handleDelete = (record: Category) => {
    dispatch(setActionType({ action: "delete", record: record }));
    dispatch(openDeleteModal());
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
  const columns = [
    { title: "Name", dataIndex: "category_name" },
    {
      title: "Image",
      dataIndex: "category_image",
      render: (record: Category) => (
        <img
          loading="lazy"
          src={record.category_image}
          alt={record.category_name}
          className="w-12 h-12"
        />
      ),
    },
    {
      title: "",
      render: (record: Category) => (
        <CrudActions>
          <Dropdown
            onItemClick={(label) => handleDropdownOnClick(label, record)}
            items={dropDownItems}
          />
        </CrudActions>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <Table
        columns={columns}
        data={categories}
        isLoading={status === "pending"}
      />
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
