import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Activity } from "@/lib/types";
import { SidebarItem } from "./SidebarItem";
import { Card } from "@/components/ui/Card";

interface UnscheduledSidebarProps {
    items: Activity[];
    onDelete: (id: string) => void;
    onAddClick: (id: string) => void;
}

export function UnscheduledSidebar({ items, onDelete, onAddClick }: UnscheduledSidebarProps) {
    const { setNodeRef } = useDroppable({
        id: "unscheduled"
    });

    return (
        <Card variant="premium" className="h-full flex flex-col shadow-sm">
            <div className="p-4 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-t-[var(--radius)]">
                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="text-xl">📌</span> À planifier
                    <span className="ml-auto bg-white/50 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full border border-white/20">
                        {items.length}
                    </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    Glissez ces éléments dans votre journée.
                </p>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar"
            >
                <SortableContext
                    id="unscheduled"
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.length === 0 ? (
                        <div className="text-center py-10 opacity-50 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl mx-2">
                            <p className="text-sm text-slate-500 dark:text-slate-400">Aucun élément.</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Ajoutez-en depuis le Guide !</p>
                        </div>
                    ) : (
                        items.map((activity) => (
                            <SidebarItem
                                key={activity.id}
                                activity={activity}
                                onDelete={onDelete}
                                onAddClick={onAddClick}
                            />
                        ))
                    )}
                </SortableContext>
            </div>
        </Card>
    );
}
