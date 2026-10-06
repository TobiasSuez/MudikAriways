import React from 'react';
import { useApp } from '../../context/AppContext';
import { Armchair, Tv, Wifi, Utensils, Zap, Sparkles, Check } from 'lucide-react';

export const OnboardView: React.FC = () => {
  const { formatPrice, t } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Page Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('EXPERIENCIA EN CABINA', 'CABIN EXPERIENCE')}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-[#263A79] tracking-tight">
            {t('A BORDO DE MUDIK AIRWAYS', 'ONBOARD MUDIK AIRWAYS')}
          </h1>
          <p className="text-xs sm:text-sm text-[#465B71] leading-relaxed">
            {t(
              'Viajar low-cost no significa renunciar a la dignidad y el confort. Diseñamos cada elemento de nuestra cabina para que tu vuelo sea sereno, fresco y puntual.',
              'Low-cost travel with dignified comfort. Designed from seats to meals for a serene, fresh, and punctual journey.'
            )}
          </p>
        </div>

        {/* 1. COMODIDAD */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-neutral-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center">
              <Armchair className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#263A79]">
              {t('COMODIDAD Y ASIENTOS', 'COMFORT & SEATING')}
            </h2>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Nuestros Airbus A320 y A320neo cuentan con asientos ergonómicos slimline tapizados en cuero ecológico respirable, apoyacabezas ajustables en 4 posiciones y un paso entre filas de 29 a 32 pulgadas.',
                'Our modern Airbus fleet features slimline eco-leather seats with 4-way adjustable headrests and generous 29-32 inch seat pitch.'
              )}
            </p>
            <ul className="space-y-2 text-xs text-[#191A23] font-medium pt-2">
              <li className="flex items-center gap-2">✓ {t('Reclinación suave que respeta el espacio del pasajero posterior', 'Gentle recline protecting rear passenger space')}</li>
              <li className="flex items-center gap-2">✓ {t('Soporte lumbar optimizado para vuelos de corta y media distancia', 'Optimized lumbar support')}</li>
              <li className="flex items-center gap-2">✓ {t('Filas 1 a 3 y salidas de emergencia con hasta 35 pulgadas de espacio', 'Extra legroom up to 35" in front rows')}</li>
            </ul>
          </div>

          <div className="lg:col-span-7 bg-[#FAF9FD] rounded-2xl p-6 border border-neutral-200 grid grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-neutral-200">
              <span className="text-[10px] font-bold text-[#5F429A] uppercase tracking-wider block">Estándar</span>
              <div className="font-bold text-base text-[#191A23] mt-1">29" Paso entre asientos</div>
              <p className="text-[11px] text-[#465B71] mt-1">Ideal para vuelos interurbanos en Java y Bali.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-neutral-200">
              <span className="text-[10px] font-bold text-[#5F429A] uppercase tracking-wider block">Espacio Extra</span>
              <div className="font-bold text-base text-[#191A23] mt-1">32" a 35" Salidas</div>
              <p className="text-[11px] text-[#465B71] mt-1">Máxima libertad de piernas para descansar mejor.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-neutral-200 col-span-2">
              <div className="flex items-center gap-2 font-bold text-[#263A79]">
                <Zap className="w-4 h-4 text-[#5F429A]" />
                <span>Tomas de Carga Rápida USB-C en Cada Asiento</span>
              </div>
              <p className="text-[11px] text-[#465B71] mt-1">
                Mantené tus teléfonos, auriculares y tabletas cargados durante todo el trayecto sin costo adicional.
              </p>
            </div>
          </div>
        </section>

        {/* 2. ENTRETENIMIENTO (Mudik Stream) & CONECTIVIDAD */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Entertainment */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#263A79]/10 text-[#263A79] flex items-center justify-center">
              <Tv className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#263A79]">
              Mudik Stream {t('(Entretenimiento)', '(Entertainment)')}
            </h2>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Sin pantallas fijas pesadas. Conectá tu smartphone, tablet o laptop a la red Wi-Fi de cabina y transmití gratis más de 60 películas, podcasts y música indonesia.',
                'Bring your own device. Connect to our local onboard network to stream curated Indonesian cinema, podcasts, and international series.'
              )}
            </p>
            <div className="pt-2 text-xs text-[#5F429A] font-bold">
              ✓ {t('100% Gratuito en todos los vuelos Mudik', '100% Free on all Mudik flights')}
            </div>
          </div>

          {/* Wi-Fi Connectivity */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#45469C]/10 text-[#45469C] flex items-center justify-center">
              <Wifi className="w-6 h-6" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[#263A79]">
              {t('CONECTIVIDAD WI-FI SATELITAL', 'SATELLITE WI-FI')}
            </h2>
            <p className="text-xs text-[#465B71] leading-relaxed">
              {t(
                'Mantenete conectado a 35.000 pies de altura. Mensajería instantánea por WhatsApp o acceso web de alta velocidad.',
                'Stay connected above the clouds with our high-throughput satellite connection.'
              )}
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs font-bold">
              <span className="bg-neutral-100 text-[#263A79] px-3 py-1.5 rounded-lg">Pase Mensajería: USD 4</span>
              <span className="bg-neutral-100 text-[#263A79] px-3 py-1.5 rounded-lg">Pase Completo: USD 9</span>
            </div>
          </div>

        </section>

        {/* 3. A BORDO · GASTRONOMÍA "SABORES DEL ARCHIPIÉLAGO" */}
        <section className="bg-gradient-to-br from-[#263A79] to-[#191A23] rounded-3xl p-8 sm:p-12 text-white shadow-xl space-y-8">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase text-[#9D7AE2]">
              <Utensils className="w-3.5 h-3.5" />
              <span>MENÚ A BORDO</span>
            </div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight">
              SABORES DEL ARCHIPIÉLAGO
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {t(
                'Platos calientes cocinados con ingredientes frescos, salsas aromáticas y el calor reconfortante de la cocina casera indonesia.',
                'Hot meals cooked with fresh ingredients, fragrant lemongrass, coconut cream, and authentic Indonesian culinary warmth.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="font-bold text-base text-white">Nasi Lemak Ayam Rendang</div>
              <p className="text-xs text-neutral-300">
                Arroz aromatizado con leche de coco y pandan, pollo rendang deshebrado, huevo duro, anchoas crujientes y sambal casero.
              </p>
              <div className="font-mono text-sm font-black text-[#9D7AE2]">USD 8 · IDR 130.000</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="font-bold text-base text-white">Sate Ayam Madura</div>
              <p className="text-xs text-neutral-300">
                Brochetas tiernas de pollo a la brasa con salsa cremosa de maní tostado, chalotas dulces y pastel de arroz lontong.
              </p>
              <div className="font-mono text-sm font-black text-[#9D7AE2]">USD 7 · IDR 115.000</div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="font-bold text-base text-white">Tahu Tempeh Sambal Matah</div>
              <p className="text-xs text-neutral-300">
                Opción vegetariana y vegana: tofu frito y tempeh marinado con fresco aderezo balinés de hierba limón, chalota y lima kaffir.
              </p>
              <div className="font-mono text-sm font-black text-[#9D7AE2]">USD 7 · IDR 115.000</div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
