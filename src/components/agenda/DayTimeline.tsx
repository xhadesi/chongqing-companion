"use client";

import { Activity } from "@/lib/types";
import { Clock } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableActivity } from "./SortableActivity";

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

            <SortableContext items={activities.map(a => a.id)} strategy={verticalListSortingStrategy} id={dayId}>
                {activities.map((activity) => (
                    <SortableActivity
                        key={activity.id}
                        activity={activity}
                        onToggle={onToggle}
                        onDelete={onDelete}
                        onClick={onActivityClick}
                    />
                ))}
            </SortableContext>
        </div>
    );
}
