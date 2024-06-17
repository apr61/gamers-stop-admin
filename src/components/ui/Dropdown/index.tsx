import { cn } from "@/utils/cn";
import * as React from "react";

type DropDownMenuProps = React.PropsWithChildren & {
  className?: string;
};

const DropDownMenu = React.forwardRef<HTMLDivElement, DropDownMenuProps>(
  ({ className, children }, ref) => {
    return (
      <div
        className={`${cn(
          "absolute min-w-[8rem]  rounded-md overflow-hidden z-10 shadow-lg max-h-0 p-0 transition-max-height dropdown",
          className,
        )}`}
        ref={ref}
      >
        {children}
      </div>
    );
  },
);

type DropDownListProps = React.PropsWithChildren & {
  className?: string;
};

const DropDownList = React.forwardRef<HTMLUListElement, DropDownListProps>(
  ({ className, children }, ref) => {
    return (
      <ul ref={ref} className={`${cn("w-full flex flex-col gap-1", className)}`}>
        {children}
      </ul>
    );
  },
);

type DropDownItemProps = React.PropsWithChildren & {
  className?: string;
};

const DropDownItem = React.forwardRef<HTMLLIElement, DropDownItemProps>(
  ({ className, children }, ref) => {
    return (
      <li ref={ref} className={`${cn("w-full px-2 py-1 rounded-md", className)}`}>
        {children}
      </li>
    );
  },
);

type DropDownSeparatorProps = React.PropsWithChildren & {
  className?: string;
};

const DropDownSeparator = React.forwardRef<
  HTMLLIElement,
  DropDownSeparatorProps
>(({ className, children }, ref) => {
  return (
    <li ref={ref} className={`${cn("border-t border-t-gray-400", className)}`}>
      {children}
    </li>
  );
});

export { DropDownItem, DropDownList, DropDownSeparator, DropDownMenu };
