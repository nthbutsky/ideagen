import { ChangeEvent, InputHTMLAttributes } from "react";
import clsx from "clsx";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox = ({
  label,
  name,
  type,
  className,
  checked,
  onChange,
  ...props
}: IProps) => {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={name}
          type={type}
          name={name}
          className={clsx(
            "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",
            className,
          )}
          checked={checked}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={name} className="font-medium text-gray-900">
          {label}
        </label>
      </div>
    </div>
  );
};
