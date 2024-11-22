import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Toast } from "@/components/Toast";
import { IToastData, TToastType } from "@/types/toast";

interface ToastManagerProps {
  _?: unknown;
}

export const ToastManager = forwardRef(function ToastManagerComponent(
  props: ToastManagerProps,
  ref,
) {
  const [toasts, setToasts] = useState<IToastData[]>([]);

  const addToast = (message: string, type: TToastType) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useImperativeHandle(ref, () => ({
    addToast,
  }));

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onCloseAction={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
});
