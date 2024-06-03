import { ReactElement, ReactNode } from "react";

type ColumnConfig<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (record: T) => ReactElement | string | ReactElement[];
  className?: string
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
        <th key={column.title} className={`text-start p-2 w-fit text-nowrap ${column.className}`}>
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
        className="w-full border-b-[1px] hover:bg-gray-50 transition-all ease-in-out duration-150 overflow-x-scroll overflow-y-hidden"
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
    <div className="max-w-full">
      <table className="w-full rounded-md border-collapse">
        <thead className="text-black bg-gray-50 border-b-[1px]">
          {TableHeader}
        </thead>
        <tbody>{TableBody}</tbody>
      </table>
    </div>
  );
};

export default Table;
