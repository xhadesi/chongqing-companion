"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
    Moon, Sun, Smartphone, Wifi, MapPin,
    Bell, Shield, ChevronRight, Trash2,
    HelpCircle, Info, LogOut
} from "lucide-react";
import { Switch } from "@/components/ui/switch"; // We'll need a Switch component, or I'll build a simple one inline for now

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [location, setLocation] = useState(true);
    const [offlineMode, setOfflineMode] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-100 dark:bg-black pt-10 pb-24 px-4">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 px-2">Paramètres</h1>

            <div className="space-y-6">
                {/* Connectivity Group */}
                <SettingsGroup>
                    <SettingsItem
                        icon={<Wifi className="w-5 h-5 text-white" />}
                        iconColor="bg-blue-500"
                        label="Mode Hors-ligne"
                        control={
                            <Toggle checked={offlineMode} onChange={setOfflineMode} />
                        }
                    />
                    <SettingsItem
                        icon={<MapPin className="w-5 h-5 text-white" />}
                        iconColor="bg-green-500"
                        label="Localisation GPS"
                        control={
                            <Toggle checked={location} onChange={setLocation} />
                        }
                    />
                    <SettingsItem
                        icon={<Bell className="w-5 h-5 text-white" />}
                        iconColor="bg-red-500"
                        label="Notifications"
                        control={
                            <Toggle checked={notifications} onChange={setNotifications} />
                        }
                    />
                </SettingsGroup>

                {/* Appearance Group */}
                <SettingsGroup title="APPRARENCE">
                    <SettingsItem
                        icon={theme === 'dark' ? <Moon className="w-5 h-5 text-white" /> : <Sun className="w-5 h-5 text-white" />}
                        iconColor="bg-slate-800 dark:bg-slate-600"
                        label="Mode Sombre"
                        control={
                            <Toggle checked={theme === 'dark'} onChange={(v) => setTheme(v ? 'dark' : 'light')} />
                        }
                    />
                </SettingsGroup>

                {/* Data & Privacy */}
                <SettingsGroup title="DONNÉES & CRÉDITS">
                    <SettingsItem
                        icon={<Trash2 className="w-5 h-5 text-white" />}
                        iconColor="bg-red-500"
                        label="Vider le cache"
                        onClick={() => {
                            if (confirm("Voulez-vous vraiment effacer les données locales ?")) {
                                localStorage.clear();
                                alert("Cache vidé !");
                                window.location.reload();
                            }
                        }}
                    />
                    <SettingsItem
                        icon={<Info className="w-5 h-5 text-white" />}
                        iconColor="bg-gray-500"
                        label="À propos"
                        value="v1.0.2"
                    />
                </SettingsGroup>

                <div className="px-4 text-center">
                    <p className="text-xs text-slate-400">
                        China Companion <br />
                        Fait avec ❤️ pour le voyage
                    </p>
                </div>
            </div>
        </div>
    );
}

function SettingsGroup({ children, title }: { children: React.ReactNode, title?: string }) {
    return (
        <div className="space-y-2">
            {title && <h2 className="text-xs font-bold text-slate-500 uppercase px-4 ml-1">{title}</h2>}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800">
                {children}
            </div>
        </div>
    );
}

function SettingsItem({ icon, iconColor, label, value, control, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 last:border-0 ${onClick ? 'cursor-pointer active:bg-slate-50 dark:active:bg-slate-800' : ''}`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor}`}>
                    {icon}
                </div>
                <span className="font-medium text-slate-900 dark:text-white">{label}</span>
            </div>

            <div className="flex items-center gap-2">
                {value && <span className="text-slate-500 text-sm">{value}</span>}
                {control}
                {!control && onClick && <ChevronRight className="w-5 h-5 text-slate-400" />}
            </div>
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
            className={`w-12 h-7 rounded-full transition-colors duration-200 ease-in-out relative ${checked ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'}`}
        >
            <span className={`absolute top-1 left-1 bg-white w-5 h-5 rounded-full shadow-sm transition-transform duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
    );
}
