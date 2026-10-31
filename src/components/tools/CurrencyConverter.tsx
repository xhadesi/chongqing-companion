"use client";

import { useState } from "react";
import { ArrowUpDown, Coins } from "lucide-react";

const EXCHANGE_RATE = 7.82; // 1 EUR = 7.82 CNY

export function CurrencyConverter() {
    const [amount, setAmount] = useState<string>("100");
    const [mode, setMode] = useState<"CNY_TO_EUR" | "EUR_TO_CNY">("CNY_TO_EUR");

    const num = parseFloat(amount) || 0;
    const result = mode === "CNY_TO_EUR" ? (num / EXCHANGE_RATE) : (num * EXCHANGE_RATE);

    const toggleMode = () => {
        setMode(prev => (prev === "CNY_TO_EUR" ? "EUR_TO_CNY" : "CNY_TO_EUR"));
    };

    return (
        <div className="card-warm p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Devises</span>
                    <h3 className="text-base font-black text-foreground">Convertisseur de Prix</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-light border border-gold/30 text-gold-dark text-xs font-bold">
                    <Coins className="w-3.5 h-3.5 text-gold" />
                    <span>1 € ≈ {EXCHANGE_RATE} ¥</span>
                </div>
            </div>

            {/* Input & Output Row */}
            <div className="p-4 rounded-2xl bg-[#FCFAF5] border border-border space-y-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                            {mode === "CNY_TO_EUR" ? "Montant en Yuans (¥)" : "Montant en Euros (€)"}
                        </span>
                        <div className="flex items-center">
                            <span className="text-2xl font-black text-primary mr-1">
                                {mode === "CNY_TO_EUR" ? "¥" : "€"}
                            </span>
                            <input
                                type="number"
                                inputMode="decimal"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full text-3xl font-black text-foreground bg-transparent outline-none tracking-tight"
                            />
                        </div>
                    </div>

                    <button
                        onClick={toggleMode}
                        className="p-3 rounded-full bg-white border border-border hover:border-primary text-foreground shadow-sm transition-transform active:scale-90 shrink-0"
                        title="Inverser les devises"
                    >
                        <ArrowUpDown className="w-4 h-4 text-primary" />
                    </button>
                </div>

                <div className="pt-3 border-t border-border/60 flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        Équivalent {mode === "CNY_TO_EUR" ? "en Euros" : "en Yuans"}
                    </span>
                    <span className="text-2xl font-black text-gold-dark">
                        {result.toFixed(2)} {mode === "CNY_TO_EUR" ? "€" : "¥"}
                    </span>
                </div>
            </div>
        </div>
    );
}
