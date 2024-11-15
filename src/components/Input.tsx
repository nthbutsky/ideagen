import { useState } from "react";
import clsx from "clsx";

import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";

import Tooltip, { BODY_OFFSET, TBodyOffset, TOOLTIP_ALIGN, TTooltipAlign } from "@/components/Tooltip";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  price?: boolean;
  tooltipText?: string;
  tooltipSettings?: {
    align: TTooltipAlign;
    bodyOffsetY: TBodyOffset
    bodyOffsetX: TBodyOffset
    detachBody: boolean
    fullWidth: boolean
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  label,
  name,
  type,
  placeholder,
  className,
  value,
  error,
  price,
  tooltipText,
  tooltipSettings = {
    align: TOOLTIP_ALIGN.BOTTOM_RIGHT,
    bodyOffsetY: BODY_OFFSET.NO_OFFSET,
    bodyOffsetX: BODY_OFFSET.NO_OFFSET,
    detachBody: false,
    fullWidth: false,
  },
  onChange,
  ...props
}: IProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className={clsx("relative", className)}>
          {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      {tooltipText && (
        <div className="absolute w-full top-0 text-end">
          <Tooltip
            align={tooltipSettings.align}
            bodyOffsetY={tooltipSettings.bodyOffsetY}
            bodyOffsetX={tooltipSettings.bodyOffsetX}
            detachBody={tooltipSettings.detachBody}
            fullWidth={tooltipSettings.fullWidth}
            isOpen={tooltipOpen}
            onClose={() => setTooltipOpen(false)}
          >
            <button type="button" onClick={() => setTooltipOpen(!tooltipOpen)}>
              <QuestionMarkCircleIcon
                aria-hidden="true"
                className="size-5 text-gray-400"
              />
            </button>
            <>{tooltipText}</>
          </Tooltip>
        </div>
      )}
    
      <div className="relative mt-2 rounded-md shadow-sm">
        {price && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          className={clsx(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6",
            { "pl-7": price },
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={name + "-error"}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e)}
          {...props}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              aria-hidden="true"
              className="size-5 text-red-500"
            />
          </div>
        )}
      </div>
      {error && (
        <p id="email-error" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};
