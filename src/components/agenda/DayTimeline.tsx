"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableActivity } from "./SortableActivity";
import { Activity } from "@/lib/types";
import { Clock, MapPin, Check, X, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import { TimeEditModal } from "@/components/ui/TimeEditModal";
import { useState } from "react";

interface DayTimelineProps {
    dayId: string;
    activities: Activity[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onUpdate: (id: string, updates: Partial<Activity>) => void;
}

export function DayTimeline({ dayId, activities, onToggle, onDelete, onUpdate }: DayTimelineProps) {
    const { setNodeRef } = useDroppable({ id: dayId });
    const [editingActivityId, setEditingActivityId] = useState<string | null>(null);

    return (
        <div ref={setNodeRef} className="flex-1 min-h-[500px] p-4 space-y-4 relative">
            <div className="absolute left-[2rem] top-4 bottom-4 w-0.5 bg-slate-100 -z-10" />

            <SortableContext id={dayId} items={activities.map((a) => a.id)} strategy={verticalListSortingStrategy}>
                {activities.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-60">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                            <Clock className="w-6 h-6 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">Rien de prévu</p>
                        <p className="text-slate-400 text-xs mt-1">Glissez des idées ici</p>
                    </div>
                )}

                {activities.map((activity) => (
                    <SortableActivity key={activity.id} id={activity.id}>
                        <div className="flex items-start gap-4">
                            {/* Time Bubble */}
                            <button
                                onClick={() => setEditingActivityId(activity.id)}
                                onPointerDown={(e) => e.stopPropagation()}
                                className={cn(
                                    "flex-shrink-0 w-14 py-2 rounded-xl text-center z-10 border-2 bg-white transition-all shadow-sm hover:scale-110 hover:border-amber-400 cursor-pointer active:scale-95",
                                    activity.completed ? "border-emerald-100 text-emerald-600 bg-emerald-50/50" : "border-slate-100 text-slate-900"
                                )}
                                title="Modifier l'heure"
                            >
                                <span className="text-xs font-black block">{activity.time || "--:--"}</span>
                            </button>

                            {/* Card content */}
                            <div className={cn(
                                "flex-1 bg-white p-4 rounded-2xl border shadow-sm transition-all active:scale-[0.98]",
                                activity.completed ? "border-slate-100 opacity-60" : "border-slate-100 hover:border-amber-200 hover:shadow-md"
                            )}>
                                <div className="flex justify-between items-start gap-2">
                                    <h3 className={cn("font-bold text-slate-800 text-base leading-snug", activity.completed && "line-through text-slate-400")}>
                                        {activity.title}
                                    </h3>

                                    {/* Actions (Not draggable, prevent bubbling) */}
                                    <div className="flex gap-1" onPointerDown={(e) => e.stopPropagation()}>
                                        <button onClick={() => onToggle(activity.id)} className={cn("p-1.5 rounded-full", activity.completed ? "text-emerald-500 bg-emerald-50" : "text-slate-300 hover:bg-slate-50")}>
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => onDelete(activity.id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {activity.location && (
                                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2 font-medium bg-slate-50 inline-flex px-2 py-1 rounded-lg">
                                        <MapPin className="w-3 h-3 text-amber-500" />
                                        {activity.location}
                                    </p>
                                )}
                                {activity.address && (
                                    <a
                                        href={`https://www.amap.com/search?query=${encodeURIComponent(activity.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-2 flex items-center gap-1.5 mt-2 text-[10px] text-indigo-500 font-bold hover:underline bg-indigo-50 px-2 py-1 rounded-lg inline-flex"
                                        onPointerDown={(e) => e.stopPropagation()}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Navigation className="w-3 h-3" />
                                        GPS
                                    </a>
                                )}
                            </div>
                        </div>
                    </SortableActivity>
                ))}
            </SortableContext>

            <TimeEditModal
                isOpen={!!editingActivityId}
                onClose={() => setEditingActivityId(null)}
                initialTime={activities.find(a => a.id === editingActivityId)?.time || ""}
                onConfirm={(newTime) => {
                    if (editingActivityId) {
                        onUpdate(editingActivityId, { time: newTime });
                    }
                }}
            />
        </div>
    );
}
