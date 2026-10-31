"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, CalendarDays, SlidersHorizontal, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Accueil", href: "/", icon: Compass },
    { name: "Agenda", href: "/agenda", icon: CalendarDays },
    { name: "Outils", href: "/tools", icon: SlidersHorizontal },
    { name: "Réglages", href: "/settings", icon: Settings },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-3 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
            <nav className="pointer-events-auto liquid-glass rounded-full px-3 py-2 flex items-center justify-between gap-1 shadow-2xl max-w-sm w-full mx-auto">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex-1 py-1.5 flex flex-col items-center justify-center rounded-full transition-all select-none relative",
                                isActive
                                    ? "text-primary font-bold scale-105"
                                    : "text-muted-foreground hover:text-foreground active:scale-95"
                            )}
                        >
                            {isActive && (
                                <span className="absolute inset-0 rounded-full bg-primary/10 shadow-sm" />
                            )}
                            <Icon className={cn("w-5 h-5 transition-transform relative z-10", isActive && "stroke-[2.25px]")} />
                            <span className="text-[10px] tracking-tight mt-0.5 relative z-10">
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
