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
        { id: "2", label: "Spray Anti-Moustiques", checked: false },
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
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <header className="sticky top-0 z-30 pt-4 bg-background/90 backdrop-blur-md border-b border-border mt-[env(safe-area-inset-top)]">
                <div className="flex items-center gap-3 p-4 pb-2">
                    <Link href="/tools" className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-black text-foreground leading-none">Listes & Bagages</h1>
                        <p className="text-[11px] font-bold text-gold-dark uppercase tracking-widest mt-1">Checklists de voyage</p>
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
                <div className="h-1 w-full bg-border">
                    <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-4 md:p-6 max-w-lg mx-auto w-full mb-32 space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-sm font-bold text-foreground">
                        {activeTab === "outward" && "L'essentiel pour partir"}
                        {activeTab === "homeward" && "Souvenirs à ramener"}
                        {activeTab === "shopping" && "Idées Shopping libres"}
                    </h2>
                    <span className="text-xs font-bold text-muted-foreground">
                        {completedCount} / {currentList.length}
                    </span>
                </div>

                <div className="space-y-2.5">
                    {currentList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => toggleItem(activeTab, item.id)}
                            className={cn(
                                "flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.98]",
                                item.checked
                                    ? "bg-stone-50 border-border opacity-60"
                                    : "bg-white border-border shadow-sm hover:border-primary/40"
                            )}
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <div className={cn(
                                    "w-5 h-5 rounded-full flex items-center justify-center transition-colors border",
                                    item.checked ? "bg-primary border-primary text-white" : "border-stone-300 bg-white text-transparent"
                                )}>
                                    <Check className="w-3.5 h-3.5" />
                                </div>
                                <span className={cn(
                                    "font-semibold transition-all text-xs select-none",
                                    item.checked ? "line-through text-muted-foreground" : "text-foreground"
                                )}>
                                    {item.label}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    deleteItem(activeTab, item.id);
                                }}
                                className="p-1.5 text-stone-400 hover:text-destructive hover:bg-stone-100 rounded-lg transition-colors ml-2 shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {currentList.length === 0 && (
                        <div className="py-10 text-center text-muted-foreground text-xs">
                            <p>Cette liste est vide.</p>
                        </div>
                    )}
                </div>

                {/* Fixed add button container relative to bottom */}
                <div className="fixed bottom-24 pb-safe left-0 right-0 p-4 bg-gradient-to-t from-background via-background/90 to-transparent z-20 pointer-events-none">
                    <form onSubmit={addItem} className="max-w-lg mx-auto flex gap-2 pointer-events-auto">
                        <input
                            type="text"
                            placeholder="Ajouter un élément..."
                            value={newItemLabel}
                            onChange={(e) => setNewItemLabel(e.target.value)}
                            className="flex-1 bg-white border border-border rounded-2xl px-4 py-3 text-xs font-bold text-foreground outline-none focus:border-primary shadow-sm"
                        />
                        <button
                            type="submit"
                            disabled={!newItemLabel.trim()}
                            className="w-12 bg-primary text-white rounded-2xl flex items-center justify-center disabled:opacity-40 disabled:bg-stone-300 shadow-md active:scale-95 transition-transform shrink-0"
                        >
                            <Plus className="w-5 h-5" />
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
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm",
                active
                    ? "bg-primary text-white"
                    : "bg-white text-muted-foreground border border-border hover:text-foreground"
            )}
        >
            {icon}
            {label}
        </button>
    );
}
