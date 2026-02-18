import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Activity } from "@/lib/types";
import { GripVertical, Trash2 } from "lucide-react";

interface SidebarItemProps {
    activity: Activity;
    onDelete?: (id: string) => void;
}

export function SidebarItem({ activity, onDelete }: SidebarItemProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: activity.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 hover:border-amber-400 group relative"
        >
            <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1 text-slate-300 hover:text-slate-500"
            >
                <GripVertical className="w-4 h-4" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                <img src={activity.image} alt="" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-800 dark:text-white truncate leading-tight">
                    {activity.title}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                    {activity.location || "Chongqing"}
                </p>
            </div>

            {onDelete && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(activity.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    title="Supprimer"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}
