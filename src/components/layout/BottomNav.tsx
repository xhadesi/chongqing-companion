"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Accueil", href: "/", emoji: "🏠" },
        { name: "Agenda", href: "/agenda", emoji: "📅" },
        { name: "Outils", href: "/tools", emoji: "🧰" },
        { name: "Réglages", href: "/settings", emoji: "⚙️" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass pb-safe-offset-4 sm:pb-safe-offset-2 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-white/40 dark:border-white/10">
            <div className="flex justify-around items-center h-[88px] px-6 pb-6 pt-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1.5 transition-all duration-300 relative group",
                                isActive ? "opacity-100 scale-105" : "opacity-70 hover:opacity-100"
                            )}
                        >
                            {isActive && (
                                <span className="absolute -top-3 w-8 h-1 bg-primary rounded-b-full shadow-sm animate-in fade-in" />
                            )}

                            <div className={cn("text-2xl transition-transform duration-300 drop-shadow-sm", isActive && "scale-110 drop-shadow-md")}>
                                {item.emoji}
                            </div>

                            <span className={cn("text-[10px] font-bold tracking-wide transition-opacity", isActive ? "text-primary" : "text-muted-foreground")}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
