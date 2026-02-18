"use client";

import { useState } from "react";
import { X, Clock, MapPin, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Activity } from "@/lib/types";

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
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] p-6 relative z-10 shadow-2xl animate-in slide-in-from-bottom-10 duration-200 border border-slate-100 dark:border-slate-800 mb-8">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-xl font-black text-slate-800 dark:text-white mb-1 pr-8">
                    Planifier
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-6 line-clamp-1">
                    {activityTitle}
                </p>

                <div className="space-y-6">
                    {/* Day Selection */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Choisir le jour</label>
                        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                            {days.map(day => (
                                <button
                                    key={day.id}
                                    onClick={() => setSelectedDayId(day.id)}
                                    className={cn(
                                        "flex-shrink-0 px-4 py-3 rounded-xl border font-bold text-sm transition-all",
                                        selectedDayId === day.id
                                            ? "bg-slate-800 text-white border-slate-800 shadow-md transform scale-105"
                                            : "bg-white dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-300"
                                    )}
                                >
                                    Jour {day.dayNumber}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Horaire approximatif</label>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => handleQuickTime("morning")}
                                className={cn(
                                    "p-3 rounded-xl border text-sm font-bold transition-all",
                                    period === "morning" ? "bg-amber-100 border-amber-200 text-amber-700" : "bg-white dark:bg-slate-800 border-slate-200 text-slate-500"
                                )}
                            >
                                Matin
                            </button>
                            <button
                                onClick={() => handleQuickTime("afternoon")}
                                className={cn(
                                    "p-3 rounded-xl border text-sm font-bold transition-all",
                                    period === "afternoon" ? "bg-orange-100 border-orange-200 text-orange-700" : "bg-white dark:bg-slate-800 border-slate-200 text-slate-500"
                                )}
                            >
                                Aprèm
                            </button>
                            <button
                                onClick={() => handleQuickTime("evening")}
                                className={cn(
                                    "p-3 rounded-xl border text-sm font-bold transition-all",
                                    period === "evening" ? "bg-indigo-100 border-indigo-200 text-indigo-700" : "bg-white dark:bg-slate-800 border-slate-200 text-slate-500"
                                )}
                            >
                                Soir
                            </button>
                        </div>

                        <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            onAdd(time, selectedDayId);
                            onClose();
                        }}
                        className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black shadow-lg shadow-amber-200 dark:shadow-none flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        <Check className="w-5 h-5" />
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
}
