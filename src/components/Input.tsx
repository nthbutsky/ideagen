import clsx from "clsx";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  name,
  type,
  placeholder,
  className,
  value,
  onChange,
  ...props
}: IProps) => {
  return (
    <div className={clsx(className)}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={clsx(
          "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6",
        )}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
        {...props}
      />
    </div>
  );
};
