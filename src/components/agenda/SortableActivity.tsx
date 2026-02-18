"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface SortableActivityProps {
    id: string;
    children: React.ReactNode;
    isDraggable?: boolean;
}

export function SortableActivity({ id, children, isDraggable = true }: SortableActivityProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
        touchAction: "none", // Essential for mobile DnD
    };

    return (
        <div ref={setNodeRef} style={style} className="relative group">
            {/* Drag Handle (Visible on hover or always on mobile? Maybe always visible for clarity) */}
            {isDraggable && (
                <div
                    {...attributes}
                    {...listeners}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-500 z-20 touch-none"
                >
                    <GripVertical className="w-4 h-4" />
                </div>
            )}

            <div className={cn("pl-8", isDragging && "scale-[1.02] shadow-xl rotate-[1deg]")}>
                {children}
            </div>
        </div>
    );
}
