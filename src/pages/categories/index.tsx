import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Input from "../../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, Dispatch } from "react";
import Drawer from "../../components/ui/Drawer";
import CategoriesForm from "../../components/forms/CategoriesForm";
import {
  fetchCategories,
  selectListItems,
  resetActionType,
  selectCurrentItem,
} from "../../redux/slice/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import DataTable from "../../components/DataTable/Index";
import Modal from "../../components/Modal";
import Button from "../../components/ui/Button";
import DeleteModal from "../../components/DeleteModal";

const Categories = () => {
  const [drawer, setDrawer] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { data: categories, status, error } = useAppSelector(selectListItems);
  const { record, action } = useAppSelector(selectCurrentItem);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  if (status === "pending") return <h1>Loading...</h1>;
  if (error) return <p>{error}</p>;

  const handleDrawer = () => {
    setDrawer(false);
    dispatch(resetActionType());
  };

  return (
    <>
      <Drawer isDrawerOpen={drawer} closeDrawer={handleDrawer}>
        <CategoriesForm record={record} action={action} />
      </Drawer>
      <div className="px-8 py-10 w-full bg-white rounded-md">
        <FixedHeaderContent setDrawer={setDrawer} />
        <DataTable
          categories={categories}
          setDrawer={setDrawer}
          handleModal={() => setDeleteModal(true)}
        />
      </div>
      <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
    </>
  );
};

export default Categories;

type FixedHeaderContentProps = {
  setDrawer: Dispatch<React.SetStateAction<boolean>>;
};

const FixedHeaderContent = ({ setDrawer }: FixedHeaderContentProps) => {
  const navigate = useNavigate();
  return (
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
  );
};
