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
    const startPoint = useRef<{ x: number, y: number } | null>(null);
    const isPulling = useRef(false);
    const isHorizontalSwipe = useRef(false);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY <= 0 && e.targetTouches.length > 0) {
                startPoint.current = {
                    x: e.targetTouches[0].clientX,
                    y: e.targetTouches[0].clientY
                };
                isPulling.current = false;
                isHorizontalSwipe.current = false;
            } else {
                startPoint.current = null;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!startPoint.current || e.targetTouches.length === 0 || isHorizontalSwipe.current) return;

            const currentX = e.targetTouches[0].clientX;
            const currentY = e.targetTouches[0].clientY;

            const diffX = currentX - startPoint.current.x;
            const diffY = currentY - startPoint.current.y;

            // Determine if it's primarily a horizontal swipe
            if (!isPulling.current && Math.abs(diffX) > Math.abs(diffY)) {
                isHorizontalSwipe.current = true;
                return;
            }

            if (window.scrollY <= 0 && diffY > 0) {
                isPulling.current = true;
                e.preventDefault(); // Prevent native bounce
                const newPull = Math.min(diffY * 0.4, 150);
                setPullChange(newPull);
            }
        };

        const handleTouchEnd = () => {
            if (!startPoint.current || !isPulling.current) {
                startPoint.current = null;
                isHorizontalSwipe.current = false;
                return;
            }

            setPullChange((currentPull) => {
                if (currentPull > 120) { // Require a stronger pull to refresh
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
            isHorizontalSwipe.current = false;
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
            {pullChange > 0 || loading ? (
                <div
                    className="fixed top-0 left-0 right-0 h-32 z-[100] pointer-events-none flex justify-center items-start drop-shadow-md"
                    style={{ transform: `translateY(${pullChange - 60}px)` }}
                >
                    <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full p-2.5 shadow-xl border border-slate-200 dark:border-slate-700 mt-8 pointer-events-none">
                        <Loader2 className={`w-5 h-5 text-primary ${loading ? 'animate-spin' : ''}`} style={{ transform: `rotate(${pullChange * 3}deg)` }} />
                    </div>
                </div>
            ) : null}

            <div className="min-h-screen">
                {children}
            </div>
        </div>
    );
}

