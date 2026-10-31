"use client";

import { Activity } from "@/lib/types";
import { Bookmark, Plus } from "lucide-react";
import { SidebarItem } from "./SidebarItem";

interface UnscheduledSidebarProps {
    items: Activity[];
    onDelete: (id: string) => void;
    onAddClick: (id: string) => void;
    onItemClick: (activity: Activity) => void;
}

export function UnscheduledSidebar({ items, onDelete, onAddClick, onItemClick }: UnscheduledSidebarProps) {
    return (
        <div className="card-clean flex flex-col sticky top-20 overflow-hidden">
            <div className="p-3.5 border-b border-border bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
                        À planifier
                    </h3>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                    {items.length}
                </span>
            </div>

            <div className="p-3 space-y-2.5 max-h-[70vh] overflow-y-auto no-scrollbar">
                {items.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-border rounded-xl">
                        <p className="text-xs text-muted-foreground">Aucun lieu en attente</p>
                    </div>
                ) : (
                    items.map((activity) => (
                        <SidebarItem
                            key={activity.id}
                            activity={activity}
                            onDelete={onDelete}
                            onAddClick={onAddClick}
                            onClick={() => onItemClick(activity)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
