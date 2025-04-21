import React from "react";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { ToastType } from "@/types/ui";
import { Toast } from "@/components/ui/Toast";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

export const useToast = () => {
  const showToast = useCallback(
    (type: ToastType, message: string, options: ToastOptions = {}) => {
      const { duration = 5000, position = "top-right" } = options;

      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } transition-all duration-300 ease-in-out`}
          >
            <Toast
              type={type}
              message={message}
              onClose={() => toast.dismiss(t.id)}
            />
          </div>
        ),
        {
          duration,
          position,
        },
      );
    },
    [],
  );

  const success = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast("success", message, options);
    },
    [showToast],
  );

  const error = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast("error", message, options);
    },
    [showToast],
  );

  const info = useCallback(
    (message: string, options?: ToastOptions) => {
      showToast("info", message, options);
    },
    [showToast],
  );

  return {
    success,
    error,
    info,
  };
};
