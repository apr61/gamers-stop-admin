import {
  ArrowLeftOutlined,
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
  EyeOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import Drawer from "../../components/ui/Drawer";
import CategoriesForm from "../../components/forms/CategoriesForm";
import {
  fetchCategories,
  selectListItems,
} from "../../redux/slice/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import Dropdown from "../../components/Dropdown";
import { useOnOutsideClick } from "../../hooks/useOnClickOutside";
import { Category } from "../../utils/types";

const Categories = () => {
  const navigate = useNavigate();
  const [drawer, setDrawer] = useState(false);
  const { data: categories, status, error } = useAppSelector(selectListItems);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  if (status === "pending") return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

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

  const handleRead = (record: Category) => {};
  const handleUpdate = (record: Category) => {};
  const handleDelete = (record: Category) => {};

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
    <>
      <Drawer isDrawerOpen={drawer} closeDrawer={() => setDrawer(false)}>
        <CategoriesForm />
      </Drawer>
      <div className="px-8 py-10 w-full bg-white rounded-md">
        <header className="flex items-center gap-4">
          <button
            className="text-lg hover:text-blue-500 py-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined />
          </button>
          <h2 className="text-xl">Categories List</h2>
          <div className="ml-auto flex gap-2">
            <Input type="search" placeholder="search" />
            <button
              className="bg-blue-700 text-white py-2 px-4 rounded-md flex items-center gap-2 hover:bg-opacity-90"
              onClick={() => setDrawer(true)}
            >
              <PlusOutlined />
              Add new category
            </button>
          </div>
        </header>
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
                    <DropDownActions
                      key={category.id}
                      dropDownContent={
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
      </div>
    </>
  );
};

export default Categories;

type DropDownActionsProps = {
  dropDownContent: ReactElement | ReactElement[];
};

const DropDownActions = ({ dropDownContent }: DropDownActionsProps) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useOnOutsideClick(() => setDropDown(false));
  return (
    <div className="relative w-fit" ref={dropDownRef}>
      <button className="text-2xl" onClick={() => setDropDown((prev) => !prev)}>
        <EllipsisOutlined />
      </button>
      {dropDown && dropDownContent}
    </div>
  );
};
