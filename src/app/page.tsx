"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Coins,
  Flame,
  MessageSquareText,
  Calendar,
  CloudSun,
  MapPin,
  ChevronRight,
  Luggage,
  Sparkles,
  Compass
} from "lucide-react";
import { DailyQuote } from "@/components/home/DailyQuote";
import { GovernmentAlert } from "@/components/home/GovernmentAlert";
import { useAgenda } from "@/hooks/useAgenda";

const MUST_SEE_SPOTS = [
  {
    name: "Hongyadong",
    chinese: "洪崖洞",
    pinyin: "Hóngyádòng",
    desc: "Maisons sur pilotis illuminées la nuit au bord du fleuve Jialing, rappelant Le Voyage de Chihiro.",
    image: "/images/places/sight_1_1.jpg",
    tag: "Incontournable Nuit"
  },
  {
    name: "Monorail de Liziba",
    chinese: "李子坝轻轨站",
    pinyin: "Lǐzǐbà",
    desc: "La ligne 2 du métro traverse directement un immeuble résidentiel de 19 étages.",
    image: "/images/places/sight_2_1.jpg",
    tag: "Spot Cyberpunk"
  },
  {
    name: "Shibati & Shancheng",
    chinese: "十八梯 • 山城巷",
    pinyin: "Shíbātī",
    desc: "Les ruelles d'escaliers traditionnelles à flanc de falaise reliant la ville basse à la ville haute.",
    image: "/images/places/sight_3_1.jpg",
    tag: "Vieux Chongqing"
  },
  {
    name: "Chaotianmen & Raffles City",
    chinese: "朝天门来福士",
    pinyin: "Cháotiānmén",
    desc: "La confluence spectaculaire du fleuve Yangtze brun et de la rivière Jialing verte.",
    image: "/images/places/sight_4_1.jpg",
    tag: "Panorama Fluvial"
  }
];

