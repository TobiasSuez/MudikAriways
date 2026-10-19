import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIRPORTS, getMonthFares } from '../../data/mockData';
import { DayFare } from '../../types';
import { 
  Calendar as CalendarIcon, 
  ArrowLeftRight, 
  TrendingDown, 
  Check, 
  Plane, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  PlaneTakeoff,
  PlaneLanding
} from 'lucide-react';

export const FareCalendarView: React.FC = () => {
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
    formatPrice,
    handleSearchFlights,
    navigateTo,
    t,
    language
  } = useApp();

  // Active month viewing
  const initialYear = 2026;
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [selectedMonth, setSelectedMonth] = useState<number>(10); // October 2026

  // Step-by-step picking target: first departure, then return
  const [pickingTarget, setPickingTarget] = useState<'departure' | 'return'>('departure');
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  const monthNamesES = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const monthNamesEN = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getMonthName = (m: number) => (language === 'ES' ? monthNamesES[m - 1] : monthNamesEN[m - 1]);
  const daysOfWeek = language === 'ES'
    ? ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const monthFares = getMonthFares(originAirport.code, destinationAirport.code, selectedYear, selectedMonth);

  // Lowest fare of the selected month
  const lowestPriceOfMonth = Math.min(...monthFares.map(f => f.priceUSD));
  const averagePrice = Math.round(monthFares.reduce((acc, curr) => acc + curr.priceUSD, 0) / monthFares.length);

  const firstDayIndex = new Date(selectedYear, selectedMonth - 1, 1).getDay();
  const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const blankDays = Array.from({ length: adjustedFirstDay });

  const swapRoute = () => {
    const temp = originAirport;
    setOriginAirport(destinationAirport);
    setDestinationAirport(temp);
  };

  const prevMonth = () => {
    if (selectedMonth === 1) {
      setSelectedMonth(12);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const nextMonth = () => {
    if (selectedMonth === 12) {
      setSelectedMonth(1);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Duration calculation
  const calculateDuration = (start: string, end: string) => {
    if (!start || !end) return null;
    const d1 = new Date(start + 'T00:00:00');
    const d2 = new Date(end + 'T00:00:00');
    const diffTime = d2.getTime() - d1.getTime();
    if (diffTime < 0) return null;
    const days = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return { days, nights };
  };

  const activeDuration = (pickingTarget === 'return' && hoveredDate && departureDate && hoveredDate >= departureDate)
    ? calculateDuration(departureDate, hoveredDate)
    : (departureDate && returnDate && returnDate >= departureDate)
    ? calculateDuration(departureDate, returnDate)
    : null;

  // Two-step day selection: first departure, then return to choose number of days
  const handleSelectDay = (dateStr: string) => {
    if (tripType === 'oneWay') {
      setDepartureDate(dateStr);
      return;
    }

    if (pickingTarget === 'departure') {
      // Step 1: User selects departure box
      setDepartureDate(dateStr);
      if (returnDate && returnDate < dateStr) {
        setReturnDate('');
      }
      // Automatically advance to Step 2: User selects return box
      setPickingTarget('return');
    } else {
      // Step 2: User selects return box
      if (!departureDate) {
        setDepartureDate(dateStr);
        setPickingTarget('return');
      } else if (dateStr < departureDate) {
        // Clicked date is earlier than departure: make it the new departure date!
        setDepartureDate(dateStr);
        setReturnDate('');
        setPickingTarget('return');
      } else {
        // Valid return box selected!
        setReturnDate(dateStr);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
        
        {/* Header Breadcrumb & Title */}
        <div className="space-y-3">
          <button
            onClick={() => navigateTo('home')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5F429A] hover:underline cursor-pointer"
          >
            <span>← {t('Volver a la portada', 'Back to Home')}</span>
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-neutral-200">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F429A]/10 text-xs font-bold tracking-widest uppercase text-[#5F429A] mb-2">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('CALENDARIO DE TARIFAS Y FECHAS FLEXIBLES', 'LOW-FARE CALENDAR & FLEXIBLE DATES')}</span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
                {t('Encontrá el día más barato para volar', 'Find the cheapest day to fly')}
              </h1>
              <p className="text-xs sm:text-sm text-[#465B71] mt-1">
                {t(
                  'Compará precios diarios en todo el mes. Hacé clic primero en tu casilla de salida y luego en la casilla de vuelta para elegir la duración en días.',
                  'Compare daily prices across the month. Click first on your departure day, then on your return day to set your trip duration.'
                )}
              </p>
            </div>

            {/* Trip Type Segment */}
            <div className="flex items-center p-1 bg-white border border-neutral-200 rounded-xl text-xs font-semibold text-[#465B71] self-start md:self-end shadow-xs">
              <button
                type="button"
                onClick={() => setTripType('roundTrip')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  tripType === 'roundTrip' ? 'bg-[#263A79] text-white shadow-xs font-bold' : 'hover:text-[#263A79]'
                }`}
              >
                {t('Ida y vuelta', 'Round trip')}
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneWay')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  tripType === 'oneWay' ? 'bg-[#263A79] text-white shadow-xs font-bold' : 'hover:text-[#263A79]'
                }`}
              >
                {t('Solo ida', 'One way')}
              </button>
            </div>
          </div>
        </div>

        {/* Route Selector & Month Switcher Card */}
        <div className="bg-white rounded-3xl p-6 border border-neutral-200/90 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Origin Airport */}
            <div className="md:col-span-5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#465B71] mb-1">
                {t('ORIGEN', 'DEPARTURE FROM')}
              </label>
              <select
                value={originAirport.code}
                onChange={e => {
                  const a = AIRPORTS.find(air => air.code === e.target.value);
                  if (a) setOriginAirport(a);
                }}
                className="w-full h-12 px-3 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-sm text-[#263A79]"
              >
                {AIRPORTS.map(a => (
                  <option key={a.code} value={a.code}>{a.city} ({a.code}) - {a.country}</option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="button"
                onClick={swapRoute}
                className="w-10 h-10 rounded-full border border-neutral-300 hover:border-[#5F429A] hover:bg-[#FAF9FD] text-[#263A79] hover:text-[#5F429A] flex items-center justify-center transition-all active:rotate-180 cursor-pointer"
                title={t('Invertir ruta', 'Swap route')}
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Airport */}
            <div className="md:col-span-5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#465B71] mb-1">
                {t('DESTINO', 'DESTINATION')}
              </label>
              <select
                value={destinationAirport.code}
                onChange={e => {
                  const a = AIRPORTS.find(air => air.code === e.target.value);
                  if (a) setDestinationAirport(a);
                }}
                className="w-full h-12 px-3 bg-neutral-50 border border-neutral-300 rounded-xl font-bold text-sm text-[#263A79]"
              >
                {AIRPORTS.map(a => (
                  <option key={a.code} value={a.code}>{a.city} ({a.code}) - {a.country}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Month Navigator Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-neutral-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevMonth}
                className="p-2 border border-neutral-300 rounded-xl hover:bg-neutral-100 text-[#263A79] transition-colors cursor-pointer"
                title={t('Mes anterior', 'Previous month')}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-display font-extrabold text-lg text-[#263A79] min-w-[160px] text-center">
                {getMonthName(selectedMonth)} {selectedYear}
              </span>

              <button
                type="button"
                onClick={nextMonth}
                className="p-2 border border-neutral-300 rounded-xl hover:bg-neutral-100 text-[#263A79] transition-colors cursor-pointer"
                title={t('Mes siguiente', 'Next month')}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Highlights Bar */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-xl border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{t('Tarifa más baja del mes:', 'Lowest fare this month:')} <strong className="font-mono text-sm">{formatPrice(lowestPriceOfMonth)}</strong></span>
              </div>

              <div className="text-xs text-[#465B71]">
                {t('Promedio:', 'Average:')} <span className="font-bold">{formatPrice(averagePrice)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* STEP-BY-STEP SELECTION BAR: Casilla de salida primero, casilla de vuelta después */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#5F429A]/30 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm text-white shrink-0 shadow-xs ${
                pickingTarget === 'departure' ? 'bg-[#5F429A] ring-2 ring-[#5F429A]/30' : 'bg-[#263A79] ring-2 ring-[#263A79]/30'
              }`}>
                {pickingTarget === 'departure' ? '1' : '2'}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-sm text-[#263A79] uppercase tracking-wide">
                    {pickingTarget === 'departure'
                      ? t('PASO 1: SELECCIONA LA CASILLA DE SALIDA', 'STEP 1: SELECT DEPARTURE BOX')
                      : t('PASO 2: SELECCIONA LA CASILLA DE VUELTA', 'STEP 2: SELECT RETURN BOX')}
                  </h3>
                  {tripType === 'roundTrip' && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#5F429A]/10 text-[#5F429A]">
                      {t('Elige el número de días', 'Choose trip days')}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#465B71] mt-0.5">
                  {pickingTarget === 'departure'
                    ? t('Hacé clic en cualquier día del mes para marcar tu fecha de salida.', 'Click any calendar day to set your departure date.')
                    : t('Ahora hacé clic en la fecha de llegada para definir los días exactos de tu estancia.', 'Now click any date after departure to calculate your stay duration in days.')}
                </p>
              </div>
            </div>

            {/* Direct selector tabs */}
            <div className="flex flex-wrap items-center gap-2.5 self-start sm:self-auto">
              {/* Departure Tab */}
              <button
                type="button"
                onClick={() => setPickingTarget('departure')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                  pickingTarget === 'departure'
                    ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-xs ring-2 ring-[#5F429A]/20'
                    : 'bg-neutral-50 text-[#263A79] border-neutral-300 hover:border-[#5F429A]'
                }`}
              >
                <PlaneTakeoff className="w-4 h-4" />
                <span>{t('Casilla Salida:', 'Departure Box:')}</span>
                <span className="underline font-mono">{departureDate || t('Elegir', 'Pick')}</span>
              </button>

              {/* Return Tab */}
              {tripType === 'roundTrip' && (
                <button
                  type="button"
                  onClick={() => setPickingTarget('return')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 cursor-pointer ${
                    pickingTarget === 'return'
                      ? 'bg-[#263A79] text-white border-[#263A79] shadow-xs ring-2 ring-[#263A79]/20'
                      : 'bg-neutral-50 text-[#263A79] border-neutral-300 hover:border-[#263A79]'
                  }`}
                >
                  <PlaneLanding className="w-4 h-4" />
                  <span>{t('Casilla Vuelta:', 'Return Box:')}</span>
                  <span className="underline font-mono">{returnDate || t('Elegir', 'Pick')}</span>
                </button>
              )}
            </div>

          </div>

          {/* Duration Indicator */}
          {activeDuration && (
            <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-950 font-bold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>
                  {t('DURACIÓN CALCULADA:', 'CALCULATED DURATION:')}{' '}
                  <strong className="text-emerald-800 text-sm font-extrabold">{activeDuration.days} {t('días', 'days')}</strong>{' '}
                  ({activeDuration.nights} {t('noches', 'nights')})
                </span>
              </div>
              <span className="text-xs text-emerald-700 font-semibold hidden sm:inline">
                {departureDate} → {returnDate || hoveredDate}
              </span>
            </div>
          )}
        </div>

        {/* The Full Monthly 7-Column Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-4">
          
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs uppercase tracking-wider text-[#465B71] pb-2 border-b border-neutral-200">
            {daysOfWeek.map((day, i) => (
              <div key={i} className="py-1">{day}</div>
            ))}
          </div>

          {/* Grid of days */}
          <div 
            className="grid grid-cols-7 gap-2 sm:gap-3"
            onMouseLeave={() => setHoveredDate(null)}
          >
            {blankDays.map((_, idx) => (
              <div key={`blank-${idx}`} className="h-24 sm:h-28 bg-neutral-50/40 rounded-2xl border border-dashed border-neutral-200/60" />
            ))}

            {monthFares.map((fare: DayFare) => {
              const isSelectedDep = departureDate === fare.date;
              const isSelectedRet = tripType === 'roundTrip' && returnDate === fare.date;
              
              const isInRange = tripType === 'roundTrip' && 
                departureDate && 
                returnDate && 
                fare.date > departureDate && 
                fare.date < returnDate;

              const isHoveredRange = tripType === 'roundTrip' &&
                pickingTarget === 'return' &&
                departureDate &&
                hoveredDate &&
                hoveredDate > departureDate &&
                fare.date > departureDate &&
                fare.date <= hoveredDate;

              const isPast = fare.date < '2026-10-06';

              let cardStyle = 'bg-white hover:bg-[#FAF9FD] text-[#191A23] border border-neutral-200/90';
              if (isSelectedDep) {
                cardStyle = 'bg-[#5F429A] text-white font-bold ring-4 ring-[#5F429A]/30 shadow-md';
              } else if (isSelectedRet) {
                cardStyle = 'bg-[#263A79] text-white font-bold ring-4 ring-[#263A79]/30 shadow-md';
              } else if (isInRange) {
                cardStyle = 'bg-[#5F429A]/15 border-y-2 border-[#5F429A]/30 text-[#263A79] font-semibold';
              } else if (isHoveredRange) {
                cardStyle = 'bg-[#5F429A]/10 border-y-2 border-dashed border-[#5F429A]/40 text-[#263A79] font-semibold';
              } else if (fare.isLowest) {
                cardStyle = 'bg-emerald-50/50 hover:bg-emerald-50 border-emerald-300 text-emerald-950';
              }

              return (
                <div
                  key={fare.date}
                  onMouseEnter={() => {
                    if (pickingTarget === 'return') {
                      setHoveredDate(fare.date);
                    }
                  }}
                  onClick={() => !isPast && handleSelectDay(fare.date)}
                  className={`h-24 sm:h-28 p-2 sm:p-2.5 rounded-2xl transition-all flex flex-col justify-between text-left relative overflow-hidden min-w-0 ${
                    isPast ? 'opacity-30 cursor-not-allowed bg-neutral-100' : `${cardStyle} cursor-pointer hover:scale-[1.02]`
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 min-w-0">
                    <span className={`text-xs sm:text-base font-extrabold shrink-0 ${isSelectedDep || isSelectedRet ? 'text-white' : 'text-[#191A23]'}`}>
                      {fare.dayNumber}
                    </span>

                    {/* Best price badge */}
                    {fare.isLowest && !isPast && !isSelectedDep && !isSelectedRet && (
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase bg-emerald-600 text-white px-1 sm:px-1.5 py-0.5 rounded-full shadow-xs truncate max-w-[70%] text-center leading-none">
                        <span className="hidden md:inline">{t('MEJOR PRECIO', 'BEST FARE')}</span>
                        <span className="md:hidden">{t('MEJOR', 'LOW')}</span>
                      </span>
                    )}

                    {isSelectedDep && (
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase bg-white text-[#5F429A] px-1 sm:px-1.5 py-0.5 rounded-full truncate leading-none">
                        {t('IDA', 'DEP')}
                      </span>
                    )}

                    {isSelectedRet && (
                      <span className="text-[8px] sm:text-[9px] font-extrabold uppercase bg-emerald-400 text-[#191A23] px-1 sm:px-1.5 py-0.5 rounded-full truncate leading-none">
                        {t('VUELTA', 'RET')}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 overflow-hidden">
                    <span className={`text-[9px] sm:text-[10px] block uppercase tracking-wider truncate ${isSelectedDep || isSelectedRet ? 'text-white/80' : 'text-[#465B71]'}`}>
                      {t('Desde', 'From')}
                    </span>
                    <span className={`text-xs sm:text-sm lg:text-base font-black font-mono tabular-nums truncate block ${
                      isSelectedDep || isSelectedRet ? 'text-white' : fare.isLowest ? 'text-emerald-700' : 'text-[#263A79]'
                    }`}>
                      {formatPrice(fare.priceUSD)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Booking Action Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 min-w-0">
            <span className="text-[11px] font-bold text-[#5F429A] uppercase tracking-wider block">
              {t('FECHAS Y DURACIÓN SELECCIONADAS', 'SELECTED TRAVEL DATES & DURATION')}
            </span>
            <div className="font-extrabold text-base sm:text-lg text-[#191A23] flex flex-wrap items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-[#5F429A] shrink-0" />
              <span>{departureDate || t('Elige fecha de salida', 'Pick departure')}</span>
              {tripType === 'roundTrip' && (
                <>
                  <span className="text-neutral-400">→</span>
                  <span>{returnDate || t('Elige fecha de regreso', 'Pick return')}</span>
                  {activeDuration && (
                    <span className="text-xs font-black bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full ml-1">
                      {activeDuration.days} {t('días de viaje', 'days trip')}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="text-xs text-[#465B71] truncate">
              {originAirport.city} ({originAirport.code}) → {destinationAirport.city} ({destinationAirport.code})
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSearchFlights}
              className="px-8 py-4 bg-[#5F429A] hover:bg-[#45469C] active:scale-95 text-white font-extrabold text-sm tracking-wider rounded-xl shadow-lg shadow-[#5F429A]/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plane className="w-4 h-4" />
              <span>
                {t('BUSCAR VUELOS CON ESTAS FECHAS', 'SEARCH FLIGHTS WITH THESE DATES')}{' '}
                {activeDuration ? `(${activeDuration.days} ${t('DÍAS', 'DAYS')})` : ''}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Travel Hacks & Low-Fare Advice */}
        <div className="bg-[#FAF9FD] rounded-2xl p-6 border border-neutral-200/90 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#465B71]">
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-[#5F429A] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#191A23]">{t('Volá martes o miércoles', 'Fly mid-week')}</div>
              <p className="mt-0.5">{t('Las salidas entre semana tienen hasta un 30% de descuento respecto a los fines de semana.', 'Mid-week departures are up to 30% cheaper.')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-[#5F429A] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#191A23]">{t('Reserva con 21 días de anticipación', 'Book 21 days ahead')}</div>
              <p className="mt-0.5">{t('Nuestras tarifas MUDIK BASIC más económicas se agotan durante las últimas 3 semanas.', 'MUDIK BASIC seats fill up in the last 3 weeks.')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#5F429A] shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-[#191A23]">{t('Tarifa MUDIK FLEX', 'MUDIK FLEX option')}</div>
              <p className="mt-0.5">{t('Podés cambiar la fecha sin penalidad hasta 4 horas antes del despegue.', 'Free date change up to 4 hours before departure.')}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
