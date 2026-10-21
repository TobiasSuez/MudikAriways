import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Flight, FareTier } from '../../types';
import { 
  Lock, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Check, 
  X, 
  Plane, 
  AlertCircle,
  Copy,
  ArrowRight
} from 'lucide-react';

interface FareLockModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight;
  fareTier: FareTier;
}

export const FareLockModal: React.FC<FareLockModalProps> = ({
  isOpen,
  onClose,
  flight,
  fareTier
}) => {
  const { 
    formatPrice, 
    tripType, 
    departureDate, 
    returnDate, 
    t, 
    passengers,
    setLockedFare,
    lockedFare,
    navigateTo
  } = useApp();

  const [durationHours, setDurationHours] = useState<24 | 48>(24);
  const [email, setEmail] = useState('viajero@mudikairways.com');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdLockCode, setCreatedLockCode] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const passengerCount = (passengers.adults || 1) + (passengers.children || 0);
  const basePricePerPerson = flight.fares[fareTier];
  const totalFlightPrice = basePricePerPerson * passengerCount;
  
  // Lock fees: 24h = $8 USD ($16.000 ARS), 48h = $14 USD ($28.000 ARS)
  const lockFeeUSD = durationHours === 24 ? 8 : 14;

  const handleConfirmLock = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `LOCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const expires = new Date(now.getTime() + durationHours * 60 * 60 * 1000);

    setLockedFare({
      lockCode: code,
      flight,
      fareTier,
      tripType,
      departureDate,
      returnDate: tripType === 'roundTrip' ? returnDate : undefined,
      lockedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      durationHours,
      feeUSD: lockFeeUSD,
      priceUSD: totalFlightPrice
    });

    setCreatedLockCode(code);
    setIsSuccess(true);
  };

  const copyCode = () => {
    navigator.clipboard?.writeText(createdLockCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border border-neutral-200 overflow-hidden relative">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleConfirmLock} className="space-y-5">
            {/* Modal Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5F429A]/10 text-[#5F429A] text-xs font-black uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>{t('FEATURE EXCLUSIVA LOW-COST', 'SIGNATURE LOW-COST FEATURE')}</span>
              </div>
              <h3 className="font-display font-black text-2xl text-[#263A79] tracking-tight">
                {t('Congelar Tarifa', 'Lock This Fare')}
              </h3>
              <p className="text-xs text-[#465B71] mt-1">
                {t(
                  'Asegurá este precio hoy sin emitir el pasaje. Si el vuelo sube de precio, pagás el valor congelado. Si baja, pagás el más barato.',
                  'Lock this price now without instant purchase. If the fare increases, you keep this rate. If it drops, you pay the lower one.'
                )}
              </p>
            </div>

            {/* Flight Summary Pill */}
            <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200 flex items-center justify-between gap-3 text-xs">
              <div className="min-w-0">
                <div className="flex items-center gap-2 font-black text-[#263A79]">
                  <Plane className="w-4 h-4 text-[#5F429A] shrink-0" />
                  <span className="truncate">{flight.flightNumber} · {flight.origin.code} → {flight.destination.code}</span>
                </div>
                <div className="text-[11px] text-[#465B71] mt-0.5">
                  {departureDate} · Tarifa {fareTier.toUpperCase()} ({passengerCount} {passengerCount > 1 ? t('pasajeros', 'passengers') : t('pasajero', 'passenger')})
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-[#465B71] block">{t('Precio a congelar', 'Price to lock')}</span>
                <span className="font-mono font-black text-sm text-[#5F429A]">{formatPrice(totalFlightPrice)}</span>
              </div>
            </div>

            {/* Choose Lock Duration */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#263A79]">
                {t('Elegí el tiempo de congelamiento:', 'Choose lock duration:')}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDurationHours(24)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    durationHours === 24
                      ? 'bg-[#5F429A]/10 border-[#5F429A] ring-2 ring-[#5F429A]/30'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-black text-[#263A79]">
                    <span>24 HORAS</span>
                    {durationHours === 24 && <Check className="w-4 h-4 text-[#5F429A]" />}
                  </div>
                  <div className="text-base font-extrabold text-[#5F429A] font-mono mt-1">
                    {formatPrice(8)}
                  </div>
                  <div className="text-[10px] text-[#465B71] mt-0.5">
                    {t('Ideal para coordinar hoy', 'Perfect for fast planning')}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDurationHours(48)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                    durationHours === 48
                      ? 'bg-[#5F429A]/10 border-[#5F429A] ring-2 ring-[#5F429A]/30'
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-black text-[#263A79]">
                    <span>48 HORAS</span>
                    {durationHours === 48 && <Check className="w-4 h-4 text-[#5F429A]" />}
                  </div>
                  <div className="text-base font-extrabold text-[#5F429A] font-mono mt-1">
                    {formatPrice(14)}
                  </div>
                  <div className="text-[10px] text-[#465B71] mt-0.5">
                    {t('2 días completos de margen', '2 full days peace of mind')}
                  </div>
                </button>
              </div>
            </div>

            {/* Email Notification */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#465B71] uppercase">
                {t('Email para enviar el código de desbloqueo:', 'Email for unlock voucher:')}
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-semibold focus:ring-2 focus:ring-[#5F429A]/30 focus:border-[#5F429A]"
                placeholder="tu@email.com"
              />
            </div>

            {/* Guarantee bullet points */}
            <div className="space-y-1.5 text-[11px] text-[#465B71] bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('Garantía de precio congelado 100%', '100% Price Lock Guarantee')}</span>
              </div>
              <p className="text-emerald-800">
                {t(
                  'El costo del congelamiento se descuenta del total al momento de confirmar tu reserva antes del vencimiento.',
                  'The lock fee is deducted from your final booking total when confirmed before expiration.'
                )}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-[#465B71] transition-colors"
              >
                {t('Cancelar', 'Cancel')}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#5F429A] hover:bg-[#45469C] active:scale-[0.98] text-white text-xs font-black tracking-wide rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{t('CONGELAR TARIFA AHORA', 'LOCK FARE NOW')} ({formatPrice(lockFeeUSD)})</span>
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="py-4 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <Check className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="font-display font-black text-2xl text-[#263A79]">
                {t('¡Tarifa Congelada Exitosamente!', 'Fare Locked Successfully!')}
              </h3>
              <p className="text-xs text-[#465B71]">
                {t(
                  `Tenés ${durationHours} horas de protección de precio en el vuelo ${flight.flightNumber}. Enviamos los detalles a ${email}.`,
                  `You have ${durationHours} hours of price guarantee on flight ${flight.flightNumber}. Confirmation sent to ${email}.`
                )}
              </p>
            </div>

            {/* Lock Code Box */}
            <div className="bg-[#FAF9FD] border-2 border-dashed border-[#5F429A]/40 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#465B71] tracking-wider block">
                {t('CÓDIGO DE RESERVA CONGELADA', 'LOCKED FARE VOUCHER CODE')}
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="font-mono text-2xl font-black text-[#5F429A] tracking-widest">
                  {createdLockCode}
                </span>
                <button
                  type="button"
                  onClick={copyCode}
                  className="p-1.5 rounded-lg border border-neutral-300 hover:bg-white text-neutral-600 transition-colors"
                  title={t('Copiar código', 'Copy code')}
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copied && (
                <span className="text-[11px] font-bold text-emerald-600 block">
                  {t('¡Código copiado al portapapeles!', 'Code copied to clipboard!')}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:flex-1 py-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-xs font-bold text-[#263A79] transition-colors"
              >
                {t('Seguir explorando', 'Keep exploring')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigateTo('search-results');
                }}
                className="w-full sm:flex-1 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-extrabold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{t('Ver estado de tarifa', 'View fare status')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
