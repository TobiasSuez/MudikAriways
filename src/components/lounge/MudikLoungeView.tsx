import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Coffee, 
  Wifi, 
  Armchair, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Bath, 
  Zap,
  Check
} from 'lucide-react';

export const MudikLoungeView: React.FC = () => {
  const { managedBooking, updateManagedBooking, formatPrice, t } = useApp();

  const [bookingPassAdded, setBookingPassAdded] = useState(false);

  const handleBookLoungeAccess = () => {
    if (managedBooking) {
      updateManagedBooking({
        extras: { ...managedBooking.extras, loungeAccess: true }
      });
    }
    setBookingPassAdded(true);
    setTimeout(() => setBookingPassAdded(false), 4000);
  };

  const amenities = [
    {
      icon: Armchair,
      title: t('Sillones Ergonómicos de Descanso', 'Ergonomic Quiet Loungers'),
      desc: t('Espacios amplios diseñados con madera de teca javanesa y luz natural.', 'Spacious seating crafted with Javanese teak accents and natural light.'),
    },
    {
      icon: Coffee,
      title: t('Barista & Gastronomía Caliente', 'Artisan Coffee & Hot Buffet'),
      desc: t('Café de origen de Sumatra y Flores preparado en el momento, junto a platos tradicionales calientes.', 'Single-origin espresso from Sumatra and hot seasonal Indonesian dishes.'),
    },
    {
      icon: Wifi,
      title: t('Wi-Fi de Ultra Alta Velocidad', 'Ultra Fast Wi-Fi'),
      desc: t('Conexión simétrica dedicada para videoconferencias y trabajo remoto sin latencia.', 'Dedicated high-speed connectivity for video calls and remote work.'),
    },
    {
      icon: Bath,
      title: t('Duchas y Amenities Privadas', 'Private Shower Suites'),
      desc: t('Suites de ducha con toallas de algodón orgánico y jabones aromáticos con aceites de sándalo.', 'Private shower suites with organic cotton towels and sandalwood amenities.'),
    },
    {
      icon: Zap,
      title: t('Estaciones de Carga Rápida USB-C', 'Fast Charging Stations'),
      desc: t('Tomas de corriente internacionales y carga rápida inalámbrica en cada mesa.', 'International plugs and wireless fast chargers at every workstation.'),
    },
    {
      icon: Clock,
      title: t('Salas Silenciosas de Trabajo', 'Quiet Productivity Pods'),
      desc: t('Cabinas acustizadas para llamadas confidenciales y concentración absoluta.', 'Soundproof focus pods for private calls and concentrated work.'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#263A79] via-[#191A23] to-[#5F429A] rounded-3xl p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-widest uppercase text-[#9D7AE2]">
              <Coffee className="w-3.5 h-3.5" />
              <span>SALONES VIP EN JAKARTA (CGK) Y BALI (DPS)</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight leading-tight">
              ANTES DE DESPEGAR, BAJÁ EL RITMO.
            </h1>

            <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
              {t(
                'Un refugio de serenidad antes de tu vuelo. Diseñado para que el tiempo de espera en el aeropuerto se convierta en tu momento preferido del día.',
                'A sanctuary of calm before your flight. Designed to transform airport wait time into your favorite hour of the day.'
              )}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={handleBookLoungeAccess}
                className="px-8 py-3.5 bg-white text-[#263A79] hover:bg-neutral-100 font-extrabold text-xs tracking-wider rounded-xl transition-all shadow-lg cursor-pointer"
              >
                {t('RESERVAR ACCESO · ', 'BOOK ACCESS PASS · ')}{formatPrice(25)}
              </button>

              <span className="text-xs text-neutral-300">
                {t('O canjeá por 1.600 Mudik Points', 'Or redeem for 1,600 Mudik Points')}
              </span>
            </div>

            {bookingPassAdded && (
              <div className="bg-emerald-500/20 border border-emerald-400 text-emerald-200 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 mt-2">
                <Check className="w-4 h-4 text-emerald-300" />
                <span>{t('¡Pase al Mudik Lounge reservado y añadido a tu reserva activa!', 'Lounge access pass added to your booking!')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Lounge Features Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
              {t('COMODIDAD SIN COMPROMISOS', 'UNCOMPROMISING REPOSE')}
            </span>
            <h2 className="font-display text-3xl font-extrabold text-[#263A79]">
              {t('Todo lo que necesitas para relajarte o trabajar', 'Everything you need to unwind or focus')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {amenities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-neutral-200/90 shadow-xs hover:border-[#5F429A] transition-all space-y-3"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base text-[#191A23]">{item.title}</h3>
                  <p className="text-xs text-[#465B71] leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Airport Locations */}
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-6">
          <h3 className="font-display text-xl font-bold text-[#263A79]">
            {t('Ubicaciones Mudik Lounge en Indonesia', 'Mudik Lounge Airport Locations')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#263A79]">
                <MapPin className="w-4 h-4 text-[#5F429A]" />
                <span>Jakarta — Soekarno-Hatta (CGK)</span>
              </div>
              <p className="text-xs text-[#465B71]">
                Terminal 2E Doméstica (Junto a Puerta 14) y Terminal 3 Internacional (Nivel 2). Abierto 04:30 a 23:30 hs.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-[#263A79]">
                <MapPin className="w-4 h-4 text-[#5F429A]" />
                <span>Bali — Ngurah Rai (DPS)</span>
              </div>
              <p className="text-xs text-[#465B71]">
                Terminal Doméstica (Mezzanine Puerta 6). Abierto 05:00 a 00:00 hs.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
