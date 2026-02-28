"use client";

import { useState, useEffect } from "react";
import { Flame, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

import { Card } from "@/components/ui/Card";

const SPICE_LEVELS = [
    { level: 0, label: "Aucun", phrase: "Pas du tout de piment", chinese: "不要辣", pinyin: "Bú yào là", color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", border: "border-emerald-200 dark:border-emerald-800/50", shadow: "shadow-emerald-500/20", glow: "from-emerald-500/20 to-transparent" },
    { level: 1, label: "Léger", phrase: "Un petit peu de piment", chinese: "微辣", pinyin: "Wēi là", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-200 dark:border-amber-800/50", shadow: "shadow-amber-500/20", glow: "from-amber-500/20 to-transparent" },
    { level: 2, label: "Moyen", phrase: "Moyennement pimenté", chinese: "中辣", pinyin: "Zhōng là", color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-50 dark:bg-orange-950/30", border: "border-orange-200 dark:border-orange-800/50", shadow: "shadow-orange-500/20", glow: "from-orange-500/20 to-transparent" },
    { level: 3, label: "Fort", phrase: "Beaucoup de piment", chinese: "特辣", pinyin: "Tè là", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/30", border: "border-red-200 dark:border-red-800/50", shadow: "shadow-red-500/20", glow: "from-red-600/20 to-transparent" },
];

export function SpicyMeter() {
    // ... existing state ...
    const [selectedLevel, setSelectedLevel] = useState(1);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const currentSpice = SPICE_LEVELS[selectedLevel];

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;
            window.speechSynthesis.speak(utterance);
        }
    };

    if (!mounted) return null;

    return (
        <Card variant="premium" className="w-full flex flex-col group">
            <div className="p-6">
                {/* ... header ... */}
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 flex items-center justify-center gap-2 mb-6">
                    <Flame className="w-4 h-4 text-primary" />
                    Piment-O-Mètre
                </h2>

                {/* Display Card */}
                <div className={cn(
                    "relative aspect-square sm:aspect-auto sm:h-56 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-700 border flex-shrink-0 shadow-lg overflow-hidden group-hover:shadow-xl",
                    currentSpice.bg,
                    currentSpice.border,
                    currentSpice.shadow
                )}
                >
                    {/* Background Glow */}
                    <div className={cn("absolute inset-0 bg-gradient-to-b opacity-50 transition-colors duration-700", currentSpice.glow)} />

                    <div className="relative z-10 flex flex-col items-center w-full px-4 text-center">
                        <span className={cn("text-6xl md:text-7xl font-black tracking-tighter mb-2 transition-colors duration-700 drop-shadow-sm", currentSpice.color)}>
                            {currentSpice.chinese}
                        </span>

                        <p className={cn("text-sm md:text-base font-bold mb-4 transition-colors duration-700", currentSpice.color)}>
                            {currentSpice.phrase}
                        </p>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                speak(currentSpice.chinese);
                            }}
                            className={cn("flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-5 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 active:scale-95 transition-all duration-300")}
                            aria-label="Écouter la prononciation"
                        >
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-200 font-mono">{currentSpice.pinyin}</span>
                            <Volume2 className={cn("w-4 h-4", currentSpice.color)} />
                        </button>
                    </div>
                </div>

                {/* Interactive Slider / Selector */}
                <div className="mt-8 relative h-12 bg-muted/50 rounded-full p-1 flex items-center justify-between border border-border">
                    <div
                        className="absolute top-1 bottom-1 bg-card rounded-full shadow-sm transition-all duration-300 ease-out z-0 border border-border"
                        style={{
                            left: `${(selectedLevel * 25) + 1}%`,
                            width: '23%'
                        }}
                    />

                    {SPICE_LEVELS.map((spice, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedLevel(index)}
                            className={cn(
                                "flex-1 relative z-10 h-full rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300",
                                selectedLevel === index ? spice.color : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {spice.label}
                        </button>
                    ))}
                </div>

                {/* Flame Icons visualizer below selector */}
                <div className="flex justify-between px-4 mt-3">
                    {SPICE_LEVELS.map((spice, index) => (
                        <div key={`flame-${index}`} className="flex justify-center flex-1">
                            <Flame className={cn(
                                "w-5 h-5 transition-all duration-500",
                                selectedLevel >= index ? (index === selectedLevel ? spice.color + " scale-110 drop-shadow-sm" : SPICE_LEVELS[selectedLevel].color) : "text-slate-200 dark:text-slate-700 scale-75 opacity-50"
                            )} />
                        </div>
                    ))}
                </div>
                <audio id="spicy-audio" className="hidden" />
            </div>
        </Card>
    );
}
