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
  Clock
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
    }
  }, [isOpen, selectionMode]);

  if (!isOpen) return null;

  // Next month calculation
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
      // If previous returnDate is before new departure, clear it so user can pick return cleanly
      if (returnDate && returnDate < dateStr) {
        setReturnDate('');
      }
      // Automatically advance to Step 2: choose return box
      setActivePickingTarget('return');
    } else {
      // Step 2: user selected return box
      if (!departureDate) {
        // If departure wasn't chosen yet, set it and stay in return mode
        setDepartureDate(dateStr);
        setActivePickingTarget('return');
      } else if (dateStr < departureDate) {
        // User clicked a date earlier than departure: adaptively make it the new departure date!
        setDepartureDate(dateStr);
        setReturnDate('');
        setActivePickingTarget('return');
      } else {
        // Valid return date chosen
        setReturnDate(dateStr);
        // User has now chosen both departure and return dates (days count established!)
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
      <div className="space-y-3">
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
          className="grid grid-cols-7 gap-1"
          onMouseLeave={() => setHoveredDate(null)}
        >
          {blankDays.map((_, i) => (
            <div key={`blank-${i}`} className="h-14 sm:h-16" />
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
            const isDisabled = isPast;

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
                  if (activePickingTarget === 'return') {
                    setHoveredDate(fare.date);
                  }
                }}
                onClick={() => handleDayClick(fare.date)}
                className={`h-14 sm:h-16 p-1 rounded-xl text-left flex flex-col justify-between transition-all relative overflow-hidden min-w-0 ${
                  isDisabled ? 'opacity-30 cursor-not-allowed bg-neutral-100/60' : `${tileStyle} cursor-pointer hover:border-[#5F429A]`
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

                  {fare.isLowest && !isDisabled && !isDeparture && !isReturn && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" title={t('Mejor precio', 'Best price')} />
                  )}
                </div>

                <div className="text-[10px] leading-tight min-w-0">
                  <span className={`block font-semibold tabular-nums truncate ${
                    isDeparture || isReturn ? 'text-white/95' : fare.isLowest ? 'text-emerald-700 font-bold' : 'text-[#465B71]'
                  }`}>
                    {formatPrice(fare.priceUSD)}
                  </span>
                  {fare.isLowest && !isDisabled && !isDeparture && !isReturn && (
                    <span className="hidden sm:inline text-[8px] uppercase tracking-wider text-emerald-600 font-extrabold truncate block">
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

  // Quick preset shortcuts
  const handleSelectWeekend = () => {
    setDepartureDate('2026-10-23');
    setReturnDate('2026-10-25');
    setActivePickingTarget('return');
  };

  const handleSelectWeek = (daysCount: number) => {
    const base = departureDate ? new Date(departureDate + 'T00:00:00') : new Date('2026-10-15T00:00:00');
    const startStr = base.toISOString().split('T')[0];
    const end = new Date(base);
    end.setDate(end.getDate() + daysCount);
    const endStr = end.toISOString().split('T')[0];
    setDepartureDate(startStr);
    setReturnDate(endStr);
    setActivePickingTarget('return');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 space-y-4 max-h-[95vh] overflow-y-auto">
        
        {/* Top Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center">
                <CalendarIcon className="w-4 h-4" />
              </div>
              <h3 className="font-display font-extrabold text-lg text-[#263A79]">
                {t('Elegir fechas y duración del vuelo', 'Select Flight Dates & Duration')}
              </h3>
            </div>
            <p className="text-xs text-[#465B71] mt-0.5">
              {originAirport.city} ({originAirport.code}) ⇄ {destinationAirport.city} ({destinationAirport.code}) · {t('Tarifas diarias con mejor precio garantizado', 'Daily fares with best price guarantee')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Trip Type Selector */}
            <div className="flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-semibold text-[#465B71]">
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

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors shrink-0 ml-auto"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP-BY-STEP SELECTION BAR: Casilla de salida primero, casilla de vuelta después */}
        <div className="bg-gradient-to-r from-[#FAF9FD] via-white to-purple-50/50 border border-[#5F429A]/20 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          
          <div className="flex items-center gap-3 min-w-0">
            {/* Step badge */}
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs ${
              activePickingTarget === 'departure'
                ? 'bg-[#5F429A] text-white ring-2 ring-[#5F429A]/30'
                : 'bg-[#263A79] text-white ring-2 ring-[#263A79]/30'
            }`}>
              {activePickingTarget === 'departure' ? '1' : '2'}
            </div>

            {/* Step explanation */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-[#263A79]">
                  {activePickingTarget === 'departure'
                    ? t('PASO 1: SELECCIONA CASILLA DE SALIDA', 'STEP 1: SELECT DEPARTURE BOX')
                    : t('PASO 2: SELECCIONA CASILLA DE VUELTA', 'STEP 2: SELECT RETURN BOX')}
                </span>
                {tripType === 'roundTrip' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#5F429A]/10 text-[#5F429A]">
                    {t('Para elegir el número de días', 'To select number of days')}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#465B71] truncate">
                {activePickingTarget === 'departure'
                  ? t('Haz clic en un día del calendario para fijar la salida.', 'Click any date to set your departure.')
                  : t('Ahora haz clic en la casilla de llegada para fijar los días de viaje.', 'Now click any date after departure to set your return.')}
              </p>
            </div>
          </div>

          {/* Interactive tabs allowing direct toggling between Salida and Regreso */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Departure tab */}
            <button
              type="button"
              onClick={() => setActivePickingTarget('departure')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                activePickingTarget === 'departure'
                  ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-xs'
                  : 'bg-white text-[#263A79] border-neutral-300 hover:border-[#5F429A]'
              }`}
            >
              <PlaneTakeoff className="w-3.5 h-3.5" />
              <span>{t('Salida:', 'Depart:')}</span>
              <span className="underline font-mono">{departureDate || t('Elegir', 'Pick')}</span>
            </button>

            {/* Return tab */}
            {tripType === 'roundTrip' && (
              <button
                type="button"
                onClick={() => setActivePickingTarget('return')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
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

        {/* Calculated duration highlight when both dates or preview exist */}
        {activeDuration && (
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200/90 rounded-xl px-4 py-2 text-xs text-emerald-950 font-bold">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>
                {t('DURACIÓN DEL VIAJE:', 'TRIP DURATION:')}{' '}
                <strong className="text-emerald-800 text-sm font-extrabold">{activeDuration.days} {t('días', 'days')}</strong>{' '}
                ({activeDuration.nights} {t('noches', 'nights')})
              </span>
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold hidden sm:inline">
              {departureDate} → {returnDate || hoveredDate}
            </span>
          </div>
        )}

        {/* Navigation Month Controls */}
        <div className="flex items-center justify-between px-2 pt-1">
          <button
            type="button"
            onClick={prevMonthNav}
            className="p-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-[#263A79] flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('Mes anterior', 'Previous month')}</span>
          </button>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#465B71]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{t('Tarifa más baja', 'Lowest fare')}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5F429A]" />
              <span>{t('Salida', 'Departure')}</span>
            </div>
            {tripType === 'roundTrip' && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#263A79]" />
                <span>{t('Vuelta', 'Return')}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={nextMonthNav}
            className="p-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-[#263A79] flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer"
          >
            <span className="hidden sm:inline">{t('Mes siguiente', 'Next month')}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dual Month Calendar Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {renderMonthGrid(currentYear, currentMonth)}
          <div className="hidden md:block">
            {renderMonthGrid(nextMonthYear, nextMonth)}
          </div>
        </div>

        {/* Bottom Presets & Confirmation CTA */}
        <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50 p-4 rounded-2xl">
          
          {/* Quick Presets by duration */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-[#465B71] text-[11px] uppercase mr-1">
              {t('Duraciones fijas:', 'Preset stays:')}
            </span>
            <button
              type="button"
              onClick={handleSelectWeekend}
              className="px-2.5 py-1 bg-white border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] transition-colors"
            >
              {t('Fin de semana (3 días)', 'Weekend (3 days)')}
            </button>
            <button
              type="button"
              onClick={() => handleSelectWeek(7)}
              className="px-2.5 py-1 bg-white border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] transition-colors"
            >
              {t('1 Semana (7 días)', '1 Week (7 days)')}
            </button>
            <button
              type="button"
              onClick={() => handleSelectWeek(14)}
              className="px-2.5 py-1 bg-white border border-neutral-300 hover:border-[#5F429A] rounded-lg font-semibold text-[#263A79] transition-colors"
            >
              {t('2 Semanas (14 días)', '2 Weeks (14 days)')}
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                navigateTo('fare-calendar');
              }}
              className="px-4 py-2 bg-gradient-to-r from-[#263A79] to-[#5F429A] hover:opacity-95 text-white text-xs font-extrabold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('MATRIZ MENSUAL', 'FULL MATRIX')}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-extrabold rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{t('LISTO', 'DONE')}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
