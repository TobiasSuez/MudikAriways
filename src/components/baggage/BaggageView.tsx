import React from 'react';
import { useApp } from '../../context/AppContext';
import { Luggage, ShieldAlert, Sparkles, AlertCircle, Check, Info, Box } from 'lucide-react';

export const BaggageView: React.FC = () => {
  const { formatPrice, t } = useApp();

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('VIAJÁ TRANQUILO', 'TRAVEL PREPARED')}
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-[#263A79] tracking-tight">
            {t('POLÍTICAS DE EQUIPAJE', 'BAGGAGE ALLOWANCES')}
          </h1>
          <p className="text-xs sm:text-sm text-[#465B71] leading-relaxed">
            {t(
              'Guía visual y clara sobre dimensiones permitidas, pesos por tarifa y transporte de material deportivo hacia las islas.',
              'Clear visual specifications for cabin dimensions, checked allowances, and sporting equipment.'
            )}
          </p>
        </div>

        {/* Visual Comparison: Carry-on vs Checked */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CARRY-ON (Cabina) */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center font-bold">
                  <Luggage className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#191A23]">
                    {t('Equipaje de Mano (Cabina)', 'Carry-on Baggage')}
                  </h3>
                  <span className="text-xs text-emerald-600 font-bold">
                    ✓ {t('Incluido en todas las tarifas', 'Included in all fares')}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-[#5F429A]">7 KG</span>
                <span className="text-[10px] text-[#465B71] block uppercase">Máximo</span>
              </div>
            </div>

            {/* Visual Dimension Diagram Box */}
            <div className="bg-[#FAF9FD] rounded-2xl p-6 border border-neutral-200 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-24 h-32 border-2 border-dashed border-[#5F429A] rounded-xl flex items-center justify-center bg-white shadow-inner relative">
                <span className="text-[10px] font-bold text-[#5F429A]">56 x 36 x 23 cm</span>
              </div>
              <p className="text-xs text-[#465B71] max-w-xs">
                Debe caber con holgura en los compartimientos superiores de la cabina.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#191A23]">
              <div className="font-bold text-[#263A79]">{t('+ 1 Artículo Personal Gratuito:', '+ 1 Free Personal Item:')}</div>
              <p className="text-[#465B71]">
                Cartera, mochila pequeña o funda de computadora que debe ubicarse debajo del asiento frente a ti (máximo 40 x 30 x 15 cm).
              </p>
            </div>
          </div>

          {/* CHECKED BAGGAGE (Bodega) */}
          <div className="bg-white rounded-3xl p-8 border border-neutral-200/90 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#263A79]/10 text-[#263A79] flex items-center justify-center font-bold">
                  <Box className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-[#191A23]">
                    {t('Equipaje Despachado (Bodega)', 'Checked Baggage')}
                  </h3>
                  <span className="text-xs text-[#465B71]">
                    {t('Incluido en tarifas Smart y Flex', 'Included in Smart & Flex')}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-2xl font-black text-[#263A79]">20 / 25 KG</span>
                <span className="text-[10px] text-[#465B71] block uppercase">Por pieza</span>
              </div>
            </div>

            {/* Visual Dimension Diagram Box */}
            <div className="bg-[#FAF9FD] rounded-2xl p-6 border border-neutral-200 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-32 h-40 border-2 border-[#263A79] rounded-2xl flex items-center justify-center bg-white shadow-inner">
                <span className="text-xs font-bold text-[#263A79]">Hasta 158 cm (L+A+A)</span>
              </div>
              <p className="text-xs text-[#465B71] max-w-xs">
                Suma lineal total de las dimensiones de la valija no debe superar 158 cm.
              </p>
            </div>

            <div className="space-y-2 text-xs text-[#191A23]">
              <div className="font-bold text-[#263A79]">{t('Precios de valijas adicionales online:', 'Additional baggage online rates:')}</div>
              <div className="flex justify-between text-[#465B71] pt-1">
                <span>+20 kg anticipado online</span>
                <strong className="text-[#263A79]">{formatPrice(18)}</strong>
              </div>
              <div className="flex justify-between text-[#465B71]">
                <span>+30 kg anticipado online</span>
                <strong className="text-[#263A79]">{formatPrice(28)}</strong>
              </div>
            </div>
          </div>

        </div>

        {/* SPORTS EQUIPMENT (Surf & Diving) */}
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#263A79]">
                {t('Material Deportivo: Surfboards, Buceo y Bicicletas', 'Sporting Gear: Surfboards, Diving & Bikes')}
              </h3>
              <p className="text-xs text-[#465B71]">
                {t('Diseñado para surfistas de Bali y Lombok, y buzos en Komodo y Flores.', 'Tailored for surfers heading to Bali or Lombok, and divers in Komodo.')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <div className="font-bold text-base text-[#191A23]">Tablas de Surf (Bali / Lombok)</div>
              <p className="text-[#465B71]">
                Funda de hasta 2 tablas protegidas con burbuja (máx. 277 cm / 9 pies y 20 kg).
              </p>
              <div className="font-bold text-[#5F429A]">{formatPrice(25)} por trayecto</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <div className="font-bold text-base text-[#191A23]">Equipo de Buceo (Labuan Bajo)</div>
              <p className="text-[#465B71]">
                Regulador, chaleco BCD, aletas y traje. Botellas de aire comprimido deben estar vacías con válvulas abiertas.
              </p>
              <div className="font-bold text-[#5F429A]">{formatPrice(22)} por trayecto</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
              <div className="font-bold text-base text-[#191A23]">Bicicletas y Senderismo</div>
              <p className="text-[#465B71]">
                Embaladas en caja de cartón o bolsa rígida con manubrio alineado y pedales desmontados.
              </p>
              <div className="font-bold text-[#5F429A]">{formatPrice(30)} por trayecto</div>
            </div>
          </div>
        </div>

        {/* RESTRICTED ITEMS */}
        <div className="bg-amber-50/70 rounded-3xl p-8 border border-amber-200 space-y-4">
          <div className="flex items-center gap-3 text-amber-800">
            <ShieldAlert className="w-6 h-6 text-amber-600" />
            <h3 className="font-bold text-lg">
              {t('Artículos con Restricciones Especiales', 'Hazardous & Restricted Goods')}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-amber-900/90 pt-2">
            <div className="space-y-1">
              <div className="font-bold text-amber-950">Baterías de Litio y Powerbanks</div>
              <p>
                Permitidas únicamente en equipaje de mano. Prohibido su transporte en bodega. Máximo 100 Wh por unidad.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-amber-950">Líquidos en Cabina</div>
              <p>
                Envases individuales de máximo 100 ml en bolsa plástica transparente con cierre hermético de 1 litro.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-amber-950">E-Cigarettes y Vapeadores</div>
              <p>
                Deben transportarse en el bolsillo o bolso de mano del pasajero. Prohibido su uso y recarga a bordo.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
