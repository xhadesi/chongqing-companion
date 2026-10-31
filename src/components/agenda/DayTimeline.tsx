"use client";

import { Activity } from "@/lib/types";
import { Compass, Plus } from "lucide-react";
import { SortableActivity } from "./SortableActivity";

interface DayTimelineProps {
    dayId: string;
    activities: Activity[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onClick: (activity: Activity) => void;
    onTimeEdit: (id: string, newTime: string) => void;
    onDurationEdit: (id: string, newDuration: string) => void;
    onAddClick: () => void;
}

export function DayTimeline({ activities, onToggle, onDelete, onClick, onTimeEdit, onDurationEdit, onAddClick }: DayTimelineProps) {
    if (activities.length === 0) {
        return (
            <div className="card-warm p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-light border border-gold/30 text-gold-dark mx-auto flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="font-bold text-sm text-foreground">Journée Libre</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 max-w-xs mx-auto">
                        Aucun arrêt programmé pour ce jour. Ajoutez des lieux depuis le guide ou créez une étape.
                    </p>
                </div>
                <button
                    onClick={onAddClick}
                    className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
                >
                    <Plus className="w-4 h-4" />
                    Ajouter une étape
                </button>
            </div>
        );
    }

    return (
        <div className="pt-2">
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
    );
}
