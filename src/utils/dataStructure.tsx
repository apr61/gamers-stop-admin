import { Fields } from "./types";

export const dataForTable = (fields: Fields) => {
  let columns: {
    title: string;
    dataIndex: string;
    render?: (record: any) => void;
  }[] = [];
  Object.keys(fields).forEach((key) => {
    const component = {
      image: {
        title: fields[key].label,
        dataIndex: key,
        render: (record: typeof fields) => (
          <img
            loading="lazy"
            src={record.category_image}
            alt={record.category_name}
            className="w-12 h-12"
          />
        ),
      },
    };
    const defaultComponent = {
      title: fields[key].label,
      dataIndex: key,
    };
    const type = fields[key].type;
    Object.keys(component).includes(type)
      ? columns.push(component[type])
      : columns.push(defaultComponent);
  });
  return columns;
};
