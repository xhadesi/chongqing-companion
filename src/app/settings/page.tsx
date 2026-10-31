"use client";

import { useState, useEffect } from "react";
import {
    Languages, Volume2, Coins, Trash2,
    RotateCcw, Info, Wifi, Sparkles, ChevronRight, Check
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [showPinyin, setShowPinyin] = useState(true);
    const [speechRate, setSpeechRate] = useState<"slow" | "normal" | "fast">("normal");
    const [defaultCurrency, setDefaultCurrency] = useState<"CNY" | "EUR">("CNY");
    const [offlineEnabled, setOfflineEnabled] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const pinyinPref = localStorage.getItem("pref_show_pinyin");
        if (pinyinPref !== null) setShowPinyin(pinyinPref === "true");

        const speechPref = localStorage.getItem("pref_speech_rate");
        if (speechPref) setSpeechRate(speechPref as any);

        const currPref = localStorage.getItem("pref_default_currency");
        if (currPref) setDefaultCurrency(currPref as any);
    }, []);

    const togglePinyin = () => {
        const next = !showPinyin;
        setShowPinyin(next);
        localStorage.setItem("pref_show_pinyin", String(next));
    };

    const changeSpeechRate = (rate: "slow" | "normal" | "fast") => {
        setSpeechRate(rate);
        localStorage.setItem("pref_speech_rate", rate);
    };

    const changeCurrency = (curr: "CNY" | "EUR") => {
        setDefaultCurrency(curr);
        localStorage.setItem("pref_default_currency", curr);
    };

    const handleClearCache = () => {
        if (confirm("Voulez-vous vider le cache temporaire (météo, citations) ?")) {
            sessionStorage.clear();
            localStorage.removeItem("weather_data_cache");
            localStorage.removeItem("weather_data_time");
            alert("Cache vidé.");
        }
    };

    const handleResetAll = () => {
        if (confirm("Réinitialiser entièrement l'application et restaurer l'itinéraire par défaut ?")) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-lg mx-auto p-4 pt-6 pb-28 space-y-6">
            <header className="px-1 space-y-0.5">
                <h1 className="text-3xl font-black text-foreground tracking-tight">Réglages</h1>
                <p className="text-xs text-muted-foreground">Préférences de navigation et de synthèse vocale</p>
            </header>

            {/* SECTION 1: LANGUE & PRONONCIATION */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    Langue & Audio
                </span>
                <div className="ios-group">
                    {/* Switch: Afficher Pinyin */}
                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Languages className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">Afficher le Pinyin</span>
                        </div>
                        <button
                            type="button"
                            onClick={togglePinyin}
                            className={cn(
                                "w-12 h-7 rounded-full transition-colors relative p-0.5 focus:outline-none select-none",
                                showPinyin ? "bg-[#34C759]" : "bg-[#E9E9EA]"
                            )}
                        >
                            <span
                                className={cn(
                                    "block w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200",
                                    showPinyin ? "translate-x-5" : "translate-x-0"
                                )}
                            />
                        </button>
                    </div>

                    {/* Vitesse de prononciation */}
                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-gold-dark flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Volume2 className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">Vitesse vocale</span>
                        </div>
                        <div className="flex items-center gap-1 p-0.5 bg-muted/70 rounded-lg">
                            {[
                                { id: "slow", label: "0.7x" },
                                { id: "normal", label: "0.85x" },
                                { id: "fast", label: "1.0x" },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => changeSpeechRate(item.id as any)}
                                    className={cn(
                                        "px-2 py-1 text-xs font-bold rounded-md transition-all",
                                        speechRate === item.id
                                            ? "bg-white text-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 2: DEVISES */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    Devises & Unités
                </span>
                <div className="ios-group">
                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Coins className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">Devise par défaut</span>
                        </div>
                        <div className="flex items-center gap-1 p-0.5 bg-muted/70 rounded-lg">
                            <button
                                onClick={() => changeCurrency("CNY")}
                                className={cn(
                                    "px-2.5 py-1 text-xs font-bold rounded-md transition-all",
                                    defaultCurrency === "CNY"
                                        ? "bg-white text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                ¥ CNY
                            </button>
                            <button
                                onClick={() => changeCurrency("EUR")}
                                className={cn(
                                    "px-2.5 py-1 text-xs font-bold rounded-md transition-all",
                                    defaultCurrency === "EUR"
                                        ? "bg-white text-foreground shadow-sm"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                € EUR
                            </button>
                        </div>
                    </div>

                    <div className="ios-cell">
                        <span className="text-xs text-muted-foreground">Taux de référence fixe</span>
                        <span className="text-xs font-bold text-foreground">1 € = 7.82 ¥</span>
                    </div>
                </div>
            </div>

            {/* SECTION 3: STOCKAGE & CACHE */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    Stockage & Données
                </span>
                <div className="ios-group">
                    {/* Vider cache */}
                    <button
                        onClick={handleClearCache}
                        className="w-full ios-cell text-left"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-stone-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <RotateCcw className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-foreground">Vider le cache météo</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>

                    {/* Réinitialiser */}
                    <button
                        onClick={handleResetAll}
                        className="w-full ios-cell text-left hover:bg-red-50/40 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-destructive flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Trash2 className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold text-destructive">Réinitialiser l'application</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* SECTION 4: INFORMATIONS */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    À Propos
                </span>
                <div className="ios-group">
                    <div className="ios-cell">
                        <span className="text-sm font-semibold text-foreground">Version</span>
                        <span className="text-xs font-semibold text-muted-foreground">2.0 (Build 2026.11)</span>
                    </div>
                    <div className="ios-cell">
                        <span className="text-sm font-semibold text-foreground">PWA & Hors-Ligne</span>
                        <span className="text-xs font-bold text-emerald-600">Activé</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
