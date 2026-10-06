/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { EditorialDestinations } from './components/home/EditorialDestinations';
import { FlightSearchResults } from './components/booking/FlightSearchResults';
import { BookingFlow } from './components/booking/BookingFlow';
import { ManageBookingView } from './components/manage/ManageBookingView';
import { CheckInView } from './components/checkin/CheckInView';
import { FlightStatusView } from './components/status/FlightStatusView';
import { FlightScheduleView } from './components/schedule/FlightScheduleView';
import { MudikPointsView } from './components/points/MudikPointsView';
import { DestinationsView } from './components/destinations/DestinationsView';
import { MudikDestinoView } from './components/editorial/MudikDestinoView';
import { MudikLoungeView } from './components/lounge/MudikLoungeView';
import { OnboardView } from './components/onboard/OnboardView';
import { BaggageView } from './components/baggage/BaggageView';
import { HelpCenterView } from './components/help/HelpCenterView';
import { AccountDashboardView } from './components/auth/AccountDashboardView';
import { AuthModal } from './components/auth/AuthModal';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  return (
    <main className="min-h-screen">
      {currentPage === 'home' && (
        <>
          <HeroSection />
          <EditorialDestinations />
        </>
      )}

      {currentPage === 'search-results' && <FlightSearchResults />}
      {currentPage === 'booking' && <BookingFlow />}
      {currentPage === 'manage-booking' && <ManageBookingView />}
      {currentPage === 'check-in' && <CheckInView />}
      {currentPage === 'flight-status' && <FlightStatusView />}
      {currentPage === 'flight-schedules' && <FlightScheduleView />}
      {currentPage === 'mudik-points' && <MudikPointsView />}
      {currentPage === 'destinations' && <DestinationsView />}
      {currentPage === 'mudik-destino' && <MudikDestinoView />}
      {currentPage === 'mudik-lounge' && <MudikLoungeView />}
      {currentPage === 'onboard' && <OnboardView />}
      {currentPage === 'baggage' && <BaggageView />}
      {currentPage === 'help' && <HelpCenterView />}
      {currentPage === 'account' && <AccountDashboardView />}
    </main>
  );
};

export default function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-[#FAF9FD] text-[#191A23]">
        <Navbar />
        <MainContent />
        <Footer />
        <AuthModal />
      </div>
    </AppProvider>
  );
}
