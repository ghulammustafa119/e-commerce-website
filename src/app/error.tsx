"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6 text-center">
        We encountered an unexpected error. Please try again.
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}
