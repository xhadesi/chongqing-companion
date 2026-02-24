"use client";

import { Activity } from "@/lib/types";
import { Clock } from "lucide-react";
import { SortableActivity } from "./SortableActivity";

interface DayTimelineProps {
    dayId: string;
    activities: Activity[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onClick: (activity: Activity) => void;
    onTimeEdit: (id: string, newTime: string) => void;
    onDurationEdit: (id: string, newDuration: string) => void;
}

export function DayTimeline({ dayId, activities, onToggle, onDelete, onClick, onTimeEdit, onDurationEdit }: DayTimelineProps) {
    return (
        <div className="flex-1 min-h-[500px] p-4 lg:p-6 space-y-4">
            {activities.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center opacity-60 bg-slate-50/50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm">
                        <Clock className="w-6 h-6 text-slate-300 dark:text-slate-600" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-bold mb-1">Rien de prévu</p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-widest">Ajoutez des étapes à ce jour</p>
                </div>
            )}

            <div className="space-y-4">
                {activities.map((activity) => (
                    <SortableActivity
                        key={activity.id}
                        activity={activity}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onClick={onClick}
                        onTimeEdit={onTimeEdit}
                        onDurationEdit={onDurationEdit}
                    />
                ))}
            </div>
        </div>
    );
}
