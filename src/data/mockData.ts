import { Airport, Booking, DestinationItem, EditorialArticle, FAQItem, Flight, FlightStatusRecord, MudikMember, Seat } from '../types';

export const AIRPORTS: Airport[] = [
  { code: 'CGK', city: 'Jakarta', name: 'Soekarno-Hatta International', country: 'Indonesia' },
  { code: 'DPS', city: 'Denpasar / Bali', name: 'Ngurah Rai International', country: 'Indonesia' },
  { code: 'YIA', city: 'Yogyakarta', name: 'Yogyakarta International', country: 'Indonesia' },
  { code: 'SUB', city: 'Surabaya', name: 'Juanda International', country: 'Indonesia' },
  { code: 'LOP', city: 'Lombok', name: 'Zainuddin Abdul Madjid International', country: 'Indonesia' },
  { code: 'LBJ', city: 'Labuan Bajo', name: 'Komodo Airport', country: 'Indonesia' },
  { code: 'KNO', city: 'Medan', name: 'Kualanamu International', country: 'Indonesia' },
  { code: 'UPG', city: 'Makassar', name: 'Sultan Hasanuddin International', country: 'Indonesia' },
  { code: 'SIN', city: 'Singapore', name: 'Changi International Airport', country: 'Singapore', isInternational: true },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International', country: 'Malaysia', isInternational: true },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi International', country: 'Thailand', isInternational: true },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith International', country: 'Australia', isInternational: true },
];

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'fl-101',
    flightNumber: 'MDK 204',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[1], // DPS
    departureTime: '06:15',
    arrivalTime: '09:05',
    duration: '1h 50m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 58, smart: 79, flex: 115 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-102',
    flightNumber: 'MDK 208',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[1], // DPS
    departureTime: '09:30',
    arrivalTime: '12:25',
    duration: '1h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 64, smart: 85, flex: 124 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-103',
    flightNumber: 'MDK 214',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[1], // DPS
    departureTime: '13:45',
    arrivalTime: '16:40',
    duration: '1h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 52, smart: 74, flex: 108 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-104',
    flightNumber: 'MDK 220',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[1], // DPS
    departureTime: '17:20',
    arrivalTime: '20:15',
    duration: '1h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 69, smart: 92, flex: 132 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-105',
    flightNumber: 'MDK 226',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[1], // DPS
    departureTime: '20:45',
    arrivalTime: '23:35',
    duration: '1h 50m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Boeing 737-800',
    fares: { basic: 49, smart: 69, flex: 98 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-106',
    flightNumber: 'MDK 312',
    origin: AIRPORTS[1], // DPS
    destination: AIRPORTS[0], // CGK
    departureTime: '08:10',
    arrivalTime: '09:00',
    duration: '1h 50m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 56, smart: 77, flex: 112 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-107',
    flightNumber: 'MDK 318',
    origin: AIRPORTS[1], // DPS
    destination: AIRPORTS[0], // CGK
    departureTime: '15:20',
    arrivalTime: '16:15',
    duration: '1h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 62, smart: 84, flex: 120 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-108',
    flightNumber: 'MDK 402',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[2], // YIA
    departureTime: '07:00',
    arrivalTime: '08:15',
    duration: '1h 15m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 42, smart: 59, flex: 89 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-109',
    flightNumber: 'MDK 550',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[5], // LBJ Labuan Bajo
    departureTime: '10:15',
    arrivalTime: '13:40',
    duration: '2h 25m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 89, smart: 118, flex: 165 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-110',
    flightNumber: 'MDK 612',
    origin: AIRPORTS[1], // DPS
    destination: AIRPORTS[5], // LBJ
    departureTime: '11:20',
    arrivalTime: '12:35',
    duration: '1h 15m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'ATR 72-600',
    fares: { basic: 45, smart: 62, flex: 95 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
];

export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const columns: ('A' | 'B' | 'C' | 'D' | 'E' | 'F')[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  for (let row = 1; row <= 24; row++) {
    for (const col of columns) {
      const id = `${row}${col}`;
      let type: 'standard' | 'extraLegroom' | 'exitRow' = 'standard';
      let price = 6;
      
      if (row <= 3) {
        type = 'extraLegroom';
        price = 14;
      } else if (row === 12 || row === 14) {
        type = 'exitRow';
        price = 11;
      }

      // Preoccupy some seats randomly for realism
      const isOccupied = (row === 2 && col === 'B') || 
                         (row === 4 && (col === 'C' || col === 'D')) || 
                         (row === 8 && col === 'A') || 
                         (row === 12 && col === 'F') || 
                         (row === 15 && col === 'E');

      seats.push({
        id,
        row,
        column: col,
        type,
        priceUSD: price,
        isOccupied,
      });
    }
  }
  return seats;
};

export const DEMO_BOOKING: Booking = {
  code: 'MDK7X4',
  dateCreated: '2026-10-01',
  passenger: {
    id: 'p-01',
    firstName: 'Budi',
    lastName: 'Santoso',
    dateOfBirth: '1989-08-14',
    passportId: 'A8942109',
    email: 'budi.santoso@nusantara.id',
    phone: '+62 812 3456 7890',
    mudikPointsNumber: 'MP-892410',
  },
  outboundFlight: {
    id: 'fl-101',
    flightNumber: 'MDK 204',
    origin: AIRPORTS[0], // CGK
    destination: AIRPORTS[1], // DPS
    departureTime: '06:15',
    arrivalTime: '09:05',
    duration: '1h 50m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 58, smart: 79, flex: 115 },
    baggageIncluded: 'Equipaje despachado 20 kg + 7 kg cabina',
  },
  returnFlight: {
    id: 'fl-106',
    flightNumber: 'MDK 312',
    origin: AIRPORTS[1], // DPS
    destination: AIRPORTS[0], // CGK
    departureTime: '15:20',
    arrivalTime: '16:15',
    duration: '1h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 62, smart: 84, flex: 120 },
    baggageIncluded: 'Equipaje despachado 20 kg + 7 kg cabina',
  },
  selectedFareTier: 'smart',
  selectedSeat: '12A',
  extras: {
    extraBaggageKg: 0,
    mealSelected: 'Nasi Lemak Ayam Rendang',
    loungeAccess: true,
    priorityBoarding: true,
    inFlightWifi: false,
  },
  totalPriceUSD: 198,
  paymentMethod: 'card',
  status: 'confirmed',
  boardingPassGenerated: false,
};

export const FLIGHT_STATUSES: FlightStatusRecord[] = [
  {
    flightNumber: 'MDK 204',
    route: { origin: AIRPORTS[0], destination: AIRPORTS[1] },
    scheduledDeparture: '06:15',
    estimatedDeparture: '06:15',
    scheduledArrival: '09:05',
    estimatedArrival: '09:05',
    gate: 'A12',
    terminal: 'T2',
    carousel: 'B4',
    status: 'ON_TIME',
    aircraft: 'Airbus A320-200',
  },
  {
    flightNumber: 'MDK 208',
    route: { origin: AIRPORTS[0], destination: AIRPORTS[1] },
    scheduledDeparture: '09:30',
    estimatedDeparture: '09:45',
    scheduledArrival: '12:25',
    estimatedArrival: '12:40',
    gate: 'A14',
    terminal: 'T2',
    carousel: 'B2',
    status: 'BOARDING',
    aircraft: 'Airbus A320neo',
    delayMinutes: 15,
  },
  {
    flightNumber: 'MDK 402',
    route: { origin: AIRPORTS[0], destination: AIRPORTS[2] },
    scheduledDeparture: '07:00',
    estimatedDeparture: '07:35',
    scheduledArrival: '08:15',
    estimatedArrival: '08:50',
    gate: 'B03',
    terminal: 'T2',
    carousel: 'A1',
    status: 'DELAYED',
    aircraft: 'Airbus A320-200',
    delayMinutes: 35,
  },
  {
    flightNumber: 'MDK 550',
    route: { origin: AIRPORTS[0], destination: AIRPORTS[5] },
    scheduledDeparture: '10:15',
    estimatedDeparture: '10:15',
    scheduledArrival: '13:40',
    estimatedArrival: '13:40',
    gate: 'C08',
    terminal: 'T3',
    carousel: 'C1',
    status: 'DEPARTED',
    aircraft: 'Airbus A320neo',
  },
  {
    flightNumber: 'MDK 312',
    route: { origin: AIRPORTS[1], destination: AIRPORTS[0] },
    scheduledDeparture: '08:10',
    estimatedDeparture: '08:05',
    scheduledArrival: '09:00',
    estimatedArrival: '08:55',
    gate: 'D02',
    terminal: 'Doméstica',
    carousel: 'D3',
    status: 'ARRIVED',
    aircraft: 'Airbus A320neo',
  },
  {
    flightNumber: 'MDK 608',
    route: { origin: AIRPORTS[3], destination: AIRPORTS[7] },
    scheduledDeparture: '14:00',
    estimatedDeparture: '--:--',
    scheduledArrival: '16:30',
    estimatedArrival: '--:--',
    gate: '--',
    terminal: 'T1',
    carousel: '--',
    status: 'CANCELLED',
    aircraft: 'Boeing 737-800',
  },
];

export const INITIAL_USER: MudikMember = {
  id: 'usr-santoso',
  name: 'Budi Santoso',
  email: 'budi.santoso@nusantara.id',
  tier: 'START',
  points: 2450,
  nextTierPoints: 5000,
  joinedDate: '2025-04-12',
  history: [
    {
      id: 'tx-1',
      description: 'Vuelo Jakarta - Bali (MDK 204)',
      date: '2026-09-18',
      points: 480,
      type: 'earn',
    },
    {
      id: 'tx-2',
      description: 'Descuento canje equipaje adicional',
      date: '2026-08-04',
      points: -350,
      type: 'redeem',
    },
    {
      id: 'tx-3',
      description: 'Vuelo Yogyakarta - Jakarta (MDK 405)',
      date: '2026-06-22',
      points: 320,
      type: 'earn',
    },
    {
      id: 'tx-4',
      description: 'Bono de bienvenida Mudik Points',
      date: '2025-04-12',
      points: 2000,
      type: 'earn',
    },
  ],
};

export const DESTINATIONS: DestinationItem[] = [
  {
    id: 'dest-bali',
    code: 'DPS',
    city: 'Bali',
    country: 'Indonesia',
    tagline: 'Entre tradición y océano.',
    category: 'PLAYAS',
    description: 'La isla de los dioses no es un catálogo de postales turísticas: es la devoción cotidiana de ofrendas canang sari al amanecer, el estruendo de las olas en Uluwatu y la serenidad de los bancales de arroz de Jatiluwih.',
    highlights: ['Templo de Uluwatu al atardecer', 'Terrazas de arroz de Jatiluwih (UNESCO)', 'Artesanías talladas en madera de Ubud', 'Surf en Padang Padang'],
    localFood: ['Babi Guling ceremonial', 'Ayam Betutu especiado con base genep', 'Lawar balinés tradicional'],
    flightTimeFromCGK: '1h 50m',
    priceFromUSD: 49,
    gradient: 'from-[#5F429A]/90 to-[#263A79]/95',
  },
  {
    id: 'dest-yogyakarta',
    code: 'YIA',
    city: 'Yogyakarta',
    country: 'Indonesia',
    tagline: 'Donde la historia sigue viva.',
    category: 'CULTURA',
    description: 'El corazón del alma javanesa. La única monarquía activa de Indonesia donde el sultán preserva templos milenarios, el arte del batik canting y las tertulias nocturnas en los warungs de Malioboro.',
    highlights: ['Complejo monumental de Borobudur', 'Templos hindúes de Prambanan', 'Palacio Kraton del Sultán', 'Talleres centenarios de batik'],
    localFood: ['Gudeg javanés con yaca y huevo', 'Kopi Jos con carbón incandescente', 'Bakpia de frijol mungo'],
    flightTimeFromCGK: '1h 15m',
    priceFromUSD: 42,
    gradient: 'from-[#263A79]/90 to-[#465B71]/95',
  },
  {
    id: 'dest-jakarta',
    code: 'CGK',
    city: 'Jakarta',
    country: 'Indonesia',
    tagline: 'Una ciudad entre mundos.',
    category: 'CIUDADES',
    description: 'La metrópoli de contrastes infinitos. Desde los canales coloniales de Kota Tua y las galerías de arte contemporáneo de Senopati, hasta los aromas a clavo de olor y el dinamismo de 30 millones de almas.',
    highlights: ['Casco histórico Kota Tua y Café Batavia', 'Monumento Nacional Monas', 'Distrito de diseño y gastronomía Senopati', 'Mercado flotante Sunda Kelapa'],
    localFood: ['Soto Betawi cremoso de coco', 'Kerak Telor callejero crujiente', 'Ketoprak con salsa de maní'],
    flightTimeFromCGK: 'Centro de conexión',
    priceFromUSD: 38,
    gradient: 'from-[#465B71]/90 to-[#45469C]/95',
  },
  {
    id: 'dest-lombok',
    code: 'LOP',
    city: 'Lombok',
    country: 'Indonesia',
    tagline: 'Más allá de Bali.',
    category: 'NATURALEZA',
    description: 'Playas vírgenes de arena blanca, el imponente volcán Rinjani dominando el horizonte y la tranquila autenticidad de los pueblos Sasak donde el tiempo conserva su propio compás.',
    highlights: ['Bahía de arena blanca de Tanjung Aan', 'Islas Gili sin vehículos motorizados', 'Trekking en las laderas del Monte Rinjani', 'Tejidos artesanales Sasak en Sukarara'],
    localFood: ['Ayam Taliwang con salsa plecing picante', 'Bebalung sopa de costilla especiada', 'Plecing Kangkung'],
    flightTimeFromCGK: '2h 00m',
    priceFromUSD: 54,
    gradient: 'from-[#45469C]/90 to-[#5F429A]/95',
  },
  {
    id: 'dest-labuan-bajo',
    code: 'LBJ',
    city: 'Labuan Bajo',
    country: 'Indonesia',
    tagline: 'Donde las islas comienzan.',
    category: 'NATURALEZA',
    description: 'La puerta marina al Parque Nacional de Komodo. Aguas cristalinas habitadas por mantarrayas gigantes, colinas doradas que descienden en playas de arena rosa y dragones ancestrales.',
    highlights: ['Encuentro con el Dragón de Komodo', 'Isla Padar y sus tres bahías tricolores', 'Playa Rosa (Pink Beach)', 'Buceo en corrientes con mantas en Manta Point'],
    localFood: ['Ikan Kuah Asam pescado fresco en caldo cítrico', 'Kolo arroz cocinado en caña de bambú', 'Café robusta orgánico de Flores'],
    flightTimeFromCGK: '2h 25m',
    priceFromUSD: 89,
    gradient: 'from-[#263A79]/90 to-[#5F429A]/95',
  },
  {
    id: 'dest-medan',
    code: 'KNO',
    city: 'Medan',
    country: 'Indonesia',
    tagline: 'La gran capital culinaria del norte.',
    category: 'EXPERIENCIAS',
    description: 'Crisol cosmopolita de etnias Batak, malayas y chinas. Punto de partida hacia la selva de Bukit Lawang y los orangutanes silvestres, y orillas del místico Lago Toba.',
    highlights: ['Lago Toba y la isla Samosir', 'Palacio Maimun de arquitectura mogol-malaya', 'Reserva de orangutanes en Bukit Lawang', 'Calle gastronómica Jalan Semarang'],
    localFood: ['Rendang auténtico de Sumatra', 'Bika Ambon esponjoso aromatizado con pandan', 'Durian Ucok fresco'],
    flightTimeFromCGK: '2h 15m',
    priceFromUSD: 68,
    gradient: 'from-[#5F429A]/90 to-[#465B71]/95',
  },
];

export const EDITORIAL_ARTICLES: EditorialArticle[] = [
  {
    id: 'art-01',
    title: 'Guía secreta de Yogyakarta: batik tradicional, templos al amanecer y café jos.',
    subtitle: 'Cómo explorar la capital cultural de Java sin prisas y con ojos abiertos.',
    location: 'Yogyakarta, Java Central',
    readTime: '6 min de lectura',
    excerpt: 'En los callejones detrás del palacio real Kraton, las familias tejen patrones de batik cuyos significados se transmiten desde el siglo XVIII. Un viaje al alma javanesa.',
    author: 'Citra Dewi — Ensayista y curadora cultural',
    contentParagraphs: [
      'Al alba en Yogyakarta, antes de que el tráfico de motocicletas se adueñe de las avenidas, el aroma a jazmín y clavo de olor envuelve los talleres familiares de Kotagede. Aquí el tiempo tiene otra cadencia: la cera caliente se desliza con precisión milimétrica mediante el canting sobre lino fino.',
      'El templo de Prambanan se contempla mejor a primera hora, cuando las torres puntiagudas dedicadas a Shiva y Vishnu emergen de una neblina vaporosa. Pocos visitantes saben que a diez minutos a pie existen pequeños santuarios menores que permiten sentarse en silencio sobre piedra volcánica tallada.',
      'Al anochecer, la cita obligada es un "angkrigan" junto a la estación de tren Tugu: allí los locales piden Kopi Jos, un café recién colado en el que se sumerge un trozo de carbón vegetal ardiendo. El sonido del siseo es la melodía que abre cualquier conversación.',
    ],
    culturalTip: 'Al visitar recintos sagrados o casas javanesas, recuerda siempre descalzarte en la entrada y saludar con ambas manos unidas a la altura del pecho (sembah).',
    tag: 'TRADICIÓN & ARTE',
  },
  {
    id: 'art-02',
    title: 'Navegar las islas Komodo en un pinisi tradicional de madera de hierro.',
    subtitle: 'El arte de la carpintería naval de los marineros Bugis y los vientos del estrecho de Sape.',
    location: 'Labuan Bajo, Flores',
    readTime: '5 min de lectura',
    excerpt: 'Los barcos pinisi son patrimonio inmaterial de la humanidad por la UNESCO. Subir a bordo es revivir siglos de navegación en el mayor archipiélago del planeta.',
    author: 'Rahmat Hidayat — Fotógrafo y marinero',
    contentParagraphs: [
      'Durante semanas, los maestros carpinteros de las costas de Sulawesi dan forma a maderas de ulin sin planos de papel, guiados únicamente por la memoria colectiva y la intuición del oleaje. Estos veleros tradicionales, con sus dos mástiles imponentes y velas color terracota, son la viva estampa de la Indonesia marítima.',
      'Al doblar el cabo de Rinca, el mar se tiñe de un azul profundo casi mineral. Bajo la superficie, mantas raya de tres metros se deslizan en formación sincronizada a través de los cañones de coral vivo en Manta Point.',
      'Dormir sobre la cubierta mientras el barco fondea en una cala solitaria de la Isla Padar permite escuchar el murmullo de las olas y observar la vía láctea sin ninguna contaminación lumínica.',
    ],
    culturalTip: 'Respeta siempre la distancia indicada por los guardaparques rangers al observar a los dragones de Komodo. En el mar, no toques el coral ni uses bloqueadores con oxibenzona.',
    tag: 'EXPEDICIÓN MARÍTIMA',
  },
  {
    id: 'art-03',
    title: 'El sabor del verdadero Rendang en el corazón de Sumatra Occidental.',
    subtitle: 'Paciencia, fuego lento y doce especias en la cuna de la cocina Minangkabau.',
    location: 'Bukittinggi, Sumatra Occidental',
    readTime: '4 min de lectura',
    excerpt: 'Nombrado repetidamente como el plato más delicioso del mundo, el rendang no es un curry: es una filosofía de preservación comunitaria y hospitalidad infinita.',
    author: 'Nurul Aini — Investigadora gastronómica',
    contentParagraphs: [
      'En las casas comunales con tejados curvados en forma de cuerno de búfalo (rumah gadang), cocinar un rendang auténtico toma entre cuatro y seis horas. La leche fresca de coco rallado a mano se reduce lentamente junto con jengibre, galanga, cúrcuma, hojas de lima kaffir y hierba limón.',
      'El secreto no radica solo en las especias, sino en el movimiento continuo de la espátula de madera sobre el wok de hierro hasta que los líquidos se evaporan por completo y los aceites caramelizan la carne en un tono oscuro y aromático.',
      'Para los Minangkabau, compartir un rendang durante el Mudik simboliza la reconciliación y el agradecimiento familiar tras largos periodos de distancia.',
    ],
    culturalTip: 'En los restaurantes tradicionales Padang, la comida se sirve en una torre de pequeños platillos directamente en tu mesa. Solo pagas por aquellos platillos de los que hayas tomado una porción.',
    tag: 'GASTRONOMÍA ANCESTRAL',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Reservas',
    question: '¿Cómo puedo cambiar la fecha o ruta de mi vuelo?',
    answer: 'Si compraste una tarifa MUDIK FLEX, puedes modificar la fecha sin cargo de penalización hasta 4 horas antes del despegue (solo abonando diferencia tarifaria si existiera). Para tarifas MUDIK SMART y BASIC, los cambios tienen un costo administrativo accesible mediante la sección "Gestionar reserva".',
  },
  {
    id: 'faq-2',
    category: 'Reservas',
    question: '¿Qué incluye cada tarifa (Basic, Smart, Flex)?',
    answer: 'MUDIK BASIC incluye equipaje de mano de 7 kg. MUDIK SMART agrega 20 kg de equipaje despachado y selección de asiento estándar gratuita. MUDIK FLEX ofrece 25 kg de equipaje en bodega, selección prioritaria de asiento, embarque preferencial y cambios de fecha flexibles.',
  },
  {
    id: 'faq-3',
    category: 'Check-in',
    question: '¿Cuándo abre y cierra el check-in online?',
    answer: 'El check-in online abre 48 horas antes de la salida programada del vuelo y cierra 90 minutos antes del despegue para vuelos nacionales (120 minutos para vuelos internacionales). Puedes descargar tu tarjeta de embarque digital directamente en tu teléfono.',
  },
  {
    id: 'faq-4',
    category: 'Equipaje',
    question: '¿Cuáles son las medidas máximas del equipaje de mano?',
    answer: 'Cada pasajero puede llevar una pieza de equipaje de mano de hasta 7 kg cuyas dimensiones no superen 56 x 36 x 23 cm, más un artículo personal pequeño (mochila pequeña, cartera o estuche para computadora) que quepa bajo el asiento delantero.',
  },
  {
    id: 'faq-5',
    category: 'Equipaje',
    question: '¿Puedo transportar tablas de surf o equipo de buceo?',
    answer: 'Sí. Mudik Airways cuenta con tarifas especiales para material deportivo hacia Bali, Lombok y Labuan Bajo. Las tablas de surf de hasta 2 metros de longitud y equipos de buceo certificados se pueden agregar en "Gestionar reserva" o durante el flujo de compra.',
  },
  {
    id: 'faq-6',
    category: 'Mudik Points',
    question: '¿Cómo acumulo y canjeo mis Mudik Points?',
    answer: 'Acumulas entre 5 y 10 puntos por cada USD gastado en tarifas aéreas según tu categoría (Start, Plus o Prime). Los puntos se pueden canjear en la compra de vuelos, equipaje adicional, asientos con mayor espacio y accesos al exclusivo Mudik Lounge.',
  },
  {
    id: 'faq-7',
    category: 'Mudik Lounge',
    question: '¿Dónde están ubicados los Mudik Lounges?',
    answer: 'Contamos con salones Mudik Lounge en las terminales domésticas e internacionales de Jakarta (CGK T2 y T3) y Denpasar / Bali (DPS). Ofrecen café indonesio de especialidad, áreas de descanso, duchas, Wi-Fi de alta velocidad y gastronomía caliente.',
  },
  {
    id: 'faq-8',
    category: 'Accesibilidad',
    question: '¿Cómo solicito asistencia especial o silla de ruedas?',
    answer: 'Puedes solicitar asistencia en silla de ruedas o atención para personas con movilidad reducida sin ningún costo adicional hasta 24 horas antes del vuelo a través de "Gestionar reserva" o llamando a nuestro centro de atención telefónica.',
  },
];
