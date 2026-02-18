"use client";

import Link from "next/link";
import { Utensils, Wifi, Phone, Languages, CarFront, Settings as SettingsIcon, Info, CreditCard, Map, Smartphone, MessageSquare } from "lucide-react";
import { BestOfGuide } from "@/components/guide/BestOfGuide";
import { GovernmentAlert } from "@/components/home/GovernmentAlert";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen px-6 pt-10 pb-32 space-y-10">
      {/* Header */}
      <header className="animate-in slide-in-from-bottom-4 duration-700 flex flex-col items-center text-center mt-4">
        <h1 className="text-4xl font-black tracking-tight text-slate-800 dark:text-white mb-1">
          Bonjour / <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">Ni hao</span>
        </h1>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em]">China Companion</p>
      </header>



      {/* News & Guide Carousel (Banner Style) */}
      <section className="space-y-4 animate-in slide-in-from-bottom-8 duration-700 delay-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white">Actualités & Guide</h2>
          <span className="text-xs font-medium text-slate-400">Liens Utiles</span>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-4 -mx-6 pl-8 pr-6 no-scrollbar snap-x">
          {/* ... existing banners ... */}
          {/* News: Visa Exemption */}
          <GuideBanner
            icon={<Info className="w-5 h-5 text-white" />}
            title="Visa Free"
            subtitle="Jusqu'au 31/12/2025"
            tag="Flash Info"
            className="bg-gradient-to-br from-blue-600 to-blue-800"
            href="https://www.service-public.fr/particuliers/actualites/A17013"
            external
          />

          {/* Internet - Holafly */}
          <GuideBanner
            icon={<Wifi className="w-5 h-5 text-white" />}
            title="Internet"
            subtitle="eSIM Holafly"
            className="bg-gradient-to-br from-indigo-500 to-purple-600"
            href="https://esim.holafly.com/fr/esim-chine/"
            external
          />

          {/* Apps Essentials Link (was Payment) */}
          <GuideBanner
            icon={<Smartphone className="w-5 h-5 text-white" />}
            title="Apps"
            subtitle="Le Kit de Survie"
            tag="Indispensable"
            className="bg-gradient-to-br from-indigo-500 to-indigo-700"
            href="/guide/apps"
          />

          {/* Culture Guide */}
          <GuideBanner
            icon={<Languages className="w-5 h-5 text-white" />}
            title="Culture"
            subtitle="Guide Expat"
            className="bg-gradient-to-br from-rose-500 to-pink-600"
            href="/guide/culture"
          />

          {/* Social - WeChat */}
          <GuideBanner
            icon={<MessageSquare className="w-5 h-5 text-white" />}
            title="WeChat"
            subtitle="Tout-en-un"
            className="bg-gradient-to-br from-green-500 to-emerald-600"
            href="https://www.wechat.com/"
            external
          />

          {/* Transport - Metro */}
          <GuideBanner
            icon={<Map className="w-5 h-5 text-white" />}
            title="Métro"
            subtitle="Carte Interactive"
            className="bg-gradient-to-br from-slate-700 to-slate-900"
            href="/metro"
          />

          {/* Guide: Emergency - Textured Red */}
          <GuideBanner
            icon={<Phone className="w-5 h-5 text-white" />}
            title="Urgences"
            subtitle="110 (Police) / 120 (SAMU)"
            isEmergency={true}
            href="tel:110"
            external
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
        <Link href="/tools" className="block relative h-28 bg-slate-900 rounded-3xl overflow-hidden shadow-neon group active:scale-95 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800" />

          <div className="absolute inset-0 flex items-center justify-between px-8 z-10">
            <div className="flex flex-col justify-center">
              <h3 className="font-bold text-white text-xl">Boîte à Outils</h3>
              <p className="text-slate-400 text-sm mt-1">Convertisseur, Météo, Piment...</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors border border-white/5">
              <Utensils className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Decoration */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
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
    <Component href={href !== '#' ? href : undefined} {...props} className={`flex-shrink-0 w-72 h-40 md:w-60 md:h-32 rounded-3xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden snap-start hover:shadow-lg transition-all active:scale-95 group ${isEmergency ? 'bg-red-texture' : (className || 'bg-slate-200')}`}>

      {/* Background Image (if provided and not emergency) */}
      {!isEmergency && image && (
        <div className="absolute inset-0">
          <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        </div>
      )}

      {/* Tag */}
      {tag && (
        <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse shadow-lg z-20">
          {tag}
        </div>
      )}

      <div className="flex justify-between items-start relative z-10">
        <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
          {icon}
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="font-black text-white text-lg tracking-tight leading-none mb-1">{title}</h3>
        <p className="text-white/80 text-xs font-medium">{subtitle}</p>
      </div>
    </Component>
  );
}
