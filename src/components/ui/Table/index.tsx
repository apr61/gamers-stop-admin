import { ReactElement, ReactNode } from "react";

type ColumnConfig<T> = {
  title: string;
  dataIndex?: keyof T;
  render?: (record: T) => ReactElement | string | ReactElement[] | null;
  className?: string;
};

type TableProps<T> = {
  columns: ColumnConfig<T>[];
  data: T[];
};

const Table = <T,>({ columns, data }: TableProps<T>) => {
  const TableHeader = (
    <tr>
      {columns.map((column) => (
        <th
          key={column.title}
          className={`text-start p-4 w-fit text-nowrap ${column.className}`}
        >
          {column.title}
        </th>
      ))}
    </tr>
  );
  const TableBody = data.length === 0 ? (
    <tr>
      <td>No data found</td>
    </tr>
  ) : (
    data.map((record, rowIndex) => (
      <tr
        className="w-full border-b-[1px] border-b-border hover:bg-accent transition-all ease-in-out duration-150"
        key={rowIndex}
      >
        {columns.map((column, colIndex) => (
          <td className="p-2 text-nowrap truncate" key={colIndex}>
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
    <div className="overflow-x-auto bg-dimBlack rounded-md">
      <table className="w-full rounded-md border-collapse table-auto">
        <thead className="text-black bg-accent text-foreground border-b-[1px] border-b-border">
          {TableHeader}
        </thead>
        <tbody>{TableBody}</tbody>
      </table>
    </div>
  );
};

export default Table;
