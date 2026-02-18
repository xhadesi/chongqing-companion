"use client";

import { useState, useEffect } from "react";
import { ArrowUpDown, Euro, Coins, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const EXCHANGE_RATE = 7.75; // 1 EUR = 7.75 CNY (Approx)

export function CurrencyConverter() {
    const [amount, setAmount] = useState<number | "">("");
    const [currency, setCurrency] = useState<"EUR" | "CNY">("CNY"); // Base currency for INPUT

    // Derived result
    const result = amount === "" ? null : (currency === "CNY" ? Number(amount) / EXCHANGE_RATE : Number(amount) * EXCHANGE_RATE);

    const toggleCurrency = () => {
        setCurrency((prev) => (prev === "CNY" ? "EUR" : "CNY"));
        setAmount(""); // Reset for clarity
    };

    const [mounted, setMounted] = useState(false);

    // Load preference
    useEffect(() => {
        const saved = localStorage.getItem("currency_pref");
        if (saved && (saved === "CNY" || saved === "EUR")) {
            setCurrency(saved as "EUR" | "CNY");
        }
        setMounted(true);
    }, []);

    // Save preference
    useEffect(() => {
        if (mounted) {
            localStorage.setItem("currency_pref", currency);
        }
    }, [currency, mounted]);

    if (!mounted) return <div className="bg-card w-full p-6 rounded-[2rem] shadow-neon border border-border h-[200px] animate-pulse" />;

    return (
        <div className="bg-card w-full p-6 rounded-[2rem] shadow-neon border border-border flex flex-col relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none" />

            <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-indigo-500" />
                    Change
                </h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    1€ ≈ {EXCHANGE_RATE}¥
                </span>
            </div>

            <div className="flex flex-col gap-2 relative" suppressHydrationWarning>
                {/* Input Section */}
                <div className="bg-muted/50 rounded-2xl p-4 transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:bg-card border border-transparent focus-within:border-primary/10">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Montant</span>
                        <div className="flex items-center gap-1 text-foreground font-bold bg-card px-2 py-1 rounded-lg shadow-sm border border-border">
                            {currency === "CNY" ? (
                                <><span className="text-xl">🇨🇳</span> <span className="text-xs">CNY</span></>
                            ) : (
                                <><span className="text-xl">🇪🇺</span> <span className="text-xs">EUR</span></>
                            )}
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-400">{currency === "CNY" ? "¥" : "€"}</span>
                        <input
                            type="number"
                            inputMode="decimal"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                            placeholder="0"
                            className="flex-1 bg-transparent text-3xl font-black text-slate-800 outline-none placeholder:text-slate-200"
                        />
                    </div>
                </div>

                {/* Swap Button (Floating) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <button
                        onClick={toggleCurrency}
                        className="p-3 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-200 hover:scale-110 active:scale-95 active:rotate-180 transition-all border-4 border-white"
                        aria-label="Inverser devises"
                    >
                        <ArrowUpDown className="w-5 h-5" />
                    </button>
                </div>

                {/* Result Section (Read Only) */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-transparent">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Résultat</span>
                        <div className="flex items-center gap-1 text-slate-500 font-bold opacity-80">
                            {currency === "CNY" ? (
                                <><span className="text-xl">🇪🇺</span> <span className="text-xs">EUR</span></>
                            ) : (
                                <><span className="text-xl">🇨🇳</span> <span className="text-xs">CNY</span></>
                            )}
                        </div>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-300">{currency === "CNY" ? "€" : "¥"}</span>
                        <span className={cn("text-3xl font-black transition-all", result !== null ? "text-indigo-600" : "text-slate-200")}>
                            {result !== null ? result.toFixed(2) : "0.00"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
