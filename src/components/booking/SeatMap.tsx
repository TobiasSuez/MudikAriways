import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { generateSeats } from '../../data/mockData';
import { Seat } from '../../types';
import { Check, Info, ShieldAlert, Sparkles } from 'lucide-react';

interface SeatMapProps {
  currentSeat: string;
  onSeatSelect: (seatId: string, seatPriceUSD: number) => void;
}

export const SeatMap: React.FC<SeatMapProps> = ({ currentSeat, onSeatSelect }) => {
  const { formatPrice, t } = useApp();
  const [seats] = useState<Seat[]>(() => generateSeats());

  // Group seats by row
  const rows = Array.from({ length: 24 }, (_, i) => i + 1);

  const getSeat = (row: number, col: 'A' | 'B' | 'C' | 'D' | 'E' | 'F') => {
    return seats.find(s => s.row === row && s.column === col);
  };

  const selectedSeatObj = seats.find(s => s.id === currentSeat);

  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm space-y-6">
      
      {/* Header and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h3 className="font-display text-lg font-bold text-[#263A79]">
            {t('Mapa de Asientos del Avión', 'Aircraft Seat Map')}
          </h3>
          <p className="text-xs text-[#465B71]">
            Airbus A320 · {t('Cabina de pasillo único (3-3)', 'Single aisle cabin (3-3)')}
          </p>
        </div>

        {selectedSeatObj && (
          <div className="bg-[#5F429A]/10 border border-[#5F429A]/20 px-3 py-1.5 rounded-xl text-xs flex items-center gap-2">
            <span className="font-bold text-[#5F429A]">{t('Asiento seleccionado:', 'Selected:')}</span>
            <span className="font-extrabold text-sm text-[#191A23]">{selectedSeatObj.id}</span>
            <span className="text-[#465B71]">({formatPrice(selectedSeatObj.priceUSD)})</span>
          </div>
        )}
      </div>

      {/* Seat Type Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-neutral-50 p-4 rounded-xl text-xs">
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

      {/* Airplane Fuselage Wrapper */}
      <div className="relative max-w-md mx-auto bg-neutral-100/70 p-6 rounded-3xl border-2 border-neutral-300/80 shadow-inner">
        
        {/* Cockpit Curve */}
        <div className="w-32 h-16 mx-auto bg-gradient-to-b from-neutral-300 to-neutral-200 rounded-t-full mb-6 flex items-center justify-center border-t border-x border-neutral-300">
          <span className="text-[10px] font-bold tracking-widest text-[#465B71] uppercase">Cabina</span>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-7 gap-1.5 text-center font-bold text-xs text-[#465B71] pb-3 border-b border-neutral-200 mb-3">
          <span>A</span>
          <span>B</span>
          <span>C</span>
          <span className="text-[10px] uppercase text-neutral-400">Pasillo</span>
          <span>D</span>
          <span>E</span>
          <span>F</span>
        </div>

        {/* Rows Generator */}
        <div className="space-y-2 max-h-[460px] overflow-y-auto px-1 py-1">
          {rows.map(rowNum => {
            const isExitRow = rowNum === 12 || rowNum === 14;

            return (
              <div key={rowNum} className="relative">
                {isExitRow && (
                  <div className="text-[9px] font-bold text-amber-700 bg-amber-50 py-0.5 text-center rounded my-1 flex items-center justify-center gap-1">
                    <ShieldAlert className="w-3 h-3" />
                    <span>{t('SALIDA DE EMERGENCIA · FILA ', 'EMERGENCY EXIT · ROW ')}{rowNum}</span>
                  </div>
                )}

                <div className="grid grid-cols-7 gap-1.5 items-center">
                  
                  {/* Left 3 seats (A, B, C) */}
                  {(['A', 'B', 'C'] as const).map(col => {
                    const seat = getSeat(rowNum, col);
                    if (!seat) return <div key={col} />;
                    const isSelected = seat.id === currentSeat;

                    let btnColor = 'bg-white border-neutral-300 text-[#191A23] hover:border-[#5F429A]';
                    if (seat.type === 'extraLegroom') {
                      btnColor = 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A] font-semibold';
                    } else if (seat.type === 'exitRow') {
                      btnColor = 'bg-amber-50 border-amber-500 text-amber-800 font-semibold';
                    }

                    if (isSelected) {
                      btnColor = 'bg-[#5F429A] border-[#5F429A] text-white shadow-md scale-105';
                    }

                    return (
                      <button
                        key={col}
                        type="button"
                        disabled={seat.isOccupied}
                        onClick={() => onSeatSelect(seat.id, seat.priceUSD)}
                        className={`h-9 rounded-lg border-2 text-[11px] font-bold flex items-center justify-center transition-all ${
                          seat.isOccupied 
                            ? 'bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-60' 
                            : `${btnColor} cursor-pointer active:scale-95`
                        }`}
                        title={`${seat.id} - ${seat.type} (${formatPrice(seat.priceUSD)})`}
                      >
                        {seat.isOccupied ? '✕' : seat.column}
                      </button>
                    );
                  })}

                  {/* Aisle Row Number */}
                  <div className="text-center font-bold text-[11px] text-[#465B71] select-none">
                    {rowNum}
                  </div>

                  {/* Right 3 seats (D, E, F) */}
                  {(['D', 'E', 'F'] as const).map(col => {
                    const seat = getSeat(rowNum, col);
                    if (!seat) return <div key={col} />;
                    const isSelected = seat.id === currentSeat;

                    let btnColor = 'bg-white border-neutral-300 text-[#191A23] hover:border-[#5F429A]';
                    if (seat.type === 'extraLegroom') {
                      btnColor = 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A] font-semibold';
                    } else if (seat.type === 'exitRow') {
                      btnColor = 'bg-amber-50 border-amber-500 text-amber-800 font-semibold';
                    }

                    if (isSelected) {
                      btnColor = 'bg-[#5F429A] border-[#5F429A] text-white shadow-md scale-105';
                    }

                    return (
                      <button
                        key={col}
                        type="button"
                        disabled={seat.isOccupied}
                        onClick={() => onSeatSelect(seat.id, seat.priceUSD)}
                        className={`h-9 rounded-lg border-2 text-[11px] font-bold flex items-center justify-center transition-all ${
                          seat.isOccupied 
                            ? 'bg-neutral-200 border-neutral-200 text-neutral-400 cursor-not-allowed opacity-60' 
                            : `${btnColor} cursor-pointer active:scale-95`
                        }`}
                        title={`${seat.id} - ${seat.type} (${formatPrice(seat.priceUSD)})`}
                      >
                        {seat.isOccupied ? '✕' : seat.column}
                      </button>
                    );
                  })}

                </div>
              </div>
            );
          })}
        </div>

        {/* Aircraft Tail */}
        <div className="w-24 h-6 mx-auto bg-neutral-300 rounded-b-xl mt-6 flex items-center justify-center text-[9px] text-[#465B71] font-semibold uppercase">
          Cola A320
        </div>

      </div>

      <div className="text-[11px] text-[#465B71] flex items-start gap-2 bg-[#FAF9FD] p-3 rounded-xl border border-neutral-200">
        <Info className="w-4 h-4 text-[#5F429A] shrink-0 mt-0.5" />
        <span>
          {t(
            'Los pasajeros en filas de salida de emergencia deben ser mayores de 15 años y estar físicamente aptos para asistir a la tripulación si fuera necesario.',
            'Passengers in emergency exit rows must be 15+ years of age and able to assist cabin crew in case of emergency.'
          )}
        </span>
      </div>

    </div>
  );
};
