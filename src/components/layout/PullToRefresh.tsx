"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PullToRefresh({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [startPoint, setStartPoint] = useState<number | null>(null);
    const [pullChange, setPullChange] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    const refreshLimit = 120; // Pixels to pull to trigger refresh

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                if (e.targetTouches.length > 0) {
                    setStartPoint(e.targetTouches[0].clientY);
                }
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!startPoint || e.targetTouches.length === 0) return;

            const currentY = e.targetTouches[0].clientY;
            const diff = currentY - startPoint;

            // Only allow pulling down if at top
            if (window.scrollY === 0 && diff > 0) {
                // Add resistance
                const newPull = Math.min(diff * 0.4, 200);
                setPullChange(newPull);

                // If strictly at top and pulling, prevent default to avoid native bounce blocking our UI
                if (e.cancelable && diff < 200) {
                    // e.preventDefault(); // Often passive, so might not work, but we verify logic
                }
            }
        };

        const handleTouchEnd = () => {
            if (!startPoint) return;

            if (pullChange > 80) { // Threshold to refresh
                setLoading(true);
                setPullChange(100); // Snap to loading position
                setTimeout(() => {
                    window.location.reload();
                }, 500); // Small delay to show spinner
            } else {
                setPullChange(0); // Snap back
            }

            setStartPoint(null);
        };

        document.addEventListener("touchstart", handleTouchStart, { passive: true });
        document.addEventListener("touchmove", handleTouchMove, { passive: false });
        document.addEventListener("touchend", handleTouchEnd);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, [startPoint, pullChange]);

    return (
        <div className="relative min-h-screen">
            {/* Spinner Overlay */}
            <div
                className={cn("fixed top-0 left-0 right-0 z-40 bg-transparent flex justify-center items-start pointer-events-none transition-all duration-200 ease-out", pullChange > 0 ? "opacity-100 visible" : "opacity-0 invisible")}
                style={{ transform: `translateY(${pullChange - 50}px)` }}
            >
                <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-xl border border-slate-100 dark:border-slate-800 mt-safe pointer-events-none">
                    <Loader2 className={`w-5 h-5 text-primary ${loading || pullChange > 80 ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullChange * 2}deg)` }} />
                </div>
            </div>

            <div
                className={cn("transition-transform duration-200 ease-out", (loading || pullChange > 0) && "will-change-transform")}
                style={(loading || pullChange > 0) ? { transform: `translateY(${loading ? 100 : pullChange}px)` } : undefined}
            >
                {children}
            </div>
        </div>
    );
}
