"use client";

import { Activity } from "@/lib/types";
import { Clock, Plus } from "lucide-react";
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
        <div className="flex-1 space-y-3">
            {activities.length === 0 ? (
                <div className="card-clean p-8 text-center text-muted-foreground border-dashed">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground/60" />
                    <p className="text-sm font-semibold text-foreground">Journée libre</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Aucune activité programmée pour ce jour.</p>
                </div>
            ) : (
                <div className="space-y-2.5">
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
            )}
        </div>
    );
}
