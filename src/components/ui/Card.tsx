import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "premium" | "glass" | "default";
    isInteractive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = "premium", isInteractive = false, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                // Base styles
                "relative rounded-3xl overflow-hidden transition-all duration-300",

                // Variants
                variant === "premium" && "card-premium",

                variant === "glass" && "bg-white/60 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-sm",

                variant === "default" && "bg-card text-card-foreground border shadow-sm",

                // Interaction
                isInteractive && "active:scale-[0.98] cursor-pointer hover:shadow-lg hover:-translate-y-0.5",

                className
            )}
            {...props}
        >
            {children}
        </div>
    );
});

Card.displayName = "Card";

export { Card };
