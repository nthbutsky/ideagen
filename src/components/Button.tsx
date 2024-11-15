import clsx from "clsx";

interface IProps {
  primary?: boolean;
  secondary?: boolean;
  type?: "submit" | "reset" | "button";
  text: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Button = ({ primary, secondary, type, text, size }: IProps) => {
  return (
    <button
      type={type}
      className={clsx({
        "bg-purple-600 font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600":
          primary,
        "bg-white font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50":
          secondary,
        "rounded px-2 py-1 text-xs": size === "xs",
        "rounded px-2 py-1 text-sm": size === "sm",
        "rounded-md px-2.5 py-1.5 text-sm": size === "md",
        "rounded-md px-3 py-2 text-sm": size === "lg",
        "rounded-md px-3.5 py-2.5 text-sm": size === "xl",
      })}
    >
      {primary || secondary ? text : "Pass primary or secondary prop"}
    </button>
  );
};
