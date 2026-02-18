"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Monitor, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";

export function Settings() {
    const [theme, setTheme] = useState<Theme>("system");

    // Effect to apply theme
    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }
    }, [theme]);

    const clearData = () => {
        if (confirm("Voulez-vous vraiment effacer toutes les données locales (Agenda, etc.) ?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Apparence</h3>
                <div className="bg-secondary/50 p-1 rounded-xl flex">
                    {[
                        { value: "light", icon: Sun, label: "Clair" },
                        { value: "dark", icon: Moon, label: "Sombre" },
                        { value: "system", icon: Monitor, label: "Auto" },
                    ].map((mode) => (
                        <button
                            key={mode.value}
                            onClick={() => setTheme(mode.value as Theme)}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all",
                                theme === mode.value
                                    ? "bg-white text-primary shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <mode.icon className="w-4 h-4" />
                            {mode.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Données</h3>
                <button
                    onClick={clearData}
                    className="w-full flex items-center justify-between p-4 bg-white border border-destructive/20 rounded-xl text-destructive hover:bg-destructive/5 transition-colors"
                >
                    <span className="font-medium">Réinitialiser l'application</span>
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>

            <p className="text-center text-xs text-muted-foreground pt-4">
                China Companion v1.0 • Offline Ready
            </p>
        </div>
    );
}
