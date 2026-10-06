export type Language = 'ES' | 'EN';
export type Currency = 'USD' | 'IDR';

export type TripType = 'roundTrip' | 'oneWay' | 'multiCity';
export type CabinClass = 'Economy' | 'Premium';

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
  isInternational?: boolean;
}

export type FareTier = 'basic' | 'smart' | 'flex';

export interface FlightFare {
  tier: FareTier;
  name: string;
  priceUSD: number;
  features: string[];
  isRecommended?: boolean;
}

export interface Flight {
  id: string;
  flightNumber: string;
  origin: Airport;
  destination: Airport;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  isDirect: boolean;
  stopsCount: number;
  aircraft: string;
  fares: {
    basic: number; // USD
    smart: number; // USD
    flex: number;  // USD
  };
  baggageIncluded: string;
}

export interface PassengerInfo {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  passportId: string;
  email: string;
  phone: string;
  mudikPointsNumber?: string;
}

export interface Seat {
  id: string; // e.g. "12A"
  row: number;
  column: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  type: 'standard' | 'extraLegroom' | 'exitRow';
  priceUSD: number;
  isOccupied: boolean;
}

export interface BookingExtras {
  extraBaggageKg: number; // 0, 20, 30
  mealSelected: string | null;
  loungeAccess: boolean;
  priorityBoarding: boolean;
  inFlightWifi: boolean;
}

export interface Booking {
  code: string;
  dateCreated: string;
  passenger: PassengerInfo;
  outboundFlight: Flight;
  returnFlight?: Flight;
  selectedFareTier: FareTier;
  selectedSeat: string;
  extras: BookingExtras;
  totalPriceUSD: number;
  paymentMethod: 'card' | 'wallet' | 'points';
  status: 'confirmed' | 'checkedIn' | 'cancelled';
  boardingPassGenerated?: boolean;
}

export type FlightStatusType = 'ON_TIME' | 'BOARDING' | 'DELAYED' | 'DEPARTED' | 'ARRIVED' | 'CANCELLED';

export interface FlightStatusRecord {
  flightNumber: string;
  route: {
    origin: Airport;
    destination: Airport;
  };
  scheduledDeparture: string;
  estimatedDeparture: string;
  scheduledArrival: string;
  estimatedArrival: string;
  gate: string;
  terminal: string;
  carousel: string;
  status: FlightStatusType;
  aircraft: string;
  delayMinutes?: number;
}

export interface MudikMember {
  id: string;
  name: string;
  email: string;
  tier: 'START' | 'PLUS' | 'PRIME';
  points: number;
  nextTierPoints: number;
  joinedDate: string;
  history: {
    id: string;
    description: string;
    date: string;
    points: number; // positive for earned, negative for redeemed
    type: 'earn' | 'redeem';
  }[];
}

export interface DestinationItem {
  id: string;
  code: string;
  city: string;
  country: string;
  tagline: string;
  category: 'PLAYAS' | 'CULTURA' | 'CIUDADES' | 'NATURALEZA' | 'TEMPLOS' | 'EXPERIENCIAS';
  description: string;
  highlights: string[];
  localFood: string[];
  flightTimeFromCGK: string;
  priceFromUSD: number;
  gradient: string;
}

export interface EditorialArticle {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  readTime: string;
  excerpt: string;
  author: string;
  contentParagraphs: string[];
  culturalTip: string;
  tag: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export type PageView = 
  | 'home'
  | 'search-results'
  | 'booking'
  | 'manage-booking'
  | 'check-in'
  | 'flight-status'
  | 'flight-schedules'
  | 'mudik-points'
  | 'destinations'
  | 'mudik-destino'
  | 'mudik-lounge'
  | 'onboard'
  | 'baggage'
  | 'help'
  | 'account';
