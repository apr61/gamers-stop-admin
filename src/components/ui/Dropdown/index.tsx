import { cn } from "@/utils/cn";
import * as React from "react";

type DropDownProps = {
  items: {
    label: string;
    icon?: React.ReactElement;
    key: string;
  }[];
  onItemClick: (key: string) => void;
  className?: string;
};

const Dropdown = React.forwardRef<HTMLDivElement, DropDownProps>(
  ({ items, onItemClick, className }, ref) => {
    return (
      <div
        className={`${cn(
          "absolute top-4 mt-4 bg-white rounded-md overflow-hidden z-10 border shadow-md",
          className
        )}`}
        ref={ref}
      >
        <ul className="border-1 min-w-fit p-2">
          {items.map((item) => (
            <li
              key={item.key}
              className={`p-2 cursor-pointer hover:bg-gray-200 w-full flex items-center gap-2 rounded-md`}
              onClick={() => onItemClick(item.key)}
            >
              {item.icon} {item.label}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

export default Dropdown;
