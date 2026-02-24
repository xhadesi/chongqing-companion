"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Check, ShoppingBag, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { cn } from "@/lib/utils";

type ChecklistItem = {
    id: string;
    label: string;
    checked: boolean;
};

type ListData = {
    outward: ChecklistItem[];
    homeward: ChecklistItem[];
    shopping: ChecklistItem[];
};

const DEFAULT_LISTS: ListData = {
    outward: [
        { id: "1", label: "Passeport / Visa", checked: false },
        { id: "2", label: "Spray Anti-Moustiques (Puissant)", checked: false },
        { id: "5", label: "Bonnes chaussures de marche", checked: false },
        { id: "6", label: "Adaptateur prise chinoise", checked: false },
        { id: "7", label: "Parapluie / Poncho", checked: false },
        { id: "8", label: "Médicaments de base", checked: false },
    ],
    homeward: [
        { id: "1", label: "Base pour Hotpot (Fondue)", checked: false },
        { id: "2", label: "Thé traditionnel (Pu'er, Vert)", checked: false },
        { id: "3", label: "Snacks au poivre de Sichuan", checked: false },
        { id: "4", label: "Cadeaux locaux", checked: false },
    ],
    shopping: []
};

export default function ChecklistsPage() {
    const [activeTab, setActiveTab] = useState<"outward" | "homeward" | "shopping">("outward");
    const [lists, setLists] = useState<ListData>(DEFAULT_LISTS);
    const [newItemLabel, setNewItemLabel] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("cq-checklists");
        if (saved) {
            try {
                setLists(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse checklists", e);
            }
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (mounted) {
            localStorage.setItem("cq-checklists", JSON.stringify(lists));
        }
    }, [lists, mounted]);

    const toggleItem = (listType: keyof ListData, id: string) => {
        setLists(prev => ({
            ...prev,
            [listType]: prev[listType].map(item =>
                item.id === id ? { ...item, checked: !item.checked } : item
            )
        }));
    };

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItemLabel.trim()) return;

        const newItem: ChecklistItem = {
            id: Math.random().toString(36).substr(2, 9),
            label: newItemLabel.trim(),
            checked: false
        };

        setLists(prev => ({
            ...prev,
            [activeTab]: [...prev[activeTab], newItem]
        }));
        setNewItemLabel("");
    };

    const deleteItem = (listType: keyof ListData, id: string) => {
        setLists(prev => ({
            ...prev,
            [listType]: prev[listType].filter(item => item.id !== id)
        }));
    };

    const currentList = mounted ? (lists[activeTab] || []) : (DEFAULT_LISTS[activeTab] || []);
    const completedCount = currentList.filter(i => i.checked).length;
    const progress = currentList.length === 0 ? 0 : Math.round((completedCount / currentList.length) * 100);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
            <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-4 p-4">
                    <Link href="/tools" className="p-2 -ml-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 dark:text-white leading-none">Listes & Bagages</h1>
                        <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mt-1">Checklists</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-2 overflow-x-auto no-scrollbar pb-3">
                    <TabButton
                        active={activeTab === "outward"}
                        onClick={() => setActiveTab("outward")}
                        icon={<PlaneTakeoff className="w-4 h-4" />}
                        label="Valise Aller"
                    />
                    <TabButton
                        active={activeTab === "homeward"}
                        onClick={() => setActiveTab("homeward")}
                        icon={<PlaneLanding className="w-4 h-4" />}
                        label="Pour le Retour"
                    />
                    <TabButton
                        active={activeTab === "shopping"}
                        onClick={() => setActiveTab("shopping")}
                        icon={<ShoppingBag className="w-4 h-4" />}
                        label="À acheter"
                    />
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-slate-100 dark:bg-slate-800">
                    <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-2xl mx-auto w-full mb-32">

                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                        {activeTab === 'outward' && 'L\'essentiel pour partir'}
                        {activeTab === 'homeward' && 'Souvenirs à ramener'}
                        {activeTab === 'shopping' && 'Idées Shopping libres'}
                    </h2>
                    <span className="text-sm font-bold text-slate-400">
                        {completedCount} / {currentList.length}
                    </span>
                </div>

                <div className="space-y-3">
                    {currentList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(activeTab, item.id)}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer active:scale-[0.98]",
                                item.checked
                                    ? "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-60"
                                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm"
                            )}
                        >
                            <div className="flex items-center gap-4 flex-1">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center transition-colors border",
                                    item.checked ? "bg-amber-500 border-amber-500 text-white" : "border-slate-300 dark:border-slate-600 bg-transparent text-transparent"
                                )}>
                                    <Check className="w-4 h-4" />
                                </div>
                                <span className={cn(
                                    "font-medium transition-all text-sm md:text-base select-none",
                                    item.checked ? "line-through text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-200"
                                )}>
                                    {item.label}
                                </span>
                            </div>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem(activeTab, item.id);
                                }}
                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors ml-2 shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {currentList.length === 0 && (
                        <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                            <p>Cette liste est vide.</p>
                        </div>
                    )}
                </div>

                {/* Fixed add button container relative to bottom */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-slate-950 dark:via-slate-950 pb-8 md:pb-6 z-20 pointer-events-none">
                    <form onSubmit={addItem} className="max-w-2xl mx-auto flex gap-2 pointer-events-auto">
                        <input
                            type="text"
                            placeholder="Ajouter un élément..."
                            value={newItemLabel}
                            onChange={(e) => setNewItemLabel(e.target.value)}
                            className="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-6 py-4 font-bold text-slate-800 dark:text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 shadow-lg"
                        />
                        <button
                            type="submit"
                            disabled={!newItemLabel.trim()}
                            className="w-14 bg-amber-500 text-white rounded-2xl flex items-center justify-center disabled:opacity-50 disabled:bg-slate-200 dark:disabled:bg-slate-700 shadow-lg active:scale-95 transition-transform"
                        >
                            <Plus className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

function TabButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all",
                active
                    ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            )}
        >
            {icon}
            {label}
        </button>
    );
}
