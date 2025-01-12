import { ReactNode } from "react";
import clsx from "clsx";

interface IProps {
  primary?: boolean;
  secondary?: boolean;
  type: "submit" | "reset" | "button";
  size: "xs" | "sm" | "md" | "lg" | "xl";
  isDisabled?: boolean;
  onClickAction?: () => void;
  children?: ReactNode | string;
}

export const Button = ({
  primary,
  secondary,
  type,
  size,
  isDisabled = false,
  onClickAction,
  children,
}: IProps) => {
  return (
    <button
      type={type}
      className={clsx({
        "font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600":
          primary,
        "font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300":
          secondary,
        "bg-indigo-600 hover:bg-indigo-500": !isDisabled && primary,
        "bg-white hover:bg-gray-50": !isDisabled && secondary,
        "rounded px-2 py-1 text-xs": size === "xs",
        "rounded px-2 py-1 text-sm": size === "sm",
        "rounded-md px-2.5 py-1.5 text-sm": size === "md",
        "rounded-md px-3 py-2 text-sm": size === "lg",
        "rounded-md px-3.5 py-2.5 text-sm": size === "xl",
        "cursor-not-allowed bg-gray-400": isDisabled,
      })}
      disabled={isDisabled}
      onClick={onClickAction}
    >
      {children}
    </button>
  );
};
