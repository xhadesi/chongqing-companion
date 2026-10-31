"use client";

import { useState, useEffect } from "react";
import { Copy, Check, MapPin, Volume2, Maximize2, X, Plus, Search, Building2, Plane, Train, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/Card";

export interface TaxiDestination {
    id: string;
    title: string;
    chineseTitle: string;
    pinyin: string;
    address: string;
    category: "transport" | "landmark" | "hotel" | "custom";
}

const DEFAULT_DESTINATIONS: TaxiDestination[] = [
    {
        id: "airport-cgo",
        title: "Aéroport Jiangbei (T3)",
        chineseTitle: "重庆江北国际机场 T3航站楼",
        pinyin: "Chóngqìng Jiāngběi Guójì Jīchǎng T3",
        address: "渝北区两路镇机场路 (Yubei District)",
        category: "transport"
    },
    {
        id: "station-north",
        title: "Gare de Chongqing Nord",
        chineseTitle: "重庆北站 (北广场/南广场)",
        pinyin: "Chóngqìng Běizhàn",
        address: "渝北区昆仑大道51号 (Yubei District)",
        category: "transport"
    },
    {
        id: "station-west",
        title: "Gare de Chongqing Ouest",
        chineseTitle: "重庆西站",
        pinyin: "Chóngqìng Xīzhàn",
        address: "沙坪坝区凤中路168号",
        category: "transport"
    },
    {
        id: "jiefangbei",
        title: "Jiefangbei (Centre)",
        chineseTitle: "解放碑步行街",
        pinyin: "Jiěfàngbēi Bùxíngjiē",
        address: "渝中区民权路民族路交汇处",
        category: "landmark"
    },
    {
        id: "hongya",
        title: "Hongyadong (Grotte Hongya)",
        chineseTitle: "洪崖洞民俗风貌区",
        pinyin: "Hóngyádòng Mínsú Fēngmàoqū",
        address: "渝中区嘉陵江滨江路88号",
        category: "landmark"
    },
    {
        id: "raffles",
        title: "Raffles City (Chaotianmen)",
        chineseTitle: "朝天门来福士广场",
        pinyin: "Cháotiānmén Láifúshì Guǎngchǎng",
        address: "渝中区接圣街8号",
        category: "landmark"
    },
    {
        id: "liziba",
        title: "Liziba (Métro dans l'immeuble)",
        chineseTitle: "李子坝轻轨站 (看轻轨穿楼)",
        pinyin: "Lǐzǐbà Qīngguǐzhàn",
        address: "渝中区李子坝正街39号",
        category: "landmark"
    },
    {
        id: "ciqikou",
        title: "Ciqikou (Vieille Ville)",
        chineseTitle: "磁器口古镇正街",
        pinyin: "Cíqìkǒu Gǔzhèn",
        address: "沙坪坝区磁南街1号",
        category: "landmark"
    },
    {
        id: "shibati",
        title: "Shibati (18 Marches)",
        chineseTitle: "十八梯传统风貌区",
        pinyin: "Shíbātī Chuántǒng Fēngmàoqū",
        address: "渝中区中兴路1号",
        category: "landmark"
    },
    {
        id: "shancheng",
        title: "Shancheng Alley (Ruelle Shancheng)",
        chineseTitle: "山城巷历史文化街区",
        pinyin: "Shānchéng Xiàng",
        address: "渝中区南区路马蹄街",
        category: "landmark"
    },
    {
        id: "guanyinqiao",
        title: "Guanyinqiao (Shopping Jiangbei)",
        chineseTitle: "观音桥步行街",
        pinyin: "Guānyīnqiáo Bùxíngjiē",
        address: "江北区观音桥步行街",
        category: "landmark"
    },
    {
        id: "nanbin",
        title: "Nanbin Road (Vue Skyline fleuve)",
        chineseTitle: "南滨路 (看渝中半岛夜景)",
        pinyin: "Nánbīnlù",
        address: "南岸区南滨路",
        category: "landmark"
    }
];

export function TaxiCards() {
    const [destinations, setDestinations] = useState<TaxiDestination[]>(DEFAULT_DESTINATIONS);
    const [filter, setFilter] = useState<"all" | "transport" | "landmark" | "hotel">("all");
    const [search, setSearch] = useState("");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [activeFullscreen, setActiveFullscreen] = useState<TaxiDestination | null>(null);
    const [isAddingHotel, setIsAddingHotel] = useState(false);
    const [customTitle, setCustomTitle] = useState("");
    const [customChinese, setCustomChinese] = useState("");
    const [customPinyin, setCustomPinyin] = useState("");
    const [customAddress, setCustomAddress] = useState("");

    useEffect(() => {
        const saved = localStorage.getItem("cq_custom_destinations");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setDestinations([...DEFAULT_DESTINATIONS, ...parsed]);
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const playSpeech = (text: string) => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "zh-CN";
            utterance.rate = 0.82;
            window.speechSynthesis.speak(utterance);
        }
    };

    const copyText = (text: string, id: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            const el = document.createElement("textarea");
            el.value = text;
            el.style.position = "fixed";
            el.style.left = "-9999px";
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
        }
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 1800);
    };

    const saveCustom = (e: React.FormEvent) => {
        e.preventDefault();
        if (!customTitle || !customChinese) return;

        const newDest: TaxiDestination = {
            id: `custom-${Date.now()}`,
            title: customTitle,
            chineseTitle: customChinese,
            pinyin: customPinyin || customTitle,
            address: customAddress || customChinese,
            category: "hotel"
        };

        const updated = [...destinations, newDest];
        setDestinations(updated);

        const customOnly = updated.filter(d => d.id.startsWith("custom-"));
        localStorage.setItem("cq_custom_destinations", JSON.stringify(customOnly));

        setCustomTitle("");
        setCustomChinese("");
        setCustomPinyin("");
        setCustomAddress("");
        setIsAddingHotel(false);
    };

    const filtered = destinations.filter(d => {
        if (filter !== "all" && d.category !== filter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            d.title.toLowerCase().includes(q) ||
            d.chineseTitle.includes(q) ||
            d.pinyin.toLowerCase().includes(q) ||
            d.address.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-5">
            {/* Header info card */}
            <div className="card-lacquer p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="text-[11px] font-medium tracking-wider uppercase opacity-80">Chauffeur & Didi</span>
                        <h2 className="text-xl font-bold mt-0.5">Cartes Taxi Plein Écran</h2>
                    </div>
                    <button
                        onClick={() => setIsAddingHotel(true)}
                        className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-xs font-medium flex items-center gap-1.5 transition-colors backdrop-blur-sm"
                    >
                        <Plus className="w-3.5 h-3.5" />
                        Mon hôtel
                    </button>
                </div>
                <p className="text-xs text-white/85 mt-2 leading-relaxed">
                    Touchez une carte pour l'ouvrir en grand format. Les chauffeurs de taxi locaux lisent directement les caractères chinois et l'adresse.
                </p>
            </div>

            {/* Modal Add Hotel */}
            {isAddingHotel && (
                <div className="card-clean p-4 border-primary/30 space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-foreground">Ajouter une adresse (Hôtel, Airbnb)</h3>
                        <button onClick={() => setIsAddingHotel(false)} className="text-muted-foreground hover:text-foreground">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <form onSubmit={saveCustom} className="space-y-2.5">
                        <input
                            type="text"
                            placeholder="Nom français (ex: Mon Hôtel Jiefangbei)"
                            value={customTitle}
                            onChange={(e) => setCustomTitle(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-lg bg-muted/60 border border-border focus:border-primary outline-none"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Nom en caractères chinois (ex: 重庆解放碑威斯汀酒店)"
                            value={customChinese}
                            onChange={(e) => setCustomChinese(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-lg bg-muted/60 border border-border focus:border-primary outline-none hanzi"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Pinyin ou repère (optionnel)"
                            value={customPinyin}
                            onChange={(e) => setCustomPinyin(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-lg bg-muted/60 border border-border focus:border-primary outline-none"
                        />
                        <input
                            type="text"
                            placeholder="Adresse complète en chinois (ex: 渝中区新华路222号)"
                            value={customAddress}
                            onChange={(e) => setCustomAddress(e.target.value)}
                            className="w-full text-xs p-2.5 rounded-lg bg-muted/60 border border-border focus:border-primary outline-none hanzi"
                        />
                        <button
                            type="submit"
                            className="w-full py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-lacquer transition-colors"
                        >
                            Enregistrer l'adresse
                        </button>
                    </form>
                </div>
            )}

            {/* Search and Filters */}
            <div className="space-y-2.5">
                <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Rechercher une destination ou un district..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-card border border-border focus:border-primary outline-none transition-colors"
                    />
                </div>

                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {[
                        { id: "all", label: "Toutes" },
                        { id: "transport", label: "Gares & Aéroports" },
                        { id: "landmark", label: "Monuments" },
                        { id: "hotel", label: "Hôtels" }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setFilter(tab.id as any)}
                            className={cn(
                                "text-xs px-3 py-1 rounded-lg border whitespace-nowrap transition-colors",
                                filter === tab.id
                                    ? "bg-primary text-white border-primary font-medium"
                                    : "bg-card border-border text-muted-foreground hover:text-foreground"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Destination cards grid */}
            <div className="grid gap-3">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        className="card-clean p-4 hover:border-primary/40 cursor-pointer"
                        onClick={() => setActiveFullscreen(item)}
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wide">
                                        {item.category === "transport" ? "Transit" : item.category === "hotel" ? "Séjour" : "Visite"}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-sm text-foreground mt-0.5 truncate">{item.title}</h3>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playSpeech(item.chineseTitle);
                                    }}
                                    className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    title="Écouter la prononciation"
                                >
                                    <Volume2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        copyText(item.chineseTitle + " " + item.address, item.id);
                                    }}
                                    className="p-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    title="Copier le texte"
                                >
                                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                                    <Maximize2 className="w-3.5 h-3.5" />
                                </div>
                            </div>
                        </div>

                        {/* Chinese character block */}
                        <div className="mt-3 p-3 rounded-xl bg-muted/40 border border-border/60">
                            <p className="hanzi text-lg font-bold text-foreground leading-snug tracking-wide">
                                {item.chineseTitle}
                            </p>
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                                {item.pinyin}
                            </p>
                        </div>

                        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-muted-foreground truncate">
                            <MapPin className="w-3 h-3 text-primary shrink-0" />
                            <span className="truncate">{item.address}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* FULLSCREEN FLASHCARD MODAL */}
            {activeFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-[#121110] text-[#F4EFE6] flex flex-col justify-between p-6 animate-in fade-in duration-200 select-none"
                    onClick={() => setActiveFullscreen(null)}
                >
                    {/* Top bar */}
                    <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
                        <div>
                            <span className="text-xs uppercase tracking-wider text-[#A89F91]">Montrez cet écran au chauffeur</span>
                            <h4 className="text-sm font-semibold text-white">{activeFullscreen.title}</h4>
                        </div>
                        <button
                            onClick={() => setActiveFullscreen(null)}
                            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Giant Destination Display */}
                    <div className="flex flex-col items-center justify-center text-center my-auto py-8 space-y-6" onClick={(e) => e.stopPropagation()}>
                        <div className="px-3 py-1 rounded-md bg-[#A81C1C] text-white text-xs font-semibold uppercase tracking-widest">
                            Destination
                        </div>

                        <h1 className="hanzi text-4xl sm:text-5xl font-black text-white leading-tight tracking-wide drop-shadow-md">
                            {activeFullscreen.chineseTitle}
                        </h1>

                        <p className="text-base text-[#D4CBBF] font-medium tracking-wide">
                            {activeFullscreen.pinyin}
                        </p>

                        <div className="max-w-md p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                            <span className="text-[11px] uppercase tracking-wider text-[#9C9588] block mb-1">Adresse exacte</span>
                            <p className="hanzi text-base text-white/90 leading-relaxed">
                                {activeFullscreen.address}
                            </p>
                        </div>
                    </div>

                    {/* Bottom actions */}
                    <div className="flex items-center gap-3 max-w-md mx-auto w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => playSpeech(activeFullscreen.chineseTitle)}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 border border-white/10 transition-colors"
                        >
                            <Volume2 className="w-4 h-4 text-[#D63333]" />
                            Prononcer
                        </button>
                        <button
                            onClick={() => copyText(activeFullscreen.chineseTitle + " " + activeFullscreen.address, activeFullscreen.id)}
                            className="flex-1 py-3.5 px-4 rounded-xl bg-[#A81C1C] hover:bg-[#8A1515] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                            {copiedId === activeFullscreen.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            Copier
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
