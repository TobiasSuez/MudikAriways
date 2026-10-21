import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getMonthFares } from '../../data/mockData';
import { DayFare } from '../../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  Check, 
  ArrowRight,
  TrendingDown, 
  X, 
  PlaneTakeoff, 
  PlaneLanding, 
  Clock,
  AlertCircle
} from 'lucide-react';

interface CustomDatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  selectionMode?: 'departure' | 'return';
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ 
  isOpen, 
  onClose,
  selectionMode = 'departure'
}) => {
  const { 
    departureDate, 
    setDepartureDate, 
    returnDate, 
    setReturnDate, 
    tripType, 
    setTripType, 
    originAirport, 
    destinationAirport, 
    formatPrice, 
    navigateTo, 
    t, 
    language 
  } = useApp();

  // Current viewed month and year
  const initialDate = departureDate ? new Date(departureDate + 'T00:00:00') : new Date(2026, 9, 15);
  const [currentYear, setCurrentYear] = useState<number>(initialDate.getFullYear() || 2026);
  const [currentMonth, setCurrentMonth] = useState<number>((initialDate.getMonth() + 1) || 10); // 1-indexed

  // Active step in range selection: selecting departure first ('departure') then return ('return')
  const [activePickingTarget, setActivePickingTarget] = useState<'departure' | 'return'>(selectionMode);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Sync state whenever modal opens or caller changes mode
  useEffect(() => {
    if (isOpen) {
      setActivePickingTarget(selectionMode);
      setHoveredDate(null);
      if (departureDate) {
        const d = new Date(departureDate + 'T00:00:00');
        if (!isNaN(d.getTime())) {
          setCurrentYear(d.getFullYear());
          setCurrentMonth(d.getMonth() + 1);
        }
      }
    }
  }, [isOpen, selectionMode, departureDate]);

  if (!isOpen) return null;

  // Maximum allowed return date: exactly 1 month (30 days) from departureDate
  const maxAllowedReturnDate = departureDate ? (() => {
    const d = new Date(departureDate + 'T00:00:00');
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  })() : null;

  // Next month calculation for dual-month desktop view
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;

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
    ? ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do']
    : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const prevMonthNav = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonthNav = () => {
    // Check if moving to next month would be beyond maxAllowedReturnDate when picking return
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Duration calculator
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

  // Preview or actual duration
  const activeDuration = (activePickingTarget === 'return' && hoveredDate && departureDate && hoveredDate >= departureDate)
    ? calculateDuration(departureDate, hoveredDate)
    : (departureDate && returnDate && returnDate >= departureDate)
    ? calculateDuration(departureDate, returnDate)
    : null;

  // Handle clicking on any calendar day
  const handleDayClick = (dateStr: string) => {
    if (tripType === 'oneWay') {
      setDepartureDate(dateStr);
      onClose();
      return;
    }

    if (activePickingTarget === 'departure') {
      // Step 1: user selected departure box
      setDepartureDate(dateStr);
      // If previous returnDate is before new departure or more than 30 days away, clear it
      if (returnDate) {
        const dRet = new Date(returnDate + 'T00:00:00').getTime();
        const dDep = new Date(dateStr + 'T00:00:00').getTime();
        const maxTime = dDep + (30 * 24 * 60 * 60 * 1000);
        if (dRet < dDep || dRet > maxTime) {
          setReturnDate('');
        }
      }
      // Automatically advance to Step 2: choose return box
      setActivePickingTarget('return');
    } else {
      // Step 2: user selected return box
      if (!departureDate) {
        setDepartureDate(dateStr);
        setActivePickingTarget('return');
      } else if (dateStr < departureDate) {
        // User clicked a date earlier than departure: adaptively make it the new departure date!
        setDepartureDate(dateStr);
        setReturnDate('');
        setActivePickingTarget('return');
      } else {
        // Check 30-day (1 month) limit constraint
        if (maxAllowedReturnDate && dateStr > maxAllowedReturnDate) {
          return; // Block selection beyond 1 month
        }
        setReturnDate(dateStr);
      }
    }
  };

  const renderMonthGrid = (year: number, month: number) => {
    const dayFares = getMonthFares(originAirport.code, destinationAirport.code, year, month);
    const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 is Sunday
    // Adjust so Monday is 0, Sunday is 6
    const adjustedFirstDay = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

    const blankDays = Array.from({ length: adjustedFirstDay });

    return (
      <div className="space-y-2.5">
        <div className="text-center font-bold text-sm text-[#263A79]">
          {getMonthName(month)} {year}
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-[#465B71]">
          {daysOfWeek.map((day, idx) => (
            <div key={idx} className="py-1">{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div 
          className="grid grid-cols-7 gap-1 sm:gap-1.5"
          onMouseLeave={() => setHoveredDate(null)}
        >
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} className="h-13 sm:h-16" />
          ))}

          {dayFares.map((fare: DayFare) => {
            const isDeparture = departureDate === fare.date;
            const isReturn = tripType === 'roundTrip' && returnDate === fare.date;
            
            // Real selected range between departure and return
            const isInSelectedRange = tripType === 'roundTrip' && 
              departureDate && 
              returnDate && 
              fare.date > departureDate && 
              fare.date < returnDate;

            // Hover preview range when user has selected departure and is choosing return
            const isHoverPreview = tripType === 'roundTrip' &&
              activePickingTarget === 'return' &&
              departureDate &&
              hoveredDate &&
              hoveredDate > departureDate &&
              fare.date > departureDate &&
              fare.date <= hoveredDate;

            // Check if past or invalid
            const isPast = fare.date < '2026-10-06';

            // 1-month constraint check: return cannot be more than 30 days from departureDate
            const isExceeded1Month = Boolean(
              activePickingTarget === 'return' &&
              departureDate && 
              maxAllowedReturnDate && 
              fare.date > maxAllowedReturnDate
            );

            const isDisabled = isPast || isExceeded1Month;

            let tileStyle = 'bg-white hover:bg-[#FAF9FD] text-[#191A23] border border-neutral-200/80';
            
            if (isDeparture) {
              tileStyle = 'bg-[#5F429A] text-white font-bold shadow-md ring-2 ring-[#5F429A]/40 z-10';
            } else if (isReturn) {
              tileStyle = 'bg-[#263A79] text-white font-bold shadow-md ring-2 ring-[#263A79]/40 z-10';
            } else if (isInSelectedRange) {
              tileStyle = 'bg-[#5F429A]/15 text-[#263A79] font-bold border-y border-[#5F429A]/30';
            } else if (isHoverPreview) {
              tileStyle = 'bg-[#5F429A]/10 text-[#263A79] font-semibold border-y border-dashed border-[#5F429A]/40';
            }

            return (
              <button
                key={fare.date}
                type="button"
                disabled={isDisabled}
                onMouseEnter={() => {
                  if (activePickingTarget === 'return' && !isDisabled) {
                    setHoveredDate(fare.date);
                  }
                }}
                onClick={() => handleDayClick(fare.date)}
                title={isExceeded1Month ? t('Máximo 1 mes de estadía desde la salida', 'Maximum 1 month stay from departure') : undefined}
                className={`h-13 sm:h-16 p-1 sm:p-1.5 rounded-xl text-left flex flex-col justify-between transition-all relative overflow-hidden min-w-0 ${
                  isDisabled 
                    ? 'opacity-25 cursor-not-allowed bg-neutral-100/70 border-neutral-200' 
                    : `${tileStyle} cursor-pointer hover:border-[#5F429A]`
                }`}
              >
                <div className="flex items-center justify-between w-full min-w-0">
                  <span className={`text-xs font-bold shrink-0 ${isDeparture || isReturn ? 'text-white' : 'text-[#191A23]'}`}>
                    {fare.dayNumber}
                  </span>

                  {/* Salida or Vuelta pill */}
                  {isDeparture && (
                    <span className="text-[7px] sm:text-[8px] font-black uppercase px-1 py-0.5 rounded bg-white text-[#5F429A] leading-none shrink-0">
                      {t('IDA', 'DEP')}
                    </span>
                  )}
                  {isReturn && (
                    <span className="text-[7px] sm:text-[8px] font-black uppercase px-1 py-0.5 rounded bg-emerald-400 text-[#191A23] leading-none shrink-0">
                      {t('VUELTA', 'RET')}
                    </span>
                  )}

                  {isExceeded1Month && (
                    <span className="text-[7px] font-semibold text-neutral-400 shrink-0">
                      &gt;30d
                    </span>
                  )}

                  {fare.isLowest && !isDisabled && !isDeparture && !isReturn && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title={t('Mejor precio', 'Best price')} />
                  )}
                </div>

                <div className="text-[9px] sm:text-[10px] leading-tight min-w-0">
                  <span className={`block font-semibold tabular-nums truncate ${
                    isDeparture || isReturn ? 'text-white/95' : fare.isLowest ? 'text-emerald-700 font-bold' : 'text-[#465B71]'
                  }`}>
                    {formatPrice(fare.priceUSD)}
                  </span>
                  {fare.isLowest && !isDisabled && !isDeparture && !isReturn && (
                    <span className="hidden sm:inline text-[7px] uppercase tracking-wider text-emerald-600 font-extrabold truncate block">
                      {t('Mínimo', 'Low')}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Quick preset shortcuts (all strictly <= 30 days)
  const handleSelectWeekend = () => {
    setDepartureDate('2026-10-23');
    setReturnDate('2026-10-25');
    setActivePickingTarget('return');
  };

  const handleSelectWeek = (daysCount: number) => {
    const base = departureDate ? new Date(departureDate + 'T00:00:00') : new Date('2026-10-15T00:00:00');
    const startStr = base.toISOString().split('T')[0];
    const end = new Date(base);
    end.setDate(end.getDate() + Math.min(30, daysCount));
    const endStr = end.toISOString().split('T')[0];
    setDepartureDate(startStr);
    setReturnDate(endStr);
    setActivePickingTarget('return');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      
      {/* Container: Fullscreen on mobile, elevated modal on desktop */}
      <div className="bg-white w-full h-full sm:h-auto sm:max-h-[92vh] sm:rounded-3xl sm:max-w-4xl flex flex-col overflow-hidden sm:shadow-2xl sm:border sm:border-neutral-200">
        
        {/* Top Header */}
        <div className="px-4 py-3 sm:px-7 sm:py-5 border-b border-neutral-200 bg-white shrink-0 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center shrink-0">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-[#263A79] truncate">
                {t('Elegir fechas y duración', 'Select Flight Dates & Duration')}
              </h3>
            </div>
            <p className="text-[11px] sm:text-xs text-[#465B71] truncate mt-0.5">
              {originAirport.city} ({originAirport.code}) ⇄ {destinationAirport.city} ({destinationAirport.code})
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Trip Type Selector */}
            <div className="flex items-center p-0.5 bg-neutral-100 rounded-xl text-xs font-semibold text-[#465B71]">
              <button
                type="button"
                onClick={() => setTripType('roundTrip')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  tripType === 'roundTrip'
                    ? 'bg-white text-[#5F429A] shadow-xs font-bold'
                    : 'hover:text-[#263A79]'
                }`}
              >
                {t('Ida y vuelta', 'Round trip')}
              </button>
              <button
                type="button"
                onClick={() => setTripType('oneWay')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  tripType === 'oneWay'
                    ? 'bg-white text-[#5F429A] shadow-xs font-bold'
                    : 'hover:text-[#263A79]'
                }`}
              >
                {t('Solo ida', 'One way')}
              </button>
            </div>

            {/* Prominent Close button with ample tap target */}
            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center text-neutral-500 hover:text-neutral-800 rounded-full hover:bg-neutral-100 active:bg-neutral-200 transition-colors shrink-0"
              aria-label="Cerrar calendario"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-7 space-y-3.5 sm:space-y-4">
          
          {/* STEP-BY-STEP SELECTION BAR: Salida primero, Vuelta después */}
          <div className="bg-gradient-to-r from-[#FAF9FD] via-white to-purple-50/50 border border-[#5F429A]/20 rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs ${
                activePickingTarget === 'departure'
                  ? 'bg-[#5F429A] text-white ring-2 ring-[#5F429A]/30'
                  : 'bg-[#263A79] text-white ring-2 ring-[#263A79]/30'
              }`}>
                {activePickingTarget === 'departure' ? '1' : '2'}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#263A79]">
                    {activePickingTarget === 'departure'
                      ? t('PASO 1: TOCÁ TU CASILLA DE SALIDA', 'STEP 1: TAP DEPARTURE DATE')
                      : t('PASO 2: TOCÁ TU CASILLA DE VUELTA', 'STEP 2: TAP RETURN DATE')}
                  </span>
                  {tripType === 'roundTrip' && (
                    <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5F429A]/10 text-[#5F429A]">
                      {t('Máx. 1 mes', 'Max. 1 month')}
                    </span>
                  )}
                </div>
                <p className="text-[11px] sm:text-xs text-[#465B71] truncate">
                  {activePickingTarget === 'departure'
                    ? t('Elegí el día en que deseás despegar.', 'Choose when you want to take off.')
                    : t('Elegí la fecha de regreso (hasta 30 días posteriores).', 'Choose your return date (up to 30 days after departure).')}
                </p>
              </div>
            </div>

            {/* Interactive date selector buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActivePickingTarget('departure')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  activePickingTarget === 'departure'
                    ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-xs'
                    : 'bg-white text-[#263A79] border-neutral-300 hover:border-[#5F429A]'
                }`}
              >
                <PlaneTakeoff className="w-3.5 h-3.5" />
                <span>{t('Salida:', 'Depart:')}</span>
                <span className="underline font-mono">{departureDate || t('Elegir', 'Pick')}</span>
              </button>

              {tripType === 'roundTrip' && (
                <button
                  type="button"
                  onClick={() => setActivePickingTarget('return')}
                  className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    activePickingTarget === 'return'
                      ? 'bg-[#263A79] text-white border-[#263A79] shadow-xs'
                      : 'bg-white text-[#263A79] border-neutral-300 hover:border-[#263A79]'
                  }`}
                >
                  <PlaneLanding className="w-3.5 h-3.5" />
                  <span>{t('Vuelta:', 'Return:')}</span>
                  <span className="underline font-mono">{returnDate || t('Elegir', 'Pick')}</span>
                </button>
              )}
            </div>

          </div>

          {/* 1-Month Limit Advisory */}
          {departureDate && maxAllowedReturnDate && tripType === 'roundTrip' && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] text-amber-900">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>
                {t(
                  `Precios flexibles limitados hasta el ${maxAllowedReturnDate} (máximo 1 mes de estancia desde tu salida).`,
                  `Flexible dates restricted until ${maxAllowedReturnDate} (maximum 1 month stay from departure).`
                )}
              </span>
            </div>
          )}

          {/* Duration highlight */}
          {activeDuration && (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/90 rounded-xl px-3.5 py-2 text-xs text-emerald-950 font-bold">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {t('DURACIÓN:', 'TRIP DURATION:')}{' '}
                  <strong className="text-emerald-800 text-sm font-extrabold">{activeDuration.days} {t('días', 'days')}</strong>{' '}
                  ({activeDuration.nights} {t('noches', 'nights')})
                </span>
              </div>
              <span className="text-[11px] text-emerald-700 font-semibold hidden sm:inline">
                {departureDate} → {returnDate || hoveredDate}
              </span>
            </div>
          )}

          {/* Wide Month Navigation Controls (Ample tap target for mobile) */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <button
              type="button"
              onClick={prevMonthNav}
              className="h-11 px-3.5 sm:px-4 rounded-xl border border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 text-[#263A79] flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('Mes anterior', 'Prev month')}</span>
            </button>

            <span className="font-display font-extrabold text-sm sm:text-base text-[#263A79] text-center">
              {getMonthName(currentMonth)} {currentYear}
            </span>

            <button
              type="button"
              onClick={nextMonthNav}
              className="h-11 px-3.5 sm:px-4 rounded-xl border border-neutral-300 hover:bg-neutral-100 active:bg-neutral-200 text-[#263A79] flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
            >
              <span>{t('Mes siguiente', 'Next month')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Month Grids: 1 Month on Mobile, 2 Months on Tablet/Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
            {renderMonthGrid(currentYear, currentMonth)}
            <div className="hidden md:block">
              {renderMonthGrid(nextMonthYear, nextMonth)}
            </div>
          </div>

          {/* Preset Stays (Duration buttons) */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="font-bold text-[#465B71] text-[10px] uppercase mr-1">
                {t('Duraciones sugeridas:', 'Quick stays:')}
              </span>
              <button
                type="button"
                onClick={handleSelectWeekend}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-[#FAF9FD] border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] text-[11px] transition-colors"
              >
                {t('Fin de semana (3d)', 'Weekend (3d)')}
              </button>
              <button
                type="button"
                onClick={() => handleSelectWeek(7)}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-[#FAF9FD] border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] text-[11px] transition-colors"
              >
                {t('1 Semana (7d)', '1 Week (7d)')}
              </button>
              <button
                type="button"
                onClick={() => handleSelectWeek(14)}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-[#FAF9FD] border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] text-[11px] transition-colors"
              >
                {t('2 Semanas (14d)', '2 Weeks (14d)')}
              </button>
              <button
                type="button"
                onClick={() => handleSelectWeek(30)}
                className="px-2.5 py-1 bg-neutral-100 hover:bg-[#FAF9FD] border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] text-[11px] transition-colors"
              >
                {t('1 Mes máx. (30d)', '1 Month max (30d)')}
              </button>
            </div>
          </div>

        </div>

        {/* Sticky Bottom Action Bar (Full width, easy touch targets) */}
        <div className="p-3.5 sm:p-5 bg-neutral-50/95 backdrop-blur-md border-t border-neutral-200 shrink-0 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              navigateTo('fare-calendar');
            }}
            className="h-12 px-3 sm:px-4 bg-white border border-neutral-300 hover:border-[#5F429A] text-[#263A79] text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">{t('Matriz de Precios', 'Full Matrix')}</span>
            <span className="sm:hidden">{t('Matriz', 'Matrix')}</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-12 bg-[#5F429A] hover:bg-[#45469C] active:scale-[0.99] text-white text-xs sm:text-sm font-extrabold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{t('CONFIRMAR FECHAS', 'CONFIRM DATES')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
