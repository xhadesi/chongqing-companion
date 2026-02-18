"use client";

import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableActivity } from "./SortableActivity";
import { Activity } from "@/lib/types";
import { Lightbulb, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface IdeaBoxProps {
    activities: Activity[];
    onAdd: () => void;
    onClear?: () => void;
}

export function IdeaBox({ activities, onAdd, onClear }: IdeaBoxProps) {
    const { setNodeRef } = useDroppable({ id: "unscheduled" });

    return (
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-200/60 flex flex-col h-full min-h-[200px]">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="font-bold text-slate-700">Idées en vrac</h3>
                </div>
                <div className="flex gap-2">
                    {onClear && activities.length > 0 && (
                        <button
                            onClick={() => {
                                if (confirm("Tout effacer ?")) onClear();
                            }}
                            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
                            title="Tout effacer"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                    <button
                        onClick={onAdd}
                        className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-amber-500 hover:border-amber-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div ref={setNodeRef} className="flex-1 space-y-3">
                <SortableContext
                    id="unscheduled"
                    items={activities.map(a => a.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {activities.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-32 text-center opacity-40 border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-xs font-bold text-slate-400 uppercase">Boîte vide</p>
                            <p className="text-[10px] text-slate-400">Glissez ici pour plus tard</p>
                        </div>
                    )}

                    {activities.map((activity) => (
                        <SortableActivity key={activity.id} id={activity.id}>
                            <div className="bg-white p-0 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-0 overflow-hidden hover:shadow-md transition-all">
                                {activity.image && (
                                    <div className="h-24 w-full relative">
                                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                    </div>
                                )}
                                <div className="p-3 flex flex-col gap-1">
                                    <span className="font-bold text-slate-800 text-sm leading-tight">{activity.title}</span>
                                    {activity.location && (
                                        <span className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                                            <span className="w-1 h-1 rounded-full bg-amber-500" />
                                            {activity.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </SortableActivity>
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}
