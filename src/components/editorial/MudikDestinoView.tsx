import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EDITORIAL_ARTICLES } from '../../data/mockData';
import { EditorialArticle } from '../../types';
import { BookOpen, Clock, MapPin, Sparkles, HeartHandshake, Share2, ArrowLeft } from 'lucide-react';

export const MudikDestinoView: React.FC = () => {
  const { t, navigateTo } = useApp();

  const [activeArticle, setActiveArticle] = useState<EditorialArticle>(EDITORIAL_ARTICLES[0]);

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Magazine Masthead */}
        <div className="text-center space-y-3 pb-8 border-b border-neutral-200 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5F429A]/10 text-[#5F429A] text-xs font-bold tracking-widest uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>MUDIK DESTINO · CRÓNICAS Y GUÍAS LOCALES</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-black text-[#263A79] tracking-tight">
            ATERRIZÁ. EMPEZÁ A DESCUBRIR.
          </h1>

          <p className="text-sm sm:text-base text-[#465B71] leading-relaxed italic max-w-2xl mx-auto">
            {t(
              'Ensayos culturales, rincones secretos y gastronomía comunitaria narrados desde el respeto por las tradiciones vivas de Indonesia.',
              'Cultural essays, secluded temples, and traditional foodways documented with reverence for Indonesia’s living heritage.'
            )}
          </p>
        </div>

        {/* Article Selector Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {EDITORIAL_ARTICLES.map((art) => (
            <button
              key={art.id}
              onClick={() => setActiveArticle(art)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                activeArticle.id === art.id
                  ? 'bg-[#263A79] text-white shadow-md'
                  : 'bg-white text-[#465B71] hover:text-[#263A79] border border-neutral-200'
              }`}
            >
              {art.location.split(',')[0]} · {art.tag}
            </button>
          ))}
        </div>

        {/* Featured Editorial Article Presentation */}
        <article className="bg-white rounded-3xl p-8 sm:p-14 border border-neutral-200/90 shadow-sm space-y-8 animate-in fade-in duration-200">
          
          {/* Article Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#5F429A] font-bold uppercase tracking-wider">
              <span>{activeArticle.tag}</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#465B71]">
                <MapPin className="w-3.5 h-3.5 text-[#5F429A]" />
                {activeArticle.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#465B71]">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-black text-[#191A23] tracking-tight leading-tight">
              {activeArticle.title}
            </h2>

            <p className="text-base sm:text-lg text-[#465B71] font-medium leading-relaxed">
              {activeArticle.subtitle}
            </p>

            <div className="pt-2 text-xs text-[#465B71] border-b border-neutral-100 pb-4">
              Por <strong className="text-[#191A23]">{activeArticle.author}</strong>
            </div>
          </div>

          {/* Pull Quote */}
          <div className="bg-[#FAF9FD] border-l-4 border-[#5F429A] p-6 rounded-r-2xl my-6 italic text-[#263A79] text-base font-medium">
            “{activeArticle.excerpt}”
          </div>

          {/* Main Prose Paragraphs */}
          <div className="space-y-6 text-sm text-[#334155] leading-relaxed max-w-3xl">
            {activeArticle.contentParagraphs.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-extrabold first-letter:float-left first-letter:mr-2 first-letter:text-[#5F429A]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Cultural Etiquette & Travel Tip Box */}
          <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200 space-y-2 mt-8">
            <div className="flex items-center gap-2 text-xs font-bold text-[#5F429A] uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 text-[#5F429A]" />
              <span>{t('ETIQUETA CULTURAL Y VIAJE RESPETUOSO', 'CULTURAL ETIQUETTE & MINDFUL TRAVEL')}</span>
            </div>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {activeArticle.culturalTip}
            </p>
          </div>

          {/* Article Footer with booking CTA */}
          <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-[#465B71]">
              {t('¿Inspirado para tu próximo viaje?', 'Inspired for your next voyage?')}
            </span>

            <button
              onClick={() => {
                navigateTo('destinations');
              }}
              className="px-6 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              {t('VER VUELOS A ESTE DESTINO', 'EXPLORE FLIGHTS TO THIS DESTINATION')}
            </button>
          </div>

        </article>

      </div>
    </div>
  );
};
