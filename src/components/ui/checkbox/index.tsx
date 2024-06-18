import { forwardRef, useId } from "react";

type CheckBoxProps = {
  label: string;
  isChecked: boolean
};

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ label, isChecked, ...props }, ref) => {
    const id = useId();
    return (
      <div className="flex gap-2 items-center">
        <div className="text-lg">{label} : </div>
        <label
          htmlFor={id}
          className="cursor-pointer w-12 h-6 bg-primary rounded-xl relative shadow-inner"
        >
          <span
            className={`w-4 h-4 bg-white rounded-full absolute transition-transform duration-3000 ease-in ${
                isChecked ? "transform translate-x-7" : "transform translate-x-1"
            } top-1`}
          ></span>
        </label>
        <input
          id={id}
          type="checkbox"
          ref={ref}
          {...props}
          className="sr-only"
        />
      </div>
    );
  }
);

export default CheckBox;
