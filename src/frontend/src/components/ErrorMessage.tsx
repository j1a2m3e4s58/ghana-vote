import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export default function ErrorMessage({
  message,
  className,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-destructive",
        className,
      )}
      data-ocid="error_state"
    >
      <AlertCircle
        className="w-4 h-4 mt-0.5 flex-shrink-0"
        aria-hidden="true"
      />
      <p className="text-sm leading-relaxed min-w-0 break-words">{message}</p>
    </div>
  );
}
