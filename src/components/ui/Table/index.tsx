import { ReactElement, ReactNode } from "react";

type ColumnConfig<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (record: T) => ReactElement | string | ReactElement[];
};

type TableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
  isLoading?: boolean;
};

const Table = <T,>({ columns, data, isLoading = false }: TableProps<T>) => {
  const TableHeader = (
    <tr>
      {columns.map((column) => (
        <th key={column.title} className="text-start p-2 w-fit text-nowrap">
          {column.title}
        </th>
      ))}
    </tr>
  );
  const TableBody = isLoading ? (
    <tr className="col-span">
      <td>Loading...</td>
    </tr>
  ) : data.length === 0 ? (
    <tr className="col-span">
      <td>No data found</td>
    </tr>
  ) : (
    data.map((record, rowIndex) => (
      <tr
        className="border-b-[1px] hover:bg-gray-50 transition-all ease-in-out duration-150"
        key={rowIndex}
      >
        {columns.map((column, colIndex) => (
          <td className="text-start p-2 text-nowrap" key={colIndex}>
            {column.render
              ? column.render(record)
              : column.dataIndex
                ? (record[column.dataIndex] as ReactNode)
                : ""}
          </td>
        ))}
      </tr>
    ))
  );
  return (
    <table className="min-w-full rounded-md">
      <thead className="text-black bg-gray-50 border-b-[1px]">
        {TableHeader}
      </thead>
      <tbody>{TableBody}</tbody>
    </table>
  );
};

export default Table;
