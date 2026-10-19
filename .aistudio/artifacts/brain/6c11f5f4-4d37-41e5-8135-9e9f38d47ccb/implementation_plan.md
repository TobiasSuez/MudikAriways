# Custom Flexible Dates & Low-Fare Calendar System

Comprehensive architectural blueprint and UX design for the custom airline date picker, flexible dates option, and dedicated monthly low-fare calendar view for Mudik Airways.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design choices were confirmed in Phase 1:
> - **Access Points**: Both an integrated custom calendar popup in the booking widget and a dedicated full-page low-fare calendar view (`/calendario-tarifas`).
> - **Pricing Display**: Full monthly calendar grid showing daily flight prices in selected currency (`USD` / `IDR`) with green/emerald tags marking the cheapest departure days (`MEJOR PRECIO`).
> - **Flexible Dates Toggle**: "Mis fechas son flexibles (ver calendario de precios)" checkbox in the flight search widget, which directly navigates to the comparative fare matrix when activated.

---

## 1. Overview & Core Concept

- **What It Does**: Replaces generic browser `<input type="date">` controls with a custom, branded airline calendar. When users search for flights, they can either pick exact travel dates with instant day-rate tooltips or activate the **Flexible Dates** mode to compare fares across full months and choose the most cost-effective travel window.
- **Target Audience**: Low-cost travelers, holiday planners, and families seeking the best airfare across Indonesian inter-island routes (Jakarta, Bali, Yogyakarta, Lombok, Labuan Bajo, etc.).
- **Key Value**: Eliminates trial-and-error searches by visually showcasing fare trends, empowering passengers to save money by shifting departure or return by 1–3 days.

---

## 2. User Experience & Visual Design

### A. Integrated Custom Date Picker (Widget Level)
- **Dual-Month View (Desktop)** / **Single-Month View (Mobile)**.
- **Interactive Day Tiles**:
  - Displays day number and indicative starting fare (e.g. `15` with `$58` beneath).
  - Selected departure and return dates connected by a continuous brand-tinted range bar (`#5F429A` with 15% opacity fill).
  - Past dates automatically disabled.
  - Hover states show dynamic route price preview.
- **Quick Preset Shortcuts**: "Este fin de semana", "Próxima semana", "Mes completo más económico".
- **Flexible Dates Checkbox**: Inline control next to the date fields stating: `±3 días fechas flexibles · Ver calendario con mejores precios`.

### B. Dedicated Low-Fare Calendar View (`fare-calendar`)
- **Route & Month Selector**: Allows filtering by Origin, Destination, Trip Type (Ida y Vuelta / Solo Ida), and Month (e.g., Noviembre 2026, Diciembre 2026).
- **Monthly Fare Grid**:
  - 7-column grid (Lunes to Domingo).
  - Each day displays: Date, lowest direct fare, and an emerald `MEJOR PRECIO` highlight for the lowest 20% fares of that month.
  - Color-coded fare tiers (Lowest = Emerald green, Regular = Neutral slate, Peak = Subdued purple).
- **Comparative Trip Matrix**: When viewing round-trips, selecting a departure date highlights compatible return dates with total combined savings.
- **Instant Flight Selection CTA**: Clicking a date instantly updates search parameters and transitions to flight results or booking flow with pre-selected dates.

### C. Visual Identity & Theme
- **Color Discipline**:
  - Selected Date: Mudik Royal Purple (`#5F429A`) with crisp white numerals.
  - Best Price Tags: Subtle emerald pill (`bg-emerald-50 text-emerald-700 font-bold`).
  - Active Range: Soft indigo tint (`bg-[#5F429A]/10`).
- **Tabular Numerals**: Strict `tabular-nums font-mono` formatting for price readability.
- **Responsive Geometry**: Full touch targets ($\ge 44\text{px}$) on mobile devices with smooth horizontal swipe or stacked monthly views.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Native Inputs vs. Zero-Dependency Custom React Calendar**
  - *Chosen Approach*: Build a bespoke React calendar component without heavy external bundle dependencies.
  - *Why*: Gives complete control over Mudik brand typography, day pricing badges, bilingual labels (ES/EN), and currency conversions (`USD` vs `IDR`).
- **Decision 2: Realistic Dynamic Fare Generator**
  - *Chosen Approach*: Create an algorithm that calculates realistic day-by-day route prices based on seasonality, day of week (weekends vs. mid-week), and historical route averages.
  - *Why*: Ensures every day of every month renders authentic prices that match the flights shown in the search results and booking engine.
- **Decision 3: Dual Entry Points**
  - *Chosen Approach*: Users can open the mini-calendar directly from the homepage search widget OR navigate to the standalone "Calendario de Tarifas" page via navigation menu and widget toggle.
  - *Why*: Accommodates both fixed-date passengers and bargain-hunting travelers without friction.

---

## 4. Technical Architecture & Component Structure

```
┌─────────────────────────────────────────────────────────────┐
│                       AppContext                            │
│  - departureDate, returnDate, tripType                      │
│  - originAirport, destinationAirport                        │
│  - currency, language, formatPrice()                        │
│  - isFlexibleDatesEnabled                                   │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────┐ ┌────────────────────────────┐
│      CustomDatePicker        │ │    FareCalendarView        │
│   (Integrated in Widget)     │ │    (Dedicated Section)     │
│                              │ │                            │
│ ├─ Month Navigation (< >)    │ │ ├─ Month & Route Switcher  │
│ ├─ Dual Month Calendar Grid  │ │ ├─ 30-Day Fare Matrix Grid │
│ ├─ Day Tile with Price Tag   │ │ ├─ Lowest Fare Badging     │
│ └─ Flexible Toggle Trigger   │ │ └─ "Reservar Esta Fecha"   │
└──────────────────────────────┘ └────────────────────────────┘
```

### Planned File Edits
1. `src/types/index.ts`: Add `fare-calendar` to `PageView` type; add `DayFare` and `MonthFareData` interfaces.
2. `src/data/mockData.ts`: Add monthly pricing generator functions reflecting realistic routes.
3. `src/components/calendar/CustomDatePicker.tsx`: New custom dual-month date picker popover.
4. `src/components/calendar/FareCalendarView.tsx`: Dedicated full-page monthly low-fare comparison view.
5. `src/components/home/FlightSearchWidget.tsx`: Integrate the new custom date picker and "Fechas flexibles" link.
6. `src/components/layout/Navbar.tsx`: Add "Calendario de Tarifas" under the **VIAJAR** dropdown.
7. `src/App.tsx`: Mount `FareCalendarView` when `currentPage === 'fare-calendar'`.
