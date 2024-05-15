import { ReactElement, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactElement | ReactElement[] | string;
  btnType?: "primary" | "ghost" | "danger" | "icon";
};

const Button = ({
  children,
  disabled = false,
  className = "",
  btnType = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  let cn =
    "hover:bg-opacity-90 rounded-md w-fit focus:outline-2 focus:outline-offset-2";
  const styles = {
    primary: " px-2 py-1 bg-blue-500 text-white focus:outline-blue-400",
    ghost:
      " px-2 py-1 bg-transparent text-gray-500 border border-gray-500 hover:bg-gray-500 hover:text-white focus:outline-gray-400 focus:border-transparent",
    disabled: " px-2 py-1 bg-gray-500 text-white focus:outline-gray-400",
    danger: " py-2 bg-red-500 text-white focus:outline-red-400",
    icon: " p-1 text-md",
  };
  if (disabled) {
    cn += styles["disabled"];
  } else {
    cn += styles[btnType];
  }

  cn += " " + className;
  return (
    <button type={type} disabled={disabled} className={cn} {...props}>
      {children}
    </button>
  );
};

export default Button;
