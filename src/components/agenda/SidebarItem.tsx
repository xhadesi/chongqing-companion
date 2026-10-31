"use client";

import { Activity } from "@/lib/types";
import { MapPin, X, Plus } from "lucide-react";
import Image from "next/image";

interface SidebarItemProps {
    activity: Activity;
    onDelete: (id: string) => void;
    onAddClick: (id: string) => void;
    onClick: () => void;
}

export function SidebarItem({ activity, onDelete, onAddClick, onClick }: SidebarItemProps) {
    return (
        <div
            onClick={onClick}
            className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 cursor-pointer transition-all active:scale-[0.98] space-y-2"
        >
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-foreground line-clamp-2 leading-snug">
                        {activity.title}
                    </h4>
                    {activity.chineseTitle && (
                        <p className="hanzi text-[11px] text-primary mt-0.5 truncate">
                            {activity.chineseTitle}
                        </p>
                    )}
                </div>

                {activity.images && activity.images.length > 0 && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-border shrink-0">
                        <Image
                            src={activity.images[0]}
                            alt={activity.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                )}

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(activity.id);
                    }}
                    className="p-1 -mt-1 -mr-1 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                    title="Supprimer"
                >
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>

            {activity.location && (
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground truncate">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span className="truncate">{activity.location}</span>
                </div>
            )}

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onAddClick(activity.id);
                }}
                className="w-full py-1.5 px-2 bg-primary/10 hover:bg-primary/15 text-primary text-xs font-semibold rounded-lg flex items-center justify-center gap-1 transition-colors"
            >
                <Plus className="w-3.5 h-3.5" />
                Ajouter à une journée
            </button>
        </div>
    );
}
