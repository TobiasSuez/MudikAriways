import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateSeats } from '../../data/mockData';
import { Seat } from '../../types';
import { 
  Check, 
  Info, 
  ShieldAlert, 
  Sparkles, 
  Zap, 
  Tv, 
  Compass, 
  User, 
  Coffee, 
  Users,
  Eye,
  CheckCircle2
} from 'lucide-react';

export interface PassengerSeatAssignment {
  passengerIndex: number;
  passengerName: string;
  seatId: string;
  priceUSD: number;
}

interface SeatMapProps {
  currentSeat: string;
  onSeatSelect: (seatId: string, seatPriceUSD: number) => void;
  // Multi-passenger support
  passengerAssignments?: PassengerSeatAssignment[];
  activePassengerIndex?: number;
  onSelectPassengerIndex?: (index: number) => void;
  onMultiSeatSelect?: (passengerIndex: number, seatId: string, seatPriceUSD: number) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ 
  currentSeat, 
  onSeatSelect,
  passengerAssignments,
  activePassengerIndex = 0,
  onSelectPassengerIndex,
  onMultiSeatSelect
}) => {
  const { formatPrice, t, passengers } = useApp();
  const [seats] = useState<Seat[]>(() => generateSeats());
  const [hoveredSeat, setHoveredSeat] = useState<Seat | null>(null);

  // Group seats by row (Rows 1 to 24)
  const rows = Array.from({ length: 24 }, (_, i) => i + 1);

  const getSeat = (row: number, col: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    return seats.find(s => s.row === row && s.column === col);
  };

  // Find assignment by seat ID
  const getAssignmentBySeat = (seatId: string) => {
    if (!passengerAssignments) return null;
    return passengerAssignments.find(a => a.seatId === seatId) || null;
  };

  // Get active selected seat object
  const activeSelectedSeatId = passengerAssignments && passengerAssignments[activePassengerIndex] 
    ? passengerAssignments[activePassengerIndex].seatId 
    : currentSeat;

  const selectedSeatObj = seats.find(s => s.id === activeSelectedSeatId);

  const handleSeatClick = (seat: Seat) => {
    if (seat.isOccupied) return;

    if (onMultiSeatSelect && passengerAssignments) {
      onMultiSeatSelect(activePassengerIndex, seat.id, seat.priceUSD);
    } else {
      onSeatSelect(seat.id, seat.priceUSD);
    }
  };

  const getPositionLabel = (col: string) => {
    if (col === 'A' || col === 'F') return t('Ventanilla', 'Window');
    if (col === 'C' || col === 'D') return t('Pasillo', 'Aisle');
    return t('Centro', 'Middle');
  };

  const getPitchLabel = (type: string) => {
    if (type === 'extraLegroom') return '86 cm (34") Extra Legroom';
    if (type === 'exitRow') return '89 cm (35") Salida de Emergencia';
    return '76 cm (30") Estándar';
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/90 shadow-sm space-y-6">
      
      {/* Header and Aircraft Details */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display text-lg font-bold text-[#263A79]">
              {t('Mapa Interactivo de Asientos', 'Interactive Aircraft Seat Map')}
            </h3>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#5F429A]/10 text-[#5F429A] px-2 py-0.5 rounded-full">
              Airbus A320
            </span>
          </div>
          <p className="text-xs text-[#465B71] mt-0.5">
            {t('Configuración 3-3 · Pasillo único central con tomas USB y soporte lumbar', '3-3 Single aisle layout · In-seat power USB & ergonomic lumbar support')}
          </p>
        </div>

        {selectedSeatObj && (
          <div className="bg-[#5F429A]/10 border border-[#5F429A]/20 px-3.5 py-2 rounded-xl text-xs flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-[#5F429A]">
                {passengerAssignments && passengerAssignments.length > 1
                  ? `${t('Asiento para', 'Seat for')} ${passengerAssignments[activePassengerIndex]?.passengerName || `Pasajero ${activePassengerIndex + 1}`}`
                  : t('Asiento seleccionado', 'Selected Seat')}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-black text-base text-[#191A23]">{selectedSeatObj.id}</span>
                <span className="text-[#465B71] font-semibold">({getPositionLabel(selectedSeatObj.column)})</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block font-bold text-sm text-[#263A79] font-mono">
                {formatPrice(selectedSeatObj.priceUSD)}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">{t('Confirmado', 'Selected')}</span>
            </div>
          </div>
        )}
      </div>

      {/* Multi-Passenger Tab Switcher (if more than 1 passenger) */}
      {passengerAssignments && passengerAssignments.length > 1 && (
        <div className="bg-[#FAF9FD] p-3 rounded-xl border border-neutral-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#465B71]">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#5F429A]" />
              <span>{t('SELECCIONÁ EL ASIENTO PARA CADA PASAJERO:', 'ASSIGN SEATS FOR EACH PASSENGER:')}</span>
            </span>
            <span className="text-[11px] text-[#5F429A]">
              {passengerAssignments.filter(p => p.seatId).length} / {passengerAssignments.length} {t('asignados', 'assigned')}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {passengerAssignments.map((p, idx) => {
              const isActive = idx === activePassengerIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onSelectPassengerIndex && onSelectPassengerIndex(idx)}
                  className={`p-2.5 rounded-lg border text-left transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#5F429A] text-white border-[#5F429A] shadow-sm'
                      : 'bg-white text-[#263A79] border-neutral-200 hover:border-[#5F429A]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-80">
                      {t('Pasajero', 'Passenger')} {idx + 1}
                    </div>
                    <div className="text-xs font-bold truncate">
                      {p.passengerName || `${t('Pasajero', 'Passenger')} ${idx + 1}`}
                    </div>
                  </div>

                  <div className={`px-2 py-1 rounded text-xs font-mono font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-[#5F429A]'
                  }`}>
                    {p.seatId || '—'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Seat Type Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-3.5 rounded-xl text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-white border-2 border-neutral-300" />
          <span>{t('Estándar', 'Standard')} ({formatPrice(6)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#5F429A]/20 border-2 border-[#5F429A]" />
          <span>{t('Espacio extra', 'Extra Legroom')} ({formatPrice(14)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-100 border-2 border-amber-500" />
          <span>{t('Salida de emergencia', 'Exit Row')} ({formatPrice(11)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-neutral-200 text-neutral-400 flex items-center justify-center font-bold text-[10px]">✕</div>
          <span className="text-neutral-500">{t('Ocupado', 'Occupied')}</span>
        </div>
      </div>

      {/* Live Seat Feature Inspector Bar (Shows specs of hovered or selected seat) */}
      {(hoveredSeat || selectedSeatObj) && (
        <div className="bg-[#263A79] text-white p-3.5 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs animate-in fade-in duration-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#5F429A] text-white flex items-center justify-center font-mono font-black text-sm">
              {(hoveredSeat || selectedSeatObj)?.id}
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-2">
                <span>{(hoveredSeat || selectedSeatObj)?.id} · {getPositionLabel((hoveredSeat || selectedSeatObj)?.column || 'A')}</span>
                <span className="text-[10px] text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded font-mono">
                  {formatPrice((hoveredSeat || selectedSeatObj)?.priceUSD || 6)}
                </span>
              </div>
              <div className="text-[11px] text-neutral-300 flex items-center gap-2 mt-0.5">
                <span>{getPitchLabel((hoveredSeat || selectedSeatObj)?.type || 'standard')}</span>
                <span>·</span>
                <span className="flex items-center gap-1 text-emerald-300">
                  <Zap className="w-3 h-3" /> USB-C 65W
                </span>
                <span>·</span>
                <span>Reclinable 10 cm</span>
              </div>
            </div>
          </div>

          <div className="text-right text-[11px] text-neutral-300 hidden sm:block">
            {((hoveredSeat || selectedSeatObj)?.row || 1) >= 10 && ((hoveredSeat || selectedSeatObj)?.row || 1) <= 18 ? (
              <span className="text-amber-300 font-semibold">{t('Vista sobre el ala del avión', 'View over airplane wing')}</span>
            ) : (
              <span className="text-emerald-300 font-semibold">{t('Vista despejada hacia tierra / mar', 'Clear unobstructed scenic view')}</span>
            )}
          </div>
        </div>
      )}

      {/* Realistic Airplane Fuselage Container with Wings */}
      <div className="relative max-w-lg mx-auto py-4">
        
        {/* Left Wing Silhouette */}
        <div className="hidden sm:block absolute top-[280px] -left-20 w-24 h-44 bg-gradient-to-r from-neutral-300/40 via-neutral-200/50 to-transparent border-t-2 border-l-2 border-neutral-300/60 rounded-tl-[80px] pointer-events-none -rotate-6">
          <div className="absolute top-10 left-3 text-[9px] font-bold text-neutral-400 uppercase tracking-widest rotate-90">
            {t('ALA IZQUIERDA', 'LEFT WING')}
          </div>
        </div>

        {/* Right Wing Silhouette */}
        <div className="hidden sm:block absolute top-[280px] -right-20 w-24 h-44 bg-gradient-to-l from-neutral-300/40 via-neutral-200/50 to-transparent border-t-2 border-r-2 border-neutral-300/60 rounded-tr-[80px] pointer-events-none rotate-6">
          <div className="absolute top-10 right-3 text-[9px] font-bold text-neutral-400 uppercase tracking-widest -rotate-90">
            {t('ALA DERECHA', 'RIGHT WING')}
          </div>
        </div>

        {/* Main Fuselage Body */}
        <div className="relative bg-neutral-100/90 p-5 sm:p-7 rounded-[48px] border-2 border-neutral-300 shadow-inner">
          
          {/* Nose Cone & Cockpit */}
          <div className="w-40 h-20 mx-auto bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-100 rounded-t-[70px] mb-4 flex flex-col items-center justify-center border-t-2 border-x-2 border-neutral-300 relative shadow-xs">
            <div className="flex gap-3 mb-1">
              <div className="w-5 h-3 bg-[#263A79]/80 rounded-t-sm rotate-6" />
              <div className="w-5 h-3 bg-[#263A79]/80 rounded-t-sm -rotate-6" />
            </div>
            <span className="text-[9px] font-black tracking-widest text-[#263A79] uppercase">
              {t('CABINA DE PILOTOS', 'COCKPIT')}
            </span>
          </div>

          {/* Forward Galley & Lavatory */}
          <div className="flex items-center justify-between px-6 py-2 mb-4 bg-white/70 rounded-xl border border-neutral-200 text-[10px] font-bold text-[#465B71]">
            <span className="flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5 text-[#5F429A]" />
              <span>Galley / Cocina</span>
            </span>
            <span className="flex items-center gap-1">
              <span>WC / Lavatorio</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </span>
          </div>

          {/* Column Headers (A B C | Aisle | D E F) */}
          <div className="grid grid-cols-7 gap-1.5 text-center font-black text-xs text-[#263A79] pb-3 border-b-2 border-neutral-200 mb-3">
            <span>A</span>
            <span>B</span>
            <span>C</span>
            <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">{t('Pasillo', 'Aisle')}</span>
            <span>D</span>
            <span>E</span>
            <span>F</span>
          </div>

          {/* Seat Grid Rows */}
          <div className="space-y-2 max-h-[500px] overflow-y-auto px-1 py-1">
            {rows.map(rowNum => {
              const isExitRow = rowNum === 12 || rowNum === 14;
              const isOverWing = rowNum >= 10 && rowNum <= 18;

              return (
                <div key={rowNum} className="relative">
                  {/* Emergency Exit Row Sign */}
                  {isExitRow && (
                    <div className="my-1.5 py-1 px-2 rounded-lg bg-emerald-700 text-white text-[9px] font-extrabold flex items-center justify-between shadow-xs">
                      <span className="flex items-center gap-1">
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
                        <span>{t('SALIDA DE EMERGENCIA · FILA ', 'EMERGENCY EXIT · ROW ')}{rowNum}</span>
                      </span>
                      <span className="bg-emerald-800 px-1.5 py-0.5 rounded text-[8px] uppercase tracking-wider">
                        {t('MÁS ESPACIO', 'EXTRA LEGROOM')}
                      </span>
                    </div>
                  )}

                  <div className="grid grid-cols-7 gap-1.5 items-center">
                    
                    {/* Left 3 seats (A, B, C) */}
                    {(['A', 'B', 'C'] as const).map(col => {
                      const seat = getSeat(rowNum, col);
                      if (!seat) return <div key={col} />;
                      
                      const assignment = getAssignmentBySeat(seat.id);
                      const isSelectedByActive = seat.id === activeSelectedSeatId;
                      const isAssignedToOther = assignment && assignment.passengerIndex !== activePassengerIndex;

                      let btnColor = 'bg-white border-neutral-300 text-[#191A23] hover:border-[#5F429A]';
                      if (seat.type === 'extraLegroom') {
                        btnColor = 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A] font-semibold';
                      } else if (seat.type === 'exitRow') {
                        btnColor = 'bg-amber-50 border-amber-500 text-amber-800 font-semibold';
                      }

                      if (isSelectedByActive) {
                        btnColor = 'bg-[#5F429A] border-[#5F429A] text-white shadow-md scale-105 ring-2 ring-[#5F429A]/40';
                      } else if (isAssignedToOther) {
                        btnColor = 'bg-indigo-600 border-indigo-600 text-white shadow-xs';
                      }

                      return (
                        <button
                          key={col}
                          type="button"
                          disabled={seat.isOccupied}
                          onClick={() => handleSeatClick(seat)}
                          onMouseEnter={() => setHoveredSeat(seat)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={`h-9 rounded-lg border-2 text-[11px] font-bold flex flex-col items-center justify-center transition-all relative ${
                            seat.isOccupied 
                              ? 'bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-60' 
                              : `${btnColor} cursor-pointer active:scale-95`
                          }`}
                          title={`${seat.id} - ${seat.type} (${formatPrice(seat.priceUSD)})`}
                        >
                          {seat.isOccupied ? (
                            '✕'
                          ) : isSelectedByActive ? (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] leading-tight font-black">{seat.column}</span>
                              <span className="text-[7px] uppercase tracking-tighter opacity-90">
                                {passengerAssignments && passengerAssignments.length > 1 ? `P${activePassengerIndex + 1}` : 'OK'}
                              </span>
                            </div>
                          ) : isAssignedToOther ? (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] leading-tight font-black">{seat.column}</span>
                              <span className="text-[7px] uppercase tracking-tighter opacity-90">
                                P{assignment.passengerIndex + 1}
                              </span>
                            </div>
                          ) : (
                            seat.column
                          )}
                        </button>
                      );
                    })}

                    {/* Aisle Row Number */}
                    <div className="text-center font-mono font-bold text-xs text-[#465B71] select-none">
                      {rowNum}
                    </div>

                    {/* Right 3 seats (D, E, F) */}
                    {(['D', 'E', 'F'] as const).map(col => {
                      const seat = getSeat(rowNum, col);
                      if (!seat) return <div key={col} />;
                      
                      const assignment = getAssignmentBySeat(seat.id);
                      const isSelectedByActive = seat.id === activeSelectedSeatId;
                      const isAssignedToOther = assignment && assignment.passengerIndex !== activePassengerIndex;

                      let btnColor = 'bg-white border-neutral-300 text-[#191A23] hover:border-[#5F429A]';
                      if (seat.type === 'extraLegroom') {
                        btnColor = 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A] font-semibold';
                      } else if (seat.type === 'exitRow') {
                        btnColor = 'bg-amber-50 border-amber-500 text-amber-800 font-semibold';
                      }

                      if (isSelectedByActive) {
                        btnColor = 'bg-[#5F429A] border-[#5F429A] text-white shadow-md scale-105 ring-2 ring-[#5F429A]/40';
                      } else if (isAssignedToOther) {
                        btnColor = 'bg-indigo-600 border-indigo-600 text-white shadow-xs';
                      }

                      return (
                        <button
                          key={col}
                          type="button"
                          disabled={seat.isOccupied}
                          onClick={() => handleSeatClick(seat)}
                          onMouseEnter={() => setHoveredSeat(seat)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={`h-9 rounded-lg border-2 text-[11px] font-bold flex flex-col items-center justify-center transition-all relative ${
                            seat.isOccupied 
                              ? 'bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-60' 
                              : `${btnColor} cursor-pointer active:scale-95`
                          }`}
                          title={`${seat.id} - ${seat.type} (${formatPrice(seat.priceUSD)})`}
                        >
                          {seat.isOccupied ? (
                            '✕'
                          ) : isSelectedByActive ? (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] leading-tight font-black">{seat.column}</span>
                              <span className="text-[7px] uppercase tracking-tighter opacity-90">
                                {passengerAssignments && passengerAssignments.length > 1 ? `P${activePassengerIndex + 1}` : 'OK'}
                              </span>
                            </div>
                          ) : isAssignedToOther ? (
                            <div className="flex flex-col items-center">
                              <span className="text-[10px] leading-tight font-black">{seat.column}</span>
                              <span className="text-[7px] uppercase tracking-tighter opacity-90">
                                P{assignment.passengerIndex + 1}
                              </span>
                            </div>
                          ) : (
                            seat.column
                          )}
                        </button>
                      );
                    })}

                  </div>
                </div>
              );
            })}
          </div>

          {/* Aft Galley & Lavatory */}
          <div className="flex items-center justify-between px-6 py-2 mt-4 bg-white/70 rounded-xl border border-neutral-200 text-[10px] font-bold text-[#465B71]">
            <span className="flex items-center gap-1">
              <span>WC Doble Aft</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            <span className="flex items-center gap-1">
              <Coffee className="w-3.5 h-3.5 text-[#5F429A]" />
              <span>Galley Trasero</span>
            </span>
          </div>

          {/* Aircraft Tail Cone */}
          <div className="w-28 h-8 mx-auto bg-gradient-to-b from-neutral-200 to-neutral-300 rounded-b-2xl mt-4 flex items-center justify-center text-[9px] text-[#465B71] font-bold uppercase tracking-wider border-b-2 border-x-2 border-neutral-300">
            Tail Airbus A320
          </div>

        </div>
      </div>

      {/* Safety Notice */}
      <div className="text-[11px] text-[#465B71] flex items-start gap-2 bg-[#FAF9FD] p-3 rounded-xl border border-neutral-200">
        <Info className="w-4 h-4 text-[#5F429A] shrink-0 mt-0.5" />
        <span>
          {t(
            'Los pasajeros en filas de salida de emergencia (filas 12 y 14) deben ser mayores de 15 años y estar dispuestos a asistir a la tripulación en caso de contingencia.',
            'Passengers seated in emergency exit rows (rows 12 & 14) must be 15+ years of age and willing to assist cabin crew in case of emergency.'
          )}
        </span>
      </div>

    </div>
  );
};
