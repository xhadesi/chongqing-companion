import { Activity } from "@/lib/types";
import { SidebarItem } from "./SidebarItem";
import { Card } from "@/components/ui/Card";

interface UnscheduledSidebarProps {
    items: Activity[];
    onDelete: (id: string) => void;
    onAddClick: (id: string) => void;
    onItemClick: (activity: Activity) => void;
}

export function UnscheduledSidebar({ items, onDelete, onAddClick, onItemClick }: UnscheduledSidebarProps) {
    return (
        <Card variant="premium" className="h-[calc(100vh-8rem)] flex flex-col shadow-sm sticky top-28">
            <div className="p-4 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-t-[var(--radius)]">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-xl">📌</span> À planifier
                    <span className="ml-auto bg-white/50 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full border border-white/20">
                        {items.length}
                    </span>
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                {items.length === 0 ? (
                    <div className="text-center py-10 opacity-50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl mx-2">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Aucun élément.</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Ajoutez-en depuis le Guide !</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {items.map((activity) => (
                            <SidebarItem
                                key={activity.id}
                                activity={activity}
                                onDelete={onDelete}
                                onAddClick={onAddClick}
                                onClick={() => onItemClick(activity)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
}
