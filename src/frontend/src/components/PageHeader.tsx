import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  /** Use accent (green) background for admin pages */
  variant?: "default" | "admin";
}

export default function PageHeader({
  title,
  subtitle,
  action,
  className,
  variant = "default",
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "py-8 md:py-10 border-b border-border",
        variant === "admin" ? "bg-accent text-accent-foreground" : "bg-card",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Ghana flag accent line */}
        <div className="flex gap-1 mb-4">
          <div className="w-6 h-1 rounded-full bg-primary" />
          <div className="w-6 h-1 rounded-full bg-secondary" />
          <div className="w-6 h-1 rounded-full bg-accent" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="min-w-0">
            <h1
              className={cn(
                "text-display-medium",
                variant === "admin"
                  ? "text-accent-foreground"
                  : "text-foreground",
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "mt-1 text-sm md:text-base",
                  variant === "admin"
                    ? "text-accent-foreground/80"
                    : "text-muted-foreground",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      </div>
    </div>
  );
}
