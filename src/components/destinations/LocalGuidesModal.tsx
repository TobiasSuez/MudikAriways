import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  MapPin, 
  Compass, 
  Utensils, 
  Plane, 
  Sparkles, 
  Sun, 
  Car, 
  Info, 
  Camera, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Coffee,
  Waves
} from 'lucide-react';

export interface LocalGuideData {
  id: string;
  code: string;
  city: string;
  island: string;
  tagline: string;
  heroImage: string;
  crewQuote: {
    author: string;
    role: string;
    text: string;
  };
  bestSeason: {
    months: string;
    description: string;
    temp: string;
  };
  gastronomy: {
    dish: string;
    description: string;
    recommendedPlace: string;
    priceEstimateUSD: number;
  }[];
  airportLogistics: {
    transferType: string;
    duration: string;
    estimatedCost: string;
    tip: string;
  }[];
  hiddenGems: {
    name: string;
    type: string;
    description: string;
  }[];
}

export const LOCAL_GUIDES: LocalGuideData[] = [
  {
    id: 'guide-bali',
    code: 'DPS',
    city: 'Bali (Denpasar)',
    island: 'Isla de los Dioses',
    tagline: 'Playas secretas en el sur, templos volcánicos y ceremonias milenarias',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    crewQuote: {
      author: 'Capitán Reza Kurniawan',
      role: 'Piloto Comandante Airbus A320 · 11 años volando a Bali',
      text: 'Cuando aterrices por la pista 09 sobre el mar en Ngurah Rai, mirá a tu izquierda para ver la silueta del monte Agung. Para ver el atardecer sin las multitudes de Canggu, andá a Pantai Bingin o Pantai Thomas en Uluwatu.'
    },
    bestSeason: {
      months: 'Mayo a Octubre',
      description: 'Temporada seca: brisas frescas, cielos despejados y mar ideal para buceo y surf.',
      temp: '27°C - 31°C'
    },
    gastronomy: [
      {
        dish: 'Babi Guling Tradicional',
        description: 'Lechón asado con cúrcuma, piel crocante y arroz al vapor con sambal matah.',
        recommendedPlace: 'Warung Babi Guling Pak Malen (Seminyak)',
        priceEstimateUSD: 4
      },
      {
        dish: 'Ikan Bakar Jimbaran',
        description: 'Pescado fresco marinado con salsa dulce de soja y asado sobre cáscaras de coco.',
        recommendedPlace: 'Muaya Beach Warungs (Jimbaran)',
        priceEstimateUSD: 9
      },
      {
        dish: 'Nasi Campur Bali',
        description: 'Variedad de pollo sish, verduras urap al coco y huevo especiado.',
        recommendedPlace: 'Warung Wardani (Denpasar)',
        priceEstimateUSD: 3
      }
    ],
    airportLogistics: [
      {
        transferType: 'Grab / Gojek Oficial Mudik Lounge',
        duration: '30-45 min a Seminyak/Kuta',
        estimatedCost: 'USD 8 - 12 (120k - 180k IDR)',
        tip: 'Ubicado a la salida de llegadas internacionales y domésticas. Tarifa fijada por app, sin regateos.'
      },
      {
        transferType: 'Taxi Bluebird Oficial con Taxímetro',
        duration: '40 min a Sanur / Nusa Dua',
        estimatedCost: 'USD 10 - 15',
        tip: 'Buscá siempre los autos celestes con el logo oficial del pajarito Bluebird.'
      }
    ],
    hiddenGems: [
      {
        name: 'Cascada Banyu Wana Amertha',
        type: 'Naturaleza',
        description: 'En el norte de Bedugul, cuatro cascadas cristalinas rodeadas de selva prístina sin aglomeraciones.'
      },
      {
        name: 'Templo Pura Luhur Batukaru',
        type: 'Espiritual',
        description: 'Ubicado en la ladera del segundo volcán más alto de Bali, envuelto en niebla sagrada y musgo centenario.'
      }
    ]
  },
  {
    id: 'guide-yogyakarta',
    code: 'YIA',
    city: 'Yogyakarta',
    island: 'Java Central',
    tagline: 'Cuna de la realeza javanesa, templos de la UNESCO y gastronomía imperial',
    heroImage: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80',
    crewQuote: {
      author: 'Dewi Lestari',
      role: 'Jefa de Cabina Mudik · Oriunda de Sleman, Yogyakarta',
      text: 'El amanecer en Borobudur es una experiencia conmovedora, pero mi recomendación secreta es tomar el amanecer en Punthuk Setumbu con vistas a la niebla mística sobre las estupas.'
    },
    bestSeason: {
      months: 'Abril a Noviembre',
      description: 'Clima seco muy agradable para recorrer templos a pie y explorar el palacio del Sultán (Kraton).',
      temp: '25°C - 32°C'
    },
    gastronomy: [
      {
        dish: 'Gudeg Jogja Imperial',
        description: 'Guiso tradicional de jaca tierna cocinada a fuego lento durante 12 horas con leche de coco y azúcar de palma.',
        recommendedPlace: 'Gudeg Yu Djum (Calle Wijilan)',
        priceEstimateUSD: 3
      },
      {
        dish: 'Kopi Jos (Café con carbón vivo)',
        description: 'Café javanés infusionado al arrojar una brasa ardiente de carbón vegetal dentro de la taza.',
        recommendedPlace: 'Angkringan Lek Man (Estación Tugu)',
        priceEstimateUSD: 1
      },
      {
        dish: 'Bakpia Pathok',
        description: 'Pastelitos tradicionales rellenos de judía verde mungo dulce o chocolate.',
        recommendedPlace: 'Bakpia Pathok 25',
        priceEstimateUSD: 2
      }
    ],
    airportLogistics: [
      {
        transferType: 'Tren Expreso YIA Airport Link (Kereta Bandara)',
        duration: '39 minutos exactos al centro (Estación Tugu)',
        estimatedCost: 'USD 1.30 (20.000 IDR - 50.000 IDR)',
        tip: 'La forma más rápida y puntual del país. Sale cada 30 minutos desde el interior del aeropuerto.'
      },
      {
        transferType: 'Bus Damri Oficial',
        duration: '1 hora 15 min',
        estimatedCost: 'USD 4 (65.000 IDR)',
        tip: 'Ideal si te diriges directamente a la zona hotelera de Borobudur o Magelang.'
      }
    ],
    hiddenGems: [
      {
        name: 'Templo Candi Plaosan al Atardecer',
        type: 'Arqueología',
        description: 'Templo gemelo budista-hinduista rodeado de arrozales verdes, sin los turistas de Prambanan.'
      },
      {
        name: 'Callejón de Batik en Kotagede',
        type: 'Artesanía',
        description: 'Antigua capital del reino de Mataram, famosa por sus talleres de plata pura y arquitectura colonial.'
      }
    ]
  },
  {
    id: 'guide-labuan-bajo',
    code: 'LBJ',
    city: 'Labuan Bajo (Komodo)',
    island: 'Flores / Nusa Tenggara',
    tagline: 'Dragones prehistóricos, islas de colinas doradas y manta rayas gigantes',
    heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=80',
    crewQuote: {
      author: 'Capitán Hendra Pratama',
      role: 'Primer Oficial Mudik Boeing 737 · Especialista en rutas oceánicas',
      text: 'Cuando vueles a Labuan Bajo, pedí el asiento de ventanilla izquierda (A) durante el descenso: verás todas las islas del Parque Nacional de Komodo recortadas contra el mar de Flores. Una vista inolvidable.'
    },
    bestSeason: {
      months: 'Abril a Diciembre',
      description: 'Mar calmo, visibilidad submarina de más de 30 metros para snorkel con mantas en Manta Point.',
      temp: '26°C - 33°C'
    },
    gastronomy: [
      {
        dish: 'Pescado Kuah Asam Flores',
        description: 'Sopa de pargo rojo con caldo cítrico de tamarindo, jengibre y hojas de albahaca tailandesa.',
        recommendedPlace: 'Restaurante Taman Laut',
        priceEstimateUSD: 6
      },
      {
        dish: 'Mariscos Frescos al Carbón',
        description: 'Calamar, camarones gigantes y pargo recién pescados con sambal dabu-dabu fresco.',
        recommendedPlace: 'Kampung Ujung Night Market',
        priceEstimateUSD: 7
      }
    ],
    airportLogistics: [
      {
        transferType: 'Taxi al Puerto de Labuan Bajo',
        duration: '10 minutos',
        estimatedCost: 'USD 5 (75.000 IDR)',
        tip: 'El aeropuerto está prácticamente pegado a la bahía principal desde donde salen los barcos a Komodo.'
      }
    ],
    hiddenGems: [
      {
        name: 'Isla Padar al amanecer',
        type: 'Senderismo',
        description: 'Mirador icónico que contempla simultáneamente tres bahías de arenas de tres colores: rosa, negra y blanca.'
      },
      {
        name: 'Cueva Cunca Wulang',
        type: 'Aventura',
        description: 'Un cañón de roca caliza con piscinas naturales de agua dulce esmeralda para saltar desde riscos.'
      }
    ]
  },
  {
    id: 'guide-lombok',
    code: 'LOP',
    city: 'Lombok (Praya)',
    island: 'Nusa Tenggara Occidental',
    tagline: 'Playas vírgenes de arena blanca, surf de clase mundial y el imponente monte Rinjani',
    heroImage: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=1200&q=80',
    crewQuote: {
      author: 'Siti Rahma',
      role: 'Tripulante de Vuelo Mudik · Residente de Kuta Lombok',
      text: 'Lombok conserva la serenidad que muchos buscan: Tanjung Aan tiene una arena redonda como granos de pimienta y el agua es una piscina infinita turquesa sin ruido.'
    },
    bestSeason: {
      months: 'Mayo a Octubre',
      description: 'Temporada seca perfecta para ascender al cráter volcánico del Rinjani y recorrer playas del sur.',
      temp: '26°C - 31°C'
    },
    gastronomy: [
      {
        dish: 'Ayam Taliwang Sasak',
        description: 'Pollo de granja marinado con chiles ojo de pájaro y pasta de camarón terasi asado al carbón.',
        recommendedPlace: 'Ayam Taliwang H. Moerad',
        priceEstimateUSD: 4
      },
      {
        dish: 'Plecing Kangkung',
        description: 'Espinaca de agua crujiente con brotes de soja, maní tostado y sambal de lima.',
        recommendedPlace: 'Warung Sasak Asli',
        priceEstimateUSD: 2
      }
    ],
    airportLogistics: [
      {
        transferType: 'Taxi Oficial a Kuta Lombok (Sur)',
        duration: '25 minutos',
        estimatedCost: 'USD 7 (110.000 IDR)',
        tip: 'El aeropuerto internacional de Lombok (LOP) está muy cerca del circuito de Kuta y las mejores playas.'
      }
    ],
    hiddenGems: [
      {
        name: 'Pantai Semeti (Stone Pyramid Beach)',
        type: 'Paisaje Costero',
        description: 'Formaciones de columnas de basalto volcánico que parecen pirámides talladas por el océano.'
      }
    ]
  },
  {
    id: 'guide-jakarta',
    code: 'CGK',
    city: 'Yakarta (Soekarno-Hatta)',
    island: 'Java Occidental',
    tagline: 'El vibrante corazón de Indonesia: rascacielos vanguardistas, arte y gastronomía callejera 24/7',
    heroImage: 'https://images.unsplash.com/photo-1555899434-94d1338eb352?auto=format&fit=crop&w=1200&q=80',
    crewQuote: {
      author: 'Capitán Bimo Seno',
      role: 'Piloto Instructor Mudik Airways',
      text: 'Evitá el tráfico de la autopista tomando el tren Railink directo desde la terminal del aeropuerto a la estación BNI City en el distrito financiero. Tardás exactamente 46 minutos y viajás con wifi y aire acondicionado.'
    },
    bestSeason: {
      months: 'Junio a Septiembre',
      description: 'Menos precipitaciones y cielos más despejados para recorrer los miradores de la capital y el casco colonial de Kota Tua.',
      temp: '28°C - 34°C'
    },
    gastronomy: [
      {
        dish: 'Soto Betawi Clásico',
        description: 'Sopa aromática de carne con leche de coco perfumada con clavo, nuez moscada y chips de emping.',
        recommendedPlace: 'Soto Betawi H. Ma’ruf (Cikini)',
        priceEstimateUSD: 3.5
      },
      {
        dish: 'Kerak Telor Tradicional',
        description: 'Tortilla crujiente de arroz glutinoso con huevo de pato, coco tostado serundeng y camarón seco ebi.',
        recommendedPlace: 'Puestos callejeros de Monas o Kota Tua',
        priceEstimateUSD: 2
      }
    ],
    airportLogistics: [
      {
        transferType: 'Tren Exprés Airport Railink (KAI Bandara)',
        duration: '46 minutos al centro de Yakarta',
        estimatedCost: 'USD 4.50 (70.000 IDR)',
        tip: 'Conecta con la línea de MRT en Dukuh Atas para llegar a cualquier hotel del centro en minutos.'
      }
    ],
    hiddenGems: [
      {
        name: 'Distrito Histórico Glodok (Chinatown)',
        type: 'Cultura & Café',
        description: 'El barrio chino más antiguo de Indonesia, con cafeterías centenarias como Pantjoran Tea House y templos taoístas.'
      }
    ]
  },
  {
    id: 'guide-medan',
    code: 'KNO',
    city: 'Medan (Kualanamu)',
    island: 'Sumatra Septentrional',
    tagline: 'Paraíso de la gastronomía de Sumatra y puerta de entrada al místico Lago Toba',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    crewQuote: {
      author: 'Taufik Hidayat',
      role: 'Tripulante de Cabina Mudik · Experto gastrónomo de Sumatra',
      text: 'Medan es considerada la capital culinaria indiscutible de Indonesia. No te vayas sin probar el café tostado con manteca y el pato cocido a fuego lento en Asie.'
    },
    bestSeason: {
      months: 'Mayo a Septiembre',
      description: 'Clima ideal para viajar hacia el Lago Toba y la isla interior de Samosir.',
      temp: '24°C - 32°C'
    },
    gastronomy: [
      {
        dish: 'Bihun Bebek Asie',
        description: 'Fideos de arroz con caldo medicinal de pato cocinado con 15 hierbas tradicionales chinas y javanesas.',
        recommendedPlace: 'Bihun Bebek Asie Kumango',
        priceEstimateUSD: 5
      },
      {
        dish: 'Durian Ucok',
        description: 'El fruto más codiciado del archipiélago servido fresco por expertos seleccionadores.',
        recommendedPlace: 'Ucok Durian (Abierto 24 horas)',
        priceEstimateUSD: 4
      }
    ],
    airportLogistics: [
      {
        transferType: 'Tren Exprés Kualanamu Railink',
        duration: '28 minutos a la Estación Central de Medan',
        estimatedCost: 'USD 5 (80.000 IDR)',
        tip: 'La estación está integrada directamente en la terminal de llegadas.'
      }
    ],
    hiddenGems: [
      {
        name: 'Palacio de Maimun y Gran Mezquita Al-Mashun',
        type: 'Patrimonio Histórico',
        description: 'Arquitectura que fusiona estilos mogol, malayo y español con azulejos italianos traídos por los sultanes de Deli.'
      }
    ]
  }
];

