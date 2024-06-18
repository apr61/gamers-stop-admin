import { InputHTMLAttributes, forwardRef, useId } from "react";

type SelectProps = InputHTMLAttributes<HTMLSelectElement> & {
  className: string;
  label?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label }: SelectProps, ref) => {
    const id = useId();
    return (
      <div className="w-full flex gap-2 flex-col">
        <label htmlFor={id} className="text-lg cursor-pointer">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className={`${className} w-full p-4  border rounded-md cursor-pointer`}
        >
          <option>Select</option>
          {[...Array(5)].map((_, index) => (
            <option key={index}>Lorem, ipsum dolor</option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
