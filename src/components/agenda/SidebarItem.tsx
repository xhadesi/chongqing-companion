"use client";

import { Activity } from "@/lib/types";
import { MapPin, X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    activity: Activity;
    onDelete: (id: string) => void;
    onAddClick: (id: string) => void;
    onClick: () => void;
}

export function SidebarItem({ activity, onDelete, onAddClick, onClick }: SidebarItemProps) {
    return (
        <div className="relative group animate-in fade-in zoom-in-95 duration-200">
            <div
                onClick={onClick}
                className={cn(
                    "flex flex-col bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl cursor-pointer transition-all",
                    "hover:border-amber-400 hover:shadow-md active:scale-[0.98]",
                    "opacity-100"
                )}
            >
                <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm flex-1 leading-tight line-clamp-2">
                        {activity.title}
                    </h4>
                    <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(activity.id);
                        }}
                        className="p-1 -mt-1 -mr-1 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors shrink-0"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>

                {activity.location && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mb-3">
                        <MapPin className="w-3 h-3 shrink-0" />
                        {activity.location}
                    </div>
                )}

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddClick(activity.id);
                    }}
                    className="w-full mt-auto py-2 bg-slate-800 dark:bg-white hover:bg-slate-700 dark:hover:bg-slate-200 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 active:scale-95 border border-transparent dark:hover:border-slate-300"
                >
                    <Plus className="w-3 h-3" />
                    <span className="opacity-90">Planifier</span>
                </button>
            </div>
        </div>
    );
}
