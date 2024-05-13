import React, { useId } from "react";

type InputPropsType = {
  label?: string;
  placeholder: string;
  type?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputPropsType>(
  ({ label = "", placeholder, type = "text", ...props }, ref) => {
    const id = useId();

    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label htmlFor={id} className="text-lg cursor-pointer">
            {label}
          </label>
        )}
        <input
          className="border rounded-md p-2 focus:outline focus:outline-2 focus:outline-blue-500"
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
