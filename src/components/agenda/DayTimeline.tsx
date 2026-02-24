"use client";

import { Activity } from "@/lib/types";
import { Clock, MapPin, Check, X, Navigation, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface DayTimelineProps {
    dayId: string;
    activities: Activity[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onActivityClick: (activity: Activity) => void;
}

export function DayTimeline({ dayId, activities, onToggle, onDelete, onActivityClick }: DayTimelineProps) {
    return (
        <div className="flex-1 min-h-[500px] p-4 space-y-4 relative">
            <div className="absolute left-[3rem] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-slate-800 -z-10" />

            {activities.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <Clock className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Rien de prévu</p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Ajoutez des idées depuis la liste</p>
                </div>
            )}

            {activities.map((activity) => (
                <div key={activity.id} className="relative group">
                    <div className="flex items-start gap-4">
                        {/* Status Bubble / Icon left */}
                        <div className="flex-shrink-0 w-12 flex flex-col items-center pt-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggle(activity.id);
                                }}
                                className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white dark:bg-slate-900 border-2 z-10 shadow-sm",
                                    activity.completed
                                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500"
                                        : "border-slate-200 dark:border-slate-700 text-slate-300 hover:border-amber-400"
                                )}
                            >
                                {activity.completed ? <Check className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-amber-400 transition-colors" />}
                            </button>
                        </div>

                        {/* Card content */}
                        <div
                            onClick={() => onActivityClick(activity)}
                            className={cn(
                                "flex-1 bg-white dark:bg-slate-900 p-4 rounded-2xl border shadow-sm transition-all active:scale-[0.98] cursor-pointer",
                                activity.completed ? "border-slate-100 dark:border-slate-800 opacity-60" : "border-slate-100 dark:border-slate-800 hover:border-amber-200 dark:hover:border-amber-500/50 hover:shadow-md"
                            )}>
                            <div className="flex justify-between items-start gap-2">
                                <div className="flex flex-col gap-1 min-w-0 flex-1">
                                    <h3 className={cn("font-bold text-slate-800 dark:text-white text-base leading-snug break-words", activity.completed && "line-through text-slate-400 dark:text-slate-500")}>
                                        {activity.title}
                                    </h3>

                                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                        {/* Time badge inside card */}
                                        <span className="inline-flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-md">
                                            <Clock className="w-3 h-3" />
                                            {activity.time || "--:--"}
                                        </span>

                                        {activity.location && (
                                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium truncate max-w-[150px]">
                                                <MapPin className="w-3 h-3 shrink-0" />
                                                <span className="truncate">{activity.location}</span>
                                            </span>
                                        )}

                                        {activity.image && (
                                            <span className="text-xs text-slate-400 flex items-center gap-1 opacity-70">
                                                <ImageIcon className="w-3 h-3" />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Delete Button (prevent triggering parent click) */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(activity.id);
                                    }}
                                    className="shrink-0 p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
