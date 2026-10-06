import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';
import { 
  CheckCircle2, 
  Calendar, 
  Download, 
  Search, 
  Plane, 
  Clock, 
  Luggage, 
  Armchair, 
  Share2, 
  QrCode, 
  Check,
  FileText
} from 'lucide-react';

interface ConfirmationCardProps {
  booking: Booking;
}

export const ConfirmationCard: React.FC<ConfirmationCardProps> = ({ booking }) => {
  const { formatPrice, navigateTo, setManagedBooking, t } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [calendarSuccess, setCalendarSuccess] = useState(false);

  const handleDownloadItinerary = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleAddToCalendar = () => {
    setCalendarSuccess(true);
    setTimeout(() => setCalendarSuccess(false), 3000);
  };

  const handleManageReservation = () => {
    setManagedBooking(booking);
    navigateTo('manage-booking');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Success Notification Banner */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
          {t('TU VIAJE YA ESTÁ EN MARCHA.', 'YOUR TRIP IS READY TO FLY.')}
        </h1>
        <p className="text-sm text-[#465B71]">
          {t(
            'Enviamos los detalles de tu confirmación y recibo de pago a',
            'We sent your confirmation details and e-ticket receipt to'
          )}{' '}
          <span className="font-bold text-[#191A23]">{booking.passenger.email}</span>
        </p>
      </div>

      {/* Realistic Airline Confirmation Card */}
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden">
        
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#5F429A] via-[#45469C] to-[#263A79] p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Plane className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="font-display font-bold text-lg leading-none">MUDIK AIRWAYS</div>
              <div className="text-xs text-white/80 mt-1 uppercase tracking-wider">
                {t('Confirmación Oficial de Vuelo', 'Official Travel Confirmation')}
              </div>
            </div>
          </div>

          <div className="sm:text-right bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
            <span className="text-[10px] font-semibold text-white/80 uppercase tracking-widest block">
              {t('CÓDIGO DE RESERVA', 'BOOKING REFERENCE')}
            </span>
            <span className="font-mono text-2xl font-black tracking-wider text-white">
              {booking.code}
            </span>
          </div>
        </div>

        {/* Card Body Details */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Passenger & Fare Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-neutral-200 text-xs">
            <div>
              <span className="text-[#465B71] block font-medium uppercase text-[10px] tracking-wider">
                {t('PASAJERO', 'PASSENGER')}
              </span>
              <div className="font-bold text-[#191A23] text-sm mt-0.5">
                {booking.passenger.firstName} {booking.passenger.lastName}
              </div>
            </div>
            <div>
              <span className="text-[#465B71] block font-medium uppercase text-[10px] tracking-wider">
                {t('DOCUMENTO / PASAPORTE', 'PASSPORT / ID')}
              </span>
              <div className="font-bold text-[#191A23] text-sm mt-0.5">
                {booking.passenger.passportId}
              </div>
            </div>
            <div>
              <span className="text-[#465B71] block font-medium uppercase text-[10px] tracking-wider">
                {t('TARIFA ELEGIDA', 'FARE TIER')}
              </span>
              <div className="font-bold text-[#5F429A] text-sm mt-0.5 uppercase">
                MUDIK {booking.selectedFareTier}
              </div>
            </div>
            <div>
              <span className="text-[#465B71] block font-medium uppercase text-[10px] tracking-wider">
                {t('TOTAL ABONADO', 'TOTAL PAID')}
              </span>
              <div className="font-black text-[#263A79] text-base mt-0.5 tabular-nums">
                {formatPrice(booking.totalPriceUSD)}
              </div>
            </div>
          </div>

          {/* Outbound Flight Details */}
          <div className="bg-[#FAF9FD] rounded-2xl p-5 border border-neutral-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#5F429A] uppercase tracking-wider flex items-center gap-1.5">
                <Plane className="w-3.5 h-3.5" />
                {t('VUELO DE SALIDA', 'OUTBOUND FLIGHT')} · {booking.outboundFlight.flightNumber}
              </span>
              <span className="text-xs text-[#465B71] font-semibold">
                {booking.outboundFlight.aircraft}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xl font-black text-[#191A23] tabular-nums">
                  {booking.outboundFlight.departureTime}
                </div>
                <div className="text-xs font-bold text-[#263A79]">
                  {booking.outboundFlight.origin.code} ({booking.outboundFlight.origin.city})
                </div>
              </div>

              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-[#465B71] font-semibold">{booking.outboundFlight.duration}</span>
                <div className="w-20 sm:w-28 h-0.5 bg-neutral-300 relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#5F429A] absolute left-0" />
                  <div className="w-2 h-2 rounded-full bg-[#263A79] absolute right-0" />
                </div>
                <span className="text-[9px] text-emerald-600 font-bold uppercase">{t('DIRECTO', 'DIRECT')}</span>
              </div>

              <div className="text-right">
                <div className="text-xl font-black text-[#191A23] tabular-nums">
                  {booking.outboundFlight.arrivalTime}
                </div>
                <div className="text-xs font-bold text-[#263A79]">
                  {booking.outboundFlight.destination.code} ({booking.outboundFlight.destination.city})
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#465B71] pt-2 border-t border-neutral-200/80">
              <span className="flex items-center gap-1">
                <Armchair className="w-3.5 h-3.5 text-[#5F429A]" />
                {t('Asiento:', 'Seat:')} <strong className="text-[#191A23]">{booking.selectedSeat}</strong>
              </span>
              <span className="flex items-center gap-1">
                <Luggage className="w-3.5 h-3.5 text-[#5F429A]" />
                {t('Equipaje:', 'Baggage:')} <strong className="text-[#191A23]">{booking.outboundFlight.baggageIncluded}</strong>
              </span>
            </div>
          </div>

          {/* Barcode & Simulated QR representation */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-neutral-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-neutral-900 rounded-xl p-2 flex items-center justify-center text-white">
                <QrCode className="w-12 h-12" />
              </div>
              <div className="text-xs text-[#465B71] space-y-0.5">
                <div className="font-bold text-[#191A23]">{t('Embarque Digital Mudik', 'Digital Mudik Boarding')}</div>
                <div>{t('Presentá este código en el mostrador o puerta de embarque.', 'Show this code at the airport gate or check-in kiosk.')}</div>
              </div>
            </div>

            <div className="text-right font-mono text-xs text-neutral-400">
              GATE A12 · ZONE 2 · MDK-SYS-OK
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="bg-neutral-50 p-6 border-t border-neutral-200 flex flex-wrap items-center justify-center sm:justify-between gap-3">
          
          <button
            onClick={handleManageReservation}
            className="px-5 py-2.5 bg-[#263A79] hover:bg-[#191A23] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-2"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('VER MI RESERVA', 'VIEW MY BOOKING')}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadItinerary}
              className={`px-4 py-2.5 border border-neutral-300 text-[#263A79] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                downloadSuccess ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'hover:bg-neutral-100'
              }`}
            >
              {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Download className="w-3.5 h-3.5" />}
              <span>{downloadSuccess ? t('DESCARGADO (PDF)', 'DOWNLOADED') : t('DESCARGAR ITINERARIO', 'DOWNLOAD ITINERARY')}</span>
            </button>

            <button
              onClick={handleAddToCalendar}
              className={`px-4 py-2.5 border border-neutral-300 text-[#263A79] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                calendarSuccess ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'hover:bg-neutral-100'
              }`}
            >
              {calendarSuccess ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Calendar className="w-3.5 h-3.5" />}
              <span>{calendarSuccess ? t('AGREGADO (.ICS)', 'ADDED') : t('AÑADIR AL CALENDARIO', 'ADD TO CALENDAR')}</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
