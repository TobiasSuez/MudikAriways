import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIRPORTS, MOCK_FLIGHTS } from '../../data/mockData';
import { Airport } from '../../types';
import { MapPin, Plane, Clock, Calendar, ArrowRight, Compass } from 'lucide-react';

export const FlightScheduleView: React.FC = () => {
  const { formatPrice, selectDestinationForSearch, navigateTo, t } = useApp();

  const [selectedHub, setSelectedHub] = useState<string>('CGK');
  const [selectedScheduleOrigin, setSelectedScheduleOrigin] = useState<Airport>(AIRPORTS[0]);
  const [selectedScheduleDest, setSelectedScheduleDest] = useState<Airport>(AIRPORTS[1]);

  // Coordinates for realistic Indonesian visual network map SVG
  // Map dimensions 800 x 360
  const cityNodes = [
    { code: 'KNO', city: 'Medan', x: 120, y: 110, island: 'Sumatra' },
    { code: 'CGK', city: 'Jakarta', x: 260, y: 240, hub: true, island: 'Java' },
    { code: 'YIA', city: 'Yogyakarta', x: 330, y: 265, island: 'Java' },
    { code: 'SUB', city: 'Surabaya', x: 390, y: 260, island: 'Java' },
    { code: 'DPS', city: 'Bali', x: 445, y: 275, hub: true, island: 'Bali' },
    { code: 'LOP', city: 'Lombok', x: 485, y: 275, island: 'Lombok' },
    { code: 'LBJ', city: 'Labuan Bajo', x: 550, y: 270, island: 'Flores' },
    { code: 'UPG', city: 'Makassar', x: 510, y: 195, island: 'Sulawesi' },
    { code: 'SIN', city: 'Singapore', x: 220, y: 165, int: true, island: 'Internacional' },
    { code: 'SYD', city: 'Sydney', x: 740, y: 320, int: true, island: 'Internacional' },
  ];

  // Route connections from hubs
  const networkRoutes = [
    { from: 'CGK', to: 'DPS', daily: '8x diario' },
    { from: 'CGK', to: 'YIA', daily: '4x diario' },
    { from: 'CGK', to: 'SUB', daily: '6x diario' },
    { from: 'CGK', to: 'LOP', daily: '3x diario' },
    { from: 'CGK', to: 'LBJ', daily: '2x diario' },
    { from: 'CGK', to: 'KNO', daily: '4x diario' },
    { from: 'CGK', to: 'UPG', daily: '3x diario' },
    { from: 'CGK', to: 'SIN', daily: '2x diario' },
    { from: 'DPS', to: 'LBJ', daily: '3x diario' },
    { from: 'DPS', to: 'LOP', daily: '4x diario' },
    { from: 'DPS', to: 'SYD', daily: '1x diario' },
    { from: 'SUB', to: 'DPS', daily: '3x diario' },
    { from: 'SUB', to: 'UPG', daily: '2x diario' },
  ];

  const getNode = (code: string) => cityNodes.find(n => n.code === code);

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold tracking-widest text-[#5F429A] uppercase">
            {t('CONECTIVIDAD ARCHIPIÉLAGO', 'ARCHIPELAGO CONNECTIVITY')}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#263A79] tracking-tight">
            {t('RED DE RUTAS Y HORARIOS', 'ROUTE MAP & TIMETABLE')}
          </h1>
          <p className="text-xs sm:text-sm text-[#465B71]">
            {t(
              'Explorá la red de vuelos Mudik que conecta las principales islas indonesias y destinos regionales.',
              'Discover our network connecting key Indonesian islands with daily direct frequencies.'
            )}
          </p>
        </div>

        {/* SECTION 1: Interactive Indonesian Route Map (SVG) */}
        <div className="bg-[#191A23] rounded-3xl p-6 sm:p-8 text-white border border-neutral-800 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#9D7AE2]" />
                <span>{t('Mapa Interactivo de Vuelos Mudik', 'Mudik Interactive Route Network')}</span>
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {t('Haz clic en un aeropuerto para ver vuelos directos y frecuencias.', 'Click any node to view route frequencies.')}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="inline-block w-3 h-3 rounded-full bg-[#5F429A] border-2 border-white" />
              <span className="text-neutral-300">Hub Principal (CGK / DPS)</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 ml-3" />
              <span className="text-neutral-300">Destinos Directos</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="w-full overflow-x-auto bg-[#13141F] rounded-2xl p-4 border border-neutral-800">
            <svg viewBox="0 0 820 380" className="w-full min-w-[650px] h-auto select-none">
              
              {/* Subtle Island silhouettes / background outlines */}
              <path
                d="M 80,80 Q 150,140 240,210 Q 200,240 100,140 Z"
                fill="#202230"
                opacity="0.5"
              />
              <path
                d="M 230,230 Q 350,250 430,265 Q 400,285 240,260 Z"
                fill="#202230"
                opacity="0.6"
              />
              <path
                d="M 470,160 Q 530,150 540,230 Q 490,240 480,180 Z"
                fill="#202230"
                opacity="0.5"
              />

              {/* Connecting Route Lines */}
              {networkRoutes.map((rt, i) => {
                const nodeA = getNode(rt.from);
                const nodeB = getNode(rt.to);
                if (!nodeA || !nodeB) return null;
                const isSelected = selectedHub === rt.from || selectedHub === rt.to;

                return (
                  <g key={i}>
                    <line
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      stroke={isSelected ? '#9D7AE2' : '#393C52'}
                      strokeWidth={isSelected ? '2.5' : '1.2'}
                      strokeDasharray={isSelected ? 'none' : '4,4'}
                      opacity={isSelected ? '0.9' : '0.4'}
                    />
                  </g>
                );
              })}

              {/* City Nodes */}
              {cityNodes.map(node => {
                const isCurrentHub = selectedHub === node.code;

                return (
                  <g
                    key={node.code}
                    onClick={() => {
                      setSelectedHub(node.code);
                      const foundAirport = AIRPORTS.find(a => a.code === node.code);
                      if (foundAirport) setSelectedScheduleOrigin(foundAirport);
                    }}
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for selected node */}
                    {isCurrentHub && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="14"
                        fill="none"
                        stroke="#9D7AE2"
                        strokeWidth="1.5"
                        className="animate-ping origin-center"
                      />
                    )}

                    {/* Node Dot */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.hub ? '8' : '6'}
                      fill={isCurrentHub ? '#9D7AE2' : node.hub ? '#5F429A' : '#10B981'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y - 12}
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="11"
                      fontWeight="bold"
                      className="group-hover:fill-[#9D7AE2] transition-colors"
                    >
                      {node.city} ({node.code})
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Selected Node Direct Routes Summary */}
          <div className="bg-neutral-900/80 p-5 rounded-2xl border border-neutral-800 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-[#9D7AE2] font-bold uppercase tracking-wider block">
                {t('RUTAS ACTIVAS DESDE', 'ACTIVE ROUTES FROM')}:
              </span>
              <div className="text-lg font-bold text-white">
                {getNode(selectedHub)?.city} ({selectedHub})
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {networkRoutes.filter(r => r.from === selectedHub || r.to === selectedHub).map((r, idx) => {
                const destCode = r.from === selectedHub ? r.to : r.from;
                const destNode = getNode(destCode);

                return (
                  <button
                    key={idx}
                    onClick={() => selectDestinationForSearch(destCode)}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-[#5F429A] rounded-xl text-xs font-semibold text-neutral-200 hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>→ {destNode?.city} ({destCode})</span>
                    <span className="text-[10px] text-neutral-400">· {r.daily}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION 2: Timetable Browser */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
            <div>
              <h2 className="font-display text-xl font-bold text-[#263A79]">
                {t('Tabla de Horarios de Vuelos', 'Flight Timetable')}
              </h2>
              <p className="text-xs text-[#465B71]">
                {t('Consulta frecuencias fijas y horarios de operación semanal.', 'Browse regular scheduled weekly flight times.')}
              </p>
            </div>

            {/* Select Origin & Destination */}
            <div className="flex items-center gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase text-[#465B71] mb-1">{t('Origen', 'From')}</label>
                <select
                  value={selectedScheduleOrigin.code}
                  onChange={e => {
                    const a = AIRPORTS.find(air => air.code === e.target.value);
                    if (a) setSelectedScheduleOrigin(a);
                  }}
                  className="px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-[#263A79]"
                >
                  {AIRPORTS.slice(0, 8).map(a => (
                    <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-[#465B71] mb-1">{t('Destino', 'To')}</label>
                <select
                  value={selectedScheduleDest.code}
                  onChange={e => {
                    const a = AIRPORTS.find(air => air.code === e.target.value);
                    if (a) setSelectedScheduleDest(a);
                  }}
                  className="px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg font-bold text-[#263A79]"
                >
                  {AIRPORTS.slice(0, 8).map(a => (
                    <option key={a.code} value={a.code}>{a.city} ({a.code})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Timetable Rows */}
          <div className="space-y-3">
            {MOCK_FLIGHTS.map((flight) => (
              <div
                key={flight.id}
                className="p-4 rounded-xl border border-neutral-200 hover:border-[#5F429A] bg-neutral-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-4">
                  <span className="font-mono font-bold text-sm text-[#5F429A]">{flight.flightNumber}</span>
                  <div>
                    <div className="font-bold text-[#191A23]">
                      {flight.departureTime} → {flight.arrivalTime} ({flight.duration})
                    </div>
                    <div className="text-[11px] text-[#465B71]">{flight.aircraft} · Diario</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-bold text-[#263A79] text-sm tabular-nums">
                    {t('Desde', 'From')} {formatPrice(flight.fares.basic)}
                  </span>
                  <button
                    onClick={() => selectDestinationForSearch(flight.destination.code)}
                    className="px-4 py-2 bg-[#5F429A] hover:bg-[#45469C] text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span>{t('Reservar', 'Book')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
