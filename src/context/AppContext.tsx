import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  Airport, 
  Booking, 
  BookingExtras, 
  CabinClass, 
  Currency, 
  FareTier, 
  Flight, 
  Language, 
  MudikMember, 
  MultiCitySegment,
  PageView, 
  PassengerInfo, 
  SelectedMultiCityFlight,
  TripType 
} from '../types';
import { AIRPORTS, DEMO_BOOKING, INITIAL_USER, MOCK_FLIGHTS } from '../data/mockData';

interface AppContextType {
  // Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (cur: Currency) => void;
  formatPrice: (usd: number) => string;
  t: (es: string, en: string) => string;

  // Navigation
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  navigateTo: (page: PageView, extraState?: any) => void;

  // Search parameters
  originAirport: Airport;
  setOriginAirport: (airport: Airport) => void;
  destinationAirport: Airport;
  setDestinationAirport: (airport: Airport) => void;
  departureDate: string;
  setDepartureDate: (date: string) => void;
  returnDate: string;
  setReturnDate: (date: string) => void;
  tripType: TripType;
  setTripType: (type: TripType) => void;
  multiCitySegments: MultiCitySegment[];
  setMultiCitySegments: React.Dispatch<React.SetStateAction<MultiCitySegment[]>>;
  addMultiCitySegment: () => void;
  removeMultiCitySegment: (id: string) => void;
  updateMultiCitySegment: (id: string, updates: Partial<MultiCitySegment>) => void;
  passengers: { adults: number; children: number; infants: number };
  setPassengers: React.Dispatch<React.SetStateAction<{ adults: number; children: number; infants: number }>>;
  cabinClass: CabinClass;
  setCabinClass: (cls: CabinClass) => void;
  promoCode: string;
  setPromoCode: (code: string) => void;
  isUsingPoints: boolean;
  setIsUsingPoints: (using: boolean) => void;

  // Search actions
  swapAirports: () => void;
  handleSearchFlights: () => void;
  selectDestinationForSearch: (code: string) => void;

  // Booking Flow
  selectedOutboundFlight: Flight | null;
  setSelectedOutboundFlight: (flight: Flight | null) => void;
  selectedReturnFlight: Flight | null;
  setSelectedReturnFlight: (flight: Flight | null) => void;
  selectedMultiCityFlights: SelectedMultiCityFlight[];
  setSelectedMultiCityFlights: React.Dispatch<React.SetStateAction<SelectedMultiCityFlight[]>>;
  selectedFareTier: FareTier;
  setSelectedFareTier: (tier: FareTier) => void;
  passengerDetails: PassengerInfo;
  setPassengerDetails: React.Dispatch<React.SetStateAction<PassengerInfo>>;
  selectedSeat: string;
  setSelectedSeat: (seat: string) => void;
  extras: BookingExtras;
  setExtras: React.Dispatch<React.SetStateAction<BookingExtras>>;
  bookingStep: number;
  setBookingStep: (step: number) => void;
  latestBooking: Booking | null;
  completeBooking: (method: 'card' | 'wallet' | 'points') => Booking;

  // Manage Booking
  managedBooking: Booking | null;
  setManagedBooking: (booking: Booking | null) => void;
  loadDemoBooking: () => void;
  searchBooking: (code: string, lastName: string) => boolean;
  updateManagedBooking: (updates: Partial<Booking>) => void;

  // Online Check-in
  checkInBooking: Booking | null;
  setCheckInBooking: (booking: Booking | null) => void;
  executeCheckIn: () => void;

