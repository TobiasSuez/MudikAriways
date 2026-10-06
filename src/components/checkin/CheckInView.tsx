import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEMO_BOOKING } from '../../data/mockData';
import { Booking } from '../../types';
import { 
  CheckCircle2, 
  Search, 
  Plane, 
  QrCode, 
  Download, 
  Printer, 
  ShieldCheck, 
  AlertCircle, 
  Armchair, 
  Luggage, 
  UserCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const CheckInView: React.FC = () => {
  const { 
    checkInBooking, 
    setCheckInBooking, 
    managedBooking, 
    executeCheckIn, 
    t 
  } = useApp();

  const [inputCode, setInputCode] = useState(checkInBooking?.code || managedBooking?.code || 'MDK7X4');
  const [inputLastName, setInputLastName] = useState('Santoso');
  const [step, setStep] = useState<'search' | 'verify' | 'boarding-pass'>(
    checkInBooking?.status === 'checkedIn' ? 'boarding-pass' : 'search'
  );
  const [acceptedDangerousGoods, setAcceptedDangerousGoods] = useState(false);
  const [emergencyContact, setEmergencyContact] = useState('Dewi Santoso (+62 813 9928 1102)');

  const activeBooking = checkInBooking || managedBooking || DEMO_BOOKING;

  const handleStartCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckInBooking(activeBooking);
    setStep('verify');
  };

  const handleCompleteCheckIn = () => {
    executeCheckIn();
    setStep('boarding-pass');
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('EMBARQUE FÁCIL', 'SEAMLESS BOARDING')}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
            {t('CHECK-IN ONLINE', 'ONLINE CHECK-IN')}
          </h1>
          <p className="text-xs sm:text-sm text-[#465B71]">
            {t(
              'Disponible desde 48 horas antes de la salida. Obtené tu tarjeta de embarque digital en segundos.',
              'Available 48 hours prior to departure. Get your digital boarding pass instantly.'
            )}
          </p>
        </div>

        {/* STEP 1: Search / Look up Booking */}
        {step === 'search' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-xs">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">{t('CHECK-IN ABIERTO PARA VUELOS DE HOY', 'CHECK-IN OPEN FOR TODAY’S FLIGHTS')}</span>
                <p className="text-emerald-700 text-[11px] mt-0.5">
                  {t('Vuelos MDK 204, MDK 208 y conexiones nacionales con embarque habilitado.', 'Flights MDK 204, MDK 208 and inter-island routes are now open.')}
                </p>
              </div>
            </div>

            <form onSubmit={handleStartCheckIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#465B71] uppercase tracking-wider mb-1">
                  {t('CÓDIGO DE RESERVA', 'BOOKING REFERENCE')} *
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={e => setInputCode(e.target.value.toUpperCase())}
                  placeholder="MDK7X4"
                  className="w-full h-12 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono font-bold uppercase text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#465B71] uppercase tracking-wider mb-1">
                  {t('APELLIDO DEL PASAJERO', 'LAST NAME')} *
                </label>
                <input
                  type="text"
                  value={inputLastName}
                  onChange={e => setInputLastName(e.target.value)}
                  placeholder="Santoso"
                  className="w-full h-12 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#5F429A] hover:bg-[#45469C] text-white font-extrabold text-xs tracking-wider rounded-xl transition-all shadow-md shadow-[#5F429A]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                <span>{t('INICIAR CHECK-IN', 'START CHECK-IN')}</span>
              </button>
            </form>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setCheckInBooking(DEMO_BOOKING);
                  setStep('verify');
                }}
                className="text-xs font-bold text-[#263A79] hover:underline"
              >
                {t('¿Probar directamente con la reserva demo MDK7X4?', 'Test directly with demo booking MDK7X4?')}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Verification, Dangerous Goods & Confirmation */}
        {step === 'verify' && activeBooking && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-sm space-y-8 animate-in fade-in duration-150">
            
            <div className="border-b border-neutral-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  {t('CHECK-IN ABIERTO · PASO 2 DE 2', 'CHECK-IN OPEN · STEP 2 OF 2')}
                </span>
                <h2 className="font-display text-2xl font-black text-[#263A79] mt-1">
                  {activeBooking.outboundFlight.origin.city} ({activeBooking.outboundFlight.origin.code}) → {activeBooking.outboundFlight.destination.city} ({activeBooking.outboundFlight.destination.code})
                </h2>
              </div>

              <div className="font-mono text-xl font-black text-[#5F429A] bg-[#5F429A]/10 px-4 py-2 rounded-xl">
                {activeBooking.code}
              </div>
            </div>

            {/* Passenger & Flight Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-neutral-50 p-5 rounded-2xl border border-neutral-200 text-xs">
              <div>
                <span className="text-[#465B71] block font-bold text-[10px] uppercase">{t('PASAJERO', 'PASSENGER')}</span>
                <div className="font-bold text-sm text-[#191A23] mt-0.5">
                  {activeBooking.passenger.firstName} {activeBooking.passenger.lastName}
                </div>
                <div className="text-[11px] text-[#465B71]">{activeBooking.passenger.passportId}</div>
              </div>

              <div>
                <span className="text-[#465B71] block font-bold text-[10px] uppercase">{t('VUELO Y HORARIO', 'FLIGHT & TIME')}</span>
                <div className="font-bold text-sm text-[#191A23] mt-0.5">
                  {activeBooking.outboundFlight.flightNumber} · {activeBooking.outboundFlight.departureTime}
                </div>
                <div className="text-[11px] text-[#465B71]">Puerta A12 · Terminal 2</div>
              </div>

              <div>
                <span className="text-[#465B71] block font-bold text-[10px] uppercase">{t('ASIENTO ASIGNADO', 'ASSIGNED SEAT')}</span>
                <div className="font-black text-base text-[#5F429A] mt-0.5 flex items-center gap-1">
                  <Armchair className="w-4 h-4" />
                  <span>{activeBooking.selectedSeat}</span>
                </div>
                <div className="text-[11px] text-[#465B71]">{t('Asiento confirmado', 'Confirmed seat')}</div>
              </div>
            </div>

            {/* Baggage check and hazardous goods declaration */}
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-[#263A79] uppercase tracking-wider">
                {t('DECLARACIÓN DE SEGURIDAD Y ARTÍCULOS PROHIBIDOS', 'SAFETY DECLARATION')}
              </h3>

              <div className="bg-amber-50/70 border border-amber-200 p-5 rounded-2xl text-xs space-y-3">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <div className="font-bold text-amber-900">
                      {t('Regulaciones de la Autoridad de Aviación Civil de Indonesia', 'Indonesian Civil Aviation Safety Regulations')}
                    </div>
                    <p className="text-amber-800/90 leading-relaxed">
                      {t(
                        'Por motivos de seguridad aérea, está prohibido transportar en equipaje de mano o bodega baterías de litio sueltas, fuegos artificiales, líquidos inflamables, aerosoles sin protección o gases comprimidos. Los powerbanks deben viajar obligatoriamente en equipaje de mano (máximo 100 Wh).',
                        'Loose lithium batteries, fireworks, flammable liquids, and hazardous items are prohibited. Powerbanks must travel strictly in carry-on baggage (max 100 Wh).'
                      )}
                    </p>
                  </div>
                </div>

                <label className="flex items-center gap-3 pt-2 border-t border-amber-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptedDangerousGoods}
                    onChange={e => setAcceptedDangerousGoods(e.target.checked)}
                    className="w-4 h-4 accent-[#5F429A] rounded"
                  />
                  <span className="font-bold text-amber-950 text-xs">
                    {t(
                      'Declaro que no transporto artículos peligrosos y que conozco las normas de equipaje.',
                      'I declare that I am not carrying hazardous goods and comply with luggage safety rules.'
                    )}
                  </span>
                </label>
              </div>

              {/* Emergency Contact */}
              <div>
                <label className="block text-xs font-bold text-[#465B71] uppercase tracking-wider mb-1">
                  {t('CONTACTO DE EMERGENCIA', 'EMERGENCY CONTACT')}
                </label>
                <input
                  type="text"
                  value={emergencyContact}
                  onChange={e => setEmergencyContact(e.target.value)}
                  className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-semibold text-[#191A23]"
                />
              </div>
            </div>

            {/* Complete Check-in CTA */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setStep('search')}
                className="px-4 py-2.5 border border-neutral-300 text-xs font-bold text-[#263A79] rounded-xl hover:bg-neutral-50"
              >
                {t('Atrás', 'Back')}
              </button>

              <button
                type="button"
                disabled={!acceptedDangerousGoods}
                onClick={handleCompleteCheckIn}
                className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black text-xs tracking-wider rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{t('FINALIZAR CHECK-IN Y EMITIR TARJETA', 'GENERATE BOARDING PASS')}</span>
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: DIGITAL BOARDING PASS (Section 10) */}
        {step === 'boarding-pass' && activeBooking && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{t('CHECK-IN COMPLETADO CON ÉXITO', 'CHECK-IN COMPLETED')}</span>
              </div>
              <h2 className="font-display text-2xl font-black text-[#263A79]">
                {t('Tu Tarjeta de Embarque Digital Mudik', 'Your Mudik Digital Boarding Pass')}
              </h2>
            </div>

            {/* The Digital Boarding Pass Card */}
            <div className="max-w-xl mx-auto bg-white rounded-3xl border-2 border-neutral-300/80 shadow-2xl overflow-hidden relative">
              
              {/* Header */}
              <div className="bg-[#263A79] p-6 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                    <Plane className="w-4 h-4 -rotate-45" />
                  </div>
                  <span className="font-display font-extrabold text-lg tracking-tight">MUDIK AIRWAYS</span>
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded">
                  BOARDING PASS
                </span>
              </div>

              {/* Pass Content */}
              <div className="p-6 space-y-6">
                
                {/* Route Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-black text-[#191A23]">{activeBooking.outboundFlight.origin.code}</span>
                    <div className="text-xs text-[#465B71]">{activeBooking.outboundFlight.origin.city}</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-[#5F429A]">{activeBooking.outboundFlight.flightNumber}</span>
                    <div className="w-20 h-0.5 bg-neutral-300 relative flex items-center justify-center my-1">
                      <Plane className="w-3.5 h-3.5 text-[#263A79] -rotate-45" />
                    </div>
                    <span className="text-[9px] text-[#465B71]">Airbus A320</span>
                  </div>

                  <div className="text-right">
                    <span className="text-3xl font-black text-[#191A23]">{activeBooking.outboundFlight.destination.code}</span>
                    <div className="text-xs text-[#465B71]">{activeBooking.outboundFlight.destination.city}</div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-center text-xs">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#465B71] block">EMBARQUE</span>
                    <span className="font-black text-sm text-[#5F429A] tabular-nums">18:05</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#465B71] block">SALIDA</span>
                    <span className="font-black text-sm text-[#191A23] tabular-nums">{activeBooking.outboundFlight.departureTime}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#465B71] block">PUERTA</span>
                    <span className="font-black text-sm text-emerald-700">A12</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-bold text-[#465B71] block">ASIENTO</span>
                    <span className="font-black text-base text-[#5F429A]">{activeBooking.selectedSeat}</span>
                  </div>
                </div>

                {/* Passenger & Reference */}
                <div className="flex items-center justify-between text-xs pb-4 border-b border-dashed border-neutral-300">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#465B71] block">PASAJERO</span>
                    <span className="font-bold text-sm text-[#191A23]">
                      {activeBooking.passenger.firstName} {activeBooking.passenger.lastName}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#465B71] block">RESERVA</span>
                    <span className="font-mono font-bold text-sm text-[#263A79]">{activeBooking.code}</span>
                  </div>
                </div>

                {/* QR Code and Barcode visual */}
                <div className="flex items-center justify-between gap-6 pt-2">
                  <div className="p-3 bg-neutral-100 rounded-xl border border-neutral-200">
                    <QrCode className="w-20 h-20 text-[#191A23]" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="h-10 w-full bg-gradient-to-r from-neutral-900 via-neutral-600 to-neutral-900 rounded opacity-80" />
                    <div className="font-mono text-[9px] text-center tracking-widest text-[#465B71]">
                      *MDK204-CGK-DPS-12A-{activeBooking.code}*
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Print & Save Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-[#263A79] hover:bg-[#191A23] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>{t('IMPRIMIR TARJETA', 'PRINT PASS')}</span>
              </button>

              <button
                onClick={() => alert(t('Tarjeta de embarque guardada en tu dispositivo.', 'Boarding pass saved to device.'))}
                className="px-5 py-2.5 border border-neutral-300 hover:bg-neutral-100 text-[#263A79] text-xs font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>{t('GUARDAR EN TELÉFONO / WALLET', 'SAVE TO WALLET')}</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
