import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FLIGHT_STATUSES, AIRPORTS } from '../../data/mockData';
import { FlightStatusRecord, FlightStatusType } from '../../types';
import { 
  Search, 
  Plane, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight,
  MapPin,
  Calendar
} from 'lucide-react';

export const FlightStatusView: React.FC = () => {
  const { t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterStatus, setActiveFilterStatus] = useState<'ALL' | FlightStatusType>('ALL');

  const filteredStatuses = FLIGHT_STATUSES.filter(record => {
    const query = searchQuery.trim().toLowerCase();
    const matchNumber = record.flightNumber.toLowerCase().includes(query);
    const matchOrigin = record.route.origin.city.toLowerCase().includes(query) || record.route.origin.code.toLowerCase().includes(query);
    const matchDest = record.route.destination.city.toLowerCase().includes(query) || record.route.destination.code.toLowerCase().includes(query);
    
    const matchesSearch = !query || matchNumber || matchOrigin || matchDest;
    const matchesStatus = activeFilterStatus === 'ALL' || record.status === activeFilterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: FlightStatusType, delayMinutes?: number) => {
    switch (status) {
      case 'ON_TIME':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t('EN HORA', 'ON TIME')}
          </span>
        );
      case 'BOARDING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#5F429A]/10 text-[#5F429A] border border-[#5F429A]/20">
            <span className="w-2 h-2 rounded-full bg-[#5F429A] animate-ping" />
            {t('EMBARCANDO', 'BOARDING')}
          </span>
        );
      case 'DELAYED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            {t(`DEMORADO (+${delayMinutes || 25} MIN)`, `DELAYED (+${delayMinutes || 25} MIN)`)}
          </span>
        );
      case 'DEPARTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-[#263A79]/10 text-[#263A79] border border-[#263A79]/20">
            <Plane className="w-3.5 h-3.5 -rotate-45" />
            {t('EN VUELO', 'EN ROUTE')}
          </span>
        );
      case 'ARRIVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" />
            {t('ATERRIZADO', 'ARRIVED')}
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            {t('CANCELADO', 'CANCELLED')}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('OPERACIONES EN VIVO', 'LIVE OPERATIONS')}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
            {t('ESTADO DEL VUELO', 'FLIGHT STATUS')}
          </h1>
          <p className="text-xs sm:text-sm text-[#465B71]">
            {t(
              'Información en tiempo real sobre salidas, llegadas, puertas de embarque y cinta de equipaje.',
              'Real-time departure, arrival, gate, and baggage carousel tracker.'
            )}
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm space-y-5">
          
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('Buscar por número de vuelo (ej. MDK 204) o ruta (ej. Jakarta, Bali, DPS)...', 'Search flight number (e.g. MDK 204) or city (e.g. Jakarta, DPS)...')}
              className="w-full h-12 pl-11 pr-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[11px] font-bold text-[#465B71] uppercase mr-1">
              {t('Filtrar:', 'Filter:')}
            </span>
            {[
              { id: 'ALL', label: t('Todos', 'All') },
              { id: 'ON_TIME', label: t('En hora', 'On time') },
              { id: 'BOARDING', label: t('Embarcando', 'Boarding') },
              { id: 'DELAYED', label: t('Demorados', 'Delayed') },
              { id: 'DEPARTED', label: t('En vuelo', 'Departed') },
              { id: 'ARRIVED', label: t('Aterrizados', 'Arrived') },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilterStatus(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  activeFilterStatus === tab.id
                    ? 'bg-[#263A79] text-white shadow-xs'
                    : 'bg-neutral-100 text-[#465B71] hover:bg-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredStatuses.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-neutral-200 text-xs text-[#465B71]">
              {t('No se encontraron vuelos que coincidan con la búsqueda.', 'No flights match your criteria.')}
            </div>
          ) : (
            filteredStatuses.map(record => (
              <div
                key={record.flightNumber}
                className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Flight Number & Status */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-bold text-sm shrink-0">
                      <Plane className="w-6 h-6 -rotate-45" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-lg text-[#191A23] font-mono">
                          {record.flightNumber}
                        </span>
                        {getStatusBadge(record.status, record.delayMinutes)}
                      </div>
                      <div className="text-xs text-[#465B71] mt-0.5">
                        {record.aircraft} · {t('Vuelo Nacional Mudik', 'Domestic Flight')}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Route & Times */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <div>
                      <div className="text-xl font-black text-[#191A23] tabular-nums">
                        {record.scheduledDeparture}
                      </div>
                      <div className="text-xs font-bold text-[#263A79]">{record.route.origin.code}</div>
                      <div className="text-[11px] text-[#465B71]">{record.route.origin.city}</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-20 sm:w-28 h-0.5 bg-neutral-300 relative flex items-center justify-center">
                        <Plane className="w-3.5 h-3.5 text-[#263A79] -rotate-45" />
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold uppercase mt-1">DIRECTO</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-black text-[#191A23] tabular-nums">
                        {record.scheduledArrival}
                      </div>
                      <div className="text-xs font-bold text-[#263A79]">{record.route.destination.code}</div>
                      <div className="text-[11px] text-[#465B71]">{record.route.destination.city}</div>
                    </div>
                  </div>

                  {/* Right: Airport Facilities (Gate, Terminal, Carousel) */}
                  <div className="flex items-center gap-4 border-t lg:border-t-0 pt-4 lg:pt-0 border-neutral-100 text-xs">
                    <div className="text-center bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-200">
                      <span className="text-[10px] uppercase font-bold text-[#465B71] block">TERMINAL</span>
                      <span className="font-extrabold text-[#191A23]">{record.terminal}</span>
                    </div>

                    <div className="text-center bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-200">
                      <span className="text-[10px] uppercase font-bold text-[#465B71] block">PUERTA</span>
                      <span className="font-extrabold text-[#5F429A]">{record.gate}</span>
                    </div>

                    <div className="text-center bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-200">
                      <span className="text-[10px] uppercase font-bold text-[#465B71] block">CINTA</span>
                      <span className="font-extrabold text-[#191A23]">{record.carousel}</span>
                    </div>
                  </div>

                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