  // User & Loyalty
  currentUser: MudikMember | null;
  setCurrentUser: (user: MudikMember | null) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  earnPoints: (amount: number, description: string) => void;
  redeemPoints: (amount: number, description: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const IDR_EXCHANGE_RATE = 16250;

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ES');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Search filters
  const [originAirport, setOriginAirport] = useState<Airport>(AIRPORTS[0]); // Jakarta
  const [destinationAirport, setDestinationAirport] = useState<Airport>(AIRPORTS[1]); // Bali
  const [departureDate, setDepartureDate] = useState<string>('2026-10-15');
  const [returnDate, setReturnDate] = useState<string>('2026-10-22');
  const [tripType, setTripType] = useState<TripType>('roundTrip');
  const [multiCitySegments, setMultiCitySegments] = useState<MultiCitySegment[]>([
    { id: 'seg-1', origin: AIRPORTS[0], destination: AIRPORTS[1], departureDate: '2026-10-15' },
    { id: 'seg-2', origin: AIRPORTS[1], destination: AIRPORTS[5], departureDate: '2026-10-19' },
  ]);

  const addMultiCitySegment = () => {
    if (multiCitySegments.length >= 4) return;
    const lastSeg = multiCitySegments[multiCitySegments.length - 1];
    const nextOrigin = lastSeg ? lastSeg.destination : AIRPORTS[0];
    const availableDests = AIRPORTS.filter(a => a.code !== nextOrigin.code);
    const nextDest = availableDests[0] || AIRPORTS[1];

    let nextDate = '2026-10-23';
    if (lastSeg?.departureDate) {
      const d = new Date(lastSeg.departureDate + 'T00:00:00');
      d.setDate(d.getDate() + 3);
      nextDate = d.toISOString().split('T')[0];
    }

    setMultiCitySegments(prev => [
      ...prev,
      {
        id: `seg-${Date.now()}`,
        origin: nextOrigin,
        destination: nextDest,
        departureDate: nextDate
      }
    ]);
  };

  const removeMultiCitySegment = (id: string) => {
    if (multiCitySegments.length <= 2) return;
    setMultiCitySegments(prev => prev.filter(s => s.id !== id));
  };

  const updateMultiCitySegment = (id: string, updates: Partial<MultiCitySegment>) => {
    setMultiCitySegments(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState<CabinClass>('Economy');
  const [promoCode, setPromoCode] = useState<string>('');
  const [isUsingPoints, setIsUsingPoints] = useState<boolean>(false);

  // Booking Flow
  const [selectedOutboundFlight, setSelectedOutboundFlight] = useState<Flight | null>(MOCK_FLIGHTS[0]);
  const [selectedReturnFlight, setSelectedReturnFlight] = useState<Flight | null>(MOCK_FLIGHTS[5]);
  const [selectedMultiCityFlights, setSelectedMultiCityFlights] = useState<SelectedMultiCityFlight[]>([]);
  const [selectedFareTier, setSelectedFareTier] = useState<FareTier>('smart');
  const [passengerDetails, setPassengerDetails] = useState<PassengerInfo>({
    id: 'p-user',
    firstName: 'Budi',
    lastName: 'Santoso',
    dateOfBirth: '1990-05-20',
    passportId: 'B7729103',
    email: 'budi.santoso@nusantara.id',
    phone: '+62 812 8847 2910',
    mudikPointsNumber: 'MP-892410',
  });
  const [selectedSeat, setSelectedSeat] = useState<string>('12A');
  const [extras, setExtras] = useState<BookingExtras>({
    extraBaggageKg: 0,
    mealSelected: null,
    loungeAccess: false,
    priorityBoarding: false,
    inFlightWifi: false,
  });
  const [bookingStep, setBookingStep] = useState<number>(1);
  const [latestBooking, setLatestBooking] = useState<Booking | null>(null);

  // Manage Booking & Check-in
  const [managedBooking, setManagedBooking] = useState<Booking | null>(DEMO_BOOKING);
  const [checkInBooking, setCheckInBooking] = useState<Booking | null>(null);

  // User & Loyalty
  const [currentUser, setCurrentUser] = useState<MudikMember | null>(INITIAL_USER);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  // Translation helper
  const t = (es: string, en: string) => (language === 'ES' ? es : en);

  // Currency formatter
  const formatPrice = (usd: number) => {
    if (currency === 'IDR') {
      const idrAmount = Math.round(usd * IDR_EXCHANGE_RATE);
      return `IDR ${idrAmount.toLocaleString('id-ID')}`;
    }
    return `USD ${usd}`;
  };

  const navigateTo = (page: PageView) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const swapAirports = () => {
    const temp = originAirport;
    setOriginAirport(destinationAirport);
    setDestinationAirport(temp);
  };

  const handleSearchFlights = () => {
    // If selecting flights for search
    navigateTo('search-results');
  };

  const selectDestinationForSearch = (code: string) => {
    const found = AIRPORTS.find(a => a.code === code);
    if (found) {
      setOriginAirport(AIRPORTS[0]); // Jakarta CGK
      setDestinationAirport(found);
      navigateTo('home');
      // Scroll to widget smoothly
      setTimeout(() => {
        const el = document.getElementById('booking-widget-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const completeBooking = (method: 'card' | 'wallet' | 'points'): Booking => {
    // Calculate total price
    let baseFare = 0;
    if (tripType === 'multiCity' && selectedMultiCityFlights.length > 0) {
      baseFare = selectedMultiCityFlights.reduce((sum, item) => sum + (item.flight.fares[item.fareTier] || 60), 0);
    } else {
      baseFare = selectedOutboundFlight?.fares[selectedFareTier] || 60;
      if (tripType === 'roundTrip' && selectedReturnFlight) {
        baseFare += selectedReturnFlight.fares[selectedFareTier];
      }
    }
    
    let extrasCost = 0;
    if (extras.extraBaggageKg === 20) extrasCost += 18;
    if (extras.extraBaggageKg === 30) extrasCost += 28;
    if (extras.mealSelected) extrasCost += 8;
    if (extras.loungeAccess) extrasCost += 25;
    if (extras.priorityBoarding) extrasCost += 7;
    if (extras.inFlightWifi) extrasCost += 9;

    const seatCost = selectedSeat.startsWith('1') || selectedSeat.startsWith('2') || selectedSeat.startsWith('3') ? 14 : 6;
    const taxes = tripType === 'multiCity' ? 12 * Math.max(2, selectedMultiCityFlights.length) : 18;
    const total = baseFare + extrasCost + seatCost + taxes;

    // Random realistic booking code
    const randomCode = 'MDK' + Math.floor(100 + Math.random() * 900) + 'X' + Math.floor(1 + Math.random() * 9);

    const newBooking: Booking = {
      code: randomCode,
      dateCreated: new Date().toISOString().split('T')[0],
      passenger: passengerDetails,
      outboundFlight: selectedOutboundFlight || MOCK_FLIGHTS[0],
      returnFlight: tripType === 'roundTrip' ? (selectedReturnFlight || MOCK_FLIGHTS[5]) : undefined,
      multiCityFlights: tripType === 'multiCity' ? selectedMultiCityFlights : undefined,
      selectedFareTier,
      selectedSeat,
      extras,
      totalPriceUSD: total,
      paymentMethod: method,
      status: 'confirmed',
      boardingPassGenerated: false,
    };

    setLatestBooking(newBooking);
    setManagedBooking(newBooking);

    // If user logged in, award points!
    if (currentUser) {
      earnPoints(Math.round(total * 8), `Vuelo confirmado ${randomCode} (${originAirport.city} → ${destinationAirport.city})`);
    }

    return newBooking;
  };

  const loadDemoBooking = () => {
    setManagedBooking(DEMO_BOOKING);
  };

  const searchBooking = (code: string, lastName: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    const cleanLastName = lastName.trim().toLowerCase();

    if (
      (managedBooking && managedBooking.code.toUpperCase() === cleanCode) ||
      cleanCode === 'MDK7X4' ||
      cleanCode === 'DEMO'
    ) {
      setManagedBooking(DEMO_BOOKING);
      return true;
    }

    if (latestBooking && latestBooking.code.toUpperCase() === cleanCode) {
      setManagedBooking(latestBooking);
      return true;
    }

    // Accept if matching demo passenger
    if (cleanLastName === 'santoso' || cleanCode.startsWith('MDK')) {
      setManagedBooking(DEMO_BOOKING);
      return true;
    }

    return false;
  };

  const updateManagedBooking = (updates: Partial<Booking>) => {
    if (!managedBooking) return;
    const updated = { ...managedBooking, ...updates };
    setManagedBooking(updated);
    if (latestBooking && latestBooking.code === updated.code) {
      setLatestBooking(updated);
    }
  };

  const executeCheckIn = () => {
    if (checkInBooking) {
      const updated = {
        ...checkInBooking,
        status: 'checkedIn' as const,
        boardingPassGenerated: true,
      };
      setCheckInBooking(updated);
      if (managedBooking && managedBooking.code === updated.code) {
        setManagedBooking(updated);
      }
    }
  };

  const loginUser = (email: string, name?: string) => {
    setCurrentUser({
      ...INITIAL_USER,
      email,
      name: name || (email.split('@')[0].toUpperCase()),
    });
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const earnPoints = (amount: number, description: string) => {
    if (!currentUser) return;
    const newHistory = [
      {
        id: `tx-${Date.now()}`,
        description,
        date: new Date().toISOString().split('T')[0],
        points: amount,
        type: 'earn' as const,
      },
      ...currentUser.history,
    ];
    const newTotal = currentUser.points + amount;
    const updatedTier = newTotal >= 15000 ? 'PRIME' : newTotal >= 5000 ? 'PLUS' : 'START';

    setCurrentUser({
      ...currentUser,
      points: newTotal,
      tier: updatedTier,
      history: newHistory,
    });
  };

  const redeemPoints = (amount: number, description: string): boolean => {
    if (!currentUser || currentUser.points < amount) return false;
    const newHistory = [
      {
        id: `tx-${Date.now()}`,
        description,
        date: new Date().toISOString().split('T')[0],
        points: -amount,
        type: 'redeem' as const,
      },
      ...currentUser.history,
    ];
    setCurrentUser({
      ...currentUser,
      points: currentUser.points - amount,
      history: newHistory,
    });
    return true;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        formatPrice,
        t,
        currentPage,
        setCurrentPage,
        navigateTo,
        originAirport,
        setOriginAirport,
        destinationAirport,
        setDestinationAirport,
        departureDate,
        setDepartureDate,
        returnDate,
        setReturnDate,
        tripType,
        setTripType,
        multiCitySegments,
        setMultiCitySegments,
        addMultiCitySegment,
        removeMultiCitySegment,
        updateMultiCitySegment,
        passengers,
        setPassengers,
        cabinClass,
        setCabinClass,
        promoCode,
        setPromoCode,
        isUsingPoints,
        setIsUsingPoints,
        swapAirports,
        handleSearchFlights,
        selectDestinationForSearch,
        selectedOutboundFlight,
        setSelectedOutboundFlight,
        selectedReturnFlight,
        setSelectedReturnFlight,
        selectedMultiCityFlights,
        setSelectedMultiCityFlights,
        selectedFareTier,
        setSelectedFareTier,
        passengerDetails,
        setPassengerDetails,
        selectedSeat,
        setSelectedSeat,
        extras,
        setExtras,
        bookingStep,
        setBookingStep,
        latestBooking,
        completeBooking,
        managedBooking,
        setManagedBooking,
        loadDemoBooking,
        searchBooking,
        updateManagedBooking,
        checkInBooking,
        setCheckInBooking,
        executeCheckIn,
        currentUser,
        setCurrentUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        loginUser,
        logoutUser,
        earnPoints,
        redeemPoints,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
