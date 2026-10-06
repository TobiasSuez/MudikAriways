import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS } from '../../data/mockData';
import { DestinationItem } from '../../types';
import { Compass, Plane, MapPin, Utensils, Check, ArrowRight } from 'lucide-react';

export const DestinationsView: React.FC = () => {
  const { selectDestinationForSearch, formatPrice, t } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');

  const categories = ['TODOS', 'PLAYAS', 'CULTURA', 'CIUDADES', 'NATURALEZA', 'EXPERIENCIAS'];

  const filteredDestinations = DESTINATIONS.filter(d => {
    if (selectedCategory === 'TODOS') return true;
    return d.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Editorial Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('EXPLORÁ EL ARCHIPIÉLAGO', 'EXPLORE THE ARCHIPELAGO')}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-[#263A79] tracking-tight">
            {t('DESTINOS MUDIK AIRWAYS', 'MUDIK DESTINATIONS')}
          </h1>
          <p className="text-sm text-[#465B71] leading-relaxed">
            {t(
              'Indonesia es un universo de 17.000 islas donde convergen lenguas ancestrales, volcanes sagrados y mares de turquesa. Conectamos los destinos más memorables con vuelos directos y honestos.',
              'Indonesia is an archipelago of 17,000 islands spanning ancient traditions, volcanic craters, and emerald oceans. We connect the country’s most memorable wonders.'
            )}
          </p>
        </div>

        {/* Category Filters (Clean Segmented Controls, No Cliché Pills) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5F429A] text-white shadow-sm'
                  : 'bg-white text-[#465B71] hover:text-[#263A79] border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Destination Catalog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Banner */}
                <div className={`h-64 relative bg-gradient-to-br ${dest.gradient} p-6 flex flex-col justify-between text-white`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-3 py-1 rounded-md">
                      {dest.category}
                    </span>
                    <span className="font-mono text-xs font-black tracking-widest text-white/90">
                      {dest.code}
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl font-extrabold tracking-tight">
                      {dest.city}
                    </h2>
                    <p className="text-xs text-white/90 font-medium italic mt-1">
                      “{dest.tagline}”
                    </p>
                  </div>
                </div>

                {/* Content description & highlights */}
                <div className="p-6 space-y-5">
                  <p className="text-xs text-[#465B71] leading-relaxed">
                    {dest.description}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2 border-t border-neutral-100">
                    <span className="text-[11px] font-bold text-[#263A79] uppercase tracking-wider block">
                      {t('Qué descubrir:', 'Key highlights:')}
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#465B71]">
                      {dest.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-[#5F429A] font-bold">·</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Local Gastronomy */}
                  <div className="space-y-1.5 pt-2 border-t border-neutral-100 bg-[#FAF9FD] p-3 rounded-xl">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5F429A] uppercase tracking-wider">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>{t('Sabores autóctonos:', 'Local gastronomy:')}</span>
                    </div>
                    <div className="text-[11px] text-[#465B71]">
                      {dest.localFood.join(' · ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer with Flight Duration & CTA */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#465B71] uppercase tracking-wider block">
                      {t('Vuelo directo', 'Direct flight')} ({dest.flightTimeFromCGK})
                    </span>
                    <span className="text-base font-extrabold text-[#263A79] tabular-nums">
                      {t('Desde', 'From')} {formatPrice(dest.priceFromUSD)}
                    </span>
                  </div>

                  <button
                    onClick={() => selectDestinationForSearch(dest.code)}
                    className="px-5 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Plane className="w-3.5 h-3.5" />
                    <span>{t(`VOLÁ A ${dest.city.toUpperCase()}`, `FLY TO ${dest.city.toUpperCase()}`)}</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
