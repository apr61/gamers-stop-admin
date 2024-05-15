import DataTable from "../components/DataTable/Index";
import DeleteModal from "../components/DeleteModal";
import CategoriesForm from "../components/forms/CategoriesForm";
import Drawer from "../components/ui/Drawer";
import {
  resetActionType,
  selectCurrentItem,
} from "../redux/slice/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import {
  closeDrawer,
  openDrawer,
  selectDrawer,
} from "../redux/slice/crudStateSlice";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { CrudConfig } from "../utils/types";

type CrudLayoutProps = {
  config: CrudConfig;
};

const CrudLayout = ({ config }: CrudLayoutProps) => {
  const { record, action } = useAppSelector(selectCurrentItem);
  const dispatch = useAppDispatch();
  const drawer = useAppSelector(selectDrawer);

  const handleDrawer = () => {
    dispatch(closeDrawer());
    dispatch(resetActionType());
  };

  return (
    <>
      <Drawer
        isDrawerOpen={drawer}
        closeDrawer={handleDrawer}
        title={config.entity}
      >
        <CategoriesForm record={record} action={action} />
      </Drawer>
      <div className="px-8 py-10 w-full bg-white rounded-md">
        <FixedHeaderContent config={config} />
        <DataTable />
      </div>
      <DeleteModal />
    </>
  );
};

export default CrudLayout;

type FixedHeaderContent = {
  config: CrudConfig;
};

const FixedHeaderContent = ({ config }: FixedHeaderContent) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
        <Button
          className="flex items-center gap-2"
          onClick={() => dispatch(openDrawer())}
        >
          <>
            <PlusOutlined />
            Add new category
          </>
        </Button>
      </div>
    </header>
  );
};
