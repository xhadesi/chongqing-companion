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
      <header className="animate-in slide-in-from-bottom-4 duration-700 flex flex-col items-center text-center mt-4">
        <h1 className="text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-1">
          China <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">One</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">Votre Compagnon de Voyage</p>
      </header>



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

        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 no-scrollbar snap-x">
          {/* Spacer for left offset */}
          <div className="w-2 shrink-0" />

          {/* News: Visa Exemption */}
          <GuideBanner
            icon={<Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />}
            title="Visa Free"
            subtitle="Jusqu'au 31/12/2025"
            tag="Flash Info"
            href="https://www.diplomatie.gouv.fr/fr/conseils-aux-voyageurs/conseils-par-pays-destination/chine/#entre"
            external
          />

          {/* Internet - Holafly */}
          <GuideBanner
            icon={<Wifi className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />}
            title="Internet"
            subtitle="eSIM Holafly"
            href="https://esim.holafly.com/fr/esim-chine/"
            external
          />

          {/* Apps Essentials Link */}
          <GuideBanner
            icon={<Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
            title="Apps"
            subtitle="Le Kit de Survie"
            tag="Indispensable"
            href="/guide/apps"
          />

          {/* Culture Guide */}
          <GuideBanner
            icon={<Languages className="w-6 h-6 text-pink-600 dark:text-pink-400" />}
            title="Culture"
            subtitle="Guide Expat"
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
            subtitle="Carte Interactive"
            href="/metro"
          />

          {/* Guide: Emergency */}
          <GuideBanner
            icon={<Phone className="w-6 h-6 text-red-600 dark:text-red-400" />}
            title="Urgences"
            subtitle="110 (Police) / 120 (SAMU)"
            isEmergency={true}
            href="tel:110"
            external
            className="bg-red-50/50 dark:bg-red-900/20"
          />
        </div>
      </section>

      {/* Government Alert Banner */}
      <section className="animate-in slide-in-from-bottom-8 duration-700 delay-125">
        <GovernmentAlert />
        {/* Toggle 'hasAlert={true}' to see red state */}
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
              <h3 className="font-bold text-slate-800 dark:text-white text-xl">Boîte à Outils</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 font-medium">Convertisseur, Météo, Piment...</p>
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
    <Component href={href !== '#' ? href : undefined} {...props} className={`flex-shrink-0 w-72 h-40 md:w-60 md:h-32 p-5 flex flex-col justify-between relative overflow-hidden snap-start transition-all active:scale-95 group card-premium ${className || 'bg-white/60 dark:bg-slate-900/60'}`}>

      {/* Background Image (if provided and not emergency) */}
      {!isEmergency && image && (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-white/10 dark:from-black/80 dark:via-black/40 dark:to-black/10" />
        </div>
      )}

      {/* Tag */}
      {tag && (
        <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-lg z-20">
          {tag}
        </div>
      )}

      <div className="flex justify-between items-start relative z-10">
        <div className="p-2 bg-slate-100/50 dark:bg-white/5 backdrop-blur-md rounded-xl border border-slate-200/50 dark:border-white/10 shadow-sm">
          {icon}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="font-bold text-slate-800 dark:text-white text-lg tracking-tight leading-none mb-1">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">{subtitle}</p>
      </div>
    </Component>
  );
}
