"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface GovernmentAlertProps {
    initialAlert?: boolean;
    initialMessage?: string;
}

export function GovernmentAlert({ initialAlert = false, initialMessage }: GovernmentAlertProps) {
    const [hasAlert, setHasAlert] = useState(initialAlert);
    const [message, setMessage] = useState(initialMessage || "Voyageurs français : exemption de visa confirmée jusqu'à fin 2025 pour les séjours de moins de 15 jours.");

    return (
        <a
            href="https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/chine/#entree"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "card-clean p-3.5 flex items-start gap-3 transition-colors text-xs block",
                hasAlert
                    ? "border-destructive/40 bg-destructive/5 text-destructive"
                    : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
            )}
        >
            <div className="mt-0.5 shrink-0">
                {hasAlert ? (
                    <AlertCircle className="w-4 h-4 text-destructive" />
                ) : (
                    <ShieldCheck className="w-4 h-4 text-primary" />
                )}
            </div>
            <div className="flex-1 min-w-0">
                <span className="font-semibold text-[11px] uppercase tracking-wider text-foreground block mb-0.5">
                    Conseil Consulaire
                </span>
                <p className="line-clamp-2 leading-relaxed text-foreground/80">
                    {message}
                </p>
            </div>
        </a>
    );
}
