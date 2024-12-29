"use client";

import { useState, useEffect, useCallback } from "react";
import { Transition } from "@headlessui/react";
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { TToastType } from "@/types/toast";

interface IProps {
  message: string;
  type: TToastType;
  onCloseAction: () => void;
  autoHideDuration?: number;
}

const ICONS = {
  success: (
    <CheckCircleIcon className="size-6 text-green-400" aria-hidden="true" />
  ),
  warning: (
    <ExclamationTriangleIcon
      className="size-6 text-yellow-400"
      aria-hidden="true"
    />
  ),
  error: <XCircleIcon className="size-6 text-red-400" aria-hidden="true" />,
  info: (
    <InformationCircleIcon
      className="size-6 text-blue-400"
      aria-hidden="true"
    />
  ),
};

export const Toast = ({
  message,
  type,
  onCloseAction,
  autoHideDuration = 0,
}: IProps) => {
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => {
    setShow(false);
    const timer = setTimeout(() => {
      onCloseAction();
    }, 200); // match the duration of the transition
    return () => clearTimeout(timer);
  }, [onCloseAction]);

  useEffect(() => {
    setShow(true);
    if (autoHideDuration === 0) return;
    const timer = setTimeout(() => {
      handleClose();
    }, autoHideDuration);

    return () => clearTimeout(timer);
  }, [autoHideDuration, handleClose]);

  return (
    <Transition show={show}>
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">{ICONS[type]}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{type}</p>
              <p className="mt-1 text-sm text-gray-500">{message}</p>
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                onClick={() => handleClose()}
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};
