"use client";

import { useState } from "react";
import { X, Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToAgendaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (time: string, dayId: string) => void;
    activityTitle: string;
    days: { id: string; dayNumber: number; date: string }[];
}

export function AddToAgendaModal({ isOpen, onClose, onAdd, activityTitle, days }: AddToAgendaModalProps) {
    const [selectedDayId, setSelectedDayId] = useState(days[0]?.id || "day-1");
    const [time, setTime] = useState("10:00");
    const [period, setPeriod] = useState<"morning" | "afternoon" | "evening">("morning");

    if (!isOpen) return null;

    const handleQuickTime = (p: "morning" | "afternoon" | "evening") => {
        setPeriod(p);
        if (p === "morning") setTime("10:00");
        if (p === "afternoon") setTime("14:00");
        if (p === "evening") setTime("19:00");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="bg-white w-full max-w-sm rounded-3xl p-6 relative z-10 shadow-2xl animate-in slide-in-from-bottom-6 duration-200 border border-border mb-16 md:mb-0">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-muted-foreground hover:bg-stone-100 rounded-full transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <h3 className="text-lg font-black text-foreground mb-0.5 pr-8">
                    Planifier dans l'agenda
                </h3>
                <p className="text-muted-foreground text-xs font-semibold mb-5 line-clamp-1">
                    {activityTitle}
                </p>

                <div className="space-y-5">
                    {/* Day Selection */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                            Choisir le jour
                        </label>
                        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {days.map((day) => (
                                <button
                                    key={day.id}
                                    type="button"
                                    onClick={() => setSelectedDayId(day.id)}
                                    className={cn(
                                        "flex-shrink-0 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all",
                                        selectedDayId === day.id
                                            ? "bg-primary text-white border-primary shadow-sm scale-105"
                                            : "bg-white text-muted-foreground border-border hover:border-primary/40"
                                    )}
                                >
                                    Jour {day.dayNumber}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">
                            Horaire
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                type="button"
                                onClick={() => handleQuickTime("morning")}
                                className={cn(
                                    "py-2.5 rounded-xl border text-xs font-bold transition-all",
                                    period === "morning"
                                        ? "bg-gold-light border-gold text-gold-dark font-black"
                                        : "bg-stone-50 border-border text-muted-foreground hover:bg-stone-100"
                                )}
                            >
                                Matin
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickTime("afternoon")}
                                className={cn(
                                    "py-2.5 rounded-xl border text-xs font-bold transition-all",
                                    period === "afternoon"
                                        ? "bg-gold-light border-gold text-gold-dark font-black"
                                        : "bg-stone-50 border-border text-muted-foreground hover:bg-stone-100"
                                )}
                            >
                                Après-midi
                            </button>
                            <button
                                type="button"
                                onClick={() => handleQuickTime("evening")}
                                className={cn(
                                    "py-2.5 rounded-xl border text-xs font-bold transition-all",
                                    period === "evening"
                                        ? "bg-gold-light border-gold text-gold-dark font-black"
                                        : "bg-stone-50 border-border text-muted-foreground hover:bg-stone-100"
                                )}
                            >
                                Soir
                            </button>
                        </div>

                        <div className="relative pt-1">
                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="ex: 10:00"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-border rounded-xl font-bold text-xs text-foreground outline-none focus:border-primary"
                            />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            onAdd(time, selectedDayId);
                            onClose();
                        }}
                        className="w-full py-3.5 bg-primary hover:bg-primary/90 text-white rounded-xl font-black text-xs shadow-md flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                    >
                        <Check className="w-4 h-4" />
                        Confirmer l'ajout
                    </button>
                </div>
            </div>
        </div>
    );
}
