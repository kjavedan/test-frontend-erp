"use client";
export default function ReloadButton() {
  return (
    <div className="mx-auto mt-32 flex !w-full flex-col items-center justify-center">
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Access Denied
        </h2>
        <p className="mb-6 text-gray-500 dark:text-gray-400">
          You dont have permission to view this page. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
