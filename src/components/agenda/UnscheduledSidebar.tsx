import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Activity } from "@/lib/types";
import { SidebarItem } from "./SidebarItem";

interface UnscheduledSidebarProps {
    items: Activity[];
    onDelete: (id: string) => void;
}

export function UnscheduledSidebar({ items, onDelete }: UnscheduledSidebarProps) {
    const { setNodeRef } = useDroppable({
        id: "unscheduled"
    });

    return (
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-t-2xl">
                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <span className="text-xl">📌</span> À planifier
                    <span className="ml-auto bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full">
                        {items.length}
                    </span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Glissez ces éléments dans votre journée.
                </p>
            </div>

            <div
                ref={setNodeRef}
                className="flex-1 overflow-y-auto p-3 space-y-3"
            >
                <SortableContext
                    id="unscheduled"
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {items.length === 0 ? (
                        <div className="text-center py-10 opacity-50 border-2 border-dashed border-slate-200 rounded-xl">
                            <p className="text-sm text-slate-400">Aucun élément.</p>
                            <p className="text-xs text-slate-400 mt-1">Ajoutez-en depuis le Guide !</p>
                        </div>
                    ) : (
                        items.map((activity) => (
                            <SidebarItem key={activity.id} activity={activity} onDelete={onDelete} />
                        ))
                    )}
                </SortableContext>
            </div>
        </div>
    );
}
