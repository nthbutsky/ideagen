import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import Tooltip, {
  BODY_OFFSET,
  TBodyOffset,
  TOOLTIP_ALIGN,
  TTooltipAlign,
} from "@/components/Tooltip";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  price?: boolean;
  tooltipText?: string;
  tooltipSettings?: {
    align?: TTooltipAlign;
    bodyOffsetY?: TBodyOffset;
    bodyOffsetX?: TBodyOffset;
    detachBody?: boolean;
    fullWidth?: boolean;
  };
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  tooltipSettings,
  onChange,
  ...props
}: IProps) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className={clsx("", className)}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 inline-block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}

      <div className="relative rounded-md shadow-sm">
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
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            { "pl-7": price },
            {
              "text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500":
                error,
            },
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? name + "-error" : name + "-input"}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          {...props}
        />

        {tooltipText && !error && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <Tooltip
              align={tooltipSettings?.align ?? TOOLTIP_ALIGN.BOTTOM_RIGHT}
              bodyOffsetY={
                tooltipSettings?.bodyOffsetY ?? BODY_OFFSET.NO_OFFSET
              }
              bodyOffsetX={
                tooltipSettings?.bodyOffsetX ?? BODY_OFFSET.NO_OFFSET
              }
              detachBody={tooltipSettings?.detachBody ?? false}
              fullWidth={tooltipSettings?.fullWidth ?? false}
              isOpen={tooltipOpen}
              onClose={() => setTooltipOpen(false)}
            >
              <button
                className="block"
                type="button"
                onClick={() => setTooltipOpen(!tooltipOpen)}
              >
                <QuestionMarkCircleIcon
                  aria-hidden="true"
                  className="size-5 text-gray-400"
                />
              </button>
              <>{tooltipText}</>
            </Tooltip>
          </div>
        )}

        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ExclamationCircleIcon
              aria-hidden="true"
              className="size-5 text-red-500"
            />
          </div>
        )}
      </div>
      <div className="h-6">
      <span
          id={name + "-error"}
          className={clsx(
            "absolute -z-10 -translate-y-6 text-xs leading-6 text-red-600 duration-300 ease-in-out",
            {
              "translate-y-0": error,
            },
          )}
        >
          {error}
        </span>
      </div>
    </div>
  );
};
