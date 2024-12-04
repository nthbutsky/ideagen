"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/Button";

interface IProps {
  children: ReactNode;
  isOpen: boolean;
  isDisabled?: boolean;
  onCloseAction: () => void;
  onSaveAction: () => void;
}

export const Drawer = ({
  children,
  isOpen,
  isDisabled = false,
  onCloseAction,
  onSaveAction,
}: IProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => onCloseAction()}
      className="relative z-40"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
                <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold text-gray-900">
                        User profile
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => onCloseAction()}
                          className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {children}
                  </div>
                </div>
                <div className="flex shrink-0 justify-end gap-4 px-4 py-4">
                  <Button
                    secondary
                    type="button"
                    onClickAction={() => onCloseAction()}
                    size="xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    primary
                    type="button"
                    onClickAction={() => onSaveAction()}
                    size="xl"
                    isDisabled={isDisabled}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
