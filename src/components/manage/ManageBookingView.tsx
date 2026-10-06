import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeatMap } from '../booking/SeatMap';
import { 
  Search, 
  Plane, 
  Armchair, 
  Luggage, 
  Utensils, 
  Coffee, 
  Calendar, 
  User, 
  CheckCircle2, 
  AlertTriangle, 
  Check, 
  X,
  CreditCard,
  ShieldCheck
} from 'lucide-react';

export const ManageBookingView: React.FC = () => {
  const {
    managedBooking,
    loadDemoBooking,
    searchBooking,
    updateManagedBooking,
    setCheckInBooking,
    navigateTo,
    formatPrice,
    t
  } = useApp();

  const [bookingCodeInput, setBookingCodeInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Modals inside manage view
  const [activeModal, setActiveModal] = useState<'seat' | 'baggage' | 'meal' | 'lounge' | 'contact' | 'cancel' | null>(null);
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Contact form temporary state
  const [editEmail, setEditEmail] = useState(managedBooking?.passenger.email || '');
  const [editPhone, setEditPhone] = useState(managedBooking?.passenger.phone || '');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!bookingCodeInput.trim()) {
      setErrorMessage(t('Ingresa tu código de reserva', 'Enter booking reference'));
      return;
    }
    const found = searchBooking(bookingCodeInput, lastNameInput);
    if (!found) {
      setErrorMessage(t('No encontramos una reserva con esos datos. Probá con el botón "USAR RESERVA DEMO".', 'Reservation not found. Try the "DEMO BOOKING" button.'));
    }
  };

  const handleUseDemo = () => {
    loadDemoBooking();
    setBookingCodeInput('MDK7X4');
    setLastNameInput('Santoso');
    setErrorMessage('');
  };

  const showNotification = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 4000);
  };

  const handleGoToCheckIn = () => {
    if (managedBooking) {
      setCheckInBooking(managedBooking);
      navigateTo('check-in');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('TU VIAJE A MEDIDA', 'YOUR TRIP DETAILS')}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
            {t('GESTIONAR RESERVA', 'MANAGE BOOKING')}
          </h1>
          <p className="text-xs sm:text-sm text-[#465B71]">
            {t(
              'Consultá tu itinerario, agregá equipaje, elegí un mejor asiento o sumá el Mudik Lounge en cualquier momento.',
              'Check your itinerary, add extra baggage, switch seats, or add Mudik Lounge anytime.'
            )}
          </p>
        </div>

        {/* Action success alert banner */}
        {actionSuccessMessage && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-5 py-3 rounded-xl text-xs font-bold flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{actionSuccessMessage}</span>
            </div>
            <button onClick={() => setActionSuccessMessage(null)} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search Reservation Bar or Quick Demo Trigger */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
            
            <div className="sm:col-span-5">
              <label className="block text-[10px] font-bold tracking-wider text-[#465B71] uppercase mb-1">
                {t('CÓDIGO DE RESERVA (6 CARACTERES)', 'BOOKING CODE (6 CHARACTERS)')} *
              </label>
              <input
                type="text"
                value={bookingCodeInput}
                onChange={e => setBookingCodeInput(e.target.value.toUpperCase())}
                placeholder="MDK7X4"
                className="w-full h-12 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-mono font-bold uppercase text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
              />
            </div>

            <div className="sm:col-span-4">
              <label className="block text-[10px] font-bold tracking-wider text-[#465B71] uppercase mb-1">
                {t('APELLIDO DEL PASAJERO', 'PASSENGER LAST NAME')} *
              </label>
              <input
                type="text"
                value={lastNameInput}
                onChange={e => setLastNameInput(e.target.value)}
                placeholder="Santoso"
                className="w-full h-12 px-4 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
              />
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full h-12 bg-[#5F429A] hover:bg-[#45469C] text-white font-bold text-xs tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>{t('BUSCAR RESERVA', 'FIND BOOKING')}</span>
              </button>
            </div>

          </form>

          {errorMessage && (
            <p className="text-xs font-semibold text-rose-600">{errorMessage}</p>
          )}

          {/* Demo Callout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-100 bg-[#FAF9FD] p-4 rounded-xl">
            <span className="text-xs text-[#465B71]">
              {t('¿Querés probar la experiencia de gestión completa?', 'Want to test the full management experience?')}
            </span>
            <button
              type="button"
              onClick={handleUseDemo}
              className="px-4 py-2 bg-[#263A79] hover:bg-[#191A23] text-white font-bold text-xs tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              {t('USAR RESERVA DEMO (MDK7X4)', 'USE DEMO BOOKING (MDK7X4)')}
            </button>
          </div>
        </div>

        {/* Existing Active Booking Content */}
        {managedBooking && (
          <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-md overflow-hidden space-y-6">
            
            {/* Top Banner with Code & Status */}
            <div className="bg-gradient-to-r from-[#263A79] to-[#5F429A] p-6 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 block">
                  {t('RESERVA CONFIRMADA', 'CONFIRMED BOOKING')}
                </span>
                <div className="font-mono text-3xl font-black tracking-wider text-white">
                  {managedBooking.code}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                  {managedBooking.status === 'checkedIn' ? t('CHECK-IN REALIZADO', 'CHECKED IN') : t('CONFIRMADO', 'CONFIRMED')}
                </span>
                <button
                  onClick={handleGoToCheckIn}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
                >
                  {t('IR A CHECK-IN ONLINE', 'ONLINE CHECK-IN')}
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              
              {/* Passenger & Flight Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-neutral-200 text-xs">
                <div>
                  <span className="text-[#465B71] block font-bold text-[10px] uppercase">{t('PASAJERO', 'PASSENGER')}</span>
                  <div className="font-extrabold text-sm text-[#191A23] mt-0.5">
                    {managedBooking.passenger.firstName} {managedBooking.passenger.lastName}
                  </div>
                  <div className="text-[11px] text-[#465B71]">{managedBooking.passenger.email}</div>
                  <div className="text-[11px] text-[#465B71]">{managedBooking.passenger.phone}</div>
                </div>

                <div>
                  <span className="text-[#465B71] block font-bold text-[10px] uppercase">{t('ASIENTO ASIGNADO', 'ASSIGNED SEAT')}</span>
                  <div className="font-extrabold text-sm text-[#5F429A] mt-0.5">
                    {managedBooking.selectedSeat}
                  </div>
                  <div className="text-[11px] text-[#465B71]">Airbus A320 · Ventana</div>
                </div>

                <div>
                  <span className="text-[#465B71] block font-bold text-[10px] uppercase">{t('EQUIPAJE INCLUIDO', 'INCLUDED BAGGAGE')}</span>
                  <div className="font-extrabold text-sm text-[#191A23] mt-0.5">
                    {managedBooking.extras.extraBaggageKg > 0 
                      ? `${20 + managedBooking.extras.extraBaggageKg} kg despachado + 7 kg cabina` 
                      : managedBooking.outboundFlight.baggageIncluded}
                  </div>
                </div>
              </div>

              {/* Itinerary Cards */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-[#263A79] uppercase tracking-wider">
                  {t('ITINERARIO DE VUELO', 'FLIGHT ITINERARY')}
                </h3>

                {/* Outbound */}
                <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-bold">
                      <Plane className="w-5 h-5 -rotate-45" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#191A23]">
                        {managedBooking.outboundFlight.flightNumber} · {managedBooking.outboundFlight.origin.city} ({managedBooking.outboundFlight.origin.code}) → {managedBooking.outboundFlight.destination.city} ({managedBooking.outboundFlight.destination.code})
                      </div>
                      <div className="text-xs text-[#465B71]">
                        {managedBooking.outboundFlight.departureTime} - {managedBooking.outboundFlight.arrivalTime} ({managedBooking.outboundFlight.duration}) · Directo
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                    {t('A tiempo · Puerta A12', 'On time · Gate A12')}
                  </span>
                </div>

                {/* Return if any */}
                {managedBooking.returnFlight && (
                  <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#263A79]/10 text-[#263A79] flex items-center justify-center font-bold">
                        <Plane className="w-5 h-5 rotate-135" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#191A23]">
                          {managedBooking.returnFlight.flightNumber} · {managedBooking.returnFlight.origin.city} ({managedBooking.returnFlight.origin.code}) → {managedBooking.returnFlight.destination.city} ({managedBooking.returnFlight.destination.code})
                        </div>
                        <div className="text-xs text-[#465B71]">
                          {managedBooking.returnFlight.departureTime} - {managedBooking.returnFlight.arrivalTime} ({managedBooking.returnFlight.duration}) · Directo
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-neutral-600 bg-neutral-100 border border-neutral-200 px-3 py-1 rounded-lg">
                      {t('Programado', 'Scheduled')}
                    </span>
                  </div>
                )}
              </div>

              {/* Management Action Cards Grid (Section 9 Features) */}
              <div className="space-y-4 pt-4 border-t border-neutral-200">
                <h3 className="font-bold text-sm text-[#263A79] uppercase tracking-wider">
                  {t('SERVICIOS Y MODIFICACIONES DISPONIBLES', 'MANAGE & ADD EXTRAS')}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  
                  {/* Change Seat */}
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-[#5F429A] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[#5F429A] font-bold text-sm">
                        <Armchair className="w-4 h-4" />
                        <span>{t('Cambiar Asiento', 'Change Seat')}</span>
                      </div>
                      <p className="text-xs text-[#465B71] mt-1">
                        {t('Actual: ', 'Current: ')} <strong>{managedBooking.selectedSeat}</strong>. {t('Elegí ventanilla, pasillo o fila con más espacio.', 'Choose window, aisle or exit row.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('seat')}
                      className="w-full py-2 bg-[#5F429A]/10 hover:bg-[#5F429A] hover:text-white text-[#5F429A] text-xs font-bold rounded-lg transition-colors"
                    >
                      {t('Seleccionar otro asiento', 'Select new seat')}
                    </button>
                  </div>

                  {/* Add Baggage */}
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-[#5F429A] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[#5F429A] font-bold text-sm">
                        <Luggage className="w-4 h-4" />
                        <span>{t('Agregar Equipaje', 'Add Baggage')}</span>
                      </div>
                      <p className="text-xs text-[#465B71] mt-1">
                        {t('Sumá valijas de 20 kg o 30 kg con descuento anticipado online.', 'Add 20kg or 30kg bag with discount.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('baggage')}
                      className="w-full py-2 bg-[#5F429A]/10 hover:bg-[#5F429A] hover:text-white text-[#5F429A] text-xs font-bold rounded-lg transition-colors"
                    >
                      {t('Comprar equipaje extra', 'Add checked bag')}
                    </button>
                  </div>

                  {/* Add Gourmet Meal */}
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-[#5F429A] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[#5F429A] font-bold text-sm">
                        <Utensils className="w-4 h-4" />
                        <span>{t('Comida a Bordo', 'Add Meal')}</span>
                      </div>
                      <p className="text-xs text-[#465B71] mt-1">
                        {managedBooking.extras.mealSelected 
                          ? `${t('Seleccionado:', 'Selected:')} ${managedBooking.extras.mealSelected}`
                          : t('Elegí un plato caliente indonesio para tu vuelo.', 'Pick a hot Indonesian dish.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('meal')}
                      className="w-full py-2 bg-[#5F429A]/10 hover:bg-[#5F429A] hover:text-white text-[#5F429A] text-xs font-bold rounded-lg transition-colors"
                    >
                      {managedBooking.extras.mealSelected ? t('Cambiar menú', 'Change meal') : t('Agregar menú caliente', 'Add hot meal')}
                    </button>
                  </div>

                  {/* Add Mudik Lounge */}
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-[#5F429A] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[#5F429A] font-bold text-sm">
                        <Coffee className="w-4 h-4" />
                        <span>Mudik Lounge</span>
                      </div>
                      <p className="text-xs text-[#465B71] mt-1">
                        {managedBooking.extras.loungeAccess 
                          ? t('Acceso VIP ya confirmado en tu reserva.', 'Lounge access already confirmed.') 
                          : t('Salón de descanso, duchas y buffet en CGK o DPS.', 'Relaxation pods & hot buffet at CGK or DPS.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        updateManagedBooking({
                          extras: { ...managedBooking.extras, loungeAccess: true }
                        });
                        showNotification(t('Pase a Mudik Lounge agregado exitosamente a tu itinerario.', 'Mudik Lounge access added.'));
                      }}
                      disabled={managedBooking.extras.loungeAccess}
                      className="w-full py-2 bg-[#5F429A]/10 hover:bg-[#5F429A] hover:text-white text-[#5F429A] text-xs font-bold rounded-lg transition-colors disabled:opacity-50"
                    >
                      {managedBooking.extras.loungeAccess ? t('Pase ya activo', 'Pass active') : t('Agregar Mudik Lounge (+USD 25)', 'Add Lounge (+USD 25)')}
                    </button>
                  </div>

                  {/* Change Contact Info */}
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-white hover:border-[#5F429A] transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-[#5F429A] font-bold text-sm">
                        <User className="w-4 h-4" />
                        <span>{t('Datos de Contacto', 'Contact Info')}</span>
                      </div>
                      <p className="text-xs text-[#465B71] mt-1">
                        {t('Actualizá teléfono o correo para recibir alertas de vuelo en tiempo real.', 'Update phone/email for real-time gate alerts.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('contact')}
                      className="w-full py-2 bg-[#5F429A]/10 hover:bg-[#5F429A] hover:text-white text-[#5F429A] text-xs font-bold rounded-lg transition-colors"
                    >
                      {t('Modificar contacto', 'Edit contact')}
                    </button>
                  </div>

                  {/* Cancel / Refund Request */}
                  <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50/40 transition-all flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{t('Cancelar Reserva', 'Cancel Booking')}</span>
                      </div>
                      <p className="text-xs text-rose-700/80 mt-1">
                        {t('Simulá solicitud de reembolso o emisión de voucher de crédito.', 'Request cancellation or travel credit.')}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('cancel')}
                      className="w-full py-2 bg-rose-100 hover:bg-rose-600 hover:text-white text-rose-700 text-xs font-bold rounded-lg transition-colors"
                    >
                      {t('Solicitar cancelación', 'Request refund')}
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>
        )}

        {/* MODAL 1: CHANGE SEAT */}
        {activeModal === 'seat' && managedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                <h3 className="font-bold text-base text-[#263A79]">
                  {t('Elegí tu nuevo asiento para el vuelo', 'Select your new seat')}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-1 text-neutral-400 hover:text-neutral-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <SeatMap
                currentSeat={managedBooking.selectedSeat}
                onSeatSelect={(seatId) => {
                  updateManagedBooking({ selectedSeat: seatId });
                  setActiveModal(null);
                  showNotification(`${t('Asiento actualizado exitosamente a', 'Seat successfully changed to')} ${seatId}.`);
                }}
              />
            </div>
          </div>
        )}

        {/* MODAL 2: ADD BAGGAGE */}
        {activeModal === 'baggage' && managedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-bold text-base text-[#263A79]">{t('Agregar Equipaje Despachado', 'Add Checked Baggage')}</h3>
                <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    updateManagedBooking({ extras: { ...managedBooking.extras, extraBaggageKg: 20 } });
                    setActiveModal(null);
                    showNotification(t('20 kg de equipaje despachado agregado a tu reserva.', '20kg baggage added.'));
                  }}
                  className="w-full p-4 rounded-xl border border-neutral-200 hover:border-[#5F429A] text-left flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-[#191A23] group-hover:text-[#5F429A]">+20 kg {t('Equipaje en bodega', 'Checked Bag')}</div>
                    <div className="text-xs text-[#465B71]">{t('Hasta 1 pieza adicional de 20 kg', '1 piece up to 20kg')}</div>
                  </div>
                  <span className="font-black text-sm text-[#5F429A]">{formatPrice(18)}</span>
                </button>

                <button
                  onClick={() => {
                    updateManagedBooking({ extras: { ...managedBooking.extras, extraBaggageKg: 30 } });
                    setActiveModal(null);
                    showNotification(t('30 kg de equipaje despachado agregado a tu reserva.', '30kg baggage added.'));
                  }}
                  className="w-full p-4 rounded-xl border border-neutral-200 hover:border-[#5F429A] text-left flex items-center justify-between group"
                >
                  <div>
                    <div className="font-bold text-sm text-[#191A23] group-hover:text-[#5F429A]">+30 kg {t('Equipaje en bodega', 'Checked Bag')}</div>
                    <div className="text-xs text-[#465B71]">{t('Recomendado para buceo o surf', 'Great for diving or surfboards')}</div>
                  </div>
                  <span className="font-black text-sm text-[#5F429A]">{formatPrice(28)}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 3: ADD MEAL */}
        {activeModal === 'meal' && managedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-bold text-base text-[#263A79]">{t('Seleccionar Menú Caliente', 'Select Hot Meal')}</h3>
                <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 text-xs">
                {['Nasi Lemak Ayam Rendang', 'Rendang Sapi Tradicional', 'Tahu Tempeh Saus Kacang (Vegano)'].map((dish) => (
                  <button
                    key={dish}
                    onClick={() => {
                      updateManagedBooking({ extras: { ...managedBooking.extras, mealSelected: dish } });
                      setActiveModal(null);
                      showNotification(`${t('Plato confirmado:', 'Meal added:')} ${dish}`);
                    }}
                    className="w-full p-3 rounded-xl border border-neutral-200 hover:border-[#5F429A] text-left flex items-center justify-between"
                  >
                    <span className="font-bold text-[#191A23]">{dish}</span>
                    <span className="font-bold text-[#5F429A]">{formatPrice(8)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MODAL 4: EDIT CONTACT INFO */}
        {activeModal === 'contact' && managedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                <h3 className="font-bold text-base text-[#263A79]">{t('Actualizar Datos de Contacto', 'Update Contact Info')}</h3>
                <button onClick={() => setActiveModal(null)} className="text-neutral-400 hover:text-neutral-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#465B71] uppercase mb-1">{t('Email', 'Email')}</label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#465B71] uppercase mb-1">{t('Teléfono', 'Phone')}</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full h-10 px-3 border border-neutral-300 rounded-lg text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  updateManagedBooking({
                    passenger: { ...managedBooking.passenger, email: editEmail, phone: editPhone }
                  });
                  setActiveModal(null);
                  showNotification(t('Datos de contacto actualizados.', 'Contact details updated.'));
                }}
                className="w-full py-2.5 bg-[#5F429A] text-white font-bold text-xs rounded-xl"
              >
                {t('Guardar cambios', 'Save changes')}
              </button>
            </div>
          </div>
        )}

        {/* MODAL 5: CANCEL RESERVATION */}
        {activeModal === 'cancel' && managedBooking && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3 text-rose-600">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="font-bold text-base text-[#191A23]">{t('¿Cancelar Reserva?', 'Cancel Reservation?')}</h3>
              </div>

              <p className="text-xs text-[#465B71] leading-relaxed">
                {t(
                  'Al cancelar la reserva MDK7X4, se reintegrará el monto abonado en forma de Mudik Travel Voucher o a tu medio de pago original de acuerdo a las condiciones tarifarias.',
                  'Cancelling MDK7X4 will credit your funds via a Mudik Travel Voucher in accordance with fare rules.'
                )}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-2.5 border border-neutral-300 text-xs font-bold text-[#465B71] rounded-xl hover:bg-neutral-50"
                >
                  {t('No cancelar', 'Keep booking')}
                </button>
                <button
                  onClick={() => {
                    updateManagedBooking({ status: 'cancelled' });
                    setActiveModal(null);
                    showNotification(t('Reserva cancelada. El voucher ha sido enviado a tu email.', 'Booking cancelled. Voucher sent.'));
                  }}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl"
                >
                  {t('Confirmar cancelación', 'Confirm cancellation')}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
