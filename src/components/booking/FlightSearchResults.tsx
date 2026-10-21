import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_FLIGHTS, AIRPORTS, getMonthFares, getRouteBasePrice } from '../../data/mockData';
import { Flight, FareTier, Airport } from '../../types';
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
  Info,
  ArrowRight,
  MapPin,
  CalendarDays,
  Lock,
  Armchair,
  Crown
} from 'lucide-react';
import { FareLockModal } from './FareLockModal';

export const FlightSearchResults: React.FC = () => {
  const {
    originAirport,
    destinationAirport,
    departureDate,
    setDepartureDate,
    returnDate,
    setReturnDate,
    tripType,
    multiCitySegments,
    selectedMultiCityFlights,
    setSelectedMultiCityFlights,
    passengers,
    cabinClass,
    formatPrice,
    setSelectedOutboundFlight,
    setSelectedFareTier,
    selectedFareTier,
    navigateTo,
    setBookingStep,
    lockedFare,
    setLockedFare,
    t,
    language
  } = useApp();

  // Fare Lock state
  const [lockTarget, setLockTarget] = useState<{ flight: Flight; tier: FareTier } | null>(null);

  // Multi-city active segment state
  const [activeSegmentIndex, setActiveSegmentIndex] = useState<number>(0);
  const [multiCitySuccessToast, setMultiCitySuccessToast] = useState<string | null>(null);

  // Sort & Filter state
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterStops, setFilterStops] = useState<'all' | 'direct'>('all');
  const [filterTime, setFilterTime] = useState<'all' | 'early' | 'morning' | 'afternoon' | 'evening'>('all');
  const [filterAircraft, setFilterAircraft] = useState<'all' | 'A320' | 'B737'>('all');
  const [userMaxPrice, setUserMaxPrice] = useState<number | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState<boolean>(false);
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);

  // Price Alert state
  const [isAlertModalOpen, setIsAlertModalOpen] = useState<boolean>(false);
  const [alertEmail, setAlertEmail] = useState<string>('viajero@mudikairways.com');
  const [alertTargetPrice, setAlertTargetPrice] = useState<number>(65);
  const [alertCreated, setAlertCreated] = useState<boolean>(false);

  // Active route calculation (Single trip or Current Multi-City segment)
  const isMultiCity = tripType === 'multiCity';
  const currentSegment = isMultiCity 
    ? (multiCitySegments[activeSegmentIndex] || multiCitySegments[0])
    : null;

  const activeOrigin: Airport = isMultiCity && currentSegment ? currentSegment.origin : originAirport;
  const activeDest: Airport = isMultiCity && currentSegment ? currentSegment.destination : destinationAirport;
  const activeDate: string = isMultiCity && currentSegment ? currentSegment.departureDate : departureDate;

  // Cabin class multipliers
  const classMultiplier = cabinClass === 'First' ? 3.8 : cabinClass === 'Business' ? 2.4 : cabinClass === 'Premium' ? 1.45 : 1.0;
  const routeInfo = getRouteBasePrice(activeOrigin.code, activeDest.code);
  const maxPriceCap = Math.max(300, Math.round(routeInfo.basePrice * classMultiplier * 2.2));
  const effectiveMaxPrice = userMaxPrice ?? maxPriceCap;

  // Build available flights dynamically for the active route
  const getFlightsForRoute = (orig: Airport, dest: Airport): Flight[] => {
    // Check if MOCK_FLIGHTS has direct flights matching this pair
    const directMatches = MOCK_FLIGHTS.filter(
      f => f.origin.code === orig.code && f.destination.code === dest.code
    );

    if (directMatches.length > 0) {
      return directMatches.map(f => ({
        ...f,
        fares: {
          basic: Math.round(f.fares.basic * classMultiplier),
          smart: Math.round(f.fares.smart * classMultiplier),
          flex: Math.round(f.fares.flex * classMultiplier),
        }
      }));
    }

    // Synthesize realistic flights based on route base price and category
    const routeData = getRouteBasePrice(orig.code, dest.code);
    const b = routeData.basePrice;

    let duration1 = '1h 50m';
    let duration2 = '2h 10m';
    let duration3 = '1h 55m';
    let duration4 = '2h 00m';
    let aircraftLong = 'Boeing 737-800';
    let aircraftMed = 'Airbus A320neo';
    let aircraftShort = 'Airbus A320-200';

    if (routeData.category === 'sudamerica') {
      duration1 = '2h 20m';
      duration2 = '3h 10m';
      duration3 = '2h 45m';
      duration4 = '4h 50m';
      aircraftLong = 'Boeing 737 MAX 8';
      aircraftMed = 'Airbus A320neo';
      aircraftShort = 'Airbus A321neo';
    } else if (routeData.category === 'usa') {
      duration1 = '9h 15m';
      duration2 = '9h 40m';
      duration3 = '10h 50m';
      duration4 = '11h 25m';
      aircraftLong = 'Airbus A350-900';
      aircraftMed = 'Boeing 787-9 Dreamliner';
      aircraftShort = 'Airbus A330-900neo';
    } else if (routeData.category === 'europa') {
      duration1 = '12h 10m';
      duration2 = '12h 35m';
      duration3 = '12h 50m';
      duration4 = '13h 20m';
      aircraftLong = 'Airbus A350-900';
      aircraftMed = 'Boeing 777-300ER';
      aircraftShort = 'Airbus A350-1000';
    }

    const baggageDesc = routeData.category === 'cabotaje' || routeData.category === 'indonesia'
      ? (cabinClass === 'Business' || cabinClass === 'First' ? 'Equipaje 2x 32 kg + Lounge VIP' : 'Equipaje de mano 7 kg')
      : (cabinClass === 'Business' || cabinClass === 'First' ? 'Equipaje 3x 32 kg + Lounge VIP' : 'Equipaje despachado 23 kg + 10 kg cabina');

    return [
      {
        id: `synth-${orig.code}-${dest.code}-1`,
        flightNumber: `MDK ${Math.floor(200 + (orig.code.charCodeAt(0) * 7) % 700)}`,
        origin: orig,
        destination: dest,
        departureTime: '07:15',
        arrivalTime: '09:05',
        duration: duration1,
        isDirect: true,
        stopsCount: 0,
        aircraft: aircraftMed,
        fares: {
          basic: Math.round(b * classMultiplier),
          smart: Math.round(b * 1.3 * classMultiplier),
          flex: Math.round(b * 1.65 * classMultiplier),
        },
        baggageIncluded: baggageDesc,
      },
      {
        id: `synth-${orig.code}-${dest.code}-2`,
        flightNumber: `MDK ${Math.floor(250 + (dest.code.charCodeAt(0) * 11) % 650)}`,
        origin: orig,
        destination: dest,
        departureTime: '11:40',
        arrivalTime: '13:35',
        duration: duration2,
        isDirect: true,
        stopsCount: 0,
        aircraft: aircraftLong,
        fares: {
          basic: Math.round((b + routeData.variationRange * 0.6) * classMultiplier),
          smart: Math.round((b + routeData.variationRange * 0.6) * 1.3 * classMultiplier),
          flex: Math.round((b + routeData.variationRange * 0.6) * 1.65 * classMultiplier),
        },
        baggageIncluded: baggageDesc,
      },
      {
        id: `synth-${orig.code}-${dest.code}-3`,
        flightNumber: `MDK ${Math.floor(300 + (orig.code.charCodeAt(1) * 13) % 600)}`,
        origin: orig,
        destination: dest,
        departureTime: '16:20',
        arrivalTime: '18:10',
        duration: duration3,
        isDirect: true,
        stopsCount: 0,
        aircraft: aircraftShort,
        fares: {
          basic: Math.round((b - routeData.variationRange * 0.4) * classMultiplier),
          smart: Math.round((b - routeData.variationRange * 0.4) * 1.3 * classMultiplier),
          flex: Math.round((b - routeData.variationRange * 0.4) * 1.65 * classMultiplier),
        },
        baggageIncluded: baggageDesc,
      },
      {
        id: `synth-${orig.code}-${dest.code}-4`,
        flightNumber: `MDK ${Math.floor(350 + (dest.code.charCodeAt(1) * 17) % 550)}`,
        origin: orig,
        destination: dest,
        departureTime: '20:45',
        arrivalTime: '22:35',
        duration: duration4,
        isDirect: true,
        stopsCount: 0,
        aircraft: aircraftMed,
        fares: {
          basic: Math.round((b + routeData.variationRange * 0.2) * classMultiplier),
          smart: Math.round((b + routeData.variationRange * 0.2) * 1.3 * classMultiplier),
          flex: Math.round((b + routeData.variationRange * 0.2) * 1.65 * classMultiplier),
        },
        baggageIncluded: baggageDesc,
      },
    ];
  };

  const availableFlights = getFlightsForRoute(activeOrigin, activeDest);

  // Filter flights
  const filteredFlights = availableFlights.filter(f => {
    // Stops
    if (filterStops === 'direct' && !f.isDirect) return false;

    // Time of day
    if (filterTime !== 'all') {
      const hour = parseInt(f.departureTime.split(':')[0], 10);
      if (filterTime === 'early' && hour >= 6) return false;
      if (filterTime === 'morning' && (hour < 6 || hour >= 12)) return false;
      if (filterTime === 'afternoon' && (hour < 12 || hour >= 18)) return false;
      if (filterTime === 'evening' && hour < 18) return false;
    }

    // Aircraft
    if (filterAircraft === 'A320' && !f.aircraft.includes('A320')) return false;
    if (filterAircraft === 'B737' && !f.aircraft.includes('737')) return false;

    // Max Price
    if (userMaxPrice !== null && f.fares.basic > userMaxPrice) return false;

    return true;
  });

  // Sort flights
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price') return a.fares.basic - b.fares.basic;
    if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
    if (sortBy === 'departure') return a.departureTime.localeCompare(b.departureTime);
    return 0;
  });

  // Handle Flight and Fare Selection
  const handleSelectFlightAndFare = (flight: Flight, tier: FareTier) => {
    if (isMultiCity && currentSegment) {
      // Multi-City Leg Selection
      const updatedSelections = [...selectedMultiCityFlights];
      const existingIdx = updatedSelections.findIndex(s => s.segmentId === currentSegment.id);

      const newSelectionItem = {
        segmentId: currentSegment.id,
        segmentIndex: activeSegmentIndex,
        origin: currentSegment.origin,
        destination: currentSegment.destination,
        departureDate: currentSegment.departureDate,
        flight,
        fareTier: tier,
      };

      if (existingIdx >= 0) {
        updatedSelections[existingIdx] = newSelectionItem;
      } else {
        updatedSelections.push(newSelectionItem);
      }

      setSelectedMultiCityFlights(updatedSelections);

      // Toast feedback
      const toastMsg = language === 'ES' 
        ? `✓ Tramo ${activeSegmentIndex + 1} (${currentSegment.origin.code} → ${currentSegment.destination.code}) seleccionado: ${flight.flightNumber} (${tier.toUpperCase()})`
        : `✓ Leg ${activeSegmentIndex + 1} (${currentSegment.origin.code} → ${currentSegment.destination.code}) confirmed: ${flight.flightNumber} (${tier.toUpperCase()})`;
      setMultiCitySuccessToast(toastMsg);
      setTimeout(() => setMultiCitySuccessToast(null), 3500);

      // Check if there are more legs to configure
      if (activeSegmentIndex < multiCitySegments.length - 1) {
        setActiveSegmentIndex(activeSegmentIndex + 1);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    } else {
      // Standard One-Way / Round-Trip Selection
      setSelectedOutboundFlight(flight);
      setSelectedFareTier(tier);
      setBookingStep(2); // Go to Passenger Info in Booking Flow
      navigateTo('booking');
    }
  };

  const handleFinishMultiCityBooking = () => {
    // If not all segments are selected, pick default first flight for any unselected segments
    const finalSelections = [...selectedMultiCityFlights];
    multiCitySegments.forEach((seg, idx) => {
      const exists = finalSelections.find(s => s.segmentId === seg.id);
      if (!exists) {
        const routeFlights = getFlightsForRoute(seg.origin, seg.destination);
        finalSelections.push({
          segmentId: seg.id,
          segmentIndex: idx,
          origin: seg.origin,
          destination: seg.destination,
          departureDate: seg.departureDate,
          flight: routeFlights[0],
          fareTier: 'smart',
        });
      }
    });

    setSelectedMultiCityFlights(finalSelections);
    setSelectedOutboundFlight(finalSelections[0]?.flight || availableFlights[0]);
    setSelectedFareTier(finalSelections[0]?.fareTier || 'smart');
    setBookingStep(2); // Go to Passenger Info
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
    setUserMaxPrice(null);
  };

  const isAnyFilterActive = filterStops !== 'all' || filterTime !== 'all' || filterAircraft !== 'all' || userMaxPrice !== null;
  const totalPassengers = passengers.adults + passengers.children + passengers.infants;

  // Surrounding days calculation (-3 to +3)
  const baseDate = activeDate ? new Date(activeDate + 'T00:00:00') : new Date('2026-10-15T00:00:00');
  const surroundingDays = [-3, -2, -1, 0, 1, 2, 3].map(offset => {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + offset);
    const dateStr = d.toISOString().split('T')[0];
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    const dayFares = getMonthFares(activeOrigin.code, activeDest.code, year, month);
    const matchFare = dayFares.find(f => f.date === dateStr);
    const dayOfWeekShort = d.toLocaleDateString(language === 'ES' ? 'es-ES' : 'en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    return {
      date: dateStr,
      dayNum,
      dayOfWeekShort,
      priceUSD: matchFare?.priceUSD || 54,
      isLowest: matchFare?.isLowest || false,
      isCurrent: dateStr === activeDate,
    };
  });

  // Calculate multi-city total confirmed price
  const multiCityTotalCost = selectedMultiCityFlights.reduce(
    (sum, item) => sum + (item.flight.fares[item.fareTier] || 60), 0
  );

  const allMultiCityLegsSelected = isMultiCity && multiCitySegments.every(seg => 
    selectedMultiCityFlights.some(s => s.segmentId === seg.id)
  );

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ACTIVE LOCKED FARE HERO BANNER */}
        {lockedFare && (
          <div className="bg-gradient-to-r from-[#263A79] via-[#45469C] to-[#5F429A] text-white p-5 rounded-2xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/20 animate-in fade-in">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0 shadow-inner">
                <Lock className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-400 text-[#191A23] px-2 py-0.5 rounded shadow-xs">
                    {t('TARIFA CONGELADA ACTIVA', 'LOCKED FARE ACTIVE')}
                  </span>
                  <span className="font-mono text-xs font-bold text-emerald-200">
                    {lockedFare.lockCode}
                  </span>
                  <span className="text-[11px] text-white/80">
                    · {lockedFare.durationHours}h {t('de protección garantizada', 'guaranteed price protection')}
                  </span>
                </div>
                <div className="font-extrabold text-base text-white mt-1">
                  {lockedFare.flight.flightNumber} ({lockedFare.flight.origin.code} → {lockedFare.flight.destination.code}) · Tarifa {lockedFare.fareTier.toUpperCase()}: <span className="font-mono text-emerald-300">{formatPrice(lockedFare.priceUSD)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 self-end md:self-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedOutboundFlight(lockedFare.flight);
                  setSelectedFareTier(lockedFare.fareTier);
                  setBookingStep(2);
                  navigateTo('booking');
                }}
                className="px-5 py-2.5 bg-white hover:bg-neutral-100 text-[#263A79] font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{t('EMITIR CON PRECIO CONGELADO', 'BOOK WITH LOCKED FARE')}</span>
                <ArrowRight className="w-4 h-4 text-[#5F429A]" />
              </button>

              <button
                type="button"
                onClick={() => setLockedFare(null)}
                className="p-2 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title={t('Cerrar aviso', 'Dismiss')}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Navigation back and header summary */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#465B71] hover:text-[#5F429A] transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('Volver a modificar búsqueda', 'Back to search criteria')}</span>
            </button>

            {isMultiCity ? (
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F429A]/10 text-[#5F429A] text-xs font-black uppercase tracking-wider">
                  <Plane className="w-3.5 h-3.5" />
                  <span>{t('VIAJE MULTIDESTINO', 'MULTI-CITY TRIP')} · {multiCitySegments.length} {t('TRAMOS', 'LEGS')}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl font-black text-[#263A79]">
                  {multiCitySegments.map((s, idx) => (
                    <React.Fragment key={s.id}>
                      <span className="font-mono">{s.origin.code}</span>
                      <span className="text-[#5F429A]">→</span>
                      {idx === multiCitySegments.length - 1 && <span className="font-mono">{s.destination.code}</span>}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-xs text-[#465B71]">
                  {totalPassengers} {totalPassengers > 1 ? t('pasajeros', 'passengers') : t('pasajero', 'passenger')} · {t('Selecciona tu vuelo tramo por tramo', 'Select your flights leg by leg')}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <h1 className="font-display text-2xl sm:text-3xl font-black text-[#263A79] tracking-tight">
                    {originAirport.city} ({originAirport.code})
                  </h1>
                  <span className="text-[#5F429A] font-bold text-xl">→</span>
                  <h1 className="font-display text-2xl sm:text-3xl font-black text-[#263A79] tracking-tight">
                    {destinationAirport.city} ({destinationAirport.code})
                  </h1>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#465B71]">
                  <span className="font-semibold text-[#191A23]">{departureDate}</span>
                  {tripType === 'roundTrip' && returnDate && (
                    <>
                      <span>·</span>
                      <span>{t('Regreso:', 'Return:')} <strong className="text-[#191A23]">{returnDate}</strong></span>
                    </>
                  )}
                  <span>·</span>
                  <span>{totalPassengers} {totalPassengers > 1 ? t('pasajeros', 'passengers') : t('pasajero', 'passenger')}</span>
                  <span>·</span>
                  <span className="font-semibold text-[#5F429A]">{tripType === 'roundTrip' ? t('Ida y vuelta', 'Round trip') : t('Solo ida', 'One-way')}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => navigateTo('fare-calendar')}
              className="px-3.5 sm:px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t('Matriz de Precios', 'Fare Calendar')}</span>
            </button>

            <button
              onClick={() => setIsAlertModalOpen(true)}
              className="px-3.5 sm:px-4 py-2.5 bg-[#5F429A]/10 hover:bg-[#5F429A]/20 text-[#5F429A] border border-[#5F429A]/30 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <Bell className="w-4 h-4 shrink-0" />
              <span>{alertCreated ? t('Alerta Activa', 'Alert Active') : t('Crear Alerta de Tarifa', 'Set Fare Alert')}</span>
            </button>
          </div>
        </div>

        {/* MULTI-CITY SEGMENT STEPPER TABS (ONLY FOR MULTI-CITY) */}
        {isMultiCity && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200/90 shadow-sm space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-[#263A79] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#5F429A]" />
                <span>{t('SELECCIÓN DE VUELOS POR TRAMO', 'LEG-BY-LEG FLIGHT SELECTION')}</span>
              </span>
              <span className="text-xs font-bold text-[#5F429A]">
                {selectedMultiCityFlights.length} / {multiCitySegments.length} {t('tramos elegidos', 'legs selected')}
              </span>
            </div>

            {/* Segment Tab Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {multiCitySegments.map((seg, idx) => {
                const isCurrent = activeSegmentIndex === idx;
                const chosen = selectedMultiCityFlights.find(s => s.segmentId === seg.id);

                return (
                  <button
                    key={seg.id}
                    type="button"
                    onClick={() => setActiveSegmentIndex(idx)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                      isCurrent
                        ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-md ring-2 ring-[#5F429A]/30'
                        : chosen
                        ? 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:border-emerald-400'
                        : 'bg-neutral-50 text-[#191A23] border-neutral-200 hover:border-[#5F429A]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className={isCurrent ? 'text-white/80' : 'text-[#465B71]'}>
                        {t('TRAMO', 'LEG')} {idx + 1}
                      </span>
                      {chosen ? (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-black">
                          <Check className="w-3 h-3" />
                          <span>{chosen.flight.flightNumber}</span>
                        </span>
                      ) : isCurrent ? (
                        <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-extrabold uppercase">
                          {t('ELIGIENDO', 'ACTIVE')}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#465B71] uppercase">{t('PENDIENTE', 'PENDING')}</span>
                      )}
                    </div>

                    <div className="font-extrabold text-sm sm:text-base leading-snug truncate">
                      {seg.origin.city} ({seg.origin.code}) → {seg.destination.city} ({seg.destination.code})
                    </div>
                    <div className={`text-xs mt-0.5 ${isCurrent ? 'text-white/85' : 'text-[#465B71]'}`}>
                      {seg.departureDate}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Notification Toast */}
            {multiCitySuccessToast && (
              <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{multiCitySuccessToast}</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => setMultiCitySuccessToast(null)}
                  className="text-emerald-700 hover:text-emerald-900"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* ALL LEGS SELECTED CONSOLIDATED SUMMARY (MULTI-CITY) */}
        {isMultiCity && (allMultiCityLegsSelected || selectedMultiCityFlights.length >= 2) && (
          <div className="bg-gradient-to-r from-[#263A79] via-[#45469C] to-[#5F429A] rounded-2xl p-5 sm:p-7 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-emerald-400 text-emerald-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span>{t('ITINERARIO MULTITRAYECTO CONFIGURADO', 'MULTI-CITY ITINERARY READY')}</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black">
                {multiCitySegments.length} {t('vuelos seleccionados en tu ruta', 'flights selected for your route')}
              </h3>
              <p className="text-xs text-neutral-200">
                {t('Podés revisar o cambiar cualquier tramo pulsando sobre sus pestañas arriba.', 'You can modify any leg anytime before confirming.')}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div className="text-center sm:text-right">
                <span className="text-[10px] uppercase tracking-wider text-neutral-300 block">
                  {t('PRECIO TOTAL ESTIMADO', 'TOTAL ESTIMATED FARE')}
                </span>
                <span className="font-mono text-2xl sm:text-3xl font-black text-amber-300">
                  {formatPrice(multiCityTotalCost || 135)}
                </span>
                <span className="text-[10px] text-emerald-300 block">
                  {t('Incluye todos los tramos e impuestos', 'Includes all legs & taxes')}
                </span>
              </div>

              <button
                type="button"
                onClick={handleFinishMultiCityBooking}
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 text-xs font-black tracking-wider uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>{t('CONTINUAR A ASIENTOS', 'CONTINUE TO SEATS')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SURROUNDING DAYS QUICK FARES BAR (Smooth touch horizontal scroll on mobile) */}
        {!isMultiCity && (
          <div className="bg-white rounded-2xl p-4 border border-neutral-200/90 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#465B71] px-1">
              <span>{t('Fechas cercanas (±3 días) con mejor precio garantizado:', 'Nearby dates (±3 days) with lowest fares:')}</span>
              <span className="text-[11px] text-[#5F429A]">{activeOrigin.code} ⇄ {activeDest.code}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {surroundingDays.map(item => (
                <button
                  key={item.date}
                  type="button"
                  onClick={() => setDepartureDate(item.date)}
                  className={`flex-1 min-w-[90px] p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    item.isCurrent
                      ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-md'
                      : 'bg-[#FAF9FD] hover:bg-neutral-100 text-[#191A23] border-neutral-200'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                    {item.dayOfWeekShort} {item.dayNum}
                  </div>
                  <div className="font-mono font-bold text-xs sm:text-sm mt-0.5 tabular-nums">
                    {formatPrice(item.priceUSD)}
                  </div>
                  {item.isLowest && (
                    <span className={`text-[8px] font-black uppercase px-1 rounded-sm mt-1 inline-block ${
                      item.isCurrent ? 'bg-white text-[#5F429A]' : 'bg-emerald-600 text-white'
                    }`}>
                      {t('MÍNIMO', 'LOW')}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SECTION HEADER: Current Leg or Single Trip flight options */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-black text-[#263A79]">
              {isMultiCity ? (
                <span>
                  {t('Vuelos para el Tramo', 'Flights for Leg')} {activeSegmentIndex + 1}: {activeOrigin.city} ({activeOrigin.code}) → {activeDest.city} ({activeDest.code})
                </span>
              ) : (
                <span>{t('Vuelos de salida disponibles', 'Available departure flights')}</span>
              )}
            </h2>
            <p className="text-xs text-[#465B71]">
              {sortedFlights.length} {sortedFlights.length === 1 ? t('opción disponible', 'option available') : t('opciones disponibles', 'options available')} · {activeDate}
            </p>
          </div>

          {/* Quick Filter toggle button for mobile */}
          <button
            type="button"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer ${
              showAdvancedFilters || isAnyFilterActive
                ? 'bg-[#5F429A] text-white border-[#5F429A]'
                : 'bg-white text-[#263A79] border-neutral-300 hover:border-[#5F429A]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{showAdvancedFilters ? t('Ocultar filtros', 'Hide filters') : t('Filtros avanzados', 'Advanced filters')}</span>
            {isAnyFilterActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>

        {/* ADVANCED FILTER PANEL (Collapsible) */}
        {showAdvancedFilters && (
          <div className="bg-white rounded-2xl p-5 border border-[#5F429A]/30 shadow-md space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#263A79] flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#5F429A]" />
                <span>{t('FILTRAR RESULTADOS', 'FILTER RESULTS')}</span>
              </span>
              {isAnyFilterActive && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs text-rose-600 hover:underline font-bold"
                >
                  {t('Restablecer todos', 'Reset all')}
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Stops */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#465B71] uppercase tracking-wider text-[10px] block">
                  {t('ESCALAS', 'STOPS')}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFilterStops('all')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      filterStops === 'all'
                        ? 'bg-[#263A79] text-white border-[#263A79]'
                        : 'bg-neutral-50 text-[#465B71] border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {t('Todos', 'All')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterStops('direct')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      filterStops === 'direct'
                        ? 'bg-[#263A79] text-white border-[#263A79]'
                        : 'bg-neutral-50 text-[#465B71] border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {t('Solo directos', 'Direct only')}
                  </button>
                </div>
              </div>

              {/* Time of Day */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#465B71] uppercase tracking-wider text-[10px] block">
                  {t('HORARIO DE SALIDA', 'DEPARTURE TIME')}
                </label>
                <select
                  value={filterTime}
                  onChange={e => setFilterTime(e.target.value as any)}
                  className="w-full h-9 px-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs font-bold text-[#263A79]"
                >
                  <option value="all">{t('Cualquier horario', 'Any time')}</option>
                  <option value="morning">{t('Mañana (06:00 - 12:00)', 'Morning (06:00 - 12:00)')}</option>
                  <option value="afternoon">{t('Tarde (12:00 - 18:00)', 'Afternoon (12:00 - 18:00)')}</option>
                  <option value="evening">{t('Noche (18:00 en adelante)', 'Evening (18:00+)')}</option>
                </select>
              </div>

              {/* Aircraft */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#465B71] uppercase tracking-wider text-[10px] block">
                  {t('FLOTA / AERONAVE', 'AIRCRAFT')}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFilterAircraft('all')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      filterAircraft === 'all'
                        ? 'bg-[#263A79] text-white border-[#263A79]'
                        : 'bg-neutral-50 text-[#465B71] border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {t('Todas', 'All')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterAircraft('A320')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      filterAircraft === 'A320'
                        ? 'bg-[#263A79] text-white border-[#263A79]'
                        : 'bg-neutral-50 text-[#465B71] border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    Airbus A320
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterAircraft('B737')}
                    className={`flex-1 py-2 rounded-lg font-bold border transition-colors ${
                      filterAircraft === 'B737'
                        ? 'bg-[#263A79] text-white border-[#263A79]'
                        : 'bg-neutral-50 text-[#465B71] border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    Boeing 737
                  </button>
                </div>
              </div>

              {/* Max Price Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#465B71] uppercase tracking-wider text-[10px]">
                    {t('PRECIO MÁXIMO', 'MAX PRICE')}
                  </label>
                  <span className="font-mono font-bold text-[#5F429A]">{formatPrice(effectiveMaxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={Math.round(routeInfo.basePrice * classMultiplier * 0.7)}
                  max={maxPriceCap}
                  step={routeInfo.basePrice > 300 ? 25 : 5}
                  value={effectiveMaxPrice}
                  onChange={e => setUserMaxPrice(parseInt(e.target.value, 10))}
                  className="w-full accent-[#5F429A]"
                />
              </div>
            </div>
          </div>
        )}

        {/* FLIGHT RESULTS LIST */}
        <div className="space-y-4">
          {sortedFlights.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center space-y-4 border border-neutral-200">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="font-bold text-base text-[#263A79]">
                {t('No encontramos vuelos con esos filtros exactos', 'No flights found with these filters')}
              </h3>
              <p className="text-xs text-[#465B71]">
                {t('Probá restableciendo los filtros o ampliando el rango de precio máximo.', 'Try adjusting your filters or price slider.')}
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-5 py-2.5 bg-[#5F429A] text-white text-xs font-bold rounded-xl"
              >
                {t('Restablecer filtros', 'Reset filters')}
              </button>
            </div>
          ) : (
            sortedFlights.map(flight => {
              const isExpanded = expandedFlightId === flight.id;

              return (
                <div 
                  key={flight.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  {/* Top Flight Card Row */}
                  <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    
                    {/* Airline + Flight # + Aircraft badge */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F429A] to-[#263A79] flex items-center justify-center text-white shrink-0 shadow-xs">
                        <Plane className="w-5 h-5 -rotate-45" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#191A23] flex items-center gap-2">
                          <span>{flight.flightNumber}</span>
                          <span className="text-[10px] font-semibold bg-neutral-100 text-[#465B71] px-2 py-0.5 rounded-full">
                            {flight.aircraft}
                          </span>
                        </div>
                        <div className="text-xs text-[#465B71]">
                          Mudik Airways · {flight.baggageIncluded}
                        </div>
                      </div>
                    </div>

                    {/* Flight Times & Duration Center Block */}
                    <div className="flex items-center justify-between sm:justify-center gap-6 sm:gap-10">
                      
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

                      {/* Timeline Route bar */}
                      <div className="flex flex-col items-center min-w-[100px] sm:min-w-[140px]">
                        <span className="text-[11px] font-semibold text-[#465B71] mb-1">
                          {flight.duration}
                        </span>
                        
                        <div className="w-full flex items-center gap-1.5">
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
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs cursor-pointer ${
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
                  {isExpanded && (() => {
                    const getTierData = (tier: 'basic' | 'smart' | 'flex') => {
                      if (cabinClass === 'First') {
                        if (tier === 'basic') {
                          return {
                            title: 'FIRST SUITE',
                            desc: t('Privacidad total con suite cerrada.', 'Total privacy in enclosed suite.'),
                            badge: null,
                            items: [
                              t('Suite privada con puerta corrediza', 'Enclosed suite with privacy door'),
                              t('2 valijas de 32 kg despachadas', '2x 32 kg checked baggage'),
                              t('Acceso a Mudik VIP First Dining', 'First Class VIP lounge & dining'),
                              t('Servicio de champán y caviar', 'Welcome caviar & champagne service'),
                            ]
                          };
                        }
                        if (tier === 'smart') {
                          return {
                            title: 'FIRST SIGNATURE',
                            desc: t('Chofer privado y cama doble en vuelo.', 'Private chauffeur & double bed suite.'),
                            badge: t('RECOMENDADA FIRST', 'SIGNATURE FIRST'),
                            items: [
                              t('Suite convertible a cama matrimonial', 'Suite convertible to double bed'),
                              t('Traslado en auto privado con chofer', 'Private chauffeur transfer included'),
                              t('3 valijas de 32 kg despachadas', '3x 32 kg checked baggage'),
                              t('Menú de autor diseñado por chef', 'Multi-course menu by master chef'),
                              t('Mudik Points x3 en todas las millas', '3x Mudik Points earn rate'),
                            ]
                          };
                        }
                        return {
                          title: 'FIRST ULTRA RESIDENCE',
                          desc: t('Cúspide del lujo sin penalidades.', 'Ultimate aviation luxury & zero penalties.'),
                          badge: null,
                          items: [
                            t('Suite de dos ambientes The Residence', 'The Residence two-room private suite'),
                            t('Mayordomo personal y conserje 24/7', 'Personal butler & 24/7 concierge'),
                            t('Equipaje ilimitado en bodega', 'Unlimited checked baggage'),
                            t('Cambios y cancelaciones libres sin cargo', 'Free date changes & cancellation'),
                          ]
                        };
                      }

                      if (cabinClass === 'Business') {
                        if (tier === 'basic') {
                          return {
                            title: 'BUSINESS ESSENTIAL',
                            desc: t('Camas Lie-Flat y lounge VIP.', 'Lie-Flat bed & VIP lounge access.'),
                            badge: null,
                            items: [
                              t('Asiento cama Lie-Flat reclinable 180°', '180° Lie-Flat bed seat'),
                              t('2 valijas despachadas de 23 kg', '2x 23 kg checked baggage'),
                              t('Acceso exclusivo a Mudik Lounge VIP', 'Mudik VIP Lounge access'),
                              t('Embarque prioritario Grupo 1', 'Group 1 priority boarding'),
                            ]
                          };
                        }
                        if (tier === 'smart') {
                          return {
                            title: 'BUSINESS COMFORT',
                            desc: t('La experiencia ejecutiva más completa.', 'Most complete executive experience.'),
                            badge: t('RECOMENDADA BUSINESS', 'BEST BUSINESS'),
                            items: [
                              t('Asiento Lie-Flat con acceso directo a pasillo', 'Direct aisle access Lie-Flat suite'),
                              t('2 valijas despachadas de 32 kg', '2x 32 kg checked baggage'),
                              t('Menú caliente gourmet maridado con vinos', 'Hot gourmet dining with wine pairing'),
                              t('Fast-Track en seguridad y migraciones', 'Fast-Track security & customs lane'),
                              t('Mudik Points x2.5', '2.5x Mudik Points'),
                            ]
                          };
                        }
                        return {
                          title: 'BUSINESS FREEDOM',
                          desc: t('Máxima flexibilidad para tu agenda.', 'Total flexibility for your schedule.'),
                          badge: null,
                          items: [
                            t('Suite ejecutiva con panel de privacidad', 'Executive suite with privacy divider'),
                            t('3 valijas despachadas de 32 kg', '3x 32 kg checked baggage'),
                            t('Cambios de fecha sin penalización', 'Unlimited free date changes'),
                            t('Salas de duchas privadas en Mudik Lounge', 'Private arrival shower suites in lounge'),
                          ]
                        };
                      }

                      if (cabinClass === 'Premium') {
                        if (tier === 'basic') {
                          return {
                            title: 'PREMIUM LIGHT',
                            desc: t('Más espacio y cabina exclusiva.', 'More legroom in dedicated cabin.'),
                            badge: null,
                            items: [
                              t('Asiento ergonómico con +20% reclinación', 'Ergonomic seat with +20% recline'),
                              t('1 valija de 23 kg + 10 kg cabina', '23 kg checked baggage + 10 kg carry-on'),
                              t('Embarque preferencial Grupo 2', 'Group 2 priority boarding'),
                            ]
                          };
                        }
                        if (tier === 'smart') {
                          return {
                            title: 'PREMIUM COMFORT',
                            desc: t('Equipaje completo y asiento con apoya piernas.', 'Full baggage & leg rest.'),
                            badge: t('RECOMENDADA', 'POPULAR'),
                            items: [
                              t('Asiento en filas delanteras con apoya piernas', 'Front row seat with leg rest'),
                              t('2 valijas de 23 kg despachadas', '2x 23 kg checked baggage'),
                              t('Snack gourmet caliente y bebida de bienvenida', 'Hot gourmet snack & welcome drink'),
                              t('Mudik Points x2', '2x Mudik Points'),
                            ]
                          };
                        }
                        return {
                          title: 'PREMIUM FLEX',
                          desc: t('Flexibilidad y todos los beneficios incluidos.', 'Full flexibility & premium comfort.'),
                          badge: null,
                          items: [
                            t('Asiento premium con máximo espacio', 'Premium seat with maximum legroom'),
                            t('2 valijas de 23 kg + bolso 10 kg', '2x 23 kg checked + 10 kg carry-on'),
                            t('Cambios de fecha sin penalización', 'Free date changes'),
                            t('Pase a Mudik Lounge con 50% de descuento', '50% off Mudik Lounge day pass'),
                          ]
                        };
                      }

                      // Standard Economy
                      if (tier === 'basic') {
                        return {
                          title: 'BASIC',
                          desc: t('Para viajar liviano al mejor precio.', 'Travel light for the lowest cost.'),
                          badge: null,
                          items: [
                            t('Mochila o bolso de mano (7 kg)', 'Cabin bag 7 kg'),
                            t('Check-in online anticipado', 'Online check-in'),
                            t('Sin equipaje en bodega', 'No checked baggage'),
                          ]
                        };
                      }
                      if (tier === 'smart') {
                        return {
                          title: 'SMART',
                          desc: t('El equilibrio perfecto para tus vacaciones.', 'Perfect balance for your holiday.'),
                          badge: t('RECOMENDADA', 'POPULAR'),
                          items: [
                            t('Equipaje en bodega de 20 kg', '20 kg checked baggage'),
                            t('Bolso de mano 7 kg', 'Cabin bag 7 kg'),
                            t('Selección de asiento estándar gratuita', 'Standard seat selection included'),
                            t('Acumula Mudik Points x2', '2x Mudik Points'),
                          ]
                        };
                      }
                      return {
                        title: 'FLEX',
                        desc: t('Flexibilidad total para cambios de fecha.', 'Full flexibility and priority.'),
                        badge: null,
                        items: [
                          t('Equipaje en bodega de 30 kg', '30 kg checked baggage'),
                          t('Asiento extra legroom sin cargo', 'Extra legroom seat free'),
                          t('Cambios de fecha sin penalización', 'Free date changes'),
                          t('Embarque prioritario', 'Priority boarding'),
                        ]
                      };
                    };

                    const basicInfo = getTierData('basic');
                    const smartInfo = getTierData('smart');
                    const flexInfo = getTierData('flex');

                    return (
                      <div className="bg-[#FAF9FD] p-5 sm:p-6 border-t border-neutral-200">
                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-sm text-[#263A79]">
                              {t('Elegí tu paquete de tarifa para este tramo', 'Choose your fare package')}
                            </h4>
                            <p className="text-xs text-[#465B71]">
                              {t('Tarifas transparentes con todo lo que necesitás según tu clase.', 'Transparent fares tailored to your selected cabin class.')}
                            </p>
                          </div>
                          <span className="self-start sm:self-auto text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#5F429A]/10 text-[#5F429A] border border-[#5F429A]/20">
                            {cabinClass === 'Economy' && 'CLASE ECONOMY'}
                            {cabinClass === 'Premium' && 'PREMIUM ECONOMY'}
                            {cabinClass === 'Business' && 'BUSINESS CLASS EJECUTIVA'}
                            {cabinClass === 'First' && 'FIRST CLASS PRIMERA CLASE'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* BASIC TIER */}
                          <div className="bg-white rounded-xl p-5 border border-neutral-200 flex flex-col justify-between hover:border-[#5F429A] transition-all">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-display font-extrabold text-base text-[#263A79]">{basicInfo.title}</span>
                                <span className="font-mono font-bold text-lg text-[#191A23]">{formatPrice(flight.fares.basic)}</span>
                              </div>
                              <p className="text-xs text-[#465B71]">{basicInfo.desc}</p>

                              <ul className="space-y-2 text-xs text-[#465B71] pt-2 border-t border-neutral-100">
                                {basicInfo.items.map((feat, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2 mt-6">
                              <button
                                onClick={() => handleSelectFlightAndFare(flight, 'basic')}
                                className="w-full py-2.5 bg-neutral-100 hover:bg-[#5F429A] hover:text-white text-[#263A79] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                {t('ELEGIR', 'SELECT')} {basicInfo.title}
                              </button>
                              <button
                                type="button"
                                onClick={() => setLockTarget({ flight, tier: 'basic' })}
                                className="w-full py-1.5 text-[11px] font-bold text-[#5F429A] hover:bg-[#5F429A]/10 rounded-lg border border-[#5F429A]/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                title={t('Congelar tarifa por 24h o 48h', 'Lock this fare for 24h or 48h')}
                              >
                                <Lock className="w-3 h-3" />
                                <span>{t('Congelar tarifa', 'Lock fare')}</span>
                              </button>
                            </div>
                          </div>

                          {/* SMART TIER (RECOMMENDED) */}
                          <div className="bg-white rounded-xl p-5 border-2 border-[#5F429A] relative shadow-sm flex flex-col justify-between">
                            {smartInfo.badge && (
                              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5F429A] text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow-xs">
                                {smartInfo.badge}
                              </div>
                            )}

                            <div className="space-y-3 pt-1">
                              <div className="flex items-center justify-between">
                                <span className="font-display font-extrabold text-base text-[#5F429A]">{smartInfo.title}</span>
                                <span className="font-mono font-bold text-lg text-[#5F429A]">{formatPrice(flight.fares.smart)}</span>
                              </div>
                              <p className="text-xs text-[#465B71]">{smartInfo.desc}</p>

                              <ul className="space-y-2 text-xs text-[#465B71] pt-2 border-t border-neutral-100">
                                {smartInfo.items.map((feat, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2 mt-6">
                              <button
                                onClick={() => handleSelectFlightAndFare(flight, 'smart')}
                                className="w-full py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-lg transition-all shadow-sm cursor-pointer"
                              >
                                {t('ELEGIR', 'SELECT')} {smartInfo.title}
                              </button>
                              <button
                                type="button"
                                onClick={() => setLockTarget({ flight, tier: 'smart' })}
                                className="w-full py-1.5 text-[11px] font-bold text-[#5F429A] hover:bg-[#5F429A]/10 rounded-lg border border-[#5F429A]/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                title={t('Congelar tarifa por 24h o 48h', 'Lock this fare for 24h or 48h')}
                              >
                                <Lock className="w-3 h-3" />
                                <span>{t('Congelar tarifa', 'Lock fare')}</span>
                              </button>
                            </div>
                          </div>

                          {/* FLEX TIER */}
                          <div className="bg-white rounded-xl p-5 border border-neutral-200 flex flex-col justify-between hover:border-[#5F429A] transition-all">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-display font-extrabold text-base text-[#263A79]">{flexInfo.title}</span>
                                <span className="font-mono font-bold text-lg text-[#191A23]">{formatPrice(flight.fares.flex)}</span>
                              </div>
                              <p className="text-xs text-[#465B71]">{flexInfo.desc}</p>

                              <ul className="space-y-2 text-xs text-[#465B71] pt-2 border-t border-neutral-100">
                                {flexInfo.items.map((feat, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                    <span>{feat}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-2 mt-6">
                              <button
                                onClick={() => handleSelectFlightAndFare(flight, 'flex')}
                                className="w-full py-2.5 bg-neutral-100 hover:bg-[#5F429A] hover:text-white text-[#263A79] text-xs font-bold rounded-lg transition-colors cursor-pointer"
                              >
                                {t('ELEGIR', 'SELECT')} {flexInfo.title}
                              </button>
                              <button
                                type="button"
                                onClick={() => setLockTarget({ flight, tier: 'flex' })}
                                className="w-full py-1.5 text-[11px] font-bold text-[#5F429A] hover:bg-[#5F429A]/10 rounded-lg border border-[#5F429A]/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                                title={t('Congelar tarifa por 24h o 48h', 'Lock this fare for 24h or 48h')}
                              >
                                <Lock className="w-3 h-3" />
                                <span>{t('Congelar tarifa', 'Lock fare')}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

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
                    {activeOrigin.code} → {activeDest.code}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAlertModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
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
                    {activeOrigin.city} ({activeOrigin.code}) ➔ {activeDest.city} ({activeDest.code})
                  </span>
                  <span className="text-[#465B71] block">
                    {t('Fecha de salida:', 'Departure:')} {activeDate}
                  </span>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#465B71] uppercase tracking-wider text-[10px]">
                    {t('Avisarme si el precio baja de:', 'Notify me if fare drops below:')}
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-base text-[#5F429A]">{formatPrice(alertTargetPrice)}</span>
                    <input
                      type="range"
                      min="35"
                      max="150"
                      step="5"
                      value={alertTargetPrice}
                      onChange={e => setAlertTargetPrice(parseInt(e.target.value, 10))}
                      className="flex-1 accent-[#5F429A]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#465B71] uppercase tracking-wider text-[10px]">
                    {t('Tu correo electrónico:', 'Your email address:')}
                  </label>
                  <input
                    type="email"
                    required
                    value={alertEmail}
                    onChange={e => setAlertEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-xs text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Bell className="w-4 h-4" />
                  <span>{t('ACTIVAR ALERTA GRATUITA', 'ACTIVATE FREE ALERT')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Fare Lock Modal */}
      {lockTarget && (
        <FareLockModal
          isOpen={Boolean(lockTarget)}
          onClose={() => setLockTarget(null)}
          flight={lockTarget.flight}
          fareTier={lockTarget.tier}
        />
      )}

    </div>
  );
};
