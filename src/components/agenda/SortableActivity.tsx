"use client";

import { Activity } from "@/lib/types";
import { Clock, MapPin, Check, X, Timer, Banknote, CarTaxiFront, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SortableActivityProps {
    activity: Activity;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onClick: (activity: Activity) => void;
    onTimeEdit?: (id: string, newTime: string) => void;
    onDurationEdit?: (id: string, newDuration: string) => void;
}

export function SortableActivity({ activity, onToggle, onDelete, onClick, onTimeEdit, onDurationEdit }: SortableActivityProps) {
    const [isEditingTime, setIsEditingTime] = useState(false);
    const [timeVal, setTimeVal] = useState(activity.time || "09:00");

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleTimeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onTimeEdit) onTimeEdit(activity.id, timeVal);
        setIsEditingTime(false);
    };

    return (
        <div className="relative group">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(activity);
                }}
                className={cn(
                    "card-clean p-4 cursor-pointer transition-all hover:border-primary/50",
                    activity.completed && "opacity-55 bg-muted/40 border-border shadow-none"
                )}
            >
                {/* Header row: time chip & actions */}
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        {isEditingTime ? (
                            <form onSubmit={handleTimeSubmit} onClick={(e) => e.stopPropagation()} className="flex items-center gap-1">
                                <input
                                    type="time"
                                    value={timeVal}
                                    onChange={(e) => setTimeVal(e.target.value)}
                                    className="text-xs px-2 py-1 rounded bg-muted border border-border text-foreground font-semibold"
                                    autoFocus
                                    onBlur={handleTimeSubmit}
                                />
                            </form>
                        ) : (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsEditingTime(true);
                                }}
                                className="flex items-center gap-1.5 text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                                title="Modifier l'heure"
                            >
                                <Clock className="w-3 h-3" />
                                {activity.time || "--:--"}
                            </button>
                        )}

                        {activity.duration && (
                            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                                <Timer className="w-3 h-3" />
                                {activity.duration}
                            </span>
                        )}
                    </div>

                    {/* Actions: complete & delete */}
                    <div className="flex items-center gap-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggle(activity.id);
                            }}
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center transition-colors border",
                                activity.completed
                                    ? "bg-emerald-600 border-emerald-600 text-white"
                                    : "border-border text-muted-foreground hover:text-emerald-600 hover:border-emerald-600/40"
                            )}
                            title={activity.completed ? "Annuler" : "Marquer fait"}
                        >
                            <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(activity.id);
                            }}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                            title="Supprimer"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>

                {/* Content: Title & Chinese title */}
                <div className="space-y-1">
                    <h3 className={cn("font-bold text-sm text-foreground", activity.completed && "line-through text-muted-foreground")}>
                        {activity.title}
                    </h3>
                    {activity.chineseTitle && (
                        <div className="flex items-center justify-between">
                            <p className="hanzi text-xs font-medium text-primary">
                                {activity.chineseTitle}
                            </p>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playSpeech(activity.chineseTitle!);
                                }}
                                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted"
                                title="Prononcer le nom"
                            >
                                <Volume2 className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Description or location snippet */}
                {activity.description && (
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                        {activity.description}
                    </p>
                )}

                {/* Footer details: location & price */}
                {(activity.location || activity.priceEstimate) && (
                    <div className="mt-2.5 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                        {activity.location ? (
                            <div className="flex items-center gap-1.5 truncate">
                                <MapPin className="w-3 h-3 text-primary shrink-0" />
                                <span className="truncate">{activity.location}</span>
                            </div>
                        ) : <span />}

                        {activity.priceEstimate && (
                            <div className="flex items-center gap-1 font-medium text-foreground/80 shrink-0 ml-2">
                                <Banknote className="w-3 h-3" />
                                <span>{activity.priceEstimate}</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
