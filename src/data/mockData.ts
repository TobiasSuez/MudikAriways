import { Airport, Booking, DayFare, DestinationItem, EditorialArticle, FAQItem, Flight, FlightStatusRecord, MudikMember, Seat } from '../types';

export const AIRPORTS: Airport[] = [
  // Argentina - Hubs Principales
  { code: 'AEP', city: 'Buenos Aires (Aeroparque)', name: 'Aeroparque Jorge Newbery', country: 'Argentina' },
  { code: 'EZE', city: 'Buenos Aires (Ezeiza)', name: 'Aeropuerto Internacional Ministro Pistarini', country: 'Argentina' },
  // Argentina - Cabotaje Nacional
  { code: 'BRC', city: 'Bariloche', name: 'Aeropuerto Int. Teniente Luis Candelaria', country: 'Argentina' },
  { code: 'MDZ', city: 'Mendoza', name: 'Aeropuerto Int. El Plumerillo', country: 'Argentina' },
  { code: 'IGR', city: 'Puerto Iguazú', name: 'Aeropuerto Int. Cataratas del Iguazú', country: 'Argentina' },
  { code: 'COR', city: 'Córdoba', name: 'Aeropuerto Int. Ingeniero Ambrosio Taravella', country: 'Argentina' },
  { code: 'SLA', city: 'Salta', name: 'Aeropuerto Int. Martín Miguel de Güemes', country: 'Argentina' },

  // Regional Sudamérica
  { code: 'SCL', city: 'Santiago de Chile', name: 'Aeropuerto Int. Arturo Merino Benítez', country: 'Chile', isInternational: true },
  { code: 'GIG', city: 'Río de Janeiro', name: 'Aeropuerto Int. Galeão - Antonio Carlos Jobim', country: 'Brasil', isInternational: true },
  { code: 'GRU', city: 'São Paulo', name: 'Aeropuerto Int. de Guarulhos', country: 'Brasil', isInternational: true },
  { code: 'LIM', city: 'Lima', name: 'Aeropuerto Int. Jorge Chávez', country: 'Perú', isInternational: true },
  { code: 'MVD', city: 'Montevideo', name: 'Aeropuerto Int. de Carrasco', country: 'Uruguay', isInternational: true },

  // Estados Unidos
  { code: 'MIA', city: 'Miami', name: 'Miami International Airport', country: 'Estados Unidos', isInternational: true },
  { code: 'JFK', city: 'Nueva York', name: 'John F. Kennedy International Airport', country: 'Estados Unidos', isInternational: true },
  { code: 'MCO', city: 'Orlando', name: 'Orlando International Airport', country: 'Estados Unidos', isInternational: true },

  // Europa
  { code: 'MAD', city: 'Madrid', name: 'Aeropuerto Adolfo Suárez Madrid-Barajas', country: 'España', isInternational: true },
  { code: 'BCN', city: 'Barcelona', name: 'Aeropuerto Josep Tarradellas Barcelona-El Prat', country: 'España', isInternational: true },
  { code: 'FCO', city: 'Roma', name: 'Aeropuerto di Roma-Fiumicino Leonardo da Vinci', country: 'Italia', isInternational: true },

  // Indonesia & Sudeste Asiático (Conservadas)
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

export const getAirportByCode = (code: string): Airport => {
  return AIRPORTS.find(a => a.code === code) || AIRPORTS[0];
};

export const MOCK_FLIGHTS: Flight[] = [
  // Rutas Cabotaje Argentina (Buenos Aires AEP / EZE)
  {
    id: 'fl-arg-01',
    flightNumber: 'MDK 1204',
    origin: getAirportByCode('AEP'),
    destination: getAirportByCode('BRC'),
    departureTime: '07:30',
    arrivalTime: '09:45',
    duration: '2h 15m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 54, smart: 74, flex: 98 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-arg-02',
    flightNumber: 'MDK 1210',
    origin: getAirportByCode('AEP'),
    destination: getAirportByCode('BRC'),
    departureTime: '14:15',
    arrivalTime: '16:30',
    duration: '2h 15m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Boeing 737-800',
    fares: { basic: 58, smart: 78, flex: 104 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-arg-03',
    flightNumber: 'MDK 1302',
    origin: getAirportByCode('AEP'),
    destination: getAirportByCode('MDZ'),
    departureTime: '08:45',
    arrivalTime: '10:35',
    duration: '1h 50m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 48, smart: 66, flex: 89 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-arg-04',
    flightNumber: 'MDK 1406',
    origin: getAirportByCode('AEP'),
    destination: getAirportByCode('IGR'),
    departureTime: '09:10',
    arrivalTime: '11:05',
    duration: '1h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 52, smart: 70, flex: 94 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-arg-05',
    flightNumber: 'MDK 1102',
    origin: getAirportByCode('AEP'),
    destination: getAirportByCode('COR'),
    departureTime: '06:40',
    arrivalTime: '08:00',
    duration: '1h 20m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Boeing 737-800',
    fares: { basic: 36, smart: 52, flex: 72 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },
  {
    id: 'fl-arg-06',
    flightNumber: 'MDK 1205',
    origin: getAirportByCode('BRC'),
    destination: getAirportByCode('AEP'),
    departureTime: '10:30',
    arrivalTime: '12:40',
    duration: '2h 10m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 54, smart: 74, flex: 98 },
    baggageIncluded: 'Equipaje de mano 7 kg',
  },

  // Rutas Regionales Sudamérica (US$ 375 a US$ 450)
  {
    id: 'fl-reg-01',
    flightNumber: 'MDK 2108',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('GIG'),
    departureTime: '10:00',
    arrivalTime: '13:05',
    duration: '3h 05m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 395, smart: 445, flex: 520 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },
  {
    id: 'fl-reg-02',
    flightNumber: 'MDK 2204',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('SCL'),
    departureTime: '11:30',
    arrivalTime: '13:45',
    duration: '2h 15m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320-200',
    fares: { basic: 385, smart: 435, flex: 495 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },
  {
    id: 'fl-reg-03',
    flightNumber: 'MDK 2306',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('LIM'),
    departureTime: '16:20',
    arrivalTime: '19:15',
    duration: '4h 55m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A320neo',
    fares: { basic: 420, smart: 470, flex: 540 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },

  // Rutas Estados Unidos (US$ 700 a US$ 1.150)
  {
    id: 'fl-usa-01',
    flightNumber: 'MDK 5002',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('MIA'),
    departureTime: '21:15',
    arrivalTime: '05:40',
    duration: '9h 25m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A330-900neo',
    fares: { basic: 780, smart: 920, flex: 1100 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },
  {
    id: 'fl-usa-02',
    flightNumber: 'MDK 5010',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('JFK'),
    departureTime: '22:45',
    arrivalTime: '07:55',
    duration: '11h 10m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Boeing 787-9 Dreamliner',
    fares: { basic: 940, smart: 1080, flex: 1290 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },

  // Rutas Europa (US$ 950 a US$ 1.550+)
  {
    id: 'fl-eur-01',
    flightNumber: 'MDK 7004',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('MAD'),
    departureTime: '13:00',
    arrivalTime: '06:10',
    duration: '12h 10m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A350-900',
    fares: { basic: 980, smart: 1180, flex: 1420 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },
  {
    id: 'fl-eur-02',
    flightNumber: 'MDK 7008',
    origin: getAirportByCode('EZE'),
    destination: getAirportByCode('BCN'),
    departureTime: '17:30',
    arrivalTime: '11:15',
    duration: '12h 45m',
    isDirect: true,
    stopsCount: 0,
    aircraft: 'Airbus A350-900',
    fares: { basic: 1050, smart: 1240, flex: 1490 },
    baggageIncluded: 'Equipaje despachado 23 kg + 10 kg cabina',
  },

  // Rutas Indonesia (Conservadas)
  {
    id: 'fl-101',
    flightNumber: 'MDK 204',
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('DPS'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('DPS'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('DPS'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('DPS'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('DPS'),
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
    origin: getAirportByCode('DPS'),
    destination: getAirportByCode('CGK'),
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
    origin: getAirportByCode('DPS'),
    destination: getAirportByCode('CGK'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('YIA'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('LBJ'),
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
    origin: getAirportByCode('DPS'),
    destination: getAirportByCode('LBJ'),
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
    origin: getAirportByCode('CGK'),
    destination: getAirportByCode('DPS'),
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
    origin: getAirportByCode('DPS'),
    destination: getAirportByCode('CGK'),
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
    flightNumber: 'MDK 1204',
    route: { origin: getAirportByCode('AEP'), destination: getAirportByCode('BRC') },
    scheduledDeparture: '07:30',
    estimatedDeparture: '07:30',
    scheduledArrival: '09:45',
    estimatedArrival: '09:45',
    gate: 'A03',
    terminal: 'Aeroparque T1',
    carousel: 'C2',
    status: 'ON_TIME',
    aircraft: 'Airbus A320neo',
  },
  {
    flightNumber: 'MDK 5002',
    route: { origin: getAirportByCode('EZE'), destination: getAirportByCode('MIA') },
    scheduledDeparture: '21:15',
    estimatedDeparture: '21:30',
    scheduledArrival: '05:40',
    estimatedArrival: '05:55',
    gate: 'B18',
    terminal: 'Ezeiza TB',
    carousel: 'B5',
    status: 'BOARDING',
    aircraft: 'Airbus A330-900neo',
    delayMinutes: 15,
  },
  {
    flightNumber: 'MDK 204',
    route: { origin: getAirportByCode('CGK'), destination: getAirportByCode('DPS') },
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
    route: { origin: getAirportByCode('CGK'), destination: getAirportByCode('DPS') },
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
    route: { origin: getAirportByCode('CGK'), destination: getAirportByCode('YIA') },
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
    flightNumber: 'MDK 312',
    route: { origin: getAirportByCode('DPS'), destination: getAirportByCode('CGK') },
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
  // Nuevos destinos solicitados (Argentina e Internacionales)
  {
    id: 'dest-bariloche',
    code: 'BRC',
    city: 'Bariloche',
    country: 'Argentina',
    tagline: 'Lagos cristalinos y cordillera andina.',
    category: 'NATURALEZA',
    description: 'La joya de la Patagonia argentina. Vistas panorámicas del Lago Nahuel Huapi, rutas de chocolate artesanal y cerros emblemáticos para todas las estaciones.',
    highlights: ['Circuito Chico y Punto Panorámico', 'Cerro Campanario y teleférico', 'Colonia Suiza y curanto dominical', 'Chocolaterías históricas de calle Mitre'],
    localFood: ['Trucha patagónica a la manteca negra', 'Cordero al asador con hierbas', 'Fondue de chocolate alpino'],
    flightTimeFromCGK: '2h 15m desde AEP',
    priceFromUSD: 54,
    gradient: 'from-[#263A79]/80 to-[#5F429A]/90',
    imageUrl: 'https://images.unsplash.com/photo-1579618218290-24a26f63a728?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dest-mendoza',
    code: 'MDZ',
    city: 'Mendoza',
    country: 'Argentina',
    tagline: 'Tierra del sol y del buen vino.',
    category: 'EXPERIENCIAS',
    description: 'Bajo la sombra del imponente Aconcagua, Mendoza combina bodegas de clase mundial en el Valle de Uco con el relax de las termas y la gastronomía andina.',
    highlights: ['Caminos del vino en Valle de Uco y Luján de Cuyo', 'Parque Provincial Aconcagua', 'Termas de Cacheuta', 'Plaza Independencia y arboledas históricas'],
    localFood: ['Asado con corte ojo de bife', 'Empanadas mendocinas al horno de barro', 'Maridaje con Malbec de altura'],
    flightTimeFromCGK: '1h 50m desde AEP',
    priceFromUSD: 48,
    gradient: 'from-[#5F429A]/80 to-[#465B71]/90',
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dest-iguazu',
    code: 'IGR',
    city: 'Puerto Iguazú',
    country: 'Argentina',
    tagline: 'Fuerza natural incontenible.',
    category: 'NATURALEZA',
    description: 'Maravilla natural del mundo. Más de 275 saltos de agua rodeados por la densa selva misionera y el rugido sobrecogedor de la Garganta del Diablo.',
    highlights: ['Pasarelas hacia la Garganta del Diablo', 'Paseo en lancha Gran Aventura bajo las cataratas', 'Hito Tres Fronteras', 'Senderos de flora y fauna en la selva paranaense'],
    localFood: ['Pacú y surubí de río', 'Mbeju y chipá tradicional', 'Helado de yerba mate y frutos nativos'],
    flightTimeFromCGK: '1h 55m desde AEP',
    priceFromUSD: 52,
    gradient: 'from-[#465B71]/80 to-[#263A79]/90',
    imageUrl: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dest-rio',
    code: 'GIG',
    city: 'Río de Janeiro',
    country: 'Brasil',
    tagline: 'La ciudad maravillosa.',
    category: 'PLAYAS',
    description: 'La fusión perfecta entre mar turquesa, selva atlántica y la calidez del pueblo carioca entre Copacabana, Ipanema y el Cristo Redentor.',
    highlights: ['Cristo Redentor en el cerro Corcovado', 'Teleférico del Pan de Azúcar al atardecer', 'Playas de Ipanema y Copacabana', 'Escalera de Selarón en Lapa'],
    localFood: ['Feijoada completa con farofa', 'Açaí helado con granola fresca', 'Pão de queijo y caipirinha tradicional'],
    flightTimeFromCGK: '3h 05m desde EZE',
    priceFromUSD: 395,
    gradient: 'from-[#263A79]/80 to-[#5F429A]/90',
    imageUrl: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dest-miami',
    code: 'MIA',
    city: 'Miami',
    country: 'Estados Unidos',
    tagline: 'El epicentro vibrante del sol.',
    category: 'CIUDADES',
    description: 'Arquitectura Art Déco en South Beach, gastronomía fusión de primer nivel, distrito de galerías de Wynwood y playas de aguas cálidas todo el año.',
    highlights: ['Distrito Art Déco de Ocean Drive', 'Murales y arte urbano en Wynwood Walls', 'Compras en Design District y Brickell', 'Bahía de Biscayne en crucero al atardecer'],
    localFood: ['Sándwich cubano auténtico en Little Havana', 'Ceviche y mariscos de Florida', 'Key lime pie con merengue dorado'],
    flightTimeFromCGK: '9h 25m desde EZE',
    priceFromUSD: 780,
    gradient: 'from-[#5F429A]/80 to-[#263A79]/90',
    imageUrl: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'dest-madrid',
    code: 'MAD',
    city: 'Madrid',
    country: 'España',
    tagline: 'Cultura, terrazas y vida sin fin.',
    category: 'CULTURA',
    description: 'La capital imperial española ofrece una oferta museística inigualable en el Paseo del Arte, tapeo en La Latina y atardeceres mágicos en el Templo de Debod.',
    highlights: ['Museo del Prado y Reina Sofía', 'Paseo por el Parque de El Retiro (UNESCO)', 'Plaza Mayor y Mercado de San Miguel', 'Gran Vía y musicales nocturnos'],
    localFood: ['Tapas de jamón ibérico de bellota', 'Bocadillo de calamares crujiente', 'Churros con chocolate en San Ginés'],
    flightTimeFromCGK: '12h 10m desde EZE',
    priceFromUSD: 980,
    gradient: 'from-[#263A79]/80 to-[#465B71]/90',
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=900&q=80',
  },

  // Destinos Indonesia (Conservados intactos)
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
    gradient: 'from-[#5F429A]/80 to-[#263A79]/90',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80',
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
    gradient: 'from-[#263A79]/80 to-[#465B71]/90',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=900&q=80',
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
    gradient: 'from-[#465B71]/80 to-[#45469C]/90',
    imageUrl: 'https://images.unsplash.com/photo-1555899434-94d1338eb352?auto=format&fit=crop&w=900&q=80',
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
    gradient: 'from-[#45469C]/80 to-[#5F429A]/90',
    imageUrl: 'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?auto=format&fit=crop&w=900&q=80',
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
    gradient: 'from-[#263A79]/80 to-[#5F429A]/90',
    imageUrl: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=900&q=80',
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
    gradient: 'from-[#5F429A]/80 to-[#465B71]/90',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
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

export interface RoutePriceInfo {
  basePrice: number;
  category: 'cabotaje' | 'sudamerica' | 'usa' | 'europa' | 'indonesia';
  variationRange: number;
}

export const getRouteBasePrice = (originCode: string, destCode: string): RoutePriceInfo => {
  const argentineAirports = ['AEP', 'EZE', 'BRC', 'MDZ', 'IGR', 'COR', 'SLA'];
  const sudamericaAirports = ['SCL', 'GIG', 'GRU', 'LIM', 'MVD'];
  const usaAirports = ['MIA', 'JFK', 'MCO'];
  const europaAirports = ['MAD', 'BCN', 'FCO'];

  const isOrigArg = argentineAirports.includes(originCode);
  const isDestArg = argentineAirports.includes(destCode);

  // Cabotaje Nacional Argentina: US$ 30 a US$ 75 por tramo (US$ 60 a US$ 150 ida y vuelta)
  if (isOrigArg && isDestArg) {
    const cabotajeRates: Record<string, number> = {
      'BRC': 54, // Bariloche
      'MDZ': 48, // Mendoza
      'IGR': 52, // Iguazú
      'COR': 36, // Córdoba
      'SLA': 58, // Salta
      'AEP': 42,
      'EZE': 45,
    };
    return {
      basePrice: cabotajeRates[destCode] || 48,
      category: 'cabotaje',
      variationRange: 10,
    };
  }

  // Sudamérica Regional: US$ 375 a US$ 450
  if (
    (isOrigArg && sudamericaAirports.includes(destCode)) ||
    (sudamericaAirports.includes(originCode) && isDestArg) ||
    (sudamericaAirports.includes(originCode) && sudamericaAirports.includes(destCode))
  ) {
    const sudamericaRates: Record<string, number> = {
      'MVD': 380, // Montevideo
      'SCL': 385, // Santiago
      'GRU': 410, // São Paulo
      'GIG': 395, // Río de Janeiro
      'LIM': 430, // Lima
    };
    return {
      basePrice: sudamericaRates[destCode] || sudamericaRates[originCode] || 395,
      category: 'sudamerica',
      variationRange: 30,
    };
  }

  // Estados Unidos: US$ 700 a US$ 1.150
  if (
    (isOrigArg && usaAirports.includes(destCode)) ||
    (usaAirports.includes(originCode) && isDestArg) ||
    (usaAirports.includes(originCode) && usaAirports.includes(destCode))
  ) {
    const usaRates: Record<string, number> = {
      'MIA': 780,  // Miami
      'MCO': 850,  // Orlando
      'JFK': 1050, // Nueva York JFK
    };
    return {
      basePrice: usaRates[destCode] || usaRates[originCode] || 890,
      category: 'usa',
      variationRange: 60,
    };
  }

  // Europa: US$ 950 a US$ 1.550+
  if (
    (isOrigArg && europaAirports.includes(destCode)) ||
    (europaAirports.includes(originCode) && isDestArg) ||
    (europaAirports.includes(originCode) && europaAirports.includes(destCode))
  ) {
    const europaRates: Record<string, number> = {
      'MAD': 980,  // Madrid
      'BCN': 1080, // Barcelona
      'FCO': 1220, // Roma
    };
    return {
      basePrice: europaRates[destCode] || europaRates[originCode] || 1100,
      category: 'europa',
      variationRange: 90,
    };
  }

  // Indonesia & Sudeste Asiático (US$ 38 a US$ 89)
  const matchDest = DESTINATIONS.find(d => d.code === destCode);
  return {
    basePrice: matchDest?.priceFromUSD || 54,
    category: 'indonesia',
    variationRange: 14,
  };
};

export const getMonthFares = (
  originCode: string,
  destCode: string,
  year: number,
  month: number // 1-12
): DayFare[] => {
  const routeInfo = getRouteBasePrice(originCode, destCode);
  const basePrice = routeInfo.basePrice;
  const daysInMonth = new Date(year, month, 0).getDate();
  const dayFares: DayFare[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayOfWeek = new Date(year, month - 1, day).getDay();

    let dayFactor = 0;
    if (dayOfWeek === 5 || dayOfWeek === 0) { // Viernes y Domingo pico
      dayFactor = 0.12;
    } else if (dayOfWeek === 6) { // Sábado
      dayFactor = 0.06;
    } else if (dayOfWeek === 2 || dayOfWeek === 3) { // Martes y Miércoles más económico
      dayFactor = -0.06;
    }

    const pseudoNoise = ((day * 7 + month * 13) % 15 - 7) / 75;
    const computedPrice = Math.round(basePrice * (1 + dayFactor + pseudoNoise));
    const minFloor = routeInfo.category === 'cabotaje' 
      ? 30 
      : routeInfo.category === 'sudamerica' 
      ? 375 
      : routeInfo.category === 'usa' 
      ? 700 
      : routeInfo.category === 'europa' 
      ? 950 
      : 36;
    const price = Math.max(minFloor, computedPrice);

    dayFares.push({
      date: dateStr,
      dayNumber: day,
      priceUSD: price,
      isLowest: false,
      isAvailable: true,
    });
  }

  const sortedPrices = [...dayFares].map(d => d.priceUSD).sort((a, b) => a - b);
  const lowestThreshold = sortedPrices[Math.floor(sortedPrices.length * 0.25)] || sortedPrices[0];

  dayFares.forEach(d => {
    if (d.priceUSD <= lowestThreshold) {
      d.isLowest = true;
    }
  });

  return dayFares;
};

