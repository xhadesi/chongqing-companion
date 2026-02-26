"use client";

import { Activity } from "@/lib/types";
import { Clock, MapPin, Check, X, ImageIcon, ChevronRight, Edit2, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { TaxiModal } from "@/components/ui/TaxiModal";
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
    const [isTaxiModalOpen, setIsTaxiModalOpen] = useState(false);

    return (
        <div className="relative group touch-none animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(activity);
                }}
                className={cn(
                    "w-full bg-white dark:bg-slate-900 p-4 xl:p-5 rounded-3xl border shadow-sm transition-all cursor-pointer flex flex-col gap-3 group-hover:shadow-md",
                    activity.completed ? "border-slate-100 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900/50" : "border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50"
                )}>

                {/* Top Row: Time, Title, Actions */}
                <div className="flex justify-between items-start gap-3">
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1 pl-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onTimeEdit) {
                                        const newVal = window.prompt("Nouvelle heure (ex: 20:00):", activity.time);
                                        if (newVal !== null && newVal !== activity.time) {
                                            onTimeEdit(activity.id, newVal);
                                        }
                                    }
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border shadow-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors active:scale-95"
                                title="Modifier l'heure"
                            >
                                <Clock className="w-3.5 h-3.5" />
                                {activity.time || "--:--"}
                                <Edit2 className="w-2.5 h-2.5 text-indigo-300 ml-1 opacity-50" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onDurationEdit) {
                                        const newVal = window.prompt("Nouvelle durée (ex: 1h30) :", activity.duration || "");
                                        if (newVal !== null) {
                                            onDurationEdit(activity.id, newVal);
                                        }
                                    }
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border shadow-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors active:scale-95"
                                title="Modifier la durée"
                            >
                                <Timer className="w-3.5 h-3.5 shrink-0" />
                                {activity.duration || "--"}
                                <Edit2 className="w-2.5 h-2.5 text-indigo-300 ml-1 opacity-50 shrink-0" />
                            </button>
                        </div>
                        <h3 className={cn("font-black text-slate-800 dark:text-white text-lg leading-tight mt-1", activity.completed && "line-through text-slate-400")}>
                            {activity.icon && <span className="mr-2 text-xl drop-shadow-sm">{activity.icon}</span>}{activity.title}
                        </h3>
                    </div>

                    {/* Action Buttons in a super rounded square */}
                    <div className="shrink-0 flex items-center bg-slate-50 dark:bg-slate-800/80 rounded-[1.2rem] p-1.5 border border-slate-200/50 dark:border-slate-700/50 shadow-sm mt-1">
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggle(activity.id); }}
                            className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-xl transition-colors active:scale-90",
                                activity.completed ? "bg-emerald-500 text-white shadow-sm" : "hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-300 dark:text-slate-500 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700"
                            )}
                            title={activity.completed ? "Annuler terminer" : "Marquer terminé"}
                        >
                            <Check className={cn("w-4 h-4", !activity.completed && "opacity-0")} strokeWidth={4} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }}
                            className="flex items-center justify-center w-8 h-8 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/40 text-slate-400 hover:text-red-500 transition-colors bg-transparent ml-1 active:scale-90"
                            title="Supprimer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1.5" />
                        <div className="flex items-center justify-center w-8 h-8 text-slate-400 opacity-50">
                            <ChevronRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Location, Details */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-1 pl-1">
                    {activity.location && (
                        <span className="text-sm font-bold bg-indigo-50 dark:bg-indigo-900/20 px-2.5 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-900/50 text-indigo-700 dark:text-indigo-500 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate max-w-[200px]">{activity.location}</span>
                        </span>
                    )}

                    {activity.address && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsTaxiModalOpen(true);
                            }}
                            className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900/50 flex items-center gap-1.5 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors active:scale-95"
                        >
                            <span>🚕</span> Taxi
                        </button>
                    )}

                    {activity.images && activity.images.length > 0 && (
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm shrink-0 border border-slate-200 dark:border-slate-700 ml-auto">
                            <Image
                                src={activity.images[0]}
                                alt={activity.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            {activity.address && (
                <TaxiModal
                    isOpen={isTaxiModalOpen}
                    onClose={() => setIsTaxiModalOpen(false)}
                    destinationName={activity.location || activity.title}
                    address={activity.address}
                />
            )}
        </div>
    );
}
