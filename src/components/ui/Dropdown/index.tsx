import { ReactElement } from "react";

type DropDownProps = {
  items: {
    label: string;
    icon?: ReactElement;
    key: string
  }[];
  onItemClick: (key: string) => void;
};

const Dropdown = ({ items, onItemClick }: DropDownProps) => {
  return (
    <div className="absolute left-0 top-4 mt-4 bg-white rounded-md overflow-hidden z-10 border">
      <ul className="border-1 min-w-fit p-2">
        {items.map((item) => (
          <li
            key={item.key}
            className="p-2 cursor-pointer hover:bg-gray-200 w-full flex items-center gap-2 rounded-md"
            onClick={() => onItemClick(item.key)}
          >
            {item.icon} {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
