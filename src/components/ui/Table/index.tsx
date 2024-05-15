import { ReactElement } from "react";

type ColumnConfig<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (record: T) => ReactElement;
};

type TableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
  isLoading?: boolean;
};

const Table = <T,>({ columns, data, isLoading = false }: TableProps<T>) => {
  return (
    <table className="w-full rounded-md overflow-x-auto">
      <thead className="text-black bg-gray-50 border-b-[1px]">
        <tr>
          {columns.map((column, colIndex) => (
            <th className="text-start p-4 font-normal" key={colIndex}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {isLoading && <p>Loading...</p>}
        {!isLoading &&
          data.map((record, rowIndex) => (
            <tr
              className="border-b-[1px] hover:bg-gray-50 transition-all ease-in-out duration-150"
              key={rowIndex}
            >
              {columns.map((column, colIndex) => (
                <td className="ext-start p-2" key={colIndex}>
                  {column.render
                    ? column.render(record)
                    : column.dataIndex
                      ? record[column.dataIndex]
                      : ""}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default Table;
