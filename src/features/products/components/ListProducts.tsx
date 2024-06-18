import {
  productSearch,
  selectProducts,
  selectProductsSearch,
  selectProductItemsView,
  setProductCurrentItem,
} from "../productSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Product, ColumnConfig, QueryType } from "@/types/api";
import Pagination from "@/components/ui/Pagination";
import Table from "@/components/ui/Table";
import { GridItemsAction, TableActions } from "@/components/ItemActions";
import ItemsGridLayout from "@/components/layouts/ItemsGridLayout";
import { currencyFormatter } from "@/utils/currencyFormatter";

const columns: ColumnConfig<Product>[] = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Product",
    render: (record: Product) => (
      <div className="flex gap-2 items-start">
        {record.images && record.images.length > 0 ? (
          <img
            src={record.images[0]}
            alt={record.name}
            className="w-10 h-10 brightness-[90%]"
          />
        ) : null}
        <p>{record.name}</p>
      </div>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    render: (record: Product) => `${currencyFormatter(record.price)}`,
  },
  {
    title: "Stock",
    render: (record: Product) =>
      record.quantity > 0 ? "InStock" : "OutOfStock",
  },
  {
    title: "Category",
    dataIndex: "category",
    render: (record: Product) =>
      record && record.category ? record.category!.category_name : "",
  },
  {
    title: "Brand",
    render: (record: Product) =>
      record && record.brand ? record.brand!.brand_name : "",
  },
];

const ListProducts = () => {
  const { data, totalItems } = useAppSelector(selectProductsSearch);
  const { status, error } = useAppSelector(selectProducts);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";
  const itemsPerPage = 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const dispatch = useAppDispatch();
  const itemsView = useAppSelector(selectProductItemsView);
  const navigate = useNavigate();

  const handleRead = (record: Product) => {
    dispatch(setProductCurrentItem({ record: record, action: "read" }));
    navigate(`./${record.id}/show`);
  };
  const handleUpdate = (record: Product) => {
    dispatch(setProductCurrentItem({ record: record, action: "update" }));
    navigate(`./${record.id}/edit`);
  };
  const handleDelete = (record: Product) => {
    dispatch(setProductCurrentItem({ record: record, action: "delete" }));
  };

  const tableColumns: ColumnConfig<Product>[] = [
    ...columns,
    {
      title: "Actions",
      render: (record: Product) => (
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
    const query: QueryType<Product> = {
      pagination: {
        from: from,
        to: to,
      },
      search: {
        query: "name",
        with: search,
      },
      tableName: "categories",
    };
    dispatch(productSearch(query));
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
        <div className="">
          <Table columns={tableColumns} data={data as Product[]} />
        </div>
      ) : (
        <ProductGridView
          data={data}
          readFn={handleRead}
          editFn={handleUpdate}
          deleteFn={handleDelete}
        />
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

export default ListProducts;

type ProductGridViewProps = {
  data: Product[];
  readFn: (record: Product) => void;
  editFn: (record: Product) => void;
  deleteFn: (record: Product) => void;
};

const ProductGridView = ({ data, ...props }: ProductGridViewProps) => {
  return (
    <ItemsGridLayout>
      {data.map((product) => (
        <GridItemsAction key={product.id} record={product} {...props}>
          <div className="mt-6 flex gap-2 flex-col items-center md:items-start">
            <div className="w-full h-[12rem]">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover brightness-90 rounded-md"
              />
            </div>
            <div>
              <h2 className="text-xl">{product.name}</h2>
              <p className="text-xl font-semibold">
                {currencyFormatter(product.price)}
              </p>
              {product.quantity > 0 ? (
                <p className="text-emerald-600 text-lg">In Stock</p>
              ) : (
                <p className="text-red-600 text-lg">Out of stock</p>
              )}
            </div>
          </div>
        </GridItemsAction>
      ))}
    </ItemsGridLayout>
  );
};
