import clsx from "clsx";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export const Select = ({
  label,
  name,
  className,
  value,
  onChange,
  options,
  ...props
}: IProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        className={clsx(
          "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6",
          className,
        )}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e)}
        {...props}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
