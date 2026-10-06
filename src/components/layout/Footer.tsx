import React from 'react';
import { useApp } from '../../context/AppContext';
import { Plane, Globe, ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, language, setLanguage, currency, setCurrency, t } = useApp();

  return (
    <footer className="bg-[#191A23] text-white pt-16 pb-12 border-t border-[#263A79]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header & Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5F429A] to-[#263A79] flex items-center justify-center text-white">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                MUDIK<span className="text-[#9D7AE2] ml-1">AIRWAYS</span>
              </span>
            </div>
            
            <p className="text-xl font-medium tracking-tight text-neutral-200">
              “TODO A UN VUELO DE DISTANCIA.”
            </p>
            
            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              {t(
                'Mudik significa regresar a casa y reconectar con la familia, los orígenes y las raíces. Conectamos los archipiélagos de Indonesia con tarifas honestas, calidez contemporánea y puntualidad garantizada.',
                'Mudik means returning home and reconnecting with family, origins, and roots. Connecting the Indonesian archipelago with honest low fares, contemporary warmth, and verified punctuality.'
              )}
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold tracking-wider text-neutral-300 pt-2">
              <span>TRADICIÓN</span>
              <span>·</span>
              <span>CONEXIÓN</span>
              <span>·</span>
              <span>DESCUBRIMIENTO</span>
            </div>
          </div>

          {/* Quick Pillars & Trust Badges */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 bg-neutral-900/60 p-6 rounded-2xl border border-neutral-800/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#9D7AE2]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-semibold text-xs tracking-wider uppercase text-white">{t('Flota Segura', 'Modern Fleet')}</span>
              </div>
              <p className="text-xs text-neutral-400">
                {t('Airbus A320 y A320neo con mantenimiento riguroso y certificación internacional.', 'Airbus A320 & neo fleet with rigorous certified maintenance.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#9D7AE2]">
                <Heart className="w-5 h-5" />
                <span className="font-semibold text-xs tracking-wider uppercase text-white">{t('Calidez Mudik', 'Indonesian Care')}</span>
              </div>
              <p className="text-xs text-neutral-400">
                {t('Hospitalidad genuina inspirada en el respeto comunitario indonesio (gotong royong).', 'Authentic hospitality inspired by Indonesian communal care.')}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#9D7AE2]">
                <Award className="w-5 h-5" />
                <span className="font-semibold text-xs tracking-wider uppercase text-white">Mudik Points</span>
              </div>
              <p className="text-xs text-neutral-400">
                {t('Puntos reales por cada viaje, sin letra chica y canjeables en toda la red.', 'Real points on every journey, flexible redemption across our network.')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-12 border-b border-neutral-800 text-xs">
          
          {/* MUDIK AIRWAYS */}
          <div className="space-y-3">
            <h4 className="font-bold tracking-wider text-white uppercase text-[11px]">{t('Sobre Mudik', 'About Mudik')}</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  {t('Nuestra Historia', 'Our Story')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('destinations')} className="hover:text-white transition-colors">
                  {t('Sostenibilidad e Islas', 'Sustainability')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors">
                  {t('Trabajá con nosotros', 'Careers')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors">
                  {t('Prensa y Novedades', 'Press & Media')}
                </button>
              </li>
            </ul>
          </div>

          {/* VIAJAR */}
          <div className="space-y-3">
            <h4 className="font-bold tracking-wider text-white uppercase text-[11px]">{t('Viajar', 'Travel')}</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => navigateTo('destinations')} className="hover:text-white transition-colors">
                  {t('Destinos en Indonesia', 'Destinations')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mudik-destino')} className="hover:text-white transition-colors">
                  {t('MUDIK DESTINO (Guías)', 'MUDIK DESTINO')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('flight-schedules')} className="hover:text-white transition-colors">
                  {t('Horarios y Rutas', 'Flight Schedules')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('flight-status')} className="hover:text-white transition-colors">
                  {t('Estado del Vuelo', 'Flight Status')}
                </button>
              </li>
            </ul>
          </div>

          {/* TU VIAJE */}
          <div className="space-y-3">
            <h4 className="font-bold tracking-wider text-white uppercase text-[11px]">{t('Tu Viaje', 'Your Trip')}</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => navigateTo('manage-booking')} className="hover:text-white transition-colors">
                  {t('Gestionar Reserva', 'Manage Booking')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('check-in')} className="hover:text-white transition-colors">
                  {t('Check-in Online', 'Online Check-in')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('baggage')} className="hover:text-white transition-colors">
                  {t('Política de Equipaje', 'Baggage Policy')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mudik-lounge')} className="hover:text-white transition-colors">
                  {t('Salones Mudik Lounge', 'Mudik Lounges')}
                </button>
              </li>
            </ul>
          </div>

          {/* MUDIK POINTS */}
          <div className="space-y-3">
            <h4 className="font-bold tracking-wider text-white uppercase text-[11px]">MUDIK POINTS</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => navigateTo('mudik-points')} className="hover:text-white transition-colors">
                  {t('Beneficios del Programa', 'Program Benefits')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mudik-points')} className="hover:text-white transition-colors">
                  {t('Categorías y Niveles', 'Membership Tiers')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mudik-points')} className="hover:text-white transition-colors">
                  {t('Canjear Vuelos y Extras', 'Redeem Points')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('mudik-points')} className="hover:text-white transition-colors">
                  {t('Reclamar Puntos Pendientes', 'Claim Missing Points')}
                </button>
              </li>
            </ul>
          </div>

          {/* AYUDA */}
          <div className="space-y-3 col-span-2 md:col-span-1">
            <h4 className="font-bold tracking-wider text-white uppercase text-[11px]">{t('Ayuda', 'Help')}</h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors">
                  {t('Preguntas Frecuentes', 'FAQ Center')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors">
                  {t('Contacto y Soporte', 'Contact & Support')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors">
                  {t('Asistencia Especial', 'Accessibility Support')}
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('help')} className="hover:text-white transition-colors">
                  {t('Términos y Condiciones', 'Terms of Carriage')}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Switchers and Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-6">
            <span>© 2026 PT Mudik Nusantara Airways Tbk. Todos los derechos reservados.</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">Prototipo Oficial de Aerolínea</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <button 
                onClick={() => setLanguage('ES')} 
                className={`transition-colors ${language === 'ES' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
              >
                Español
              </button>
              <span>/</span>
              <button 
                onClick={() => setLanguage('EN')} 
                className={`transition-colors ${language === 'EN' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
              >
                English
              </button>
            </div>

            <div className="flex items-center gap-2 border-l border-neutral-700 pl-4">
              <button 
                onClick={() => setCurrency('USD')} 
                className={`transition-colors ${currency === 'USD' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
              >
                USD ($)
              </button>
              <span>/</span>
              <button 
                onClick={() => setCurrency('IDR')} 
                className={`transition-colors ${currency === 'IDR' ? 'text-white font-bold' : 'hover:text-neutral-300'}`}
              >
                IDR (Rp)
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
