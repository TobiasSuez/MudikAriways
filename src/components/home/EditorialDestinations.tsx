import React from 'react';
import { useApp } from '../../context/AppContext';
import { DESTINATIONS, EDITORIAL_ARTICLES } from '../../data/mockData';
import { ArrowRight, Plane, BookOpen, Clock, HeartHandshake } from 'lucide-react';

export const EditorialDestinations: React.FC = () => {
  const { t, formatPrice, selectDestinationForSearch, navigateTo } = useApp();

  return (
    <div className="py-20 bg-[#FAF9FD] space-y-24">
      
      {/* SECTION 1: DESTACADOS DE INDONESIA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
              {t('RED DE DESTINOS', 'DESTINATION NETWORK')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
              {t('Indonesia a tu alcance.', 'Indonesia within your reach.')}
            </h2>
            <p className="text-sm text-[#465B71] leading-relaxed">
              {t(
                'Desde templos volcánicos y playas remotas hasta la vitalidad cosmopolita de Java. Descubrí nuestras rutas más populares.',
                'From volcanic temples and secluded bays to the urban pulse of Java. Discover our most popular direct routes.'
              )}
            </p>
          </div>

          <button
            onClick={() => navigateTo('destinations')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#5F429A] hover:text-[#45469C] hover:gap-3 transition-all uppercase tracking-wider self-start md:self-end"
          >
            <span>{t('Explorar todos los destinos', 'Explore all destinations')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Featured Destination Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-10">
          {DESTINATIONS.slice(0, 6).map((dest) => (
            <div
              key={dest.id}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Header with fallback gradient */}
                <div className={`h-52 relative overflow-hidden bg-gradient-to-br ${dest.gradient} p-6 flex flex-col justify-between text-white`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest uppercase bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md">
                      {dest.category}
                    </span>
                    <span className="text-xs font-bold tracking-widest text-white/90">
                      {dest.code}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight">
                      {dest.city}
                    </h3>
                    <p className="text-xs text-white/85 font-medium italic mt-0.5">
                      “{dest.tagline}”
                    </p>
                  </div>
                </div>

                {/* Content description */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-[#465B71] leading-relaxed line-clamp-3">
                    {dest.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-neutral-100">
                    <span className="text-[11px] font-bold text-[#263A79] tracking-wider uppercase block">
                      {t('Imperdibles locales:', 'Local highlights:')}
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-xs text-[#465B71]">
                      {dest.highlights.slice(0, 2).map((h, i) => (
                        <span key={i} className="inline-flex items-center gap-1">
                          <span className="text-[#5F429A]">·</span> {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Price & CTA */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-neutral-100 mt-2 bg-[#FAF9FD]/50">
                <div>
                  <span className="text-[10px] text-[#465B71] block uppercase tracking-wider">
                    {t('Desde Jakarta', 'From Jakarta')}
                  </span>
                  <div className="font-extrabold text-[#263A79] text-base tabular-nums">
                    {formatPrice(dest.priceFromUSD)}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => selectDestinationForSearch(dest.code)}
                  className="px-4 py-2 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>{t(`VOLÁ A ${dest.city.toUpperCase()}`, `FLY TO ${dest.city.toUpperCase()}`)}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* SECTION 2: MUDIK DESTINO (Editorial Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#263A79] to-[#191A23] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold tracking-wider uppercase">
                <BookOpen className="w-3.5 h-3.5 text-[#9D7AE2]" />
                <span>MUDIK DESTINO · PUBLICACIÓN EDITORIAL</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
                ATERRIZÁ. EMPEZÁ A DESCUBRIR.
              </h2>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {t(
                  'Historias, gastronomía y saberes tradicionales curados por escritores y cronistas indonesios. Para quienes viajan no solo para llegar, sino para comprender.',
                  'Stories, food traditions, and cultural heritage curated by local Indonesian chroniclers. For travelers who seek depth, not just transit.'
                )}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('mudik-destino')}
                  className="px-6 py-3 bg-white text-[#263A79] hover:bg-neutral-100 text-xs font-bold tracking-wider rounded-xl transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>{t('LEER REVISTA MUDIK DESTINO', 'READ MUDIK DESTINO')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Articles Teaser Carousel/Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDITORIAL_ARTICLES.slice(0, 2).map((art) => (
                <div
                  key={art.id}
                  onClick={() => navigateTo('mudik-destino')}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/10 p-5 rounded-2xl transition-all cursor-pointer space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#9D7AE2] font-semibold">
                      <span>{art.tag}</span>
                      <span className="flex items-center gap-1 text-neutral-300">
                        <Clock className="w-3 h-3" />
                        {art.readTime}
                      </span>
                    </div>

                    <h4 className="font-bold text-base text-white leading-snug">
                      {art.title}
                    </h4>

                    <p className="text-xs text-neutral-300 line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-400 flex items-center justify-between">
                    <span>{art.location}</span>
                    <span className="text-[#9D7AE2] font-bold">Leer más →</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: BRAND PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('FILOSOFÍA MUDIK', 'THE MUDIK ETHOS')}
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#263A79]">
            {t('Nuestros pilares fundamentales', 'Our core brand pillars')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-display font-extrabold text-xl">
              01
            </div>
            <h3 className="font-bold text-lg text-[#263A79] tracking-tight">TRADICIÓN</h3>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Honramos el concepto de Mudik: el viaje sagrado de regreso a las raíces familiares y las memorias compartidas en cada rincón del archipiélago.',
                'We honor the sacred tradition of Mudik: the journey back to family roots, shared memories, and ancestral heritage.'
              )}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#263A79]/10 text-[#263A79] flex items-center justify-center font-display font-extrabold text-xl">
              02
            </div>
            <h3 className="font-bold text-lg text-[#263A79] tracking-tight">CONEXIÓN</h3>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Acercamos más de 17.000 islas mediante vuelos directos accesibles, uniendo a padres con hijos, estudiantes con sus pueblos y creadores con sus comunidades.',
                'Connecting thousands of islands with accessible direct flights, linking families, workers, students, and island creators.'
              )}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-neutral-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#45469C]/10 text-[#45469C] flex items-center justify-center font-display font-extrabold text-xl">
              03
            </div>
            <h3 className="font-bold text-lg text-[#263A79] tracking-tight">DESCUBRIMIENTO</h3>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Invitamos a mirar más allá de los circuitos tradicionales para maravillarse con la inmensidad cultural de Flores, Sumatra, Célebes y las islas menores.',
                'Inviting travelers to look beyond cliché paths to encounter the breathtaking diversity of Flores, Sumatra, Sulawesi, and beyond.'
              )}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
