"use client";

import { useState, useEffect } from "react";
import { Flame, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SPICE_LEVELS = [
    { level: 0, label: "Non", chinese: "不辣", pinyin: "Bù là", color: "text-slate-600", bg: "bg-slate-100", border: "border-slate-200", shadow: "shadow-slate-200" },
    { level: 1, label: "Peu", chinese: "微辣", pinyin: "Wēi là", color: "text-amber-800", bg: "bg-amber-100", border: "border-amber-200", shadow: "shadow-amber-200" },
    { level: 2, label: "Moyen", chinese: "中辣", pinyin: "Zhōng là", color: "text-orange-900", bg: "bg-orange-200", border: "border-orange-300", shadow: "shadow-orange-300" },
    { level: 3, label: "Fort", chinese: "特辣", pinyin: "Tè là", color: "text-red-900", bg: "bg-red-200", border: "border-red-300", shadow: "shadow-red-300" },
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
        <div className="w-full bg-card rounded-[2rem] shadow-sm border border-border overflow-hidden flex flex-col">
            <div className="p-6">
                {/* ... header ... */}
                <h2 className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center justify-center gap-2 mb-6">
                    <Flame className="w-4 h-4 text-slate-300" />
                    Piment-O-Mètre
                </h2>

                {/* Display Card */}
                <div className={cn(
                    "relative aspect-square sm:aspect-auto sm:h-48 rounded-[2rem] flex flex-col items-center justify-center transition-all duration-500 border-4 border-white shadow-xl overflow-hidden group cursor-pointer",
                    currentSpice.bg,
                    currentSpice.shadow
                )}
                >
                    <div className="relative z-10 flex flex-col items-center">
                        <span className={cn("text-6xl font-black tracking-tighter mb-2 transition-colors duration-300 drop-shadow-sm", currentSpice.color)}>
                            {currentSpice.chinese}
                        </span>
                        <div className={cn("flex items-center gap-2 bg-card/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-border/40 shadow-sm transition-all duration-300")}>
                            <span className="text-sm font-bold text-slate-700 font-mono">{currentSpice.pinyin}</span>
                            <Volume2 className={cn("w-4 h-4", currentSpice.color)} />
                        </div>
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
                <div className="flex justify-between px-4 mt-2">
                    {SPICE_LEVELS.map((spice, index) => (
                        <div key={`flame-${index}`} className="flex justify-center flex-1">
                            <Flame className={cn(
                                "w-4 h-4 transition-all duration-300",
                                // Fix: Use the specific color for the active level, otherwise gray
                                selectedLevel >= index ? (index === selectedLevel ? spice.color : SPICE_LEVELS[selectedLevel].color) : "text-slate-200 scale-75"
                            )} />
                        </div>
                    ))}
                </div>
                <audio id="spicy-audio" className="hidden" />
            </div>
        </div>
    );
}
