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
        <div className="fixed bottom-4 left-0 right-0 z-50 pointer-events-none flex justify-center px-4">
            <nav className="pointer-events-auto liquid-glass rounded-full p-1.5 flex items-center justify-between gap-1 max-w-[340px] w-full">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex-1 py-1.5 px-2 flex flex-col items-center justify-center rounded-full transition-all duration-200 select-none relative",
                                isActive
                                    ? "liquid-glass-active text-primary font-bold shadow-sm"
                                    : "text-muted-foreground hover:text-foreground active:scale-95"
                            )}
                        >
                            <Icon className={cn("w-4 h-4 transition-transform", isActive ? "stroke-[2.25px] scale-105" : "opacity-80")} />
                            <span className={cn(
                                "text-[10px] tracking-tight mt-0.5 transition-colors",
                                isActive ? "text-primary font-bold" : "text-muted-foreground"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
