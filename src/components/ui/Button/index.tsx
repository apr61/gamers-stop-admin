import { ReactElement } from "react";

type ButtonProps = {
  children: ReactElement | ReactElement[] | string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  type = "submit",
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${
        disabled ? "bg-gray-500" : "bg-blue-500"
      }  px-4 py-2 text-white hover:bg-opacity-90 rounded-md w-fit`}
    >
      {children}
    </button>
  );
};

export default Button;
