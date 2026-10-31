import { cn } from "@/lib/utils";
import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "premium" | "glass" | "default" | "lacquer";
    isInteractive?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, variant = "default", isInteractive = false, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn(
                "card-clean relative overflow-hidden",
                variant === "lacquer" && "card-lacquer border-0",
                variant === "glass" && "bg-background/80 backdrop-blur-md",
                isInteractive && "active:scale-[0.985] cursor-pointer hover:border-primary/40",
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
