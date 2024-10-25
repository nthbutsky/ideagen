import clsx from "clsx";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
          name={name}
          type={type}
          className={clsx(
            "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600",
            className,
          )}
          checked={checked}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          {...props}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label
          htmlFor={name}
          className="font-medium text-gray-900"
        >
          {label}
        </label>
      </div>
    </div>
  );
};
