import { Activity } from "@/lib/types";
import { Trash2, Plus } from "lucide-react";

interface SidebarItemProps {
    activity: Activity;
    onDelete?: (id: string) => void;
    onAddClick?: (id: string) => void;
    onClick?: () => void;
}

export function SidebarItem({ activity, onDelete, onAddClick, onClick }: SidebarItemProps) {
    return (
        <div
            onClick={onClick}
            className="flex items-center gap-3 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-amber-400 transition-colors group relative pr-12 cursor-pointer"
        >
            <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-900 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                {activity.image ? (
                    <img src={activity.image} alt="" className="w-full h-full object-cover rounded-lg" />
                ) : (
                    <span className="text-xl">{activity.icon || "📌"}</span>
                )}
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate leading-tight">
                    {activity.title}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                    {activity.time && (
                        <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-1 rounded">
                            {activity.time}
                        </span>
                    )}
                    <p className="text-[10px] text-slate-400 truncate">
                        {activity.location || "Chongqing"}
                    </p>
                </div>
            </div>

            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(activity.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="p-1.5 text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors absolute right-12 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100"
                    title="Supprimer"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            )}

            {onAddClick && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onAddClick(activity.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-amber-50 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-500/50 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center shadow-sm z-20 transition-colors"
                    title="Planifier"
                >
                    <Plus className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}
