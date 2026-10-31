"use client";

import { useState } from "react";
import {
    Plane, ShieldCheck, Database, Trash2,
    ChevronRight, Sparkles, Smartphone, MapPin, KeyRound
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const handleReset = () => {
        if (confirm("Réinitialiser le carnet de voyage et effacer les modifications locales ?")) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 pt-6 pb-28 space-y-6">
            <header className="px-1 space-y-0.5">
                <h1 className="text-3xl font-black text-foreground tracking-tight">Réglages</h1>
                <p className="text-xs text-muted-foreground">Configuration de votre carnet de voyage</p>
            </header>

            {/* GROUPE 1: VOYAGE */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    Voyage en cours
                </span>
                <div className="ios-group">
                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Plane className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-foreground block">Vol Paris Pékin Chongqing</span>
                                <span className="text-[11px] text-muted-foreground">Réf: NH2NKC • Départ CDG T1</span>
                            </div>
                        </div>
                    </div>

                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <MapPin className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-foreground block">Hôtel principal</span>
                                <span className="hanzi text-[11px] text-muted-foreground">德亚酒店 (Jiefangbei, Chongqing)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* GROUPE 2: SURVIE & RÉSEAU */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    Connexion & Terrain
                </span>
                <div className="ios-group">
                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Smartphone className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-foreground block">Réseau & Paiement</span>
                                <span className="text-[11px] text-muted-foreground">eSIM Holafly + Alipay / WeChat Pay</span>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-emerald-600 px-2 py-0.5 rounded-full bg-emerald-50">Prêt</span>
                    </div>

                    <div className="ios-cell">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-foreground block">Mode Hors Ligne</span>
                                <span className="text-[11px] text-muted-foreground">Données préchargées sans besoin de VPN</span>
                            </div>
                        </div>
                        <span className="text-xs font-semibold text-foreground/70">Actif</span>
                    </div>
                </div>
            </div>

            {/* GROUPE 3: GESTION DES DONNÉES */}
            <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-3">
                    Stockage & Données
                </span>
                <div className="ios-group">
                    <button
                        onClick={handleReset}
                        className="w-full ios-cell text-left hover:bg-red-50/50 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white shrink-0 shadow-sm">
                                <Trash2 className="w-4 h-4" />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-red-600 block">Réinitialiser le carnet</span>
                                <span className="text-[11px] text-muted-foreground">Rétablit l'itinéraire et les données d'origine</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* FOOTER INFORMATIONS */}
            <div className="text-center pt-4 space-y-1">
                <p className="text-xs font-bold text-foreground">China One • Carnet Chongqing</p>
                <p className="hanzi text-xs font-semibold text-gold-dark">山城重庆 • 2026</p>
            </div>
        </div>
    );
}
