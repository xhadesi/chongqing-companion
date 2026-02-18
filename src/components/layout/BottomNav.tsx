"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Grid, Settings, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { name: "Accueil", href: "/", icon: Home },
        { name: "Agenda", href: "/agenda", icon: Calendar }, // Added Agenda
        { name: "Outils", href: "/tools", icon: Grid },
        { name: "Paramètres", href: "/settings", icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 glass pb-[env(safe-area-inset-bottom)] rounded-t-2xl shadow-nav border-t border-white/20">
            <div className="flex justify-around items-center h-20 px-6 pb-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 relative group",
                                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {isActive && (
                                <span className="absolute -top-0.5 w-8 h-1 bg-primary rounded-b-full shadow-sm animate-in fade-in" />
                            )}

                            <div className={cn("p-1.5 rounded-xl transition-all", isActive && "bg-primary/10")}>
                                <Icon className={cn("w-5 h-5", isActive ? "fill-current" : "stroke-current")} />
                            </div>

                            <span className={cn("text-[10px] font-medium tracking-wide transition-opacity", isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100")}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
