"use client";

import { ShieldCheck } from "lucide-react";

export function GovernmentAlert() {
    return (
        <a
            href="https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/chine/#entree"
            target="_blank"
            rel="noopener noreferrer"
            className="card-warm p-4 flex items-start gap-3 hover:border-primary/50 transition-colors block"
        >
            <div className="p-2 rounded-xl bg-gold-light border border-gold/30 text-gold-dark shrink-0 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
                <span className="text-[11px] font-bold text-foreground uppercase tracking-wider block mb-0.5">
                    Conseil Consulaire Français
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    Exemption de visa pour les ressortissants français jusqu'à 15 jours de séjour en Chine.
                </p>
            </div>
        </a>
    );
}