export default function Home() {
  const { days } = useAgenda();
  const [chongqingTime, setChongqingTime] = useState("");
  const [parisTime, setParisTime] = useState("");
  const [weatherTemp, setWeatherTemp] = useState<string>("19°C");

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setChongqingTime(
        new Intl.DateTimeFormat("fr-FR", {
          timeZone: "Asia/Shanghai",
          hour: "2-digit",
          minute: "2-digit"
        }).format(now)
      );
      setParisTime(
        new Intl.DateTimeFormat("fr-FR", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit"
        }).format(now)
      );
    };

    updateTimes();
    const interval = setInterval(updateTimes, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=29.5623&longitude=106.5774&current=temperature_2m");
        const data = await res.json();
        if (data?.current?.temperature_2m !== undefined) {
          setWeatherTemp(`${Math.round(data.current.temperature_2m)}°C`);
        }
      } catch (e) { }
    };
    fetchWeather();
  }, []);

  const firstDay = days.length > 0 ? days[0] : null;
  const nextActivity = firstDay?.activities?.[0] || null;

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-28 space-y-6">
      {/* Header avec Logo, Titre & Horloges */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden shadow-md border-2 border-gold/40 shrink-0 bg-white p-0.5">
            <img src="/icon-192x192.png" alt="China One Logo" className="object-cover w-full h-full rounded-xl" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-black tracking-tight text-foreground">China One</h1>
              <span className="hanzi text-xs font-bold text-white bg-primary px-2 py-0.5 rounded-full shadow-sm">
                重庆
              </span>
            </div>
            <p className="text-[11px] font-semibold text-gold-dark">Mégalopole de Chongqing</p>
          </div>
        </div>

        {/* Dual Clocks */}
        <div className="flex items-center gap-1.5 text-right">
          <div className="px-2.5 py-1.5 rounded-xl bg-white border border-border shadow-sm">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Chongqing</span>
            <span className="text-xs font-black text-primary">{chongqingTime || "--:--"}</span>
          </div>
          <div className="px-2.5 py-1.5 rounded-xl bg-white border border-border shadow-sm">
            <span className="text-[9px] font-bold text-muted-foreground uppercase block">Paris</span>
            <span className="text-xs font-bold text-muted-foreground">{parisTime || "--:--"}</span>
          </div>
        </div>
      </header>

      {/* Bannière d'ambiance Chongqing */}
      <div className="card-imperial p-5 relative overflow-hidden">
        <div className="relative z-10 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="hanzi text-xs font-black text-amber-200 tracking-wider">
              雾都 • 山城
            </span>
            <span className="w-1 h-1 rounded-full bg-amber-200/60" />
            <span className="text-[11px] font-bold text-amber-100 uppercase tracking-widest">
              Carnet de voyage
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight leading-tight text-white">
            Bienvenue dans la cité cyberpunk
          </h2>
          <p className="text-xs text-white/90 leading-relaxed max-w-sm pt-0.5">
            Entre tours géantes, trains qui traversent les gratte-ciel et effluves de fondue pimentée.
          </p>
        </div>
      </div>

      {/* Widgets Météo & Change */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/tools" className="card-warm p-4 hover:border-primary/50 block">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Météo Semaine</span>
            <CloudSun className="w-4 h-4 text-primary" />
          </div>
          <p className="text-2xl font-black text-foreground">{weatherTemp}</p>
          <p className="text-[11px] font-semibold text-gold-dark mt-0.5">Voir les 7 jours &rarr;</p>
        </Link>

        <Link href="/tools" className="card-warm p-4 hover:border-primary/50 block">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Taux de Change</span>
            <Coins className="w-4 h-4 text-gold" />
          </div>
          <p className="text-2xl font-black text-foreground">1€ ≈ 7.82¥</p>
          <p className="text-[11px] font-semibold text-gold-dark mt-0.5">Calculateur express &rarr;</p>
        </Link>
      </div>

      {/* Snapshot de l'Agenda du Jour */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Étape Prévue
          </h2>
          <Link href="/agenda" className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5">
            Ouvrir l'agenda
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {nextActivity ? (
          <Link href="/agenda" className="card-warm p-4 block hover:border-primary/50">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-primary px-2 py-0.5 rounded-md bg-primary/10">
                    {nextActivity.time}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">Jour 1</span>
                </div>
                <h3 className="font-black text-base text-foreground mt-1">{nextActivity.title}</h3>
                {nextActivity.chineseTitle && (
                  <p className="hanzi text-xs font-bold text-gold-dark">
                    {nextActivity.chineseTitle}
                  </p>
                )}
              </div>
              <div className="p-2 rounded-xl bg-muted/60 text-muted-foreground shrink-0">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            </div>
            {nextActivity.location && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{nextActivity.location}</span>
              </div>
            )}
          </Link>
        ) : (
          <Link href="/agenda" className="card-warm p-5 block text-center text-muted-foreground">
            <p className="text-xs font-bold">Consulter l'itinéraire complet</p>
          </Link>
        )}
      </section>

      {/* 3 Raccourcis Outils */}
      <section className="space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">
          Outils Indispensables
        </h2>
        <div className="grid grid-cols-3 gap-2.5">
          <Link href="/tools" className="card-warm p-3 text-center hover:border-primary/50 block">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Piment</h3>
            <p className="text-[10px] text-muted-foreground">Audio serveur</p>
          </Link>

          <Link href="/guide/phrases" className="card-warm p-3 text-center hover:border-primary/50 block">
            <div className="w-8 h-8 rounded-xl bg-gold/15 text-gold-dark mx-auto flex items-center justify-center mb-2">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Phrases</h3>
            <p className="text-[10px] text-muted-foreground">Vocal chinois</p>
          </Link>

          <Link href="/checklists" className="card-warm p-3 text-center hover:border-primary/50 block">
            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
              <Luggage className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-foreground">Bagages</h3>
            <p className="text-[10px] text-muted-foreground">Checklists</p>
          </Link>
        </div>
      </section>

      {/* SPOTS EMBLÉMATIQUES DE CHONGQING */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Les Incontournables
            </h2>
            <p className="text-sm font-black text-foreground">Spots Majeurs de la Ville</p>
          </div>
          <Link href="/agenda" className="text-xs font-bold text-primary hover:underline">
            Voir sur carte &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {MUST_SEE_SPOTS.map((spot) => (
            <div key={spot.name} className="card-warm overflow-hidden flex flex-col">
              <div className="relative h-40 w-full bg-stone-200">
                <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold shadow-sm">
                  {spot.tag}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-lg font-black leading-tight drop-shadow">{spot.name}</h3>
                    <span className="hanzi text-sm font-bold text-amber-300 drop-shadow">{spot.chinese}</span>
                  </div>
                  <span className="text-[11px] text-white/80">{spot.pinyin}</span>
                </div>
              </div>
              <div className="p-3.5 bg-white">
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {spot.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Proverbe du jour */}
      <DailyQuote />

      {/* Conseil consulaire */}
      <GovernmentAlert />
    </div>
  );
}
