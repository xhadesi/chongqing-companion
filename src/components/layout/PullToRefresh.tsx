"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PullToRefresh({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [pullChange, setPullChange] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    // Use refs instead of state for touch tracking to prevent re-binding DOM events on every pixel scrolled
    const startPoint = useRef<number | null>(null);
    const isPulling = useRef(false);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY <= 0 && e.targetTouches.length > 0) {
                startPoint.current = e.targetTouches[0].clientY;
                isPulling.current = false;
            } else {
                startPoint.current = null;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!startPoint.current || e.targetTouches.length === 0) return;

            const currentY = e.targetTouches[0].clientY;
            const diff = currentY - startPoint.current;

            if (window.scrollY <= 0 && diff > 0) {
                isPulling.current = true;
                e.preventDefault(); // Prevent native bounce
                const newPull = Math.min(diff * 0.4, 150);
                setPullChange(newPull);
            }
        };

        const handleTouchEnd = () => {
            if (!startPoint.current || !isPulling.current) return;

            setPullChange((currentPull) => {
                if (currentPull > 80) {
                    setLoading(true);
                    setTimeout(() => {
                        window.location.reload();
                    }, 400);
                    return 100; // Snap to loading visually
                }
                return 0; // Snap back
            });

            startPoint.current = null;
            isPulling.current = false;
        };

        const options = { passive: false };
        document.addEventListener("touchstart", handleTouchStart, options);
        document.addEventListener("touchmove", handleTouchMove, options);
        document.addEventListener("touchend", handleTouchEnd, options);

        return () => {
            document.removeEventListener("touchstart", handleTouchStart);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
        };
    }, []); // Empty dependency array ensures we attach listeners exactly once

    return (
        <div className="relative min-h-screen">
            {/* Spinner Overlay */}
            <div
                className={cn("fixed top-0 left-0 right-0 z-[100] bg-transparent flex justify-center items-start pointer-events-none transition-transform duration-200 ease-out", pullChange > 0 || loading ? "opacity-100" : "opacity-0")}
                style={{ transform: `translateY(${pullChange - 50}px)` }}
            >
                <div className="bg-white dark:bg-slate-900 rounded-full p-2 shadow-xl border border-slate-100 dark:border-slate-800 mt-safe pointer-events-none">
                    <Loader2 className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullChange * 3}deg)` }} />
                </div>
            </div>

            <div
                className={cn("transition-transform duration-200 ease-out min-h-screen", (loading || pullChange > 0) && "will-change-transform")}
                style={(loading || pullChange > 0) ? { transform: `translateY(${loading ? 60 : pullChange * 0.5}px)` } : undefined}
            >
                {children}
            </div>
        </div>
    );
}

