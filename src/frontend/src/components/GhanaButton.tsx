import { Button, type buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import type * as React from "react";

type NativeButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

type GhanaVariant = "primary" | "secondary" | "accent" | "ghost" | "outline";

interface GhanaButtonProps extends Omit<NativeButtonProps, "variant"> {
  ghanaVariant?: GhanaVariant;
}

const variantStyles: Record<GhanaVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:opacity-90 focus-visible:ring-primary shadow-xs",
  secondary:
    "bg-secondary text-secondary-foreground hover:opacity-90 focus-visible:ring-secondary shadow-xs",
  accent:
    "bg-accent text-accent-foreground hover:opacity-90 focus-visible:ring-accent shadow-xs",
  ghost: "bg-transparent text-foreground hover:bg-muted border-transparent",
  outline: "bg-transparent border border-border text-foreground hover:bg-muted",
};

const GhanaButton = forwardRef<HTMLButtonElement, GhanaButtonProps>(
  ({ ghanaVariant = "primary", className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        className={cn(
          "font-semibold transition-smooth",
          variantStyles[ghanaVariant],
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

GhanaButton.displayName = "GhanaButton";

export default GhanaButton;
