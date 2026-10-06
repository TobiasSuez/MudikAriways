import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AIRPORTS } from '../../data/mockData';
import { Airport, TripType, CabinClass } from '../../types';
import { 
  PlaneTakeoff, 
  PlaneLanding, 
  Calendar, 
  Users, 
  ArrowLeftRight, 
  Sparkles, 
  ChevronDown, 
  Search, 
  Tag, 
  Check,
  Armchair
} from 'lucide-react';

export const FlightSearchWidget: React.FC = () => {
  const {
    originAirport,
    setOriginAirport,
    destinationAirport,
    setDestinationAirport,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
    setTripType,
    passengers,
    setPassengers,
    cabinClass,
    setCabinClass,
    promoCode,
    setPromoCode,
    isUsingPoints,
    setIsUsingPoints,
    swapAirports,
    handleSearchFlights,
    t
  } = useApp();

  // Dropdown popover open states
  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [isClassOpen, setIsClassOpen] = useState(false);
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Search input filters
  const [originFilter, setOriginFilter] = useState('');
  const [destFilter, setDestFilter] = useState('');

  const widgetRef = useRef<HTMLDivElement>(null);

  // Click outside listener to close popovers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOriginOpen(false);
        setIsDestOpen(false);
        setIsPassengersOpen(false);
        setIsClassOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  const filteredOriginAirports = AIRPORTS.filter(
    a => a.city.toLowerCase().includes(originFilter.toLowerCase()) ||
         a.code.toLowerCase().includes(originFilter.toLowerCase()) ||
         a.name.toLowerCase().includes(originFilter.toLowerCase())
  );

  const filteredDestAirports = AIRPORTS.filter(
    a => a.city.toLowerCase().includes(destFilter.toLowerCase()) ||
         a.code.toLowerCase().includes(destFilter.toLowerCase()) ||
         a.name.toLowerCase().includes(destFilter.toLowerCase())
  );

  return (
    <div id="booking-widget-section" ref={widgetRef} className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200/80 overflow-visible relative z-20">
      
      {/* Top Main Tabs: RESERVAR VUELO vs CANJEAR POINTS */}
      <div className="flex border-b border-neutral-200 bg-neutral-50/70 rounded-t-2xl px-3 pt-3">
        <button
          onClick={() => setIsUsingPoints(false)}
          className={`flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider rounded-t-xl transition-all ${
            !isUsingPoints
              ? 'bg-white text-[#263A79] border-t-2 border-t-[#5F429A] shadow-xs'
              : 'text-[#465B71] hover:text-[#263A79]'
          }`}
        >
          <PlaneTakeoff className="w-4 h-4 text-[#5F429A]" />
          <span>{t('RESERVAR VUELO', 'BOOK FLIGHT')}</span>
        </button>

        <button
          onClick={() => setIsUsingPoints(true)}
          className={`flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold tracking-wider rounded-t-xl transition-all ${
            isUsingPoints
              ? 'bg-white text-[#5F429A] border-t-2 border-t-[#5F429A] shadow-xs'
              : 'text-[#465B71] hover:text-[#5F429A]'
          }`}
        >
          <Sparkles className="w-4 h-4 text-[#5F429A]" />
          <span>{t('CANJEAR POINTS', 'REDEEM POINTS')}</span>
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-5">
        
        {/* Sub-controls: Trip Type & Class Segmented Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
          
          {/* Trip Type */}
          <div className="flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-semibold text-[#465B71]">
            <button
              onClick={() => setTripType('roundTrip')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tripType === 'roundTrip'
                  ? 'bg-white text-[#263A79] shadow-xs font-bold'
                  : 'hover:text-[#263A79]'
              }`}
            >
              {t('Ida y vuelta', 'Round trip')}
            </button>
            <button
              onClick={() => setTripType('oneWay')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tripType === 'oneWay'
                  ? 'bg-white text-[#263A79] shadow-xs font-bold'
                  : 'hover:text-[#263A79]'
              }`}
            >
              {t('Solo ida', 'One way')}
            </button>
            <button
              onClick={() => setTripType('multiCity')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tripType === 'multiCity'
                  ? 'bg-white text-[#263A79] shadow-xs font-bold'
                  : 'hover:text-[#263A79]'
              }`}
            >
              {t('Multidestino', 'Multi-city')}
            </button>
          </div>

          {/* Quick Selectors: Passengers & Cabin Class */}
          <div className="flex items-center gap-3">
            
            {/* Passengers Popover Trigger */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsPassengersOpen(!isPassengersOpen);
                  setIsClassOpen(false);
                  setIsOriginOpen(false);
                  setIsDestOpen(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#263A79] bg-neutral-100 hover:bg-neutral-200/70 rounded-xl transition-colors"
              >
                <Users className="w-3.5 h-3.5 text-[#5F429A]" />
                <span>
                  {totalPassengers} {totalPassengers === 1 ? t('Pasajero', 'Passenger') : t('Pasajeros', 'Passengers')}
                </span>
                <ChevronDown className="w-3 h-3 text-[#465B71]" />
              </button>

              {isPassengersOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-neutral-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="space-y-4">
                    
                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#191A23]">{t('Adultos', 'Adults')}</div>
                        <div className="text-[11px] text-[#465B71]">12+ {t('años', 'years')}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPassengers(p => ({ ...p, adults: Math.max(1, p.adults - 1) }))}
                          className="w-7 h-7 rounded-lg border border-neutral-300 flex items-center justify-center font-bold text-[#263A79] hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-sm tabular-nums">{passengers.adults}</span>
                        <button
                          type="button"
                          onClick={() => setPassengers(p => ({ ...p, adults: Math.min(9, p.adults + 1) }))}
                          className="w-7 h-7 rounded-lg border border-neutral-300 flex items-center justify-center font-bold text-[#263A79] hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#191A23]">{t('Niños', 'Children')}</div>
                        <div className="text-[11px] text-[#465B71]">2 - 11 {t('años', 'years')}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPassengers(p => ({ ...p, children: Math.max(0, p.children - 1) }))}
                          className="w-7 h-7 rounded-lg border border-neutral-300 flex items-center justify-center font-bold text-[#263A79] hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-sm tabular-nums">{passengers.children}</span>
                        <button
                          type="button"
                          onClick={() => setPassengers(p => ({ ...p, children: Math.min(6, p.children + 1) }))}
                          className="w-7 h-7 rounded-lg border border-neutral-300 flex items-center justify-center font-bold text-[#263A79] hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-[#191A23]">{t('Bebés', 'Infants')}</div>
                        <div className="text-[11px] text-[#465B71]">&lt; 2 {t('años', 'years')}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setPassengers(p => ({ ...p, infants: Math.max(0, p.infants - 1) }))}
                          className="w-7 h-7 rounded-lg border border-neutral-300 flex items-center justify-center font-bold text-[#263A79] hover:bg-neutral-100"
                        >
                          -
                        </button>
                        <span className="w-5 text-center font-bold text-sm tabular-nums">{passengers.infants}</span>
                        <button
                          type="button"
                          onClick={() => setPassengers(p => ({ ...p, infants: Math.min(passengers.adults, p.infants + 1) }))}
                          className="w-7 h-7 rounded-lg border border-neutral-300 flex items-center justify-center font-bold text-[#263A79] hover:bg-neutral-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsPassengersOpen(false)}
                      className="w-full py-2 bg-[#5F429A] text-white text-xs font-bold rounded-lg hover:bg-[#45469C] transition-colors"
                    >
                      {t('Confirmar selección', 'Done')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cabin Class Popover */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsClassOpen(!isClassOpen);
                  setIsPassengersOpen(false);
                  setIsOriginOpen(false);
                  setIsDestOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#263A79] bg-neutral-100 hover:bg-neutral-200/70 rounded-xl transition-colors"
              >
                <Armchair className="w-3.5 h-3.5 text-[#5F429A]" />
                <span>{cabinClass}</span>
                <ChevronDown className="w-3 h-3 text-[#465B71]" />
              </button>

              {isClassOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-neutral-200 py-1.5 z-50">
                  <button
                    type="button"
                    onClick={() => {
                      setCabinClass('Economy');
                      setIsClassOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-neutral-50 ${
                      cabinClass === 'Economy' ? 'text-[#5F429A] font-bold' : 'text-[#191A23]'
                    }`}
                  >
                    <span>Economy</span>
                    {cabinClass === 'Economy' && <Check className="w-4 h-4 text-[#5F429A]" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCabinClass('Premium');
                      setIsClassOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left hover:bg-neutral-50 ${
                      cabinClass === 'Premium' ? 'text-[#5F429A] font-bold' : 'text-[#191A23]'
                    }`}
                  >
                    <span>Premium Economy</span>
                    {cabinClass === 'Premium' && <Check className="w-4 h-4 text-[#5F429A]" />}
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Core Input Grid: Origin, Swap, Destination, Outbound Date, Inbound Date */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
          
          {/* Origin Airport (Col 1-4) */}
          <div className="md:col-span-3 relative">
            <label className="block text-[11px] font-bold tracking-wider text-[#465B71] uppercase mb-1">
              {t('DESDE', 'FROM')}
            </label>
            <button
              type="button"
              onClick={() => {
                setIsOriginOpen(!isOriginOpen);
                setIsDestOpen(false);
                setIsPassengersOpen(false);
                setIsClassOpen(false);
              }}
              className="w-full h-14 px-3.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-300 rounded-xl text-left flex items-center justify-between transition-colors focus:ring-2 focus:ring-[#5F429A]/30 focus:border-[#5F429A]"
            >
              <div className="overflow-hidden">
                <div className="font-extrabold text-base text-[#191A23] flex items-center gap-2">
                  <span>{originAirport.city}</span>
                  <span className="text-xs font-bold text-[#5F429A] bg-[#5F429A]/10 px-1.5 py-0.5 rounded">
                    {originAirport.code}
                  </span>
                </div>
                <div className="text-[11px] text-[#465B71] truncate">{originAirport.name}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
            </button>

            {/* Origin Dropdown */}
            {isOriginOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 p-3 z-50">
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={originFilter}
                    onChange={e => setOriginFilter(e.target.value)}
                    placeholder={t('Buscar ciudad o código (p. ej. CGK)...', 'Search city or code...')}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-neutral-100 rounded-lg border-none focus:ring-1 focus:ring-[#5F429A]"
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredOriginAirports.map(airport => (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() => {
                        setOriginAirport(airport);
                        setIsOriginOpen(false);
                        setOriginFilter('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors hover:bg-[#FAF9FD] ${
                        originAirport.code === airport.code ? 'bg-[#FAF9FD] text-[#5F429A] font-bold' : 'text-[#191A23]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{airport.city} ({airport.code})</div>
                        <div className="text-[10px] text-[#465B71] truncate">{airport.name}</div>
                      </div>
                      <span className="text-[10px] text-[#465B71]">{airport.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Swap Airports Button (Col 5 / Center) */}
          <div className="md:col-span-1 flex items-end justify-center pb-2">
            <button
              type="button"
              onClick={swapAirports}
              className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#5F429A] hover:bg-[#FAF9FD] flex items-center justify-center text-[#263A79] hover:text-[#5F429A] transition-all active:rotate-180"
              title={t('Intercambiar origen y destino', 'Swap origin & destination')}
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Destination Airport (Col 6-8) */}
          <div className="md:col-span-3 relative">
            <label className="block text-[11px] font-bold tracking-wider text-[#465B71] uppercase mb-1">
              {t('HASTA', 'TO')}
            </label>
            <button
              type="button"
              onClick={() => {
                setIsDestOpen(!isDestOpen);
                setIsOriginOpen(false);
                setIsPassengersOpen(false);
                setIsClassOpen(false);
              }}
              className="w-full h-14 px-3.5 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-300 rounded-xl text-left flex items-center justify-between transition-colors focus:ring-2 focus:ring-[#5F429A]/30 focus:border-[#5F429A]"
            >
              <div className="overflow-hidden">
                <div className="font-extrabold text-base text-[#191A23] flex items-center gap-2">
                  <span>{destinationAirport.city}</span>
                  <span className="text-xs font-bold text-[#5F429A] bg-[#5F429A]/10 px-1.5 py-0.5 rounded">
                    {destinationAirport.code}
                  </span>
                </div>
                <div className="text-[11px] text-[#465B71] truncate">{destinationAirport.name}</div>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-1" />
            </button>

            {/* Destination Dropdown */}
            {isDestOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-neutral-200 p-3 z-50">
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-400" />
                  <input
                    type="text"
                    value={destFilter}
                    onChange={e => setDestFilter(e.target.value)}
                    placeholder={t('Buscar ciudad o código (p. ej. DPS)...', 'Search city or code...')}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-neutral-100 rounded-lg border-none focus:ring-1 focus:ring-[#5F429A]"
                    autoFocus
                  />
                </div>
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {filteredDestAirports.map(airport => (
                    <button
                      key={airport.code}
                      type="button"
                      onClick={() => {
                        setDestinationAirport(airport);
                        setIsDestOpen(false);
                        setDestFilter('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors hover:bg-[#FAF9FD] ${
                        destinationAirport.code === airport.code ? 'bg-[#FAF9FD] text-[#5F429A] font-bold' : 'text-[#191A23]'
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{airport.city} ({airport.code})</div>
                        <div className="text-[10px] text-[#465B71] truncate">{airport.name}</div>
                      </div>
                      <span className="text-[10px] text-[#465B71]">{airport.country}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Departure Date */}
          <div className="md:col-span-2.5">
            <label className="block text-[11px] font-bold tracking-wider text-[#465B71] uppercase mb-1">
              {t('SALIDA', 'DEPARTURE')}
            </label>
            <div className="relative h-14 bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-300 rounded-xl px-3 flex items-center">
              <Calendar className="w-4 h-4 text-[#5F429A] mr-2 shrink-0 pointer-events-none" />
              <input
                type="date"
                value={departureDate}
                onChange={e => setDepartureDate(e.target.value)}
                min="2026-10-06"
                className="w-full bg-transparent text-sm font-bold text-[#191A23] focus:outline-none cursor-pointer"
              />
            </div>
          </div>

          {/* Return Date */}
          <div className="md:col-span-2.5">
            <label className="block text-[11px] font-bold tracking-wider text-[#465B71] uppercase mb-1">
              {t('REGRESO', 'RETURN')}
            </label>
            <div className={`relative h-14 border rounded-xl px-3 flex items-center ${
              tripType === 'oneWay' 
                ? 'bg-neutral-100/50 border-neutral-200 opacity-60 cursor-not-allowed' 
                : 'bg-neutral-50 hover:bg-neutral-100/80 border-neutral-300'
            }`}>
              <Calendar className="w-4 h-4 text-[#5F429A] mr-2 shrink-0 pointer-events-none" />
              <input
                type="date"
                value={returnDate}
                onChange={e => setReturnDate(e.target.value)}
                disabled={tripType === 'oneWay'}
                min={departureDate}
                className="w-full bg-transparent text-sm font-bold text-[#191A23] focus:outline-none cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          </div>

        </div>

        {/* Promo code toggle & Primary CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!showPromoInput ? (
              <button
                type="button"
                onClick={() => setShowPromoInput(true)}
                className="flex items-center gap-1.5 text-xs font-semibold text-[#5F429A] hover:underline"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>{t('+ Agregar código promocional', '+ Add promo code')}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value.toUpperCase())}
                  placeholder={t('Código (p. ej. MUDIK2026)', 'Promo code (e.g. MUDIK2026)')}
                  className="px-3 py-1.5 text-xs font-medium border border-neutral-300 rounded-lg uppercase tracking-wider focus:ring-1 focus:ring-[#5F429A]"
                />
                <button
                  type="button"
                  onClick={() => setShowPromoInput(false)}
                  className="text-xs text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              </div>
            )}
            
            {isUsingPoints && (
              <span className="text-xs font-bold text-[#5F429A] bg-[#5F429A]/10 px-2 py-1 rounded-md">
                {t('Mostrando vuelos canjeables con Mudik Points', 'Showing flights redeemable with Mudik Points')}
              </span>
            )}
          </div>

          {/* Primary CTA: BUSCAR VUELOS */}
          <button
            type="button"
            onClick={handleSearchFlights}
            className="w-full sm:w-auto px-8 py-4 bg-[#5F429A] hover:bg-[#45469C] active:scale-[0.98] text-white font-extrabold text-sm tracking-wider rounded-xl shadow-lg shadow-[#5F429A]/25 transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>{t('BUSCAR VUELOS', 'SEARCH FLIGHTS')}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
