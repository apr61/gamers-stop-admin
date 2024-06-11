import {
  categorySearch,
  selectCategories,
  selectCategoriesSearch,
  selectCategoryItemsView,
  setCategoryCurrentItem,
} from "../categorySlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Category, ColumnConfig, QueryType } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { GridItemsAction, TableActions } from "@/components/ItemActions";
import ItemsGridLayout from "@/components/layouts/ItemsGridLayout";

const columns: ColumnConfig<Category>[] = [
  {
    title: "Name",
    dataIndex: "category_name",
  },
  {
    title: "Image",
    dataIndex: "category_image",
    render: (record: Category) => (
      <img
        src={record.category_image}
        alt={record.category_name}
        className="w-10 h-10 brightness-[90%]"
      />
    ),
  },
];

const ListCategories = () => {
  const { data, totalItems } = useAppSelector(selectCategoriesSearch);
  const { status, error } = useAppSelector(selectCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const dispatch = useAppDispatch();
  const itemsView = useAppSelector(selectCategoryItemsView);

  const handleRead = (record: Category) => {
    dispatch(setCategoryCurrentItem({ record: record, action: "read" }));
  };
  const handleUpdate = (record: Category) => {
    dispatch(setCategoryCurrentItem({ record: record, action: "update" }));
  };
  const handleDelete = (record: Category) => {
    dispatch(setCategoryCurrentItem({ record: record, action: "delete" }));
  };

  const tableColumns: ColumnConfig<Category>[] = [
    ...columns,
    {
      title: "Actions",
      render: (record: Category) => (
        <TableActions
          record={record}
          readFn={handleRead}
          deleteFn={handleDelete}
          editFn={handleUpdate}
        />
      ),
    },
  ];

  useEffect(() => {
    const from = (+page - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;
    const query: QueryType<Category> = {
      pagination: {
        from: from,
        to: to,
      },
      search: {
        query: "category_name",
        with: search,
      },
      tableName: "categories",
    };
    dispatch(categorySearch(query));
  }, [page, search]);

  const setPage = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set("page", newPage.toString());
      return prev;
    });
  };
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div className="mt-2">
      {itemsView === "LIST" ? (
        <div className="bg-white">
          <Table
            columns={tableColumns}
            data={data as Category[]}
            isLoading={status === "pending"}
          />
        </div>
      ) : (
        <ItemsGridLayout>
          {data.map((category) => (
            <CategoryGridItem
              key={category.id}
              category={category}
              editFn={handleUpdate}
              readFn={handleRead}
              deleteFn={handleDelete}
            />
          ))}
        </ItemsGridLayout>
      )}
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

export default ListCategories;

type CategoryGridItemProps = {
  category: Category;
  readFn: (record: Category) => void;
  editFn: (record: Category) => void;
  deleteFn: (record: Category) => void;
};

const CategoryGridItem = ({
  category,
  readFn,
  deleteFn,
  editFn,
}: CategoryGridItemProps) => {
  return (
    <article className="border p-4 shadow-md bg-white rounded-md">
      <GridItemsAction
        record={category}
        readFn={readFn}
        deleteFn={deleteFn}
        editFn={editFn}
      />
      <div className="mt-6 flex gap-2 flex-col">
        <div className="max-w-[20rem] w-full h-[15rem]">
          <img
            src={category.category_image}
            alt={category.category_name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl">{category.category_name}</h3>
      </div>
    </article>
  );
};
