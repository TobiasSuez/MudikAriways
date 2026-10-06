import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SeatMap } from './SeatMap';
import { ConfirmationCard } from './ConfirmationCard';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Plane, 
  User, 
  Armchair, 
  Luggage, 
  Utensils, 
  Coffee, 
  Wifi, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  Wallet,
  Coins
} from 'lucide-react';

export const BookingFlow: React.FC = () => {
  const {
    bookingStep,
    setBookingStep,
    selectedOutboundFlight,
    selectedReturnFlight,
    tripType,
    selectedFareTier,
    passengerDetails,
    setPassengerDetails,
    selectedSeat,
    setSelectedSeat,
    extras,
    setExtras,
    completeBooking,
    latestBooking,
    formatPrice,
    currentUser,
    navigateTo,
    t
  } = useApp();

  // Payment method selection state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wallet' | 'points'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('11/29');
  const [cardCvv, setCardCvv] = useState('482');
  const [cardName, setCardName] = useState(passengerDetails.firstName + ' ' + passengerDetails.lastName);

  // Digital wallet choice
  const [selectedWallet, setSelectedWallet] = useState<'gopay' | 'ovo' | 'shopeepay' | 'applepay'>('gopay');

  // Seat price calculation
  const [seatPriceUSD, setSeatPriceUSD] = useState(
    selectedSeat.startsWith('1') || selectedSeat.startsWith('2') || selectedSeat.startsWith('3') ? 14 : 6
  );

  // Price breakdown calculations
  const flightBasePrice = selectedOutboundFlight?.fares[selectedFareTier] || 60;
  const returnBasePrice = tripType === 'roundTrip' && selectedReturnFlight 
    ? selectedReturnFlight.fares[selectedFareTier] 
    : 0;

  let extrasCost = 0;
  if (extras.extraBaggageKg === 20) extrasCost += 18;
  if (extras.extraBaggageKg === 30) extrasCost += 28;
  if (extras.mealSelected) extrasCost += 8;
  if (extras.loungeAccess) extrasCost += 25;
  if (extras.priorityBoarding) extrasCost += 7;
  if (extras.inFlightWifi) extrasCost += 9;

  const taxesAndFees = 18;
  const grandTotal = flightBasePrice + returnBasePrice + seatPriceUSD + extrasCost + taxesAndFees;

  const handleSeatSelected = (seatId: string, price: number) => {
    setSelectedSeat(seatId);
    setSeatPriceUSD(price);
  };

  const handleConfirmAndPay = () => {
    completeBooking(paymentMethod);
    setBookingStep(6); // Step 6 is Confirmation!
  };

  const steps = [
    { num: 1, label: t('Vuelo', 'Flight') },
    { num: 2, label: t('Pasajeros', 'Passengers') },
    { num: 3, label: t('Asiento', 'Seat') },
    { num: 4, label: t('Extras', 'Extras') },
    { num: 5, label: t('Pago', 'Payment') },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Step Indicator (Only if not confirmed) */}
        {bookingStep <= 5 && (
          <div className="bg-white rounded-2xl p-4 sm:p-6 border border-neutral-200/90 shadow-xs">
            <div className="flex items-center justify-between">
              {steps.map((st, idx) => {
                const isCompleted = bookingStep > st.num;
                const isCurrent = bookingStep === st.num;

                return (
                  <React.Fragment key={st.num}>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted
                            ? 'bg-emerald-600 text-white'
                            : isCurrent
                            ? 'bg-[#5F429A] text-white ring-4 ring-[#5F429A]/15'
                            : 'bg-neutral-100 text-[#465B71]'
                        }`}
                      >
                        {isCompleted ? <Check className="w-4 h-4" /> : st.num}
                      </div>
                      <span className={`text-xs font-bold hidden md:inline uppercase tracking-wider ${
                        isCurrent ? 'text-[#5F429A]' : 'text-[#465B71]'
                      }`}>
                        {st.label}
                      </span>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className={`h-0.5 flex-1 mx-2 sm:mx-4 transition-all ${
                        bookingStep > st.num ? 'bg-emerald-500' : 'bg-neutral-200'
                      }`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: CONFIRMATION SCREEN */}
        {bookingStep === 6 && latestBooking && (
          <ConfirmationCard booking={latestBooking} />
        )}

        {/* STEPS 1 TO 5: MAIN CONTENT LAYOUT */}
        {bookingStep <= 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Active Step Details (Cols 1-8) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* STEP 1: VUELO SUMMARY */}
              {bookingStep === 1 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#263A79]">
                      {t('Resumen de tu vuelo seleccionado', 'Selected Flight Summary')}
                    </h2>
                    <p className="text-xs text-[#465B71]">
                      {t('Verificá los detalles de origen, destino y tarifa antes de continuar.', 'Review your route and fare before adding passenger details.')}
                    </p>
                  </div>

                  {selectedOutboundFlight && (
                    <div className="p-5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-[#5F429A]">
                        <span>{t('VUELO DE SALIDA', 'OUTBOUND FLIGHT')} · {selectedOutboundFlight.flightNumber}</span>
                        <span className="uppercase">TARIFA MUDIK {selectedFareTier}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xl font-black text-[#191A23]">{selectedOutboundFlight.departureTime}</div>
                          <div className="text-xs font-semibold text-[#465B71]">{selectedOutboundFlight.origin.city} ({selectedOutboundFlight.origin.code})</div>
                        </div>
                        <div className="text-xs text-[#465B71] text-center">
                          <div>{selectedOutboundFlight.duration}</div>
                          <div className="text-[10px] text-emerald-600 font-bold">{t('Directo', 'Direct')}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-black text-[#191A23]">{selectedOutboundFlight.arrivalTime}</div>
                          <div className="text-xs font-semibold text-[#465B71]">{selectedOutboundFlight.destination.city} ({selectedOutboundFlight.destination.code})</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setBookingStep(2)}
                      className="px-6 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>{t('CONTINUAR A PASAJEROS', 'CONTINUE TO PASSENGERS')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PASAJEROS */}
              {bookingStep === 2 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#263A79]">
                      {t('Datos del Pasajero Principal', 'Primary Passenger Details')}
                    </h2>
                    <p className="text-xs text-[#465B71]">
                      {t('Completá los nombres tal como figuran en tu documento nacional de identidad o pasaporte.', 'Names must match government-issued ID or passport exactly.')}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('NOMBRE', 'FIRST NAME')} *
                      </label>
                      <input
                        type="text"
                        value={passengerDetails.firstName}
                        onChange={e => setPassengerDetails(p => ({ ...p, firstName: e.target.value }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                        placeholder="Budi"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('APELLIDO', 'LAST NAME')} *
                      </label>
                      <input
                        type="text"
                        value={passengerDetails.lastName}
                        onChange={e => setPassengerDetails(p => ({ ...p, lastName: e.target.value }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                        placeholder="Santoso"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('FECHA DE NACIMIENTO', 'DATE OF BIRTH')} *
                      </label>
                      <input
                        type="date"
                        value={passengerDetails.dateOfBirth}
                        onChange={e => setPassengerDetails(p => ({ ...p, dateOfBirth: e.target.value }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('DNI / PASAPORTE', 'PASSPORT / ID NUMBER')} *
                      </label>
                      <input
                        type="text"
                        value={passengerDetails.passportId}
                        onChange={e => setPassengerDetails(p => ({ ...p, passportId: e.target.value.toUpperCase() }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] uppercase focus:ring-1 focus:ring-[#5F429A]"
                        placeholder="A8942109"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('CORREO ELECTRÓNICO', 'EMAIL ADDRESS')} *
                      </label>
                      <input
                        type="email"
                        value={passengerDetails.email}
                        onChange={e => setPassengerDetails(p => ({ ...p, email: e.target.value }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                        placeholder="budi.santoso@email.com"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('TELÉFONO DE CONTACTO', 'PHONE NUMBER')} *
                      </label>
                      <input
                        type="tel"
                        value={passengerDetails.phone}
                        onChange={e => setPassengerDetails(p => ({ ...p, phone: e.target.value }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] focus:ring-1 focus:ring-[#5F429A]"
                        placeholder="+62 812 3456 7890"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                        {t('NÚMERO DE MUDIK POINTS (OPCIONAL)', 'MUDIK POINTS MEMBER ID (OPTIONAL)')}
                      </label>
                      <input
                        type="text"
                        value={passengerDetails.mudikPointsNumber || ''}
                        onChange={e => setPassengerDetails(p => ({ ...p, mudikPointsNumber: e.target.value.toUpperCase() }))}
                        className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23] uppercase focus:ring-1 focus:ring-[#5F429A]"
                        placeholder="MP-892410"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="px-4 py-2.5 border border-neutral-300 text-xs font-bold text-[#263A79] rounded-xl hover:bg-neutral-50"
                    >
                      {t('Atrás', 'Back')}
                    </button>

                    <button
                      onClick={() => setBookingStep(3)}
                      className="px-6 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>{t('CONTINUAR A SELECCIÓN DE ASIENTO', 'CONTINUE TO SEAT SELECTION')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: ASIENTO */}
              {bookingStep === 3 && (
                <div className="space-y-6">
                  <SeatMap 
                    currentSeat={selectedSeat}
                    onSeatSelect={handleSeatSelected}
                  />

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={() => setBookingStep(2)}
                      className="px-4 py-2.5 border border-neutral-300 text-xs font-bold text-[#263A79] rounded-xl hover:bg-neutral-50"
                    >
                      {t('Atrás', 'Back')}
                    </button>

                    <button
                      onClick={() => setBookingStep(4)}
                      className="px-6 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>{t('CONTINUAR A EXTRAS', 'CONTINUE TO EXTRAS')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: EXTRAS */}
              {bookingStep === 4 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#263A79]">
                      {t('Personalizá tu vuelo con Extras', 'Customize with Flight Extras')}
                    </h2>
                    <p className="text-xs text-[#465B71]">
                      {t('Añadí comodidades para viajar con tranquilidad y disfrutar más el viaje.', 'Add baggage, gourmet meals, lounge access, and connectivity.')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* Extra Baggage */}
                    <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Luggage className="w-5 h-5 text-[#5F429A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-[#191A23]">{t('Equipaje adicional en bodega', 'Additional Checked Baggage')}</div>
                          <div className="text-xs text-[#465B71]">{t('Llevá más peso para recuerdos, ropa o equipo.', 'Bring more souvenirs, diving gear or textiles.')}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExtras(x => ({ ...x, extraBaggageKg: 0 }))}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                            extras.extraBaggageKg === 0 ? 'bg-[#5F429A] text-white border-[#5F429A]' : 'bg-white border-neutral-300 text-[#465B71]'
                          }`}
                        >
                          0 kg
                        </button>
                        <button
                          type="button"
                          onClick={() => setExtras(x => ({ ...x, extraBaggageKg: 20 }))}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                            extras.extraBaggageKg === 20 ? 'bg-[#5F429A] text-white border-[#5F429A]' : 'bg-white border-neutral-300 text-[#465B71]'
                          }`}
                        >
                          +20 kg (+{formatPrice(18)})
                        </button>
                        <button
                          type="button"
                          onClick={() => setExtras(x => ({ ...x, extraBaggageKg: 30 }))}
                          className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                            extras.extraBaggageKg === 30 ? 'bg-[#5F429A] text-white border-[#5F429A]' : 'bg-white border-neutral-300 text-[#465B71]'
                          }`}
                        >
                          +30 kg (+{formatPrice(28)})
                        </button>
                      </div>
                    </div>

                    {/* Indonesian Gourmet Meal */}
                    <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Utensils className="w-5 h-5 text-[#5F429A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-[#191A23]">{t('Menú Caliente "Sabores del Archipiélago"', 'Hot Meal "Flavors of the Archipelago"')}</div>
                          <div className="text-xs text-[#465B71]">{t('Nasi Lemak con pollo o Rendang aromático con té.', 'Authentic Nasi Lemak or beef Rendang with Indonesian tea.')}</div>
                        </div>
                      </div>

                      <select
                        value={extras.mealSelected || ''}
                        onChange={e => setExtras(x => ({ ...x, mealSelected: e.target.value || null }))}
                        className="px-3 py-2 text-xs font-semibold bg-white border border-neutral-300 rounded-lg text-[#263A79]"
                      >
                        <option value="">{t('Sin comida a bordo', 'No hot meal')}</option>
                        <option value="Nasi Lemak Ayam">{t('Nasi Lemak con pollo sambal', 'Nasi Lemak Chicken')} (+{formatPrice(8)})</option>
                        <option value="Rendang Sapi Nusantara">{t('Rendang clásico de carne', 'Archipelago Beef Rendang')} (+{formatPrice(8)})</option>
                        <option value="Vegano Tahu Tempeh">{t('Tofu y Tempeh javanés (Vegano)', 'Javanese Tofu & Tempeh')} (+{formatPrice(8)})</option>
                      </select>
                    </div>

                    {/* Mudik Lounge Access */}
                    <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Coffee className="w-5 h-5 text-[#5F429A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-[#191A23]">Mudik Lounge {t('Pase Aeropuerto', 'Airport Pass')}</div>
                          <div className="text-xs text-[#465B71]">{t('Café indonesio, buffet caliente, duchas y sillones relax.', 'Indonesian specialty coffee, hot buffet, and shower suites.')}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExtras(x => ({ ...x, loungeAccess: !x.loungeAccess }))}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors ${
                          extras.loungeAccess
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-neutral-300 text-[#263A79] hover:border-[#5F429A]'
                        }`}
                      >
                        {extras.loungeAccess ? `✓ ${t('Incluido', 'Added')} (+${formatPrice(25)})` : `+ ${formatPrice(25)}`}
                      </button>
                    </div>

                    {/* Priority Boarding */}
                    <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-[#5F429A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-[#191A23]">{t('Embarque Prioritario', 'Priority Boarding')}</div>
                          <div className="text-xs text-[#465B71]">{t('Sube al avión en el Grupo 1 y asegura espacio para tu equipaje.', 'Board in Zone 1 with dedicated priority lane.')}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExtras(x => ({ ...x, priorityBoarding: !x.priorityBoarding }))}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors ${
                          extras.priorityBoarding
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-neutral-300 text-[#263A79] hover:border-[#5F429A]'
                        }`}
                      >
                        {extras.priorityBoarding ? `✓ ${t('Incluido', 'Added')} (+${formatPrice(7)})` : `+ ${formatPrice(7)}`}
                      </button>
                    </div>

                    {/* Wi-Fi Inflight */}
                    <div className="p-4 rounded-xl border border-neutral-200 bg-neutral-50/70 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <Wifi className="w-5 h-5 text-[#5F429A] shrink-0 mt-0.5" />
                        <div>
                          <div className="font-bold text-sm text-[#191A23]">{t('Wi-Fi Satelital a Bordo', 'High-Speed In-Flight Wi-Fi')}</div>
                          <div className="text-xs text-[#465B71]">{t('Mensajería ilimitada y navegación rápida durante todo el vuelo.', 'Unlimited messaging & high-speed browsing throughout the flight.')}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setExtras(x => ({ ...x, inFlightWifi: !x.inFlightWifi }))}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border transition-colors ${
                          extras.inFlightWifi
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-neutral-300 text-[#263A79] hover:border-[#5F429A]'
                        }`}
                      >
                        {extras.inFlightWifi ? `✓ ${t('Incluido', 'Added')} (+${formatPrice(9)})` : `+ ${formatPrice(9)}`}
                      </button>
                    </div>

                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => setBookingStep(3)}
                      className="px-4 py-2.5 border border-neutral-300 text-xs font-bold text-[#263A79] rounded-xl hover:bg-neutral-50"
                    >
                      {t('Atrás', 'Back')}
                    </button>

                    <button
                      onClick={() => setBookingStep(5)}
                      className="px-6 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2"
                    >
                      <span>{t('CONTINUAR AL PAGO', 'CONTINUE TO PAYMENT')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: PAGO */}
              {bookingStep === 5 && (
                <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#263A79]">
                      {t('Confirmación y Método de Pago', 'Payment Method & Confirmation')}
                    </h2>
                    <p className="text-xs text-[#465B71]">
                      {t('Simulación segura de pago. Seleccioná tu método preferido.', 'Simulated checkout. Select your preferred payment method.')}
                    </p>
                  </div>

                  {/* Payment Method Selector Tabs */}
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'card'
                          ? 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A]'
                          : 'bg-white border-neutral-200 text-[#465B71] hover:bg-neutral-50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>{t('Tarjeta Débito/Crédito', 'Credit/Debit')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wallet')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'wallet'
                          ? 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A]'
                          : 'bg-white border-neutral-200 text-[#465B71] hover:bg-neutral-50'
                      }`}
                    >
                      <Wallet className="w-5 h-5" />
                      <span>{t('Billetera Digital', 'Digital Wallet')}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('points')}
                      className={`p-3.5 rounded-xl border flex flex-col items-center gap-2 text-xs font-bold transition-all ${
                        paymentMethod === 'points'
                          ? 'bg-[#5F429A]/10 border-[#5F429A] text-[#5F429A]'
                          : 'bg-white border-neutral-200 text-[#465B71] hover:bg-neutral-50'
                      }`}
                    >
                      <Coins className="w-5 h-5" />
                      <span>{t('Mudik Points + Dinero', 'Points + Cash')}</span>
                    </button>
                  </div>

                  {/* Card Form */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-2 text-xs animate-in fade-in duration-150">
                      <div>
                        <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                          {t('NOMBRE EN LA TARJETA', 'CARDHOLDER NAME')}
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={e => setCardName(e.target.value)}
                          className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-semibold text-[#191A23]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                          {t('NÚMERO DE TARJETA', 'CARD NUMBER')}
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={e => setCardNumber(e.target.value)}
                          className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-mono font-semibold text-[#191A23]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                            {t('VENCIMIENTO (MM/AA)', 'EXPIRY')}
                          </label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={e => setCardExpiry(e.target.value)}
                            className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-mono font-semibold text-[#191A23]"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-[#465B71] uppercase text-[10px] tracking-wider mb-1">
                            CVV / CVC
                          </label>
                          <input
                            type="password"
                            value={cardCvv}
                            onChange={e => setCardCvv(e.target.value)}
                            maxLength={4}
                            className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-lg text-sm font-mono font-semibold text-[#191A23]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Digital Wallet Options */}
                  {paymentMethod === 'wallet' && (
                    <div className="space-y-3 pt-2 text-xs animate-in fade-in duration-150">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                          { id: 'gopay', label: 'GoPay (ID)' },
                          { id: 'ovo', label: 'OVO (ID)' },
                          { id: 'shopeepay', label: 'ShopeePay' },
                          { id: 'applepay', label: 'Apple Pay' },
                        ].map((w) => (
                          <button
                            key={w.id}
                            type="button"
                            onClick={() => setSelectedWallet(w.id as any)}
                            className={`p-3 rounded-xl border text-center font-bold text-xs ${
                              selectedWallet === w.id
                                ? 'border-[#5F429A] bg-[#5F429A]/10 text-[#5F429A]'
                                : 'border-neutral-200 text-[#191A23] hover:bg-neutral-50'
                            }`}
                          >
                            {w.label}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-[#465B71] pt-2">
                        {t(
                          'Serás redirigido a la aplicación seleccionada para autorizar la transacción en un toque.',
                          'One-tap authorization with your local digital wallet.'
                        )}
                      </p>
                    </div>
                  )}

                  {/* Mudik Points + Cash */}
                  {paymentMethod === 'points' && (
                    <div className="space-y-4 pt-2 text-xs animate-in fade-in duration-150 bg-[#FAF9FD] p-4 rounded-xl border border-neutral-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#263A79]">Mudik Points disponibles:</span>
                        <span className="font-black text-[#5F429A] text-sm tabular-nums">
                          {currentUser ? `${currentUser.points} pts` : '2,450 pts'}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#465B71]">
                          <span>Canjear 1.500 pts</span>
                          <span className="font-bold text-emerald-600">Descuento de {formatPrice(30)}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2400"
                          step="300"
                          defaultValue="1500"
                          className="w-full accent-[#5F429A]"
                        />
                      </div>
                      <p className="text-[11px] text-[#465B71]">
                        {t('El saldo restante se debitará de tu método de pago principal.', 'The remaining balance will be charged to your card.')}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                    <button
                      onClick={() => setBookingStep(4)}
                      className="px-4 py-2.5 border border-neutral-300 text-xs font-bold text-[#263A79] rounded-xl hover:bg-neutral-50"
                    >
                      {t('Atrás', 'Back')}
                    </button>

                    <button
                      onClick={handleConfirmAndPay}
                      className="px-8 py-3.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-black tracking-wider rounded-xl transition-all shadow-lg shadow-[#5F429A]/20 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t('CONFIRMAR Y PAGAR', 'CONFIRM AND PAY')} ({formatPrice(grandTotal)})</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Dynamic Price Breakdown Sticky Card (Cols 9-12) */}
            <div className="lg:col-span-4 sticky top-28 space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/90 shadow-sm space-y-5">
                <h3 className="font-bold text-base text-[#263A79] border-b border-neutral-200 pb-3">
                  {t('Desglose de tu Reserva', 'Price Breakdown')}
                </h3>

                <div className="space-y-3 text-xs text-[#465B71]">
                  
                  {/* Outbound flight */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-[#191A23]">
                        {selectedOutboundFlight?.flightNumber} ({selectedOutboundFlight?.origin.code} → {selectedOutboundFlight?.destination.code})
                      </div>
                      <div className="text-[11px] text-[#465B71] uppercase">Tarifa {selectedFareTier}</div>
                    </div>
                    <span className="font-bold text-[#191A23] tabular-nums">{formatPrice(flightBasePrice)}</span>
                  </div>

                  {/* Return flight if round trip */}
                  {tripType === 'roundTrip' && selectedReturnFlight && (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-[#191A23]">
                          {selectedReturnFlight.flightNumber} ({selectedReturnFlight.origin.code} → {selectedReturnFlight.destination.code})
                        </div>
                        <div className="text-[11px] text-[#465B71] uppercase">Tarifa {selectedFareTier}</div>
                      </div>
                      <span className="font-bold text-[#191A23] tabular-nums">{formatPrice(returnBasePrice)}</span>
                    </div>
                  )}

                  {/* Seat Selection */}
                  <div className="flex items-center justify-between">
                    <span>{t('Asiento seleccionado', 'Selected seat')} ({selectedSeat})</span>
                    <span className="font-bold text-[#191A23] tabular-nums">{formatPrice(seatPriceUSD)}</span>
                  </div>

                  {/* Extras */}
                  {extrasCost > 0 && (
                    <div className="flex items-center justify-between">
                      <span>{t('Extras seleccionados', 'Selected extras')}</span>
                      <span className="font-bold text-[#191A23] tabular-nums">{formatPrice(extrasCost)}</span>
                    </div>
                  )}

                  {/* Taxes & airport fees */}
                  <div className="flex items-center justify-between">
                    <span>{t('Tasas aeroportuarias e impuestos', 'Taxes & airport fees')}</span>
                    <span className="font-bold text-[#191A23] tabular-nums">{formatPrice(taxesAndFees)}</span>
                  </div>

                </div>

                {/* Grand Total */}
                <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-extrabold text-sm text-[#263A79] uppercase tracking-wider">TOTAL</span>
                  <div className="text-2xl font-black text-[#5F429A] tabular-nums">
                    {formatPrice(grandTotal)}
                  </div>
                </div>

                <div className="text-[11px] text-[#465B71] bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t('Pago seguro cifrado con garantía Mudik.', 'Secure encrypted payment with Mudik guarantee.')}</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
