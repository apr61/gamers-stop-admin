import { ReactNode } from "react";
import { ColumnConfig } from "../../utils/types";

type ReadItemProps<T> = {
  record: T;
  readItem: ColumnConfig<T>[];
};

const ReadItem = <T,>({ record, readItem }: ReadItemProps<T>) => {
  if (record === null || !readItem) return;

  return (
    <div className="flex flex-col gap-4 my-8">
      {readItem.map((item) => (
        <div className="flex gap-2" key={item.title}>
          <p className="font-medium">{item.title}</p>
          <p>:</p>
          <p>
            {item.render
              ? item.render(record as T)
              : item.dataIndex && record
              ? (record[item.dataIndex] as ReactNode)
              : ""}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReadItem;
