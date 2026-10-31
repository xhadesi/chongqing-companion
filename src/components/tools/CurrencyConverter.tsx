"use client";

import { useState } from "react";
import { ArrowUpDown, Delete, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const DEFAULT_RATE = 7.82; // 1 EUR = 7.82 CNY

const PRESETS = [
    { label: "Baozi / Petit dej", cny: 10 },
    { label: "Course Taxi Didi", cny: 25 },
    { label: "Téléphérique Yangtsé", cny: 40 },
    { label: "Hotpot fondue", cny: 100 },
];

export function CurrencyConverter() {
    const [inputValue, setInputValue] = useState<string>("50");
    const [mode, setMode] = useState<"CNY_TO_EUR" | "EUR_TO_CNY">("CNY_TO_EUR");

    const numVal = parseFloat(inputValue) || 0;
    const converted = mode === "CNY_TO_EUR" ? (numVal / DEFAULT_RATE) : (numVal * DEFAULT_RATE);

    const handleKeypad = (char: string) => {
        if (char === "C") {
            setInputValue("");
            return;
        }
        if (char === "DEL") {
            setInputValue(prev => prev.slice(0, -1));
            return;
        }
        if (char === ".") {
            if (inputValue.includes(".")) return;
            setInputValue(prev => (prev === "" ? "0." : prev + "."));
            return;
        }
        if (inputValue.length >= 7) return;
        setInputValue(prev => (prev === "0" ? char : prev + char));
    };

    const toggleMode = () => {
        setMode(prev => (prev === "CNY_TO_EUR" ? "EUR_TO_CNY" : "CNY_TO_EUR"));
        setInputValue("");
    };

    return (
        <div className="card-clean p-5 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Taux de Change</span>
                    <h3 className="text-base font-bold text-foreground">Convertisseur Tactile</h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-md bg-muted font-medium text-foreground/80">
                    1 € = {DEFAULT_RATE} ¥
                </span>
            </div>

            {/* Display screen */}
            <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-3">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                            {mode === "CNY_TO_EUR" ? "Montant en Yuan (CNY)" : "Montant en Euros (EUR)"}
                        </span>
                        <div className="text-3xl font-black text-foreground tracking-tight flex items-baseline gap-1 mt-0.5">
                            <span>{inputValue || "0"}</span>
                            <span className="text-base font-bold text-primary">
                                {mode === "CNY_TO_EUR" ? "¥" : "€"}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={toggleMode}
                        className="p-2.5 rounded-xl bg-card border border-border text-foreground hover:text-primary transition-colors active:scale-95 shadow-sm"
                        title="Inverser les devises"
                    >
                        <ArrowUpDown className="w-4 h-4" />
                    </button>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Équivalent {mode === "CNY_TO_EUR" ? "en Euros" : "en Yuan"}
                    </span>
                    <span className="text-xl font-bold text-primary">
                        {converted.toFixed(2)} {mode === "CNY_TO_EUR" ? "€" : "¥"}
                    </span>
                </div>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                    <button
                        key={p.cny}
                        onClick={() => {
                            setMode("CNY_TO_EUR");
                            setInputValue(p.cny.toString());
                        }}
                        className="p-2 rounded-lg bg-card border border-border hover:border-primary/40 text-left transition-colors active:scale-[0.98]"
                    >
                        <span className="text-[10px] text-muted-foreground block truncate">{p.label}</span>
                        <div className="flex items-center justify-between mt-0.5">
                            <span className="text-xs font-bold text-foreground">{p.cny} ¥</span>
                            <span className="text-xs text-primary font-medium">≈ {(p.cny / DEFAULT_RATE).toFixed(1)} €</span>
                        </div>
                    </button>
                ))}
            </div>

            {/* Tactile Numeric Keypad */}
            <div className="grid grid-cols-3 gap-1.5 pt-1">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "DEL"].map((key) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => handleKeypad(key)}
                        className={cn(
                            "h-12 rounded-xl text-base font-bold transition-all active:scale-95 flex items-center justify-center select-none shadow-sm",
                            key === "DEL"
                                ? "bg-muted text-destructive hover:bg-destructive/10"
                                : "bg-card border border-border text-foreground hover:bg-muted/50"
                        )}
                    >
                        {key === "DEL" ? <Delete className="w-4 h-4" /> : key}
                    </button>
                ))}
            </div>
        </div>
    );
}
