import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Plane, 
  Menu, 
  X, 
  ChevronDown, 
  User, 
  Search, 
  Luggage, 
  Clock, 
  Compass, 
  Sparkles, 
  Coffee, 
  HelpCircle, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { PageView } from '../../types';

export const Navbar: React.FC = () => {
  const { 
    language, 
    setLanguage, 
    currency, 
    setCurrency, 
    currentPage, 
    navigateTo, 
    currentUser, 
    setIsAuthModalOpen,
    t 
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    navigateTo(page);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Single text element Brand Zone */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNavClick('home')} 
              className="group flex items-center gap-3 text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F429A] via-[#45469C] to-[#263A79] flex items-center justify-center text-white shadow-md shadow-[#5F429A]/15 group-hover:scale-105 transition-transform">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold tracking-tight text-xl text-[#263A79] group-hover:text-[#5F429A] transition-colors leading-none">
                  MUDIK<span className="text-[#5F429A] ml-1">AIRWAYS</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-medium text-[#465B71] mt-1 hidden sm:block">
                  Indonesia Low-Cost
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-6 Clean Text Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* VIAJAR */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('viajar')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleNavClick('destinations')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  currentPage === 'destinations' || currentPage === 'mudik-destino'
                    ? 'text-[#5F429A] border-b-2 border-[#5F429A]'
                    : 'text-[#263A79] hover:text-[#5F429A]'
                }`}
              >
                <span>{t('VIAJAR', 'TRAVEL')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeDropdown === 'viajar' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 py-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button 
                    onClick={() => handleNavClick('destinations')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Compass className="w-4 h-4 text-[#5F429A]" />
                    <div>
                      <div className="font-medium">{t('Destinos en Indonesia', 'Destinations')}</div>
                      <div className="text-xs text-[#465B71]">{t('Bali, Lombok, Yogyakarta y más', 'Bali, Lombok & more')}</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavClick('mudik-destino')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#5F429A]" />
                    <div>
                      <div className="font-medium">MUDIK DESTINO</div>
                      <div className="text-xs text-[#465B71]">{t('Guías culturales y gastronomía', 'Cultural guides & food')}</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavClick('flight-schedules')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <CalendarDays className="w-4 h-4 text-[#5F429A]" />
                    <div>
                      <div className="font-medium">{t('Mapa de Rutas y Horarios', 'Route Map & Timetable')}</div>
                      <div className="text-xs text-[#465B71]">{t('Red de vuelos interislas', 'Inter-island flight network')}</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* TU VIAJE */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('tu-viaje')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleNavClick('manage-booking')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  currentPage === 'manage-booking' || currentPage === 'check-in' || currentPage === 'flight-status'
                    ? 'text-[#5F429A] border-b-2 border-[#5F429A]'
                    : 'text-[#263A79] hover:text-[#5F429A]'
                }`}
              >
                <span>{t('TU VIAJE', 'YOUR TRIP')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeDropdown === 'tu-viaje' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 py-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button 
                    onClick={() => handleNavClick('manage-booking')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Search className="w-4 h-4 text-[#263A79]" />
                    <div>
                      <div className="font-medium">{t('Gestionar reserva', 'Manage booking')}</div>
                      <div className="text-xs text-[#465B71]">{t('Asientos, equipaje y cambios', 'Seats, baggage & changes')}</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavClick('check-in')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-medium">{t('Check-in Online', 'Online Check-in')}</div>
                      <div className="text-xs text-[#465B71]">{t('Tarjeta de embarque digital', 'Digital boarding pass')}</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavClick('flight-status')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Clock className="w-4 h-4 text-[#45469C]" />
                    <div>
                      <div className="font-medium">{t('Estado del vuelo', 'Flight Status')}</div>
                      <div className="text-xs text-[#465B71]">{t('Salidas y llegadas en vivo', 'Live departures & arrivals')}</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* A BORDO */}
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('a-bordo')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button 
                onClick={() => handleNavClick('onboard')}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                  currentPage === 'onboard' || currentPage === 'baggage' || currentPage === 'mudik-lounge'
                    ? 'text-[#5F429A] border-b-2 border-[#5F429A]'
                    : 'text-[#263A79] hover:text-[#5F429A]'
                }`}
              >
                <span>{t('A BORDO', 'ONBOARD')}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {activeDropdown === 'a-bordo' && (
                <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-neutral-100 py-3 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <button 
                    onClick={() => handleNavClick('onboard')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Plane className="w-4 h-4 text-[#5F429A]" />
                    <div>
                      <div className="font-medium">{t('Experiencia Mudik', 'Mudik Experience')}</div>
                      <div className="text-xs text-[#465B71]">{t('Comodidad y gastronomía', 'Comfort & onboard menu')}</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavClick('baggage')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Luggage className="w-4 h-4 text-[#465B71]" />
                    <div>
                      <div className="font-medium">{t('Equipaje', 'Baggage')}</div>
                      <div className="text-xs text-[#465B71]">{t('Políticas de cabina y bodega', 'Carry-on & checked policy')}</div>
                    </div>
                  </button>
                  <button 
                    onClick={() => handleNavClick('mudik-lounge')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm text-[#191A23] hover:bg-[#FAF9FD] hover:text-[#5F429A] transition-colors"
                  >
                    <Coffee className="w-4 h-4 text-[#263A79]" />
                    <div>
                      <div className="font-medium">Mudik Lounge</div>
                      <div className="text-xs text-[#465B71]">{t('Salones VIP en Jakarta y Bali', 'VIP Lounges in CGK & DPS')}</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* MUDIK POINTS */}
            <button 
              onClick={() => handleNavClick('mudik-points')}
              className={`px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                currentPage === 'mudik-points'
                  ? 'text-[#5F429A] border-b-2 border-[#5F429A]'
                  : 'text-[#263A79] hover:text-[#5F429A]'
              }`}
            >
              MUDIK POINTS
            </button>

            {/* AYUDA */}
            <button 
              onClick={() => handleNavClick('help')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${
                currentPage === 'help'
                  ? 'text-[#5F429A] border-b-2 border-[#5F429A]'
                  : 'text-[#263A79] hover:text-[#5F429A]'
              }`}
            >
              <HelpCircle className="w-4 h-4 opacity-70" />
              <span>{t('AYUDA', 'HELP')}</span>
            </button>

          </nav>

          {/* Zone 3: 1-2 Primary Actions + Local Switchers */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Language & Currency Segments */}
            <div className="flex items-center gap-1 text-xs font-semibold bg-neutral-100/90 rounded-lg p-1 text-[#465B71]">
              <button 
                onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
                className="px-2 py-1 rounded bg-white text-[#263A79] shadow-xs hover:text-[#5F429A] transition-colors"
                title={t('Cambiar idioma', 'Switch language')}
              >
                {language}
              </button>
              <span className="text-neutral-300">/</span>
              <button 
                onClick={() => setCurrency(currency === 'USD' ? 'IDR' : 'USD')}
                className="px-2 py-1 rounded bg-white text-[#263A79] shadow-xs hover:text-[#5F429A] transition-colors"
                title={t('Cambiar moneda', 'Switch currency')}
              >
                {currency}
              </button>
            </div>

            {/* User Login / Account */}
            {currentUser ? (
              <button 
                onClick={() => handleNavClick('account')}
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#263A79] hover:text-[#5F429A] hover:bg-[#FAF9FD] rounded-lg transition-colors border border-neutral-200"
              >
                <div className="w-6 h-6 rounded-full bg-[#5F429A] text-white flex items-center justify-center text-[11px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="max-w-[90px] truncate">{currentUser.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#263A79] hover:text-[#5F429A] transition-colors tracking-wide"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('INICIAR SESIÓN', 'SIGN IN')}</span>
              </button>
            )}

            {/* Primary Action: RESERVAR */}
            <button 
              onClick={() => {
                if (currentPage !== 'home') {
                  navigateTo('home');
                }
                setTimeout(() => {
                  const el = document.getElementById('booking-widget-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="px-5 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold tracking-wider rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              {t('RESERVAR', 'BOOK FLIGHT')}
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button 
              onClick={() => setLanguage(language === 'ES' ? 'EN' : 'ES')}
              className="px-2 py-1 text-xs font-bold rounded bg-neutral-100 text-[#263A79]"
            >
              {language}
            </button>
            <button 
              onClick={() => setCurrency(currency === 'USD' ? 'IDR' : 'USD')}
              className="px-2 py-1 text-xs font-bold rounded bg-neutral-100 text-[#263A79]"
            >
              {currency}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#263A79] hover:bg-neutral-100 transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[11px] font-bold tracking-wider text-[#465B71] uppercase px-2 py-1">
              {t('VIAJAR', 'TRAVEL')}
            </div>
            <button 
              onClick={() => handleNavClick('destinations')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Destinos en Indonesia', 'Destinations')}
            </button>
            <button 
              onClick={() => handleNavClick('mudik-destino')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              MUDIK DESTINO {t('(Guías culturales)', '(Travel Magazine)')}
            </button>
            <button 
              onClick={() => handleNavClick('flight-schedules')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Mapa de Rutas y Horarios', 'Route Map & Timetable')}
            </button>
          </div>

          <div className="space-y-1 pt-2 border-t border-neutral-100">
            <div className="text-[11px] font-bold tracking-wider text-[#465B71] uppercase px-2 py-1">
              {t('TU VIAJE', 'YOUR TRIP')}
            </div>
            <button 
              onClick={() => handleNavClick('manage-booking')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Gestionar reserva', 'Manage booking')}
            </button>
            <button 
              onClick={() => handleNavClick('check-in')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Check-in Online', 'Online Check-in')}
            </button>
            <button 
              onClick={() => handleNavClick('flight-status')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Estado del vuelo en vivo', 'Live Flight Status')}
            </button>
          </div>

          <div className="space-y-1 pt-2 border-t border-neutral-100">
            <div className="text-[11px] font-bold tracking-wider text-[#465B71] uppercase px-2 py-1">
              {t('A BORDO & SERVICIOS', 'ONBOARD & SERVICES')}
            </div>
            <button 
              onClick={() => handleNavClick('onboard')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Experiencia Mudik a Bordo', 'Mudik Onboard Experience')}
            </button>
            <button 
              onClick={() => handleNavClick('baggage')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Equipaje y Políticas', 'Baggage Policies')}
            </button>
            <button 
              onClick={() => handleNavClick('mudik-lounge')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              Mudik Lounge
            </button>
            <button 
              onClick={() => handleNavClick('mudik-points')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#5F429A] font-semibold hover:bg-[#FAF9FD] rounded-lg"
            >
              MUDIK POINTS ({currentUser ? `${currentUser.points} pts` : t('Programa de Puntos', 'Loyalty Program')})
            </button>
            <button 
              onClick={() => handleNavClick('help')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-[#191A23] hover:bg-[#FAF9FD] rounded-lg"
            >
              {t('Centro de Ayuda / FAQ', 'Help Center / FAQ')}
            </button>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex flex-col gap-2">
            {currentUser ? (
              <button 
                onClick={() => handleNavClick('account')}
                className="w-full py-2.5 text-center text-sm font-semibold text-[#263A79] border border-neutral-300 rounded-lg"
              >
                {t('Mi Perfil', 'My Account')} ({currentUser.name})
              </button>
            ) : (
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-[#263A79] border border-neutral-300 rounded-lg"
              >
                {t('Iniciar sesión', 'Sign in')}
              </button>
            )}

            <button 
              onClick={() => {
                handleNavClick('home');
                setTimeout(() => {
                  const el = document.getElementById('booking-widget-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full py-3 bg-[#5F429A] text-white text-sm font-bold tracking-wider rounded-lg shadow-sm"
            >
              {t('RESERVAR VUELO', 'BOOK FLIGHT')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
