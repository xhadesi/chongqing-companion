"use client";

import { Activity } from "@/lib/types";
import { Clock, MapPin, Check, X, Timer, Banknote, Volume2, Copy, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";

interface SortableActivityProps {
    activity: Activity;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onClick: (activity: Activity) => void;
    onTimeEdit?: (id: string, newTime: string) => void;
    onDurationEdit?: (id: string, newDuration: string) => void;
}

export function SortableActivity({ activity, onToggle, onDelete, onClick, onTimeEdit }: SortableActivityProps) {
    const [copied, setCopied] = useState(false);

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    const copyForDidi = (e: React.MouseEvent) => {
        e.stopPropagation();
        const text = (activity.chineseTitle ? activity.chineseTitle + " " : "") + (activity.address || activity.location || activity.title);
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            const el = document.createElement("textarea");
            el.value = text;
            el.style.position = "fixed";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };

    const hasImage = activity.images && activity.images.length > 0;

    return (
        <div className="relative pl-6 pb-6 last:pb-2 group">
            {/* Timeline Vertical Track */}
            <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 to-border group-last:hidden" />

            {/* Timeline Dot */}
            <div className={cn(
                "absolute left-1 top-3.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center transition-colors z-10",
                activity.completed ? "border-emerald-500 bg-emerald-500" : "border-primary"
            )}>
                {activity.completed ? (
                    <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                )}
            </div>

            {/* Main Stop Card */}
            <div
                onClick={() => onClick(activity)}
                className={cn(
                    "card-warm p-4 cursor-pointer hover:border-primary/50 transition-all select-none",
                    activity.completed && "opacity-60 bg-stone-50 border-border"
                )}
            >
                {/* Header row: time badge, duration, price, toggle */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-primary text-white text-[11px] font-black tracking-tight">
                            {activity.time || "--:--"}
                        </span>
                        {activity.duration && (
                            <span className="text-[11px] font-bold text-muted-foreground">
                                • {activity.duration}
                            </span>
                        )}
                        {activity.priceEstimate && (
                            <span className="text-[11px] font-bold text-gold-dark px-1.5 py-0.5 rounded bg-gold-light">
                                {activity.priceEstimate}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => onToggle(activity.id)}
                            className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center border transition-colors",
                                activity.completed
                                    ? "bg-emerald-500 border-emerald-500 text-white"
                                    : "border-border text-muted-foreground hover:border-emerald-500 hover:text-emerald-500"
                            )}
                            title={activity.completed ? "Annuler fait" : "Marquer fait"}
                        >
                            <Check className="w-3 h-3" />
                        </button>
                        <button
                            onClick={() => onDelete(activity.id)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Supprimer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Content: Title & Chinese title with thumbnail */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                        <h3 className={cn("text-sm font-black text-foreground leading-snug", activity.completed && "line-through text-muted-foreground")}>
                            {activity.title}
                        </h3>

                        {activity.chineseTitle && (
                            <div className="flex items-center gap-2">
                                <span className="hanzi text-xs font-bold text-primary truncate">
                                    {activity.chineseTitle}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playSpeech(activity.chineseTitle!);
                                    }}
                                    className="p-1 rounded text-primary hover:bg-primary/10 transition-colors"
                                    title="Prononcer le nom"
                                >
                                    <Volume2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        )}

                        {activity.description && (
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed pt-0.5">
                                {activity.description}
                            </p>
                        )}
                    </div>

                    {hasImage && (
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-stone-200 shrink-0 border border-border shadow-sm">
                            <Image
                                src={activity.images![0]}
                                alt={activity.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Quick DiDi Copy Bar */}
                <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
                    {activity.location ? (
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground truncate max-w-[180px]">
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span className="truncate">{activity.location}</span>
                        </div>
                    ) : <span />}

                    <button
                        onClick={copyForDidi}
                        className={cn(
                            "px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1.5 transition-colors border shadow-sm",
                            copied
                                ? "bg-emerald-500 text-white border-emerald-500"
                                : "bg-white border-border text-foreground hover:border-primary/50"
                        )}
                        title="Copier pour coller dans DiDi"
                    >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3 text-primary" />}
                        <span>{copied ? "Copié pour DiDi !" : "Copier pour DiDi"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
