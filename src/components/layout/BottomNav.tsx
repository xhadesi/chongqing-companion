"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, CalendarDays, CarTaxiFront, SlidersHorizontal, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Accueil", href: "/", icon: Compass },
    { name: "Agenda", href: "/agenda", icon: CalendarDays },
    { name: "Taxi", href: "/taxi", icon: CarTaxiFront },
    { name: "Outils", href: "/tools", icon: SlidersHorizontal },
    { name: "Réglages", href: "/settings", icon: Settings2 },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 nav-glass">
            <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-3 pb-[env(safe-area-inset-bottom)]">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all select-none",
                                isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground active:scale-95"
                            )}
                        >
                            <div className="relative flex items-center justify-center">
                                <Icon className={cn("w-5 h-5 transition-transform duration-200", isActive && "scale-110 stroke-[2.25px]")} />
                                {isActive && (
                                    <span className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary" />
                                )}
                            </div>
                            <span className={cn(
                                "text-[11px] tracking-tight mt-1 transition-colors",
                                isActive ? "text-primary" : "text-muted-foreground"
                            )}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
