import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Award, 
  Coins, 
  TrendingUp, 
  Gift, 
  Plane, 
  Luggage, 
  Armchair, 
  Coffee, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Plus
} from 'lucide-react';

export const MudikPointsView: React.FC = () => {
  const { currentUser, earnPoints, redeemPoints, formatPrice, navigateTo, setIsAuthModalOpen, t } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'redeem' | 'tiers' | 'activity'>('overview');
  const [claimFlightCode, setClaimFlightCode] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const points = currentUser ? currentUser.points : 2450;
  const currentTier = currentUser ? currentUser.tier : 'START';

  const showNotice = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleClaimPoints = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimFlightCode.trim()) return;
    earnPoints(620, `Vuelo acumulado retroactivo (${claimFlightCode.toUpperCase()})`);
    setClaimFlightCode('');
    showNotice(t('¡Sumaste 620 Mudik Points por tu vuelo registrado!', 'Added 620 Mudik Points for your claimed flight!'));
  };

  const handleRedeem = (cost: number, label: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const success = redeemPoints(cost, `Canje: ${label}`);
    if (success) {
      showNotice(t(`¡Canje exitoso! Canjeaste ${cost} puntos por ${label}.`, `Successfully redeemed ${cost} pts for ${label}.`));
    } else {
      showNotice(t('Puntos insuficientes para este canje.', 'Insufficient points balance.'));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Hero Loyalty Banner */}
        <div className="bg-gradient-to-br from-[#263A79] via-[#45469C] to-[#5F429A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#9D7AE2]" />
                <span>PROGRAMA DE FIDELIDAD MUDIK</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                CADA VIAJE TE ACERCA AL PRÓXIMO.
              </h1>

              <p className="text-sm text-neutral-200 leading-relaxed max-w-xl">
                {t(
                  'Ganá puntos cada vez que volás con Mudik Airways y con aliados comerciales. Sin fechas bloqueadas y canjeables por pasajes, equipaje, asientos y confort.',
                  'Earn points every time you fly Mudik Airways. No blackout dates, flexible redemption for flights, baggage, extra legroom, and lounge comfort.'
                )}
              </p>
            </div>

            {/* Loyalty Balance Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-wider text-white/80 uppercase">
                  {currentUser ? currentUser.name : 'Budi Santoso'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-black text-[11px] tracking-wider uppercase">
                  MUDIK {currentTier}
                </span>
              </div>

              <div>
                <span className="text-[11px] text-white/70 block uppercase tracking-wider">SALDO DISPONIBLE</span>
                <div className="font-mono text-4xl sm:text-5xl font-black text-white tabular-nums tracking-tight">
                  {points.toLocaleString()}
                  <span className="text-sm font-sans font-bold text-[#9D7AE2] ml-2">PUNTOS</span>
                </div>
              </div>

              {/* Tier Progress bar */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <div className="flex justify-between text-xs text-white/80 font-semibold">
                  <span>Progreso hacia MUDIK PLUS</span>
                  <span className="tabular-nums">{points} / 5,000 pts</span>
                </div>
                <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-[#9D7AE2] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (points / 5000) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-white/70 block">
                  {Math.max(0, 5000 - points)} {t('puntos para alcanzar categoría PLUS', 'points to reach PLUS tier')}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Feedback Alert */}
        {notification && (
          <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Sub-Tabs: Overview, Redeem, Tiers, Activity */}
        <div className="flex items-center gap-2 border-b border-neutral-200 pb-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'overview' ? 'bg-[#5F429A] text-white shadow-xs' : 'text-[#465B71] hover:text-[#263A79]'
            }`}
          >
            {t('Resumen y Canjes', 'Redeem & Rewards')}
          </button>
          <button
            onClick={() => setActiveTab('tiers')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'tiers' ? 'bg-[#5F429A] text-white shadow-xs' : 'text-[#465B71] hover:text-[#263A79]'
            }`}
          >
            {t('Categorías y Beneficios', 'Membership Tiers')}
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'activity' ? 'bg-[#5F429A] text-white shadow-xs' : 'text-[#465B71] hover:text-[#263A79]'
            }`}
          >
            {t('Historial de Movimientos', 'Recent Activity')}
          </button>
        </div>

        {/* TAB 1: OVERVIEW & CANJEAR PUNTOS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* Quick Redeem catalog */}
            <div>
              <div className="mb-4">
                <h3 className="font-display text-xl font-bold text-[#263A79]">
                  {t('Canjeá tus Mudik Points', 'Redeem your Mudik Points')}
                </h3>
                <p className="text-xs text-[#465B71]">
                  {t('Usá tus puntos acumulados para volar gratis o disfrutar comodidades extra.', 'Use points for free baggage, extra legroom, lounge, or ticket discounts.')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                
                {/* 1. Free Baggage 20kg */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#5F429A] transition-colors">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-bold">
                      <Luggage className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#191A23]">{t('Equipaje 20 kg', '20kg Checked Bag')}</h4>
                    <p className="text-xs text-[#465B71]">
                      {t('1 valija en bodega para cualquier vuelo nacional.', '1 checked bag for any domestic route.')}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-base font-black text-[#5F429A] block mb-2 tabular-nums">
                      1.200 PTS
                    </span>
                    <button
                      onClick={() => handleRedeem(1200, t('Equipaje 20 kg', '20kg Bag'))}
                      disabled={points < 1200}
                      className="w-full py-2 bg-[#5F429A] hover:bg-[#45469C] disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {t('CANJEAR AHORA', 'REDEEM NOW')}
                    </button>
                  </div>
                </div>

                {/* 2. Seat with extra legroom */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#5F429A] transition-colors">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#263A79]/10 text-[#263A79] flex items-center justify-center font-bold">
                      <Armchair className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#191A23]">{t('Asiento Espacio Extra', 'Extra Legroom Seat')}</h4>
                    <p className="text-xs text-[#465B71]">
                      {t('Fila delantera o salida de emergencia con mayor comodidad.', 'Front rows or emergency exit row space.')}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-base font-black text-[#263A79] block mb-2 tabular-nums">
                      850 PTS
                    </span>
                    <button
                      onClick={() => handleRedeem(850, t('Asiento Espacio Extra', 'Extra Legroom'))}
                      disabled={points < 850}
                      className="w-full py-2 bg-[#263A79] hover:bg-[#191A23] disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {t('CANJEAR AHORA', 'REDEEM NOW')}
                    </button>
                  </div>
                </div>

                {/* 3. Mudik Lounge Pass */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#5F429A] transition-colors">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-[#45469C]/10 text-[#45469C] flex items-center justify-center font-bold">
                      <Coffee className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#191A23]">Mudik Lounge Pass</h4>
                    <p className="text-xs text-[#465B71]">
                      {t('Acceso de 3 horas con buffet, bebidas calientes y duchas.', '3h pass with hot buffet and showers.')}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-base font-black text-[#45469C] block mb-2 tabular-nums">
                      1.600 PTS
                    </span>
                    <button
                      onClick={() => handleRedeem(1600, 'Mudik Lounge Pass')}
                      disabled={points < 1600}
                      className="w-full py-2 bg-[#45469C] hover:bg-[#263A79] disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {t('CANJEAR AHORA', 'REDEEM NOW')}
                    </button>
                  </div>
                </div>

                {/* 4. Voucher USD 50 Flight Discount */}
                <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-xs flex flex-col justify-between space-y-4 hover:border-[#5F429A] transition-colors">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <Coins className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm text-[#191A23]">{t('Voucher Descuento USD 50', 'USD 50 Flight Voucher')}</h4>
                    <p className="text-xs text-[#465B71]">
                      {t('Descuento directo en cualquier pasaje de Mudik Airways.', 'Direct discount towards any flight booking.')}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-base font-black text-emerald-700 block mb-2 tabular-nums">
                      2.500 PTS
                    </span>
                    <button
                      onClick={() => handleRedeem(2500, t('Voucher USD 50', 'USD 50 Voucher'))}
                      disabled={points < 2500}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      {t('CANJEAR AHORA', 'REDEEM NOW')}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulate Earning Points Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#263A79]">
                    {t('¿Volaste recientemente? Reclamá tus Mudik Points', 'Flew recently? Claim your Mudik Points')}
                  </h4>
                  <p className="text-xs text-[#465B71]">
                    {t('Ingresá el código de reserva de tu vuelo para acreditar los puntos a tu cuenta.', 'Enter flight booking code to retroactively credit points.')}
                  </p>
                </div>
              </div>

              <form onSubmit={handleClaimPoints} className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={claimFlightCode}
                  onChange={e => setClaimFlightCode(e.target.value.toUpperCase())}
                  placeholder="Ej. MDK204 o MDK7X4"
                  className="w-full sm:w-72 h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs font-mono font-bold uppercase"
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-3 bg-[#5F429A] hover:bg-[#45469C] text-white font-bold text-xs rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                >
                  {t('RECLAMAR PUNTOS', 'CLAIM POINTS')}
                </button>
              </form>
            </div>

          </div>
        )}

        {/* TAB 2: MEMBERSHIP TIERS (Section 13) */}
        {activeTab === 'tiers' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* MUDIK START */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#465B71]">0 — 4.999 PTS</span>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">Básico</span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#191A23]">MUDIK START</h3>
                  <p className="text-xs text-[#465B71]">
                    {t('La puerta de entrada a beneficios reales desde tu primer vuelo.', 'Entry level benefits on your very first journey.')}
                  </p>

                  <ul className="space-y-2 text-xs text-[#191A23] pt-2 border-t border-neutral-100">
                    <li className="flex items-center gap-2">✓ {t('Acumulación 5 pts / USD', 'Earn 5 pts / USD')}</li>
                    <li className="flex items-center gap-2">✓ {t('Canjes por equipaje y extras', 'Redeem for baggage & extras')}</li>
                    <li className="flex items-center gap-2">✓ {t('Promociones exclusivas por email', 'Exclusive email sales')}</li>
                  </ul>
                </div>

                <div className="text-[11px] font-bold text-[#5F429A] pt-4">Nivel Actual</div>
              </div>

              {/* MUDIK PLUS */}
              <div className="bg-white rounded-2xl p-6 border-2 border-[#5F429A] shadow-md space-y-4 flex flex-col justify-between relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#5F429A] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                  POPULAR
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#5F429A]">5.000 — 14.999 PTS</span>
                    <span className="text-[10px] uppercase font-bold text-[#5F429A] bg-[#5F429A]/10 px-2 py-0.5 rounded">Silver</span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#5F429A]">MUDIK PLUS</h3>
                  <p className="text-xs text-[#465B71]">
                    {t('Para viajeros frecuentes en el archipiélago.', 'For frequent inter-island flyers.')}
                  </p>

                  <ul className="space-y-2 text-xs text-[#191A23] pt-2 border-t border-neutral-100">
                    <li className="flex items-center gap-2 font-bold text-[#5F429A]">✓ {t('Acumulación 8 pts / USD (60% más)', 'Earn 8 pts / USD')}</li>
                    <li className="flex items-center gap-2">✓ {t('Selección de asiento estándar gratuita', 'Free standard seat selection')}</li>
                    <li className="flex items-center gap-2">✓ {t('10 kg adicionales de equipaje gratis', '+10 kg free checked baggage')}</li>
                    <li className="flex items-center gap-2">✓ {t('Fila preferencial en mostradores', 'Priority check-in line')}</li>
                  </ul>
                </div>

                <div className="text-[11px] text-[#465B71] pt-4">
                  {Math.max(0, 5000 - points)} pts para alcanzar
                </div>
              </div>

              {/* MUDIK PRIME */}
              <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#263A79]">15.000+ PTS</span>
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">Gold VIP</span>
                  </div>
                  <h3 className="font-display text-2xl font-black text-[#263A79]">MUDIK PRIME</h3>
                  <p className="text-xs text-[#465B71]">
                    {t('La máxima experiencia y trato preferencial sin esperas.', 'The ultimate VIP priority experience.')}
                  </p>

                  <ul className="space-y-2 text-xs text-[#191A23] pt-2 border-t border-neutral-100">
                    <li className="flex items-center gap-2 font-bold text-[#263A79]">✓ {t('Acumulación 12 pts / USD', 'Earn 12 pts / USD')}</li>
                    <li className="flex items-center gap-2">✓ {t('Pase ilimitado a Mudik Lounges', 'Unlimited Mudik Lounge access')}</li>
                    <li className="flex items-center gap-2">✓ {t('Embarque prioritario Grupo 1', 'Priority boarding Zone 1')}</li>
                    <li className="flex items-center gap-2">✓ {t('Cambios de vuelo sin penalidad', 'Complimentary flight changes')}</li>
                    <li className="flex items-center gap-2">✓ {t('Línea telefónica VIP dedicada 24/7', '24/7 Dedicated VIP hotline')}</li>
                  </ul>
                </div>

                <div className="text-[11px] text-[#465B71] pt-4">
                  {Math.max(0, 15000 - points)} pts para alcanzar
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: ACTIVITY HISTORY */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-4 animate-in fade-in duration-150">
            <h3 className="font-bold text-base text-[#263A79] pb-2 border-b border-neutral-200">
              {t('Historial de Movimientos Recientes', 'Recent Point Activity')}
            </h3>

            <div className="divide-y divide-neutral-100">
              {currentUser?.history.map((tx) => (
                <div key={tx.id} className="py-3.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-[#191A23]">{tx.description}</div>
                    <div className="text-[11px] text-[#465B71]">{tx.date}</div>
                  </div>

                  <span className={`font-mono text-sm font-black tabular-nums ${
                    tx.points > 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {tx.points > 0 ? `+${tx.points}` : tx.points} PTS
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
