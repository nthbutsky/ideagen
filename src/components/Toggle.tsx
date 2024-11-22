"use client";

import clsx from "clsx";

import { Switch, SwitchProps } from "@headlessui/react";
import { ReactNode } from "react";

interface IProps extends SwitchProps {
  label: string;
  fullWidth?: boolean;
  onChangeAction: (value: boolean) => void;
  children?: ReactNode;
}

export const Toggle = ({
  label,
  name,
  checked,
  onChangeAction,
  children,
  ...props
}: IProps) => {
  return (
    <div className={clsx({ "w-full": props.fullWidth })}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <div
        className={clsx("flex h-9 items-center", {
          "flex items-end gap-4": children,
        })}
      >
        <Switch
          id={name}
          checked={checked}
          onChange={(value) => onChangeAction(value)}
          className="group relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
          {...props}
        >
          <span className="sr-only">Use setting for {label}</span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md bg-white"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute mx-auto h-4 w-9 rounded-full bg-purple-600 transition-colors duration-200 ease-in-out group-data-[checked]:bg-purple-600"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out group-data-[checked]:translate-x-5"
          />
        </Switch>

        <div className="text-sm font-medium leading-6 text-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};
