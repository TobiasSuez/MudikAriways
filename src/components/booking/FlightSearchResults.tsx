import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_FLIGHTS } from '../../data/mockData';
import { Flight, FareTier } from '../../types';
import { 
  ArrowLeft, 
  Plane, 
  Clock, 
  Check, 
  SlidersHorizontal, 
  ChevronDown, 
  Luggage, 
  ShieldCheck, 
  Sparkles, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export const FlightSearchResults: React.FC = () => {
  const {
    originAirport,
    destinationAirport,
    departureDate,
    returnDate,
    tripType,
    passengers,
    formatPrice,
    setSelectedOutboundFlight,
    setSelectedFareTier,
    selectedFareTier,
    navigateTo,
    setBookingStep,
    t
  } = useApp();

  // Sort & Filter state
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterStops, setFilterStops] = useState<'all' | 'direct'>('all');
  const [filterTime, setFilterTime] = useState<'all' | 'morning' | 'afternoon' | 'evening'>('all');
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(MOCK_FLIGHTS[0].id);

  // Available mock flights (can filter by route origin/destination or fallback to representative flights)
  const availableFlights = MOCK_FLIGHTS.filter(f => {
    // If exact route exists in mock
    const matchRoute = f.origin.code === originAirport.code && f.destination.code === destinationAirport.code;
    return matchRoute || true; // ensure user always gets flight results for prototype experience
  });

  // Filter flights
  const filteredFlights = availableFlights.filter(f => {
    if (filterStops === 'direct' && !f.isDirect) return false;
    
    const hour = parseInt(f.departureTime.split(':')[0], 10);
    if (filterTime === 'morning' && hour >= 12) return false;
    if (filterTime === 'afternoon' && (hour < 12 || hour >= 18)) return false;
    if (filterTime === 'evening' && hour < 18) return false;

    return true;
  });

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price') return a.fares.basic - b.fares.basic;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  const handleSelectFlightAndFare = (flight: Flight, tier: FareTier) => {
    setSelectedOutboundFlight(flight);
    setSelectedFareTier(tier);
    setBookingStep(2); // Go to Passenger Info in Booking Flow
    navigateTo('booking');
  };

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation back and header summary */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5F429A] hover:underline mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('Volver a la búsqueda', 'Back to search')}</span>
            </button>
            
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#263A79] tracking-tight">
                {originAirport.city} ({originAirport.code}) → {destinationAirport.city} ({destinationAirport.code})
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-[#465B71] pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#5F429A]" />
                {departureDate} {tripType === 'roundTrip' && `— ${returnDate}`}
              </span>
              <span>·</span>
              <span>{tripType === 'roundTrip' ? t('Ida y vuelta', 'Round trip') : t('Solo ida', 'One way')}</span>
              <span>·</span>
              <span>{totalPassengers} {totalPassengers === 1 ? t('pasajero', 'passenger') : t('pasajeros', 'passengers')}</span>
            </div>
          </div>

          {/* Quick Date Shift Strips */}
          <div className="flex items-center gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-neutral-100">
            <button 
              onClick={() => navigateTo('home')} 
              className="px-4 py-2 border border-neutral-300 hover:border-[#5F429A] text-xs font-bold rounded-xl text-[#263A79] transition-colors"
            >
              {t('Modificar búsqueda', 'Modify search')}
            </button>
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
          
          {/* Sorting Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[#465B71] uppercase tracking-wider text-[11px] mr-1">
              {t('Ordenar por:', 'Sort by:')}
            </span>
            <button
              onClick={() => setSortBy('price')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                sortBy === 'price' ? 'bg-[#5F429A] text-white shadow-xs' : 'bg-neutral-100 text-[#263A79] hover:bg-neutral-200'
              }`}
            >
              {t('Precio más bajo', 'Lowest Price')}
            </button>
            <button
              onClick={() => setSortBy('departure')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                sortBy === 'departure' ? 'bg-[#5F429A] text-white shadow-xs' : 'bg-neutral-100 text-[#263A79] hover:bg-neutral-200'
              }`}
            >
              {t('Hora de salida', 'Departure Time')}
            </button>
            <button
              onClick={() => setSortBy('duration')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                sortBy === 'duration' ? 'bg-[#5F429A] text-white shadow-xs' : 'bg-neutral-100 text-[#263A79] hover:bg-neutral-200'
              }`}
            >
              {t('Menor duración', 'Shortest Duration')}
            </button>
          </div>

          {/* Filter options */}
          <div className="flex items-center gap-3 text-xs">
            {/* Stops Filter */}
            <select
              value={filterStops}
              onChange={(e) => setFilterStops(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-[#263A79] font-medium focus:ring-1 focus:ring-[#5F429A]"
            >
              <option value="all">{t('Todas las escalas', 'All stops')}</option>
              <option value="direct">{t('Solo vuelos directos', 'Direct flights only')}</option>
            </select>

            {/* Time Filter */}
            <select
              value={filterTime}
              onChange={(e) => setFilterTime(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-[#263A79] font-medium focus:ring-1 focus:ring-[#5F429A]"
            >
              <option value="all">{t('Cualquier horario', 'Any time of day')}</option>
              <option value="morning">{t('Mañana (00:00 - 12:00)', 'Morning')}</option>
              <option value="afternoon">{t('Tarde (12:00 - 18:00)', 'Afternoon')}</option>
              <option value="evening">{t('Noche (18:00 - 23:59)', 'Evening')}</option>
            </select>
          </div>

        </div>

        {/* Flight Cards List */}
        <div className="space-y-6">
          {sortedFlights.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-bold text-lg text-[#263A79]">{t('No encontramos vuelos con esos filtros', 'No flights found')}</h3>
              <p className="text-xs text-[#465B71]">{t('Prueba ajustando los filtros de escala u horario.', 'Try adjusting your filters.')}</p>
              <button
                onClick={() => { setFilterStops('all'); setFilterTime('all'); }}
                className="px-4 py-2 bg-[#5F429A] text-white text-xs font-bold rounded-lg"
              >
                {t('Restablecer filtros', 'Reset filters')}
              </button>
            </div>
          ) : (
            sortedFlights.map((flight) => {
              const isExpanded = expandedFlightId === flight.id;
              
              return (
                <div
                  key={flight.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden shadow-sm hover:shadow-md ${
                    isExpanded ? 'border-[#5F429A] ring-1 ring-[#5F429A]/20' : 'border-neutral-200/90'
                  }`}
                >
                  {/* Flight Summary Strip */}
                  <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Flight & Airline Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5F429A] to-[#263A79] text-white flex items-center justify-center font-bold text-xs shrink-0">
                        <Plane className="w-6 h-6 -rotate-45" />
                      </div>
                      <div>
                        <div className="font-extrabold text-base text-[#263A79] flex items-center gap-2">
                          <span>{flight.flightNumber}</span>
                          <span className="text-[11px] font-semibold text-[#5F429A] bg-[#5F429A]/10 px-2 py-0.5 rounded-full">
                            Mudik Air
                          </span>
                        </div>
                        <div className="text-xs text-[#465B71] mt-0.5">
                          {flight.aircraft} · {flight.baggageIncluded}
                        </div>
                      </div>
                    </div>

                    {/* Schedule times & duration */}
                    <div className="flex items-center gap-6 sm:gap-10">
                      
                      {/* Departure */}
                      <div className="text-left">
                        <div className="text-2xl font-black text-[#191A23] tabular-nums">
                          {flight.departureTime}
                        </div>
                        <div className="text-xs font-bold text-[#263A79]">{flight.origin.code}</div>
                        <div className="text-[11px] text-[#465B71] truncate max-w-[100px]">{flight.origin.city}</div>
                      </div>

                      {/* Flight Path Graphic */}
                      <div className="flex flex-col items-center gap-1 px-2">
                        <div className="text-[11px] text-[#465B71] font-semibold tabular-nums flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {flight.duration}
                        </div>
                        <div className="w-24 sm:w-32 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#5F429A]" />
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-[#5F429A] to-[#263A79]" />
                          <Plane className="w-3.5 h-3.5 text-[#263A79] -rotate-45" />
                          <div className="h-0.5 flex-1 bg-gradient-to-r from-[#263A79] to-[#5F429A]" />
                          <div className="w-2 h-2 rounded-full bg-[#263A79]" />
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                          {flight.isDirect ? t('Directo', 'Direct') : t('1 Escala', '1 Stop')}
                        </span>
                      </div>

                      {/* Arrival */}
                      <div className="text-right">
                        <div className="text-2xl font-black text-[#191A23] tabular-nums">
                          {flight.arrivalTime}
                        </div>
                        <div className="text-xs font-bold text-[#263A79]">{flight.destination.code}</div>
                        <div className="text-[11px] text-[#465B71] truncate max-w-[100px]">{flight.destination.city}</div>
                      </div>

                    </div>

                    {/* Price & Expand button */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-neutral-100">
                      <div className="text-right">
                        <span className="text-[10px] text-[#465B71] uppercase tracking-wider block">
                          {t('Desde', 'From')}
                        </span>
                        <div className="text-2xl font-black text-[#263A79] tabular-nums">
                          {formatPrice(flight.fares.basic)}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                        className={`px-5 py-3 rounded-xl font-bold text-xs tracking-wider transition-all flex items-center gap-2 ${
                          isExpanded
                            ? 'bg-[#263A79] text-white shadow-sm'
                            : 'bg-[#5F429A] text-white hover:bg-[#45469C] shadow-sm'
                        }`}
                      >
                        <span>{isExpanded ? t('CERRAR TARIFAS', 'HIDE FARES') : t('SELECCIONAR', 'SELECT FARE')}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                  </div>

                  {/* Expanded 3 Fare Tiers Options (Section 6) */}
                  {isExpanded && (
                    <div className="border-t border-neutral-200 bg-neutral-50/70 p-6 animate-in fade-in slide-in-from-top-2 duration-200">
                      
                      <div className="mb-4">
                        <h4 className="font-bold text-sm text-[#263A79] tracking-tight">
                          {t('Elegí la tarifa para tu vuelo', 'Select fare option for this flight')}
                        </h4>
                        <p className="text-xs text-[#465B71]">
                          {t('Todas las tarifas incluyen traslados puntuales y servicio de cabina Mudik.', 'All fares include Mudik punctuality and cabin crew care.')}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* 1. MUDIK BASIC */}
                        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
                          <div>
                            <div className="font-bold text-base text-[#191A23]">MUDIK BASIC</div>
                            <div className="text-xs text-[#465B71] mt-0.5">{t('Tarifa más económica', 'Lowest fare')}</div>

                            <div className="my-4">
                              <span className="text-xs text-[#465B71] block">{t('Por pasajero', 'Per passenger')}</span>
                              <div className="text-2xl font-black text-[#263A79] tabular-nums">
                                {formatPrice(flight.fares.basic)}
                              </div>
                            </div>

                            <ul className="space-y-2 text-xs text-[#465B71]">
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Equipaje de mano 7 kg', 'Carry-on bag 7 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2 opacity-60">
                                <span>✕</span>
                                <span className="line-through">{t('Sin equipaje en bodega', 'No checked bag')}</span>
                              </li>
                              <li className="flex items-center gap-2 opacity-60">
                                <span>✕</span>
                                <span className="line-through">{t('Asiento aleatorio', 'Random seat')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Acumula 5 Mudik Points / USD', 'Earns 5 pts / USD')}</span>
                              </li>
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectFlightAndFare(flight, 'basic')}
                            className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#263A79] font-bold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            {t('Elegir Basic', 'Select Basic')}
                          </button>
                        </div>

                        {/* 2. MUDIK SMART (RECOMMENDED) */}
                        <div className="bg-white rounded-xl p-5 border-2 border-[#5F429A] shadow-md flex flex-col justify-between space-y-4 relative">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5F429A] text-white text-[10px] font-extrabold tracking-wider px-3 py-0.5 rounded-full uppercase">
                            {t('MÁS ELEGIDO · RECOMENDADO', 'MOST POPULAR · RECOMMENDED')}
                          </div>

                          <div>
                            <div className="font-bold text-base text-[#5F429A]">MUDIK SMART</div>
                            <div className="text-xs text-[#465B71] mt-0.5">{t('El equilibrio perfecto', 'Best value')}</div>

                            <div className="my-4">
                              <span className="text-xs text-[#465B71] block">{t('Por pasajero', 'Per passenger')}</span>
                              <div className="text-2xl font-black text-[#5F429A] tabular-nums">
                                {formatPrice(flight.fares.smart)}
                              </div>
                            </div>

                            <ul className="space-y-2 text-xs text-[#191A23]">
                              <li className="flex items-center gap-2 font-medium">
                                <Check className="w-3.5 h-3.5 text-[#5F429A] shrink-0" />
                                <span>{t('Equipaje de mano 7 kg', 'Carry-on bag 7 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2 font-medium">
                                <Check className="w-3.5 h-3.5 text-[#5F429A] shrink-0" />
                                <span>{t('Equipaje despachado 20 kg', 'Checked baggage 20 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2 font-medium">
                                <Check className="w-3.5 h-3.5 text-[#5F429A] shrink-0" />
                                <span>{t('Elección de asiento estándar', 'Free seat selection')}</span>
                              </li>
                              <li className="flex items-center gap-2 font-medium">
                                <Check className="w-3.5 h-3.5 text-[#5F429A] shrink-0" />
                                <span>{t('Snack tradicional indonesio', 'Complimentary snack')}</span>
                              </li>
                              <li className="flex items-center gap-2 font-medium">
                                <Check className="w-3.5 h-3.5 text-[#5F429A] shrink-0" />
                                <span>{t('Acumula 8 Mudik Points / USD', 'Earns 8 pts / USD')}</span>
                              </li>
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectFlightAndFare(flight, 'smart')}
                            className="w-full py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer"
                          >
                            {t('Elegir Smart', 'Select Smart')}
                          </button>
                        </div>

                        {/* 3. MUDIK FLEX */}
                        <div className="bg-white rounded-xl p-5 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
                          <div>
                            <div className="font-bold text-base text-[#263A79]">MUDIK FLEX</div>
                            <div className="text-xs text-[#465B71] mt-0.5">{t('Máxima flexibilidad', 'Maximum flexibility')}</div>

                            <div className="my-4">
                              <span className="text-xs text-[#465B71] block">{t('Por pasajero', 'Per passenger')}</span>
                              <div className="text-2xl font-black text-[#263A79] tabular-nums">
                                {formatPrice(flight.fares.flex)}
                              </div>
                            </div>

                            <ul className="space-y-2 text-xs text-[#465B71]">
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Equipaje de mano 7 kg', 'Carry-on bag 7 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Equipaje despachado 25 kg', 'Checked baggage 25 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Asiento premium delantero', 'Front row seat selection')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Cambios de fecha sin penalidad', 'Free date changes')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Embarque prioritario', 'Priority boarding')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Acumula 12 Mudik Points / USD', 'Earns 12 pts / USD')}</span>
                              </li>
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectFlightAndFare(flight, 'flex')}
                            className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-[#263A79] font-bold text-xs rounded-lg transition-colors cursor-pointer"
                          >
                            {t('Elegir Flex', 'Select Flex')}
                          </button>
                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
