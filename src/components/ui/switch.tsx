"use client";

import { cn } from "@/lib/utils";

interface SwitchProps {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
}

export function Switch({ checked, onCheckedChange, className }: SwitchProps) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            onClick={() => onCheckedChange(!checked)}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                checked ? "bg-emerald-600" : "bg-stone-300",
                className
            )}
        >
            <span
                data-state={checked ? "checked" : "unchecked"}
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md ring-0 transition-transform",
                    checked ? "translate-x-5" : "translate-x-1"
                )}
            />
        </button>
    );
}