interface LocalGuidesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestinationCode?: string;
}

export const LocalGuidesModal: React.FC<LocalGuidesModalProps> = ({
  isOpen,
  onClose,
  initialDestinationCode = 'DPS'
}) => {
  const { selectDestinationForSearch, formatPrice, t } = useApp();

  const [activeCode, setActiveCode] = useState<string>(initialDestinationCode);

  if (!isOpen) return null;

  const currentGuide = LOCAL_GUIDES.find(g => g.code === activeCode) || LOCAL_GUIDES[0];

  const handleBookFlightToDestination = (code: string) => {
    selectDestinationForSearch(code);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Header with Title and Close Button */}
        <div className="bg-[#263A79] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5F429A] text-white flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-base tracking-tight text-white">
                  {t('GUÍAS LOCALES MUDIK AIRWAYS', 'MUDIK LOCAL DESTINATION GUIDES')}
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {t('Consejos de Tripulación', 'Crew Insider')}
                </span>
              </div>
              <p className="text-xs text-neutral-300">
                {t('Secretos locales, gastronomía y logística aeroportuaria sin intermediarios.', 'Local secrets, authentic food, and airport transit without hassle.')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Cerrar guía"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Destination Tabs */}
        <div className="bg-neutral-100/80 px-4 py-2.5 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {LOCAL_GUIDES.map(guide => {
            const isActive = guide.code === activeCode;
            return (
              <button
                key={guide.code}
                onClick={() => setActiveCode(guide.code)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#5F429A] text-white shadow-sm'
                    : 'bg-white text-[#465B71] hover:text-[#263A79] border border-neutral-200'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>{guide.city.split('(')[0].trim()}</span>
                <span className="text-[10px] opacity-75">({guide.code})</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          
          {/* Hero Banner with Destination Overview */}
          <div className="relative rounded-2xl overflow-hidden shadow-md bg-gradient-to-r from-[#263A79] to-[#5F429A] text-white p-6 sm:p-8">
            <div className="relative z-10 space-y-2 max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-amber-300 uppercase">
                {currentGuide.island} · CÓDIGO {currentGuide.code}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                {currentGuide.city}
              </h2>
              <p className="text-sm text-neutral-100 leading-relaxed">
                {currentGuide.tagline}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-lg backdrop-blur-xs">
                  <Sun className="w-4 h-4 text-amber-300" />
                  <span>{t('Mejor época:', 'Best time:')} <strong>{currentGuide.bestSeason.months}</strong> ({currentGuide.bestSeason.temp})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Captain & Cabin Crew Insider Secret Quote */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 sm:p-6 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>{t('CONSEJO DE ORO DE LA TRIPULACIÓN MUDIK', 'MUDIK CREW INSIDER ADVICE')}</span>
            </div>
            <p className="text-sm text-[#191A23] italic leading-relaxed">
              "{currentGuide.crewQuote.text}"
            </p>
            <div className="text-xs font-bold text-[#465B71] pt-1">
              {currentGuide.crewQuote.author} · <span className="font-normal text-[#5F429A]">{currentGuide.crewQuote.role}</span>
            </div>
          </div>

          {/* Two-column: Gastronomy & Airport Logistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Gastronomy Section */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <Utensils className="w-4 h-4 text-[#5F429A]" />
                <h3 className="font-bold text-sm text-[#263A79]">
                  {t('Gastronomía Auténtica & Warungs', 'Authentic Food & Warungs')}
                </h3>
              </div>

              <div className="space-y-3">
                {currentGuide.gastronomy.map((g, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-neutral-200/80 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-[#191A23]">
                      <span>{g.dish}</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono">
                        ~{formatPrice(g.priceEstimateUSD)}
                      </span>
                    </div>
                    <p className="text-xs text-[#465B71] leading-relaxed">
                      {g.description}
                    </p>
                    <div className="text-[11px] text-[#5F429A] font-semibold pt-0.5">
                      📍 {g.recommendedPlace}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Airport Logistics Section */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-neutral-200">
                <Car className="w-4 h-4 text-[#5F429A]" />
                <h3 className="font-bold text-sm text-[#263A79]">
                  {t('Logística y Transporte Aeroportuario', 'Airport Transit & Transfers')}
                </h3>
              </div>

              <div className="space-y-3">
                {currentGuide.airportLogistics.map((l, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded-xl border border-neutral-200/80 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#191A23]">
                      <span>{l.transferType}</span>
                      <span className="text-xs font-semibold text-[#5F429A]">{l.duration}</span>
                    </div>
                    <div className="text-[11px] font-bold text-emerald-700">
                      {t('Costo aprox:', 'Approx fare:')} {l.estimatedCost}
                    </div>
                    <div className="text-xs text-[#465B71] flex items-start gap-1 bg-[#FAF9FD] p-2 rounded-lg border border-neutral-100">
                      <Info className="w-3.5 h-3.5 text-[#5F429A] shrink-0 mt-0.5" />
                      <span>{l.tip}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Hidden Gems / Lugares Secretos */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 space-y-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#5F429A]" />
              <h3 className="font-bold text-sm text-[#263A79]">
                {t('Rincones Secretos Recomendados', 'Curated Hidden Gems')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentGuide.hiddenGems.map((gem, idx) => (
                <div key={idx} className="p-3.5 bg-[#FAF9FD] rounded-xl border border-neutral-200 space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold text-[#263A79]">
                    <span>{gem.name}</span>
                    <span className="text-[10px] text-[#5F429A] bg-[#5F429A]/10 px-2 py-0.5 rounded-md">{gem.type}</span>
                  </div>
                  <p className="text-xs text-[#465B71] leading-relaxed">
                    {gem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer with CTA */}
        <div className="bg-neutral-50 px-6 py-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#465B71]">
            {t('¿Listo para explorar este destino?', 'Ready to experience this destination?')}
            <span className="font-bold text-[#263A79] ml-1">
              {t('Vuelos directos diarios con Mudik Airways.', 'Daily non-stop flights with Mudik Airways.')}
            </span>
          </div>

          <button
            onClick={() => handleBookFlightToDestination(currentGuide.code)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Plane className="w-4 h-4" />
            <span>{t(`BUSCAR VUELOS A ${currentGuide.city.toUpperCase().split('(')[0].trim()}`, `SEARCH FLIGHTS TO ${currentGuide.city.toUpperCase().split('(')[0].trim()}`)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
