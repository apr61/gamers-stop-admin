import { cn } from "@/utils/cn";
import { ButtonHTMLAttributes, PropsWithChildren } from "react";

type ButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    btnType?: "primary" | "ghost" | "danger" | "icon";
    loading?: boolean;
  };

const Button = ({
  children,
  disabled = false,
  className = "",
  btnType = "primary",
  type = "button",
  loading = false,
  ...props
}: ButtonProps) => {
  let baseClass =
    "hover:bg-opacity-90 rounded-md w-fit focus:outline-2 focus:outline-2 focus:outline-offset-2 disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  const styles = {
    primary: "px-2 py-1 bg-primary text-white focus:outline-blue-400",
    ghost:
      "px-2 py-1 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white focus:outline-gray-400 focus:border-transparent",
    danger: "py-2 bg-red-500 text-white focus:outline-red-400",
    icon: "p-1 text-md focus:outline-black",
  };
  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(baseClass, styles[btnType], className)}
      {...props}
    >
      {loading && (
        <div className="border-2  border-transparent w-4 h-4 rounded-full border-t-white border-l-white border-r-white animate-spin"></div>
      )}
      {children}
    </button>
  );
};

export default Button;
