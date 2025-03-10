import { Button } from "./ui/button";

// Error message component
export const ErrorMessage = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry: () => void;
}) => (
  <div className="flex flex-col items-center justify-center w-full gap-2 p-4 border border-red-500 rounded-md bg-red-100 dark:bg-red-900/20">
    <p className="text-red-700 dark:text-red-400 text-sm font-medium">
      {message}
    </p>
    <Button variant="destructive" onClick={onRetry} size="sm">
      Try Again
    </Button>
  </div>
);
