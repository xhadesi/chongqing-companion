"use client";

import { Activity } from "@/lib/types";
import { Clock, MapPin, Check, X, ImageIcon, ChevronRight, Edit2, Timer, Banknote } from "lucide-react";
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
        <div className="relative group animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    onClick(activity);
                }}
                className={cn(
                    "w-full bg-white dark:bg-slate-900 p-4 xl:p-5 rounded-3xl border shadow-sm transition-all cursor-pointer flex flex-col gap-3 group-hover:shadow-md",
                    activity.completed ? "border-slate-100 dark:border-slate-800 opacity-60 bg-slate-50 dark:bg-slate-900/50" : "border-slate-100 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500/50"
                )}>

                {/* Top Row: Time & Duration context, Check/Cross actions */}
                <div className="flex justify-between items-start gap-3 mb-1.5 pl-1.5 pr-1">
                    <div className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-slate-500 dark:text-slate-400">
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
                            className="flex items-center gap-1.5 px-2 py-1 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors active:scale-95"
                            title="Modifier l'heure"
                        >
                            <Clock className="w-4 h-4 text-indigo-400 dark:text-indigo-500" />
                            {activity.time || "--:--"}
                        </button>

                        <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700 mx-0.5" />

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
                            className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors active:scale-95"
                            title="Modifier la durée"
                        >
                            <Timer className="w-4 h-4 text-indigo-400 dark:text-indigo-500" />
                            {activity.duration || "--"}
                        </button>
                    </div>

                    <div className="flex items-center gap-1 pt-0.5">
                        <button
                            onClick={(e) => { e.stopPropagation(); onToggle(activity.id); }}
                            className={cn(
                                "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all active:scale-90 shadow-sm",
                                activity.completed ? "bg-emerald-500 border-emerald-500 text-white shadow-emerald-500/20" : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-300 dark:text-slate-500 hover:border-emerald-400 dark:hover:border-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400"
                            )}
                            title={activity.completed ? "Annuler terminer" : "Marquer terminé"}
                        >
                            <Check className="w-4 h-4" strokeWidth={3} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(activity.id); }}
                            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 transition-colors active:scale-90 ml-1"
                            title="Supprimer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Main Content: Title, Image, Badges */}
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 min-w-0 pb-1 pl-1">
                        {/* Title */}
                        <h3 className={cn("font-black text-slate-800 dark:text-white text-lg leading-tight mb-3 pr-2 flex", activity.completed && "line-through text-slate-400")}>
                            {activity.icon && <span className="mr-2.5 text-xl -mt-0.5 drop-shadow-sm shrink-0">{activity.icon}</span>}
                            <span>{activity.title}</span>
                        </h3>

                        {/* Badges / Bottom Row */}
                        <div className="flex flex-wrap items-center gap-2 mt-auto">
                            {activity.location && (
                                <span className="text-[11px] font-bold bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-lg border border-indigo-100 dark:border-indigo-900/40 text-indigo-700 dark:text-indigo-400 flex items-center gap-1 shrink-0">
                                    <MapPin className="w-3 h-3 text-indigo-500 dark:text-indigo-500" />
                                    <span className="truncate max-w-[140px]">{activity.location}</span>
                                </span>
                            )}

                            {activity.priceEstimate && (
                                <span className="text-[11px] font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg border border-emerald-100 dark:border-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center gap-1 shrink-0">
                                    <Banknote className="w-3 h-3 text-emerald-500" />
                                    <span className="truncate max-w-[100px]">{activity.priceEstimate}</span>
                                </span>
                            )}

                            {activity.address && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsTaxiModalOpen(true);
                                    }}
                                    className="text-[11px] font-bold text-amber-700 dark:text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/40 flex items-center gap-1 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-colors active:scale-95"
                                >
                                    <span>🚕</span> Taxi
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Image */}
                    {activity.images && activity.images.length > 0 && (
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-slate-100 dark:border-slate-800 self-end mb-0.5 mr-0.5 group-hover:shadow-md transition-shadow">
                            <Image
                                src={activity.images[0]}
                                alt={activity.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105 duration-500"
                            />
                        </div>
                    )}
                </div>
            </div>

            {activity.address && (
                <TaxiModal
                    isOpen={isTaxiModalOpen}
                    onClose={() => setIsTaxiModalOpen(false)}
                    destinationName={activity.chineseTitle || activity.location || activity.title}
                    address={activity.address}
                />
            )}
        </div>
    );
}
