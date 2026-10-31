"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
    Moon, Sun, Smartphone, Wifi, MapPin,
    Trash2, Info, ShieldCheck, RefreshCw
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleClearData = () => {
        if (confirm("Voulez-vous réinitialiser toutes les données locales de votre carnet ?")) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-lg mx-auto p-4 pt-6 pb-28 space-y-5">
            <header className="space-y-1">
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Configuration</span>
                <h1 className="text-2xl font-black text-foreground tracking-tight">Réglages</h1>
                <p className="text-xs text-muted-foreground">Préférences d'affichage et données locales.</p>
            </header>

            {/* Apparence */}
            <div className="card-clean p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Apparence
                </h3>
                <div className="grid grid-cols-3 gap-2">
                    {[
                        { id: "light", label: "Clair (Ivoire)", icon: Sun },
                        { id: "dark", label: "Sombre (Encre)", icon: Moon },
                        { id: "system", label: "Système", icon: Smartphone }
                    ].map((mode) => {
                        const Icon = mode.icon;
                        const isSelected = theme === mode.id;

                        return (
                            <button
                                key={mode.id}
                                onClick={() => setTheme(mode.id)}
                                className={cn(
                                    "p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95",
                                    isSelected
                                        ? "bg-primary text-white border-primary shadow-sm"
                                        : "bg-muted/30 border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-[11px] font-medium">{mode.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Réseau & Offline */}
            <div className="card-clean p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary">
                    Fonctionnement en Chine
                </h3>
                <div className="space-y-2 text-xs text-foreground/80 leading-relaxed">
                    <div className="p-3 rounded-xl bg-muted/40 border border-border flex items-start gap-2.5">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <div>
                            <span className="font-semibold text-foreground block">100% Fonctionnel Hors-Ligne</span>
                            <span className="text-[11px] text-muted-foreground">
                                Les adresses, cartes taxi, prononciations audio et plannings sont stockés sur votre appareil et ne nécessitent aucun VPN.
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Réinitialisation */}
            <div className="card-clean p-4 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-destructive">
                    Zone de Réinitialisation
                </h3>
                <button
                    onClick={handleClearData}
                    className="w-full py-2.5 px-3 rounded-xl border border-destructive/30 bg-destructive/5 hover:bg-destructive/10 text-destructive text-xs font-semibold flex items-center justify-center gap-2 transition-colors active:scale-95"
                >
                    <Trash2 className="w-4 h-4" />
                    Effacer le cache et recharger l'application
                </button>
            </div>

            <div className="text-center pt-2">
                <p className="text-[11px] text-muted-foreground">
                    China One • Chongqing Companion v2.0
                </p>
                <p className="hanzi text-xs font-semibold text-primary mt-1">
                    重庆旅行助手
                </p>
            </div>
        </div>
    );
}
