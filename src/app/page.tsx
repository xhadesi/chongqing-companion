"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CarTaxiFront,
  Coins,
  Flame,
  MessageSquareText,
  Calendar,
  CloudSun,
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Utensils,
  TrainTrack,
  Landmark,
  ShoppingBag
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DailyQuote } from "@/components/home/DailyQuote";
import { GovernmentAlert } from "@/components/home/GovernmentAlert";
import { useAgenda } from "@/hooks/useAgenda";

export default function Home() {
  const { days, isLoading } = useAgenda();
  const [chongqingTime, setChongqingTime] = useState("");
  const [parisTime, setParisTime] = useState("");
  const [weatherTemp, setWeatherTemp] = useState<string>("24°C");

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

  // Quick weather fetch for Chongqing
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("https://api.open-meteo.com/v1/forecast?latitude=29.5623&longitude=106.5774&current=temperature_2m");
        const data = await res.json();
        if (data?.current?.temperature_2m !== undefined) {
          setWeatherTemp(`${Math.round(data.current.temperature_2m)}°C`);
        }
      } catch (e) {
        // fallback to default
      }
    };
    fetchWeather();
  }, []);

  const firstDay = days.length > 0 ? days[0] : null;
  const nextActivity = firstDay?.activities?.[0] || null;

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-28 space-y-5">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden shadow-sm border border-border shrink-0 bg-card">
            <img src="/icon-192x192.png" alt="China One Logo" className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-bold tracking-tight text-foreground">China One</h1>
              <span className="hanzi text-xs font-semibold text-primary px-1.5 py-0.5 rounded bg-primary/10">重庆</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Carnet de bord & survie urbaine</p>
          </div>
        </div>

        {/* Dual Clocks */}
        <div className="flex items-center gap-2 text-right">
          <div className="p-2 rounded-xl bg-card border border-border">
            <span className="text-[10px] text-muted-foreground block font-medium">Chongqing</span>
            <span className="text-xs font-bold text-foreground">{chongqingTime || "--:--"}</span>
          </div>
          <div className="p-2 rounded-xl bg-card border border-border">
            <span className="text-[10px] text-muted-foreground block font-medium">Paris</span>
            <span className="text-xs font-medium text-muted-foreground">{parisTime || "--:--"}</span>
          </div>
        </div>
      </header>

      {/* FLASH ACTION: Taxi Mode */}
      <Link href="/taxi" className="block">
        <div className="card-lacquer p-4 relative group">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90 block">
                Mode Urgence Taxi
              </span>
              <h2 className="text-lg font-black tracking-tight leading-snug">
                Montrer mon adresse au chauffeur
              </h2>
              <p className="text-xs text-white/80 leading-relaxed max-w-xs">
                Affichage grand format en caractères chinois et lecture audio sans connexion.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <CarTaxiFront className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </Link>

      {/* COCKPIT WIDGETS: Météo & Devises */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/tools/weather" className="card-clean p-3.5 hover:border-primary/40 block">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Météo locale</span>
            <CloudSun className="w-4 h-4 text-primary" />
          </div>
          <p className="text-xl font-bold text-foreground">{weatherTemp}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5 truncate">Chongqing centre</p>
        </Link>

        <Link href="/tools/currency" className="card-clean p-3.5 hover:border-primary/40 block">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">Change</span>
            <Coins className="w-4 h-4 text-primary" />
          </div>
          <p className="text-xl font-bold text-foreground">1€ ≈ 7.82 ¥</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">100 ¥ ≈ 12.80 €</p>
        </Link>
      </div>

      {/* PROCHAINE ÉTAPE DE L'AGENDA */}
      <section className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Itinéraire du voyage
          </h2>
          <Link href="/agenda" className="text-xs font-medium text-primary hover:underline flex items-center gap-0.5">
            Tout le planning
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {nextActivity ? (
          <Link href="/agenda" className="card-clean p-4 block hover:border-primary/40">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-primary">{nextActivity.time}</span>
                  <span className="text-xs text-muted-foreground">• Jour 1</span>
                </div>
                <h3 className="font-bold text-sm text-foreground">{nextActivity.title}</h3>
                {nextActivity.chineseTitle && (
                  <p className="hanzi text-xs font-medium text-muted-foreground">
                    {nextActivity.chineseTitle}
                  </p>
                )}
              </div>
              <div className="p-2 rounded-xl bg-muted/60 text-muted-foreground shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            {nextActivity.location && (
              <div className="mt-3 pt-3 border-t border-border flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <MapPin className="w-3 h-3 text-primary shrink-0" />
                <span className="truncate">{nextActivity.location}</span>
              </div>
            )}
          </Link>
        ) : (
          <Link href="/agenda" className="card-clean p-4 block text-center py-6 text-muted-foreground hover:border-primary/40">
            <p className="text-xs">Consulter les étapes du voyage dans l'Agenda</p>
          </Link>
        )}
      </section>

      {/* 4 OUTILS DE TERRAIN */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
          Outils de Survie
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          <Link href="/taxi" className="card-clean p-3.5 flex items-center gap-3 hover:border-primary/40">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <CarTaxiFront className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-xs text-foreground truncate">Cartes Taxi</h3>
              <p className="text-[10px] text-muted-foreground truncate">Plein écran & audio</p>
            </div>
          </Link>

          <Link href="/guide/phrases" className="card-clean p-3.5 flex items-center gap-3 hover:border-primary/40">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <MessageSquareText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-xs text-foreground truncate">Phrases Audio</h3>
              <p className="text-[10px] text-muted-foreground truncate">Survie en mandarin</p>
            </div>
          </Link>

          <Link href="/tools/spicy" className="card-clean p-3.5 flex items-center gap-3 hover:border-primary/40">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Flame className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-xs text-foreground truncate">Piment-O-Mètre</h3>
              <p className="text-[10px] text-muted-foreground truncate">Doser le piment</p>
            </div>
          </Link>

          <Link href="/tools/currency" className="card-clean p-3.5 flex items-center gap-3 hover:border-primary/40">
            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
              <Coins className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-xs text-foreground truncate">Convertisseur</h3>
              <p className="text-[10px] text-muted-foreground truncate">RMB vers Euros</p>
            </div>
          </Link>
        </div>
      </section>

      {/* BONS PLANS SURVIE CHONGQING */}
      <section className="space-y-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
          Repères Rapides
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="card-clean p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>Xiaomian 10-15¥</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Nouilles locales ou baozi le matin pour 1 à 2€. Copieux et authentique.
            </p>
          </div>

          <div className="card-clean p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
              <TrainTrack className="w-3.5 h-3.5" />
              <span>Métro 2 à 5¥</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Moins de 1€ par trajet. Traversée rapide et climatisée de la ville.
            </p>
          </div>

          <div className="card-clean p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-primary text-xs font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              <span>Spots Gratuits</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Hongyadong, Shibati et Shancheng Alley sont 100% libres d'accès.
            </p>
          </div>
        </div>
      </section>

      {/* Proverbe du jour */}
      <DailyQuote />

      {/* Alerte consulaire */}
      <GovernmentAlert />
    </div>
  );
}
