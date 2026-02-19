"use client";

import Link from "next/link";
import { Utensils, Wifi, Phone, Languages, CarFront, Settings as SettingsIcon, Info, CreditCard, Map, Smartphone, MessageSquare } from "lucide-react";
import { BestOfGuide } from "@/components/guide/BestOfGuide";
import { Card } from "@/components/ui/Card";
import { GovernmentAlert } from "@/components/home/GovernmentAlert";
import { DailyQuote } from "@/components/home/DailyQuote";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-6 pt-10 pb-32 space-y-10">
      {/* Header */}
      <header className="animate-in slide-in-from-bottom-4 duration-700 flex items-center justify-center gap-3 mt-2">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg border border-white/10">
          <img src="/icon-192x192.png" alt="Logo" className="object-cover w-full h-full" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
          China <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">One</span>
        </h1>
      </header>

      {/* Government Alert Banner - Top Position */}
      <section className="animate-in slide-in-from-bottom-4 duration-700 delay-75">
        <GovernmentAlert />
      </section>



      {/* Daily Quote */}
      <section className="animate-in slide-in-from-bottom-8 duration-700 delay-75">
        <DailyQuote />
      </section>

      {/* News & Guide Carousel (Banner Style) */}
      <section className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Actualités & Guide</h2>
          <span className="text-xs font-medium text-slate-400">Liens Utiles</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* News: Visa Exemption */}
          <GuideBanner
            icon={<Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="Visa Free"
            subtitle="Info 2025"
            tag="Flash"
            href="https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/chine/#entre"
            external
          />

          {/* Internet - Holafly */}
          <GuideBanner
            icon={<Wifi className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Internet"
            subtitle="eSIM"
            href="https://esim.holafly.com/fr/esim-chine/"
            external
          />

          {/* Apps Essentials Link */}
          <GuideBanner
            icon={<Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            title="Apps"
            subtitle="Kit Survie"
            href="/guide/apps"
          />

          {/* Culture Guide */}
          <GuideBanner
            icon={<Languages className="w-6 h-6 text-pink-600 dark:text-pink-400" />}
            title="Culture"
            subtitle="Le Guide"
            href="/guide/culture"
          />

          {/* Social - WeChat */}
          <GuideBanner
            icon={<MessageSquare className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />}
            title="WeChat"
            subtitle="Tout-en-un"
            href="https://www.wechat.com/"
            external
          />

          {/* Transport - Metro */}
          <GuideBanner
            icon={<Map className="w-6 h-6 text-slate-600 dark:text-slate-400" />}
            title="Métro"
            subtitle="Carte"
            href="/metro"
          />

          {/* Guide: Emergency */}
          <GuideBanner
            icon={<Phone className="w-6 h-6 text-red-600 dark:text-red-400" />}
            title="Urgences"
            subtitle="110 / 120"
            isEmergency={true}
            href="tel:110"
            external
            className="col-span-2 bg-red-50/50 dark:bg-red-900/20"
          />
        </div>
      </section>



      {/* Best Of Guide (Replaces Assistant) */}
      <section className="animate-in slide-in-from-bottom-8 duration-700 delay-150">
        <BestOfGuide />
      </section>



      {/* Tools Quick Access */}
      <section className="animate-in slide-in-from-bottom-8 duration-700 delay-300">
        <Link href="/tools">
          <Card variant="premium" className="h-28 flex items-center justify-between px-8 hover:scale-[1.02] active:scale-95 transition-transform group">
            {/* Background Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/5 to-transparent dark:from-slate-900/50 pointer-events-none" />

            <div className="flex flex-col justify-center relative z-10">
              <h3 className="font-black text-slate-900 dark:text-white text-xl tracking-tight">Boîte à Outils</h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5 font-bold uppercase tracking-wide opacity-80">Convertisseur • Météo</p>
            </div>

            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-slate-200 dark:group-hover:bg-white/20 transition-colors border border-slate-200 dark:border-white/5 relative z-10 shadow-sm">
              <Utensils className="w-6 h-6 text-slate-700 dark:text-white" />
            </div>

            {/* Decoration */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-900/5 dark:bg-white/5 rounded-full blur-2xl group-hover:bg-slate-900/10 dark:group-hover:bg-white/10 transition-colors" />
          </Card>
        </Link>
      </section>

    </div>
  );
}

function GuideBanner({
  icon, title, subtitle, image, tag, href, external, isEmergency, className
}: {
  icon: React.ReactNode, title: string, subtitle: string, image?: string, tag?: string, href: string, external?: boolean, isEmergency?: boolean, className?: string
}) {
  const Component = external ? 'a' : href === '#' ? 'div' : Link;
  const props = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    // @ts-ignore
    <Component href={href !== '#' ? href : undefined} {...props} className={`w-full min-h-[90px] p-3 flex flex-row items-center gap-3 relative overflow-hidden transition-all active:scale-95 group card-premium ${className || 'bg-white/60 dark:bg-slate-900/60'} ${isEmergency ? 'col-span-2' : ''}`}>
      {/* Background Image (if provided and not emergency) */}
      {!isEmergency && image && (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/10 dark:from-black/80 dark:via-black/40 dark:to-black/10" />
        </div>
      )}

      {/* Tag */}
      {tag && (
        <div className="absolute top-2 right-2 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-pulse shadow-sm z-20">
          {tag}
        </div>
      )}

      {/* Icon */}
      <div className="relative z-10 shrink-0">
        <div className="w-10 h-10 bg-slate-100/50 dark:bg-white/5 backdrop-blur-md rounded-xl border border-slate-200/60 dark:border-white/10 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <div className="transform scale-90">
            {icon}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex-1 min-w-0">
        <h3 className="font-black text-slate-900 dark:text-white text-base tracking-tight leading-none mb-0.5 truncate">{title}</h3>
        <p className="text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wide opacity-90 truncate">{subtitle}</p>
      </div>
    </Component>
  );
}
