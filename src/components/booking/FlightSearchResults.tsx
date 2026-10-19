import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_FLIGHTS, getMonthFares } from '../../data/mockData';
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
  AlertCircle,
  TrendingDown,
  Bell,
  X,
  CheckCircle2,
  Filter,
  DollarSign,
  Info
} from 'lucide-react';

export const FlightSearchResults: React.FC = () => {
  const {
    originAirport,
    destinationAirport,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
    passengers,
    formatPrice,
    setSelectedOutboundFlight,
    setSelectedFareTier,
    selectedFareTier,
    navigateTo,
    setBookingStep,
    t,
    language
  } = useApp();

  // Sort & Filter state
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterStops, setFilterStops] = useState<'all' | 'direct'>('all');
  const [filterTime, setFilterTime] = useState<'all' | 'early' | 'morning' | 'afternoon' | 'evening'>('all');
  const [filterAircraft, setFilterAircraft] = useState<'all' | 'A320' | 'B737'>('all');
  const [maxPrice, setMaxPrice] = useState<number>(200);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(MOCK_FLIGHTS[0].id);

  // Price Alert state
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertEmail, setAlertEmail] = useState<string>('viajero@mudikairways.com');
  const [alertTargetPrice, setAlertTargetPrice] = useState<number>(65);
  const [alertCreated, setAlertCreated] = useState<boolean>(false);

  // Available mock flights
  const availableFlights = MOCK_FLIGHTS.filter(f => {
    const matchRoute = f.origin.code === originAirport.code && f.destination.code === destinationAirport.code;
    return matchRoute || true; // ensure user always gets flight results for prototype experience
  });

  // Filter flights
  const filteredFlights = availableFlights.filter(f => {
    // Stops
    if (filterStops === 'direct' && !f.isDirect) return false;
    
    // Time windows
    const hour = parseInt(f.departureTime.split(':')[0], 10);
    if (filterTime === 'early' && hour >= 6) return false;
    if (filterTime === 'morning' && (hour < 6 || hour >= 12)) return false;
    if (filterTime === 'afternoon' && (hour < 12 || hour >= 18)) return false;
    if (filterTime === 'evening' && hour < 18) return false;

    // Aircraft
    if (filterAircraft === 'A320' && !f.aircraft.includes('A320')) return false;
    if (filterAircraft === 'B737' && !f.aircraft.includes('737')) return false;

    // Max Price
    if (f.fares.basic > maxPrice) return false;

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

  const handleSavePriceAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertCreated(true);
    setTimeout(() => {
      setIsAlertModalOpen(false);
    }, 1200);
  };

  const resetAllFilters = () => {
    setFilterStops('all');
    setFilterTime('all');
    setFilterAircraft('all');
    setMaxPrice(200);
  };

  const isAnyFilterActive = filterStops !== 'all' || filterTime !== 'all' || filterAircraft !== 'all' || maxPrice < 200;

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  // Generate surrounding days (-3 to +3) based on departureDate
  const baseDate = departureDate ? new Date(departureDate + 'T00:00:00') : new Date('2026-10-15T00:00:00');
  const surroundingDays = [-3, -2, -1, 0, 1, 2, 3].map(offset => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().split('T')[0];
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const dayFares = getMonthFares(originAirport.code, destinationAirport.code, year, month);
    const matchFare = dayFares.find(f => f.date === dateStr);
    const dayOfWeekShort = d.toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    return {
      date: dateStr,
      dayNum,
      dayOfWeekShort,
      priceUSD: matchFare?.priceUSD || 58,
      isLowest: matchFare?.isLowest || false,
      isCurrent: dateStr === departureDate,
    };
  });

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Navigation back and header summary */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#465B71] hover:text-[#5F429A] transition-colors mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Volver a modificar búsqueda', 'Back to search criteria')}</span>
            </button>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#263A79] tracking-tight">
                {originAirport.city} ({originAirport.code})
              </h1>
              <span className="text-[#5F429A] font-bold text-xl">→</span>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-[#263A79] tracking-tight">
                {destinationAirport.city} ({destinationAirport.code})
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-[#465B71]">
              <span>{departureDate}</span>
              {tripType === 'roundTrip' && returnDate && (
                <>
                  <span>·</span>
                  <span>{t('Regreso:', 'Return:')} {returnDate}</span>
                </>
              )}
              <span>·</span>
              <span>{totalPassengers} {totalPassengers > 1 ? t('pasajeros', 'passengers') : t('pasajero', 'passenger')}</span>
              <span>·</span>
              <span className="font-semibold text-[#5F429A]">{tripType === 'roundTrip' ? t('Ida y vuelta', 'Round trip') : t('Solo ida', 'One-way')}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => navigateTo('fare-calendar')}
              className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>{t('Ver Calendario Mensual Completo', 'View Full Fare Calendar')}</span>
            </button>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="px-4 py-2.5 bg-[#5F429A]/10 hover:bg-[#5F429A]/20 text-[#5F429A] border border-[#5F429A]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>{alertCreated ? t('Alerta Activa', 'Alert Active') : t('Crear Alerta de Tarifa', 'Set Fare Alert')}</span>
            </button>
          </div>
        </div>

        {/* Low-Fare Trend Alert Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-[#263A79] text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-400/30">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-white">
                  {t('Tendencia de Precios Mudik: ¡Tarifa un 15% más baja!', 'Mudik Fare Trend: 15% lower than typical!')}
                </span>
                <span className="bg-emerald-500 text-emerald-950 font-black text-[9px] px-2 py-0.5 rounded-full uppercase">
                  {t('Oportunidad', 'Great Deal')}
                </span>
              </div>
              <p className="text-xs text-neutral-200 mt-0.5">
                {t(
                  `El precio promedio para volar de ${originAirport.city} a ${destinationAirport.city} ronda los USD 75. Hoy encontrás tarifas desde USD 58.`,
                  `Typical fares for this route average USD 75. Today you can book from USD 58.`
                )}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAlertModalOpen(true)}
            className="self-start sm:self-auto px-4 py-2 bg-white text-[#263A79] hover:bg-neutral-100 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5"
          >
            <Bell className="w-3.5 h-3.5 text-[#5F429A]" />
            <span>{t('Seguir esta ruta', 'Track this route')}</span>
          </button>
        </div>

        {/* Surrounding Dates Horizontal Carousel */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-[#465B71] uppercase flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#5F429A]" />
              <span>{t('TARIFAS EN FECHAS CERCANAS (±3 DÍAS)', 'NEARBY DATE FARES (±3 DAYS)')}</span>
            </span>
            <span className="text-xs text-[#5F429A] font-semibold">
              {t('Precios más bajos señalados en verde', 'Lowest fares highlighted in green')}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {surroundingDays.map((item) => (
              <button
                key={item.date}
                type="button"
                onClick={() => setDepartureDate(item.date)}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  item.isCurrent
                    ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-md ring-2 ring-[#5F429A]/30 scale-[1.02]'
                    : item.isLowest
                    ? 'bg-emerald-50/70 border-emerald-300 hover:border-emerald-500 text-emerald-950 hover:bg-emerald-100/50'
                    : 'bg-neutral-50/70 border-neutral-200 hover:border-[#5F429A] hover:bg-[#FAF9FD]'
                }`}
              >
                <div className="text-[10px] sm:text-[11px] font-bold uppercase truncate">
                  {item.dayOfWeekShort} <span className="font-extrabold text-xs sm:text-sm">{item.dayNum}</span>
                </div>
                <div className="mt-1 min-w-0 overflow-hidden">
                  <span className={`block text-xs font-bold font-mono tabular-nums truncate ${
                    item.isCurrent ? 'text-white' : item.isLowest ? 'text-emerald-700 font-extrabold' : 'text-[#263A79]'
                  }`}>
                    {formatPrice(item.priceUSD)}
                  </span>
                  {item.isLowest && !item.isCurrent && (
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-emerald-700 uppercase tracking-tight block truncate">
                      {t('Mejor precio', 'Best fare')}
                    </span>
                  )}
                  {item.isCurrent && (
                    <span className="text-[8px] sm:text-[9px] font-bold text-white/90 uppercase tracking-tight block truncate">
                      {t('Seleccionado', 'Selected')}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filter and Sort Toolbar */}
        <div className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-xs space-y-4">
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Sorting Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
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

            {/* Quick Filters and Advanced Filters Toggle */}
            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className={`px-3.5 py-1.5 rounded-lg font-bold border transition-colors flex items-center gap-1.5 ${
                  showAdvancedFilters || isAnyFilterActive
                    ? 'bg-[#5F429A] text-white border-[#5F429A]'
                    : 'bg-neutral-100 text-[#263A79] border-neutral-200 hover:bg-neutral-200'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{t('Filtros Avanzados', 'Advanced Filters')}</span>
                {isAnyFilterActive && (
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                )}
              </button>

              {isAnyFilterActive && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#5F429A] hover:underline font-semibold"
                >
                  {t('Limpiar', 'Reset')}
                </button>
              )}
            </div>
          </div>

          {/* Expanded Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t border-neutral-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs animate-in fade-in duration-150">
              
              {/* Filter 1: Stops */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#465B71] uppercase text-[10px] tracking-wider block">
                  {t('Escalas', 'Stops')}
                </label>
                <select
                  value={filterStops}
                  onChange={(e) => setFilterStops(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[#263A79] font-medium focus:ring-1 focus:ring-[#5F429A]"
                >
                  <option value="all">{t('Todas las escalas', 'All stops')}</option>
                  <option value="direct">{t('Solo vuelos directos', 'Direct flights only')}</option>
                </select>
              </div>

              {/* Filter 2: Time Windows */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#465B71] uppercase text-[10px] tracking-wider block">
                  {t('Franja Horaria de Salida', 'Departure Time Window')}
                </label>
                <select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[#263A79] font-medium focus:ring-1 focus:ring-[#5F429A]"
                >
                  <option value="all">{t('Cualquier horario', 'Any time of day')}</option>
                  <option value="early">{t('Madrugada (00:00 - 06:00)', 'Early Morning (00-06h)')}</option>
                  <option value="morning">{t('Mañana (06:00 - 12:00)', 'Morning (06-12h)')}</option>
                  <option value="afternoon">{t('Tarde (12:00 - 18:00)', 'Afternoon (12-18h)')}</option>
                  <option value="evening">{t('Noche (18:00 - 23:59)', 'Evening (18-24h)')}</option>
                </select>
              </div>

              {/* Filter 3: Aircraft Type */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#465B71] uppercase text-[10px] tracking-wider block">
                  {t('Tipo de Avión', 'Aircraft Model')}
                </label>
                <select
                  value={filterAircraft}
                  onChange={(e) => setFilterAircraft(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 bg-neutral-50 text-[#263A79] font-medium focus:ring-1 focus:ring-[#5F429A]"
                >
                  <option value="all">{t('Todas las aeronaves', 'All aircraft')}</option>
                  <option value="A320">Airbus A320 (Mudik Express)</option>
                  <option value="B737">Boeing 737-800 (Mudik Jet)</option>
                </select>
              </div>

              {/* Filter 4: Max Price Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#465B71] uppercase text-[10px] tracking-wider">
                    {t('Precio Máximo', 'Max Price')}
                  </label>
                  <span className="font-mono font-bold text-[#5F429A]">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#5F429A] cursor-pointer"
                />
              </div>

            </div>
          )}

        </div>

        {/* Flight Cards List */}
        <div className="space-y-6">
          {sortedFlights.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-neutral-200 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
              <h3 className="font-bold text-lg text-[#263A79]">{t('No encontramos vuelos con esos filtros', 'No flights match your filters')}</h3>
              <p className="text-xs text-[#465B71]">{t('Prueba ajustando el precio máximo, la franja horaria o el tipo de escala.', 'Try relaxing your filter parameters.')}</p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-[#5F429A] text-white text-xs font-bold rounded-xl shadow-xs"
              >
                {t('Restablecer filtros', 'Reset all filters')}
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
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5F429A] to-[#263A79] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm">
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
                        <div className="font-mono font-black text-2xl text-[#191A23]">
                          {flight.departureTime}
                        </div>
                        <div className="text-xs font-bold text-[#263A79]">
                          {flight.origin.code}
                        </div>
                        <div className="text-[11px] text-[#465B71] truncate max-w-[100px]">
                          {flight.origin.city}
                        </div>
                      </div>

                      {/* Flight flight path indicator */}
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-bold text-[#465B71] mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{flight.duration}</span>
                        </span>
                        
                        <div className="w-24 sm:w-32 flex items-center">
                          <div className="w-2 h-2 rounded-full bg-[#5F429A]" />
                          <div className="h-0.5 flex-1 bg-neutral-300 relative">
                            {flight.isDirect ? (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Plane className="w-3 h-3 text-[#5F429A] rotate-90" />
                              </div>
                            ) : (
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500" />
                            )}
                          </div>
                          <div className="w-2 h-2 rounded-full bg-[#263A79]" />
                        </div>

                        <span className={`text-[10px] font-semibold mt-1 ${flight.isDirect ? 'text-emerald-700' : 'text-amber-700'}`}>
                          {flight.isDirect ? t('Directo', 'Non-stop') : `${flight.stopsCount} ${t('escala', 'stop')}`}
                        </span>
                      </div>

                      {/* Arrival */}
                      <div className="text-right">
                        <div className="font-mono font-black text-2xl text-[#191A23]">
                          {flight.arrivalTime}
                        </div>
                        <div className="text-xs font-bold text-[#263A79]">
                          {flight.destination.code}
                        </div>
                        <div className="text-[11px] text-[#465B71] truncate max-w-[100px]">
                          {flight.destination.city}
                        </div>
                      </div>

                    </div>

                    {/* From price & Expand Tiers Button */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-neutral-100">
                      <div className="text-left lg:text-right">
                        <div className="text-[10px] font-bold tracking-wider text-[#465B71] uppercase">
                          {t('DESDE', 'FROM')}
                        </div>
                        <div className="font-mono font-black text-2xl sm:text-3xl text-[#5F429A] tabular-nums">
                          {formatPrice(flight.fares.basic)}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-semibold">
                          {t('Por pasajero / tasas inc.', 'Per pax / taxes incl.')}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs ${
                          isExpanded 
                            ? 'bg-[#263A79] text-white' 
                            : 'bg-[#5F429A] hover:bg-[#45469C] text-white'
                        }`}
                      >
                        <span>{isExpanded ? t('Cerrar Tarifas', 'Close Fares') : t('Seleccionar Tarifa', 'Choose Fare')}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>

                  </div>

                  {/* Expandable Fare Tiers Matrix (Basic, Smart, Flex) */}
                  {isExpanded && (
                    <div className="bg-[#FAF9FD] p-6 border-t border-neutral-200">
                      <div className="mb-4">
                        <h4 className="font-bold text-sm text-[#263A79]">
                          {t('Elegí tu paquete de tarifa Mudik', 'Choose your Mudik fare package')}
                        </h4>
                        <p className="text-xs text-[#465B71]">
                          {t('Transparente: sabés exactamente qué incluye cada tarifa sin costos ocultos.', 'Clear and transparent inclusions.')}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* BASIC TIER */}
                        <div className="bg-white rounded-xl p-5 border border-neutral-200 flex flex-col justify-between hover:border-[#5F429A] transition-all">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-extrabold text-base text-[#263A79]">BASIC</span>
                              <span className="font-mono font-bold text-lg text-[#191A23]">{formatPrice(flight.fares.basic)}</span>
                            </div>
                            <p className="text-xs text-[#465B71]">{t('Para viajar liviano al mejor precio.', 'Travel light for the lowest cost.')}</p>

                            <ul className="space-y-2 text-xs text-[#465B71] pt-2 border-t border-neutral-100">
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Mochila o bolso de mano (7 kg)', 'Cabin bag 7 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Check-in online anticipado', 'Online check-in')}</span>
                              </li>
                              <li className="flex items-center gap-2 opacity-50">
                                <span className="w-3.5 h-3.5 text-center leading-none">✕</span>
                                <span>{t('Sin equipaje en bodega', 'No checked baggage')}</span>
                              </li>
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectFlightAndFare(flight, 'basic')}
                            className="w-full mt-6 py-2.5 bg-neutral-100 hover:bg-[#5F429A] hover:text-white text-[#263A79] text-xs font-bold rounded-lg transition-colors"
                          >
                            {t('ELEGIR BASIC', 'SELECT BASIC')}
                          </button>
                        </div>

                        {/* SMART TIER (RECOMMENDED) */}
                        <div className="bg-white rounded-xl p-5 border-2 border-[#5F429A] relative shadow-sm flex flex-col justify-between">
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5F429A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xs">
                            {t('RECOMENDADA', 'POPULAR')}
                          </div>

                          <div className="space-y-3 pt-1">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-extrabold text-base text-[#5F429A]">SMART</span>
                              <span className="font-mono font-bold text-lg text-[#5F429A]">{formatPrice(flight.fares.smart)}</span>
                            </div>
                            <p className="text-xs text-[#465B71]">{t('El equilibrio perfecto para tus vacaciones.', 'Perfect balance for your island holiday.')}</p>

                            <ul className="space-y-2 text-xs text-[#465B71] pt-2 border-t border-neutral-100">
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Equipaje en bodega de 20 kg', '20 kg checked baggage')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Bolso de mano 7 kg', 'Cabin bag 7 kg')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Selección de asiento estándar', 'Standard seat selection')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Acumula Mudik Points x2', '2x Mudik Points')}</span>
                              </li>
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectFlightAndFare(flight, 'smart')}
                            className="w-full mt-6 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-lg transition-all shadow-sm"
                          >
                            {t('ELEGIR SMART', 'SELECT SMART')}
                          </button>
                        </div>

                        {/* FLEX TIER */}
                        <div className="bg-white rounded-xl p-5 border border-neutral-200 flex flex-col justify-between hover:border-[#5F429A] transition-all">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="font-display font-extrabold text-base text-[#263A79]">FLEX</span>
                              <span className="font-mono font-bold text-lg text-[#191A23]">{formatPrice(flight.fares.flex)}</span>
                            </div>
                            <p className="text-xs text-[#465B71]">{t('Flexibilidad total para cambios de fecha.', 'Full flexibility and priority.')}</p>

                            <ul className="space-y-2 text-xs text-[#465B71] pt-2 border-t border-neutral-100">
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Equipaje en bodega de 30 kg', '30 kg checked baggage')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Asiento extra legroom sin cargo', 'Extra legroom seat free')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Cambios de fecha sin penalización', 'Free date changes')}</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{t('Embarque prioritario', 'Priority boarding')}</span>
                              </li>
                            </ul>
                          </div>

                          <button
                            onClick={() => handleSelectFlightAndFare(flight, 'flex')}
                            className="w-full mt-6 py-2.5 bg-neutral-100 hover:bg-[#5F429A] hover:text-white text-[#263A79] text-xs font-bold rounded-lg transition-colors"
                          >
                            {t('ELEGIR FLEX', 'SELECT FLEX')}
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

      {/* Fare Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-[#263A79] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#5F429A] flex items-center justify-center">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    {t('Crear Alerta de Tarifa Baja', 'Create Low-Fare Alert')}
                  </h3>
                  <p className="text-[11px] text-neutral-300">
                    {originAirport.code} → {destinationAirport.code}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAlertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {alertCreated ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-base text-[#263A79]">
                  {t('¡Alerta de precio activada!', 'Price alert created!')}
                </h4>
                <p className="text-xs text-[#465B71]">
                  {t(
                    `Te notificaremos a ${alertEmail} cuando la tarifa baje de ${formatPrice(alertTargetPrice)}.`,
                    `We will email ${alertEmail} if fares drop below ${formatPrice(alertTargetPrice)}.`
                  )}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSavePriceAlert} className="p-6 space-y-4 text-xs">
                <div className="p-3 bg-[#FAF9FD] rounded-xl border border-neutral-200 space-y-1">
                  <span className="font-bold text-[#263A79] block">
                    {originAirport.city} ({originAirport.code}) ➔ {destinationAirport.city} ({destinationAirport.code})
                  </span>
                  <span className="text-[#465B71] block">
                    {t('Fecha de salida:', 'Departure:')} {departureDate}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#465B71] uppercase text-[10px] tracking-wider block">
                    {t('CORREO ELECTRÓNICO PARA AVISOS', 'NOTIFICATION EMAIL')}
                  </label>
                  <input
                    type="email"
                    required
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                    placeholder="tu@email.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#465B71] uppercase text-[10px] tracking-wider">
                      {t('AVISAR SI BAJA DE:', 'NOTIFY ME IF FARE DROPS BELOW:')}
                    </label>
                    <span className="font-mono font-bold text-emerald-700">
                      {formatPrice(alertTargetPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="40"
                    max="100"
                    step="5"
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Bell className="w-4 h-4" />
                    <span>{t('ACTIVAR ALERTA GRATUITA', 'ACTIVATE FREE ALERT')}</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
