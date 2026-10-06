import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  Plane, 
  Sparkles, 
  CreditCard, 
  Calendar, 
  LogOut, 
  ArrowRight, 
  Luggage,
  ShieldCheck,
  Armchair
} from 'lucide-react';

export const AccountDashboardView: React.FC = () => {
  const { currentUser, managedBooking, logoutUser, navigateTo, formatPrice, t } = useApp();

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#FAF9FD] py-16 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm space-y-4">
          <User className="w-12 h-12 text-[#5F429A] mx-auto" />
          <h2 className="font-bold text-xl text-[#263A79]">{t('Iniciá sesión para ver tu cuenta', 'Please sign in')}</h2>
          <button
            onClick={() => navigateTo('home')}
            className="w-full py-3 bg-[#5F429A] text-white font-bold text-xs rounded-xl"
          >
            {t('Volver al inicio', 'Back to Home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* User Welcome Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5F429A] to-[#263A79] text-white flex items-center justify-center font-display font-black text-2xl shadow-md">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-black text-[#263A79]">
                  Hola, {currentUser.name}.
                </h1>
                <span className="text-[10px] font-bold text-[#5F429A] bg-[#5F429A]/10 px-2.5 py-0.5 rounded-full uppercase">
                  Mudik {currentUser.tier}
                </span>
              </div>
              <p className="text-xs text-[#465B71] mt-0.5">
                {currentUser.email} · {t('Miembro desde 2025', 'Member since 2025')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('mudik-points')}
              className="px-4 py-2 bg-[#5F429A] hover:bg-[#45469C] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentUser.points.toLocaleString()} PTS</span>
            </button>
            <button
              onClick={logoutUser}
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-xl transition-colors"
              title={t('Cerrar sesión', 'Sign out')}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* UPCOMING TRIP (Section 14) */}
        <div className="space-y-4">
          <h2 className="font-bold text-base text-[#263A79] uppercase tracking-wider">
            {t('PRÓXIMO VIAJE CONFIRMADO', 'UPCOMING TRIP')}
          </h2>

          {managedBooking ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-bold">
                    <Plane className="w-5 h-5 -rotate-45" />
                  </div>
                  <div>
                    <span className="font-bold text-base text-[#191A23]">
                      {managedBooking.outboundFlight.flightNumber} · {managedBooking.outboundFlight.origin.city} → {managedBooking.outboundFlight.destination.city}
                    </span>
                    <div className="text-xs text-[#465B71]">
                      {managedBooking.outboundFlight.departureTime} - {managedBooking.outboundFlight.arrivalTime} · Puerta A12
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[#465B71] block">CÓDIGO DE RESERVA</span>
                  <span className="font-mono text-lg font-black text-[#5F429A]">{managedBooking.code}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-4 text-[#465B71]">
                  <span>{t('Asiento:', 'Seat:')} <strong className="text-[#191A23]">{managedBooking.selectedSeat}</strong></span>
                  <span>·</span>
                  <span>{t('Equipaje:', 'Baggage:')} <strong className="text-[#191A23]">20 kg despachado</strong></span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => navigateTo('manage-booking')}
                    className="px-4 py-2 border border-neutral-300 hover:border-[#5F429A] text-[#263A79] font-bold text-xs rounded-xl"
                  >
                    {t('Gestionar reserva', 'Manage')}
                  </button>
                  <button
                    onClick={() => navigateTo('check-in')}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs"
                  >
                    {t('Check-in Online', 'Check-in')}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 text-center text-xs text-[#465B71]">
              {t('No tenés vuelos próximos reservados.', 'No upcoming trips booked.')}
            </div>
          )}
        </div>

        {/* Saved Passengers & Saved Payment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Saved Passengers */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#263A79] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-[#5F429A]" />
              <span>{t('Pasajeros Guardados', 'Saved Passengers')}</span>
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#191A23]">Budi Santoso (Titular)</div>
                  <div className="text-[11px] text-[#465B71]">DNI: A8942109 · MP-892410</div>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Principal</span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#191A23]">Dewi Santoso</div>
                  <div className="text-[11px] text-[#465B71]">DNI: B4419208 · Pasajero frecuente</div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Payment Methods */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-[#263A79] uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#5F429A]" />
              <span>{t('Medios de Pago Guardados', 'Saved Payment Methods')}</span>
            </h3>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#263A79] text-white flex items-center justify-center font-bold text-[10px]">
                    VISA
                  </div>
                  <div>
                    <div className="font-mono font-bold text-[#191A23]">•••• •••• •••• 8912</div>
                    <div className="text-[11px] text-[#465B71]">Vence 11/29 · Bank Mandiri</div>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">Predeterminada</span>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px]">
                    GOPAY
                  </div>
                  <div>
                    <div className="font-bold text-[#191A23]">GoPay Nusantara</div>
                    <div className="text-[11px] text-[#465B71]">Vinculada al +62 812 3456 7890</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
