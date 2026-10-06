import React from 'react';
import { useApp } from '../../context/AppContext';
import { FlightSearchWidget } from './FlightSearchWidget';
import { Sparkles, MapPin, Compass } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <div className="relative min-h-[640px] pt-8 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#13141F]">
      
      {/* Editorial Backdrop with measured scrim */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        {/* Fallback pattern / gradient scrim (ensuring high WCAG AA contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#13141F] via-[#191A23]/80 to-[#263A79]/85 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#13141F]/40 to-[#13141F]/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* Indonesian Cultural Heritage Kicker */}
        <div className="text-center pt-6 sm:pt-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#5F429A] animate-pulse" />
            <span>{t('LÍNEA AÉREA NACIONAL DE INDONESIA', 'NATIONAL INDONESIAN AIRLINE')}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase text-balance leading-tight drop-shadow-sm">
            TODO A UN VUELO DE DISTANCIA.
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 font-normal max-w-2xl mx-auto leading-relaxed text-balance">
            {t(
              'Conectamos Indonesia para que puedas llegar más lejos y sentirte más cerca.',
              'Connecting Indonesia so you can reach further and feel closer to home.'
            )}
          </p>

          {/* Brand Pillars */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold tracking-widest text-[#9D7AE2] uppercase pt-1">
            <span>TRADICIÓN</span>
            <span className="text-white/40">·</span>
            <span>CONEXIÓN</span>
            <span className="text-white/40">·</span>
            <span>DESCUBRIMIENTO</span>
          </div>
        </div>

        {/* Flight Search Widget in Hero Focal Position */}
        <div className="pt-2">
          <FlightSearchWidget />
        </div>

        {/* Trust Badges Bar below Widget */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 text-white/90 text-xs">
          <div className="flex items-center gap-2.5 bg-black/25 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
            <Compass className="w-4 h-4 text-[#9D7AE2] shrink-0" />
            <span>{t('+40 rutas interislas en Indonesia', '+40 inter-island routes')}</span>
          </div>
          <div className="flex items-center gap-2.5 bg-black/25 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
            <Sparkles className="w-4 h-4 text-[#9D7AE2] shrink-0" />
            <span>{t('Tarifas claras sin cargos sorpresa', 'Transparent low-cost fares')}</span>
          </div>
          <div className="flex items-center gap-2.5 bg-black/25 backdrop-blur-sm border border-white/10 p-3 rounded-xl">
            <MapPin className="w-4 h-4 text-[#9D7AE2] shrink-0" />
            <span>{t('Conexiones a Bali, Lombok y Flores', 'Connections to Bali, Lombok & Flores')}</span>
          </div>
          <div 
            onClick={() => navigateTo('mudik-points')}
            className="flex items-center gap-2.5 bg-black/25 backdrop-blur-sm border border-white/10 p-3 rounded-xl cursor-pointer hover:bg-black/40 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{t('Mudik Points: sumá desde el día 1', 'Earn Mudik Points on every trip')}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
