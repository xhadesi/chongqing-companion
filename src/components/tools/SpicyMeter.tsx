"use client";

import { useState } from "react";
import { Flame, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SPICE_LEVELS = [
    {
        level: 0,
        label: "Aucun piment",
        chinese: "不要辣",
        pinyin: "Bú yào là",
        description: "Zéro piment, bouillon clair ou sauce douce.",
        tag: "Sécurité totale"
    },
    {
        level: 1,
        label: "Très léger",
        chinese: "微辣",
        pinyin: "Wēi là",
        description: "Une pointe de piment. Déjà piquant pour un palais européen !",
        tag: "Recommandé débutant"
    },
    {
        level: 2,
        label: "Moyen (Standard local)",
        chinese: "中辣",
        pinyin: "Zhōng là",
        description: "Niveau traditionnel des restaurants de Chongqing. Très fort !",
        tag: "Amateurs d'épices"
    },
    {
        level: 3,
        label: "Extra pimenté",
        chinese: "特辣",
        pinyin: "Tè là",
        description: "Dose maximale. Huile rouge bouillonnante et poivre de Sichuan engourdissant.",
        tag: "Guerrier local"
    },
];

export function SpicyMeter() {
    const [selectedLevel, setSelectedLevel] = useState(1);

    const current = SPICE_LEVELS[selectedLevel];

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <div className="card-clean p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">Restaurant & Hotpot</span>
                    <h3 className="text-base font-bold text-foreground">Piment-O-Mètre</h3>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Flame className="w-4 h-4" />
                </div>
            </div>

            {/* Selector tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-muted/60 rounded-xl border border-border">
                {SPICE_LEVELS.map((s, idx) => (
                    <button
                        key={s.level}
                        onClick={() => setSelectedLevel(idx)}
                        className={cn(
                            "py-2 rounded-lg text-xs font-bold transition-all text-center select-none",
                            selectedLevel === idx
                                ? "bg-primary text-white shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {idx === 0 ? "0" : `+${idx}`}
                    </button>
                ))}
            </div>

            {/* Large Chinese Display Card */}
            <div className="p-5 rounded-2xl bg-muted/30 border border-border text-center space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {current.tag}
                </span>

                <div className="py-2">
                    <p className="hanzi text-4xl font-black text-foreground tracking-wide">
                        {current.chinese}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium mt-1">
                        {current.pinyin}
                    </p>
                </div>

                <p className="text-xs text-foreground/80 leading-relaxed max-w-xs mx-auto">
                    {current.description}
                </p>

                <div className="pt-3 flex items-center justify-center">
                    <button
                        onClick={() => playSpeech(current.chinese)}
                        className="py-2.5 px-4 rounded-xl bg-card border border-border hover:bg-muted text-foreground text-xs font-semibold flex items-center gap-2 transition-colors active:scale-95 shadow-sm"
                    >
                        <Volume2 className="w-4 h-4 text-primary" />
                        Faire prononcer au serveur
                    </button>
                </div>
            </div>
        </div>
    );
}
