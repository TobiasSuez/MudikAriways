import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plane, 
  ShieldCheck, 
  Heart, 
  Users, 
  Award, 
  Sparkles, 
  Compass, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Globe2,
  Leaf
} from 'lucide-react';

export const AboutUsView: React.FC = () => {
  const { t, navigateTo } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5F429A]/10 text-[#5F429A] text-xs font-bold tracking-widest uppercase">
            <Plane className="w-3.5 h-3.5" />
            <span>{t('MUDIK AIRWAYS · NUESTRA IDENTIDAD', 'MUDIK AIRWAYS · OUR IDENTITY')}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-[#263A79] tracking-tight leading-tight">
            {t('CONECTAMOS 17.000 ISLAS CON EL CORAZÓN.', 'CONNECTING 17,000 ISLANDS FROM THE HEART.')}
          </h1>

          <p className="text-base sm:text-lg text-[#465B71] leading-relaxed">
            {t(
              'Mudik no es solo una aerolínea: es el anhelo del regreso al hogar, la reunión familiar y la hospitalidad viva de Indonesia llevada a cada vuelo.',
              'Mudik is more than an airline: it embodies the spirit of homecoming, reuniting families, and sharing warm Indonesian hospitality across the skies.'
            )}
          </p>
        </div>

        {/* HERO IMAGE SHOWCASE */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-video max-h-[460px] w-full">
          <img 
            src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1600&q=80" 
            alt="Mudik Airways Fleet and Destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#263A79]/90 via-[#263A79]/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-300">
              {t('HISTORIA & FILOSOFÍA', 'HISTORY & PHILOSOPHY')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold mt-1">
              {t('De una idea compartida al cielo del archipiélago', 'From a shared dream to archipelago skies')}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-200 max-w-2xl mt-1">
              {t(
                'Nacimos para democratizar el transporte aéreo en Indonesia con tarifas honestas, sin sorpresas ni costes ocultos.',
                'Founded to make inter-island air travel transparent, reliable, and accessible for everyone.'
              )}
            </p>
          </div>
        </div>

        {/* 3 CORE PILLARS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: El significado de Mudik */}
          <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-bold">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-[#263A79]">
              {t('El Espíritu de Mudik', 'The Spirit of Mudik')}
            </h3>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'En Indonesia, "Mudik" es el viaje anual en que millones regresan a su tierra natal para abrazar a sus seres queridos. Diseñamos cada experiencia para que ese regreso sea cálido, seguro y asequible.',
                'In Indonesia, "Mudik" refers to the annual journey back to your hometown to embrace loved ones. We strive to make that return warm, safe, and accessible.'
              )}
            </p>
          </div>

          {/* Pillar 2: Flota Moderna y Segura */}
          <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-[#263A79]">
              {t('Flota de Vanguardia', 'Modern Fleet & Safety')}
            </h3>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Operamos una flota joven de Airbus A320 y Boeing 737 con mantenimiento riguroso, filtros de aire HEPA hospitalarios y 99.4% de índice de confiabilidad y puntualidad técnica.',
                'We operate young Airbus A320 and Boeing 737 aircraft with top-tier maintenance, hospital-grade HEPA filters, and 99.4% technical reliability.'
              )}
            </p>
          </div>

          {/* Pillar 3: Sostenibilidad y Cultura */}
          <div className="bg-white rounded-2xl p-7 border border-neutral-200/90 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-display text-xl font-extrabold text-[#263A79]">
              {t('Compromiso Nusantara', 'Nusantara Heritage')}
            </h3>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Apoyamos a productores locales incorporando café indonesio y aperitivos tradicionales en nuestros vuelos, mientras promovemos la conservación de los parques marinos de Komodo y Raja Ampat.',
                'We champion local producers with Indonesian single-origin coffees and authentic bites on board, while supporting conservation in Komodo and Raja Ampat.'
              )}
            </p>
          </div>

        </div>

        {/* KEY METRICS & NUMBERS */}
        <div className="bg-[#263A79] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-300">
              {t('NUESTRO IMPACTO', 'OUR IMPACT')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
              {t('Cifras que construyen confianza', 'Numbers built on trust')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-black text-white">4.8M+</div>
              <div className="text-xs text-neutral-300 uppercase tracking-wider">{t('Pasajeros transportados', 'Passengers flown')}</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-black text-amber-300">42</div>
              <div className="text-xs text-neutral-300 uppercase tracking-wider">{t('Rutas interislas', 'Domestic routes')}</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-black text-emerald-400">99.4%</div>
              <div className="text-xs text-neutral-300 uppercase tracking-wider">{t('Puntualidad en despegues', 'On-time performance')}</div>
            </div>
            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-5xl font-black text-white">28</div>
              <div className="text-xs text-neutral-300 uppercase tracking-wider">{t('Aeronaves modernas', 'Aircraft in fleet')}</div>
            </div>
          </div>
        </div>

        {/* MODERN FLEET SHOWCASE */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
              {t('FLOTA DE ÚLTIMA GENERACIÓN', 'NEXT-GEN FLEET')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#263A79]">
              {t('Aeronaves eficientes, silenciosas y sostenibles', 'Efficient, quiet, and modern aircraft')}
            </h2>
            <p className="text-xs text-[#465B71]">
              {t(
                'Nuestra flota promedio tiene menos de 4 años de antigüedad y cumple las más estrictas normas mundiales de emisiones y confort acústico.',
                'Our fleet averages under 4 years of age and complies with the strictest international noise and fuel-efficiency standards.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aircraft 1: Airbus A320neo */}
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=900&q=80" 
                  alt="Airbus A320neo" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#5F429A] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                  {t('EMBLEMA DE FLOTA', 'FLEET FLAGSHIP')}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-xl text-[#263A79]">Airbus A320neo</h3>
                  <span className="text-xs font-mono font-bold text-[#5F429A] bg-[#5F429A]/10 px-2 py-0.5 rounded">
                    180 {t('Asientos', 'Seats')}
                  </span>
                </div>
                <p className="text-xs text-[#465B71] leading-relaxed">
                  {t(
                    'Equipado con motores CFM LEAP-1A que reducen el consumo de combustible en un 20% y la huella sonora en un 50%. Cabina Airspace con compartimentos superiores XL e iluminación LED relajante.',
                    'Powered by CFM LEAP-1A engines reducing fuel burn by 20% and noise footprint by 50%. Features XL luggage bins and mood-adaptive LED lighting.'
                  )}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 text-[11px] font-bold text-[#263A79] text-center">
                  <div className="bg-neutral-50 p-2 rounded-xl">
                    <span className="block text-[9px] text-[#465B71] uppercase">{t('Alcance', 'Range')}</span>
                    6.300 km
                  </div>
                  <div className="bg-neutral-50 p-2 rounded-xl">
                    <span className="block text-[9px] text-[#465B71] uppercase">{t('Filtro Aire', 'Air Filter')}</span>
                    HEPA H13
                  </div>
                  <div className="bg-neutral-50 p-2 rounded-xl">
                    <span className="block text-[9px] text-[#465B71] uppercase">{t('Puntualidad', 'Reliability')}</span>
                    99.6%
                  </div>
                </div>
              </div>
            </div>

            {/* Aircraft 2: Boeing 737-800 */}
            <div className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=900&q=80" 
                  alt="Boeing 737-800" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#263A79] text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg">
                  {t('TRABAJO PESADO INTERISLAS', 'INTER-ISLAND WORKHORSE')}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-black text-xl text-[#263A79]">Boeing 737-800 Next-Gen</h3>
                  <span className="text-xs font-mono font-bold text-[#263A79] bg-[#263A79]/10 px-2 py-0.5 rounded">
                    189 {t('Asientos', 'Seats')}
                  </span>
                </div>
                <p className="text-xs text-[#465B71] leading-relaxed">
                  {t(
                    'La aeronave de pasillo único más confiable del mundo, óptima para pistas insulares desafiantes en Sumatra, Flores y Sulawesi con interior Sky Interior renovado.',
                    'The world’s most trusted single-aisle aircraft, perfectly suited for archipelago island approaches across Sumatra, Flores, and Sulawesi.'
                  )}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 text-[11px] font-bold text-[#263A79] text-center">
                  <div className="bg-neutral-50 p-2 rounded-xl">
                    <span className="block text-[9px] text-[#465B71] uppercase">{t('Alcance', 'Range')}</span>
                    5.765 km
                  </div>
                  <div className="bg-neutral-50 p-2 rounded-xl">
                    <span className="block text-[9px] text-[#465B71] uppercase">{t('Filtro Aire', 'Air Filter')}</span>
                    HEPA H13
                  </div>
                  <div className="bg-neutral-50 p-2 rounded-xl">
                    <span className="block text-[9px] text-[#465B71] uppercase">{t('Puntualidad', 'Reliability')}</span>
                    99.4%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CREW TESTIMONIALS */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
              {t('NUESTRO EQUIPO HUMANO', 'OUR TEAM')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#263A79]">
              {t('La hospitalidad que nos distingue en cabina', 'The crew hospitality that sets us apart')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200 space-y-4">
              <p className="text-xs sm:text-sm text-[#465B71] italic leading-relaxed">
                "{t(
                  'Volar en Mudik es como recibir a la familia en tu propia casa. Cada anuncio que hacemos y cada taza de té que servimos refleja el orgullo de nuestra cultura.',
                  'Flying with Mudik feels like welcoming family into your home. Every announcement and cup of tea we serve reflects the warmth of our culture.'
                )}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-[#5F429A] text-white flex items-center justify-center font-bold text-xs">
                  DL
                </div>
                <div>
                  <div className="font-bold text-xs text-[#263A79]">Dewi Lestari</div>
                  <div className="text-[11px] text-[#465B71]">{t('Jefa de Cabina · 8 años en Mudik Airways', 'Lead Cabin Crew · 8 years at Mudik')}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 space-y-4">
              <p className="text-xs sm:text-sm text-[#465B71] italic leading-relaxed">
                "{t(
                  'El archipiélago presenta pistas desafiantes y cielos majestuosos sobre volcanes. Entrenamos bajo los más altos estándares mundiales para que viajes con total serenidad.',
                  'The Indonesian archipelago features volcanic skies and island approaches. We train to the world’s highest safety standards so you fly with peace of mind.'
                )}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-neutral-100">
                <div className="w-10 h-10 rounded-full bg-[#263A79] text-white flex items-center justify-center font-bold text-xs">
                  RK
                </div>
                <div>
                  <div className="font-bold text-xs text-[#263A79]">Capitán Reza Kurniawan</div>
                  <div className="text-[11px] text-[#465B71]">{t('Comandante Airbus A320 · 7.500 horas de vuelo', 'Airbus A320 Captain · 7,500 flight hours')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="bg-gradient-to-r from-[#5F429A] to-[#263A79] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold">
              {t('¿Listo para volar con Mudik Airways?', 'Ready to fly with Mudik Airways?')}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 max-w-xl">
              {t(
                'Encontrá las mejores tarifas directas y descubrí Indonesia como nunca antes.',
                'Find honest fares and experience Indonesia like never before.'
              )}
            </p>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="px-8 py-3.5 bg-white text-[#263A79] hover:bg-neutral-100 text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>{t('BUSCAR VUELOS', 'BOOK FLIGHTS')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
