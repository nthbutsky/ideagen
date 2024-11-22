"use client";

import React, { createContext, FunctionComponent, ReactNode, useContext, useRef } from "react";
import {ToastManager} from "@/components/ToastManager";
import { TToastType } from "@/types/toast";

interface ToastContextValue {
  addToast: (
    message: string,
    type: TToastType,
  ) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const toastManagerRef = useRef<{
    addToast: ToastContextValue["addToast"];
  } | null>(null);

  const addToast = (
    message: string,
    type: TToastType,
  ) => {
    toastManagerRef.current?.addToast(message, type);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastManager ref={toastManagerRef} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
