import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Sparkles, Check, Copy, ArrowRight, Gift, Tag } from 'lucide-react';

export const NewsletterBenefit: React.FC = () => {
  const { t, setPromoCode, earnPoints } = useApp();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const promoVoucher = 'MUDIKCLUB15';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setPromoCode(promoVoucher);
    earnPoints(1500, 'Bono bienvenida por suscripción al Club Mudik');
  };

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoVoucher);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-br from-[#263A79] via-[#35256D] to-[#5F429A] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden border border-white/10">
        
        {/* Subtle background glow */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase border border-white/15">
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('BENEFICIO EXCLUSIVO CLUB MUDIK', 'EXCLUSIVE CLUB MUDIK BENEFIT')}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              {t(
                'Suscribite y llevate 15% OFF en tu primer pasaje + 1.500 Mudik Points',
                'Subscribe and get 15% OFF your first ticket + 1,500 Mudik Points'
              )}
            </h2>

            <p className="text-xs sm:text-sm text-neutral-200 max-w-xl leading-relaxed">
              {t(
                'Ingresá tu correo y recibí al instante tu cupón de bienvenida para volar con el mejor precio garantizado, promociones relámpago y millas acumulables.',
                'Enter your email to instantly receive your welcome discount code for your next journey, flash sale access, and loyalty perks.'
              )}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-neutral-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                {t('15% de descuento inmediato', 'Instant 15% discount')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                {t('1.500 puntos de bienvenida acreditados', '1,500 welcome points credited')}
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                {t('Sin spam, cancelás cuando quieras', 'No spam, unsubscribe anytime')}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/20 space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-200">
                  {t('Ingresá tu email para desbloquear el beneficio:', 'Enter your email to unlock this perk:')}
                </label>

                <div className="space-y-2.5">
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="nombre@ejemplo.com"
                      className="w-full h-12 pl-10 pr-4 bg-white text-neutral-900 rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#9D7AE2] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full h-12 bg-white hover:bg-neutral-100 active:scale-[0.99] text-[#263A79] font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#5F429A]" />
                    <span>{t('OBTENER MI 15% OFF + 1.500 PUNTOS', 'GET MY 15% OFF + 1,500 POINTS')}</span>
                  </button>
                </div>

                <p className="text-[10px] text-neutral-300 text-center pt-1">
                  {t('Al suscribirte aceptás recibir ofertas exclusivas de Mudik Airways.', 'By subscribing you agree to receive exclusive fare offers.')}
                </p>
              </form>
            ) : (
              <div className="bg-white/15 backdrop-blur-md p-6 rounded-2xl border border-emerald-400/50 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {t('¡Bienvenido al Club Mudik!', 'Welcome to Club Mudik!')}
                    </h3>
                    <p className="text-xs text-emerald-200">
                      {t('Tu beneficio del 15% OFF y 1.500 puntos ya están activados.', 'Your 15% OFF and 1,500 bonus points are ready.')}
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-dashed border-white/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-300" />
                    <div>
                      <span className="text-[10px] text-neutral-300 uppercase block font-semibold">
                        {t('CUPÓN APLICADO EN TU CUENTA', 'PROMO CODE APPLIED')}
                      </span>
                      <span className="font-mono font-black text-lg text-white tracking-wider">
                        {promoVoucher}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? t('Copiado', 'Copied') : t('Copiar', 'Copy')}</span>
                  </button>
                </div>

                <p className="text-[11px] text-emerald-100 text-center font-medium">
                  {t('El código ya fue pre-cargado en tu buscador para tu próximo vuelo.', 'Code has been auto-applied in your flight search widget.')}
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
