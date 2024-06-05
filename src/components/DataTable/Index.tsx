import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { CrudConfig, QueryType, ColumnConfig } from "../../utils/types";
import { useAppDispatch } from "../../redux/store/hooks";
import { useEffect } from "react";
import Table from "../ui/Table";
import { openDeleteModal, openDrawer } from "../../redux/slice/uiActionsSlice";
import Pagination from "../ui/Pagination";
import { useSearchParams } from "react-router-dom";
import Button from "../ui/Button";

type DataTableProps<T> = {
  config: CrudConfig<T>;
};

const DataTable = <T,>({ config }: DataTableProps<T>) => {
  const dispatch = useAppDispatch();
  const {
    error,
    status,
    search: { data, totalItems },
  } = config.entity.entityData;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const itemsPerPage = 5;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

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

  const handleRead = (record: T) => {
    config.entity.setCurrentItemFn("read", record);
    dispatch(openDrawer());
  };
  const handleUpdate = (record: T) => {
    config.entity.setCurrentItemFn("update", record);
    dispatch(openDrawer());
  };
  const handleDelete = (record: T) => {
    config.entity.setCurrentItemFn("delete", record);
    dispatch(openDeleteModal());
  };

  const handleDropdownOnClick = (key: string, record: T) => {
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
  const columns: ColumnConfig<T>[] = [
    ...config.columns,
    {
      title: "Actions",
      render: (record: T) => (
        <div className="flex gap-1 items-center">
          {dropDownItems.map((item) => (
            <Button
              title={item.label}
              btnType="icon"
              onClick={() => handleDropdownOnClick(item.key, record)}
              key={item.label}
            >
              <span
                className={`grid place-content-center p-2 w-8 h-8 rounded-full hover:text-white ${item.className}`}
              >
                {item.icon}
              </span>
            </Button>
          ))}
        </div>
      ),
    },
  ];

  useEffect(() => {
    const from = (+page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    const query: QueryType<T> = {
      pagination: {
        from: from,
        to: to,
      },
      search: {
        query: config.search,
        with: search,
      },
      tableName: config.TABLE_NAME,
    };
    config.entity.searchFn(query);
  }, [dispatch, page, search, config.search, config.TABLE_NAME]);

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="mt-2">
      <Table
        columns={columns}
        data={data as T[]}
        isLoading={status === "pending"}
      />
      <div className="flex w-full mt-4 justify-between">
        <p>
          Page {+page} of {totalPages}
        </p>
        <Pagination
          currentPage={+page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default DataTable;
