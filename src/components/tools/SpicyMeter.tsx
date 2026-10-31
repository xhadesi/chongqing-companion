"use client";

import { useState } from "react";
import { Flame, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SPICE_LEVELS = [
    {
        level: 0,
        label: "Zéro",
        chinese: "不要辣",
        pinyin: "Bú yào là",
        traduction: "Pas de piment"
    },
    {
        level: 1,
        label: "Léger",
        chinese: "微辣",
        pinyin: "Wēi là",
        traduction: "Légèrement pimenté"
    },
    {
        level: 2,
        label: "Moyen",
        chinese: "中辣",
        pinyin: "Zhōng là",
        traduction: "Moyennement pimenté"
    },
    {
        level: 3,
        label: "Fort",
        chinese: "特辣",
        pinyin: "Tè là",
        traduction: "Très pimenté"
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
        <div className="card-warm p-5 space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">Restaurant & Hotpot</span>
                    <h3 className="text-base font-black text-foreground">Piment-O-Mètre</h3>
                </div>
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                    <Flame className="w-4 h-4" />
                </div>
            </div>

            {/* Selector tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-muted/60 rounded-xl">
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
                        {s.label}
                    </button>
                ))}
            </div>

            {/* Display Card: Chinese + French Translation + Audio */}
            <div className="p-6 rounded-2xl bg-[#FCFAF5] border border-border text-center space-y-3">
                <p className="hanzi text-5xl font-black text-primary tracking-wide">
                    {current.chinese}
                </p>
                <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                        {current.pinyin}
                    </p>
                    <p className="text-xs font-bold text-gold-dark">
                        {current.traduction}
                    </p>
                </div>

                <div className="pt-2 flex justify-center">
                    <button
                        onClick={() => playSpeech(current.chinese)}
                        className="py-2.5 px-5 rounded-full bg-white border border-border hover:border-primary text-foreground text-xs font-bold flex items-center gap-2 shadow-sm transition-transform active:scale-95"
                    >
                        <Volume2 className="w-4 h-4 text-primary" />
                        Écouter la prononciation
                    </button>
                </div>
            </div>
        </div>
    );
}
