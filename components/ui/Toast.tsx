import { ToastType } from "@/types/ui";

interface ToastProps {
  type: ToastType;
  message: string;
  onClose?: () => void;
}

const getIcon = (type: ToastType) => {
  const baseClasses =
    "inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg";

  switch (type) {
    case "success":
      return {
        icon: (
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        ),
        classes: `${baseClasses} text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200`,
      };
    case "error":
      return {
        icon: (
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
        ),
        classes: `${baseClasses} text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200`,
      };
    case "warning":
      return {
        icon: (
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        ),
        classes: `${baseClasses} text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200`,
      };
    case "info":
      return {
        icon: (
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
          </svg>
        ),
        classes: `${baseClasses} text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200`,
      };
  }
};

export function Toast({ type, message, onClose }: ToastProps) {
  const { icon, classes } = getIcon(type);

  return (
    <div
      className="flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow-sm dark:bg-gray-800 dark:text-gray-400"
      role="alert"
    >
      <div className={classes}>
        {icon}
        <span className="sr-only">{type} icon</span>
      </div>
      <div className="ms-3 text-sm font-normal">{message}</div>
      {onClose && (
        <button
          type="button"
          className="-m-1.5 ms-auto inline-flex size-8 items-center justify-center rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="size-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
