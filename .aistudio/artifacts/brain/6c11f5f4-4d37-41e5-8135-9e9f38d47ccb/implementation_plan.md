# Plan de Mejoras de Calidad de Vida (QoL) y Funcionalidades Clave

Este plan define las mejoras prioritarias solicitadas para optimizar la experiencia de usuario en **Mudik Airways**, enfocándose en el flujo de reserva con selección interactiva de asientos, filtros avanzados con alertas de tarifas y el servicio de Guías Locales exclusivas de Mudik.

---

## 1. Cambios Propuestos y Arquitectura

### A. Flujo de Reserva y Mapa Interactivo de Asientos (`SeatMap.tsx` & `BookingFlow.tsx`)
- **Fuselaje Gráfico Detallado:** Renderizar la silueta del avión con cabina de pilotos, alas, salidas de emergencia con señalética luminosa, baños y galleys.
- **Detalles del Asiento al Pasar el Cursor o Seleccionar:** 
  - Espacio para piernas (pitch: 76 cm estándar vs 86 cm extra legroom).
  - Tipo de ventanilla (alineada con el asiento o sobre el ala).
  - Servicios incluidos: enchufe universal / USB-C, reclinación y bandeja ergonómica.
  - Precio desglosado con confirmación inmediata en la barra de pago.
- **Soporte Multi-pasajero:** Selector de pasajero activo (Adulto 1, Adulto 2...) para asignar asientos distintos a cada viajero sin fricción.

### B. Filtros Avanzados y Alertas de Tarifas Bajas (`FlightSearchResults.tsx`)
- **Filtros Interactivos en Tiempo Real:**
  - Rango de precios con slider interactivo y visualización del mínimo/máximo.
  - Franja horaria precisa (Madrugada 00-06h, Mañana 06-12h, Tarde 12-18h, Noche 18-24h).
  - Vuelos directos vs con escala y tipo de aeronave (Airbus A320 vs Boeing 737-800).
- **Alerta de Tarifa Baja y Seguimiento de Precios:**
  - Banner interactivo de tendencia de precios: *"Las tarifas para esta ruta están un 15% más económicas de lo habitual"*.
  - Modal para activar alertas de precio con ingreso de correo/notificación y umbral deseado de precio.

### C. Servicio de Guías Locales MudikAirways (`LocalGuidesModal.tsx` & `DestinationsView.tsx`)
- **Pestaña y Tarjetas de Guías Locales por Destino:**
  - **Bali (DPS), Yakarta (CGK), Yogyakarta (YIA), Labuan Bajo (LBJ), Lombok (LOP), Medan (KNO)**.
  - **Recomendaciones de la Tripulación Mudik:** Rutas secretas y miradores recomendados por pilotos y tripulantes de cabina locales.
  - **Gastronomía Típica:** Platos imperdibles (Nasi Campur Bali, Gudeg Jogja, Rendang Padang), precios promedio y mejores warungs/restaurantes.
  - **Logística Aeroportuaria:** Medios de transporte honestos (trenes de enlace, tarifas oficiales de taxi, puntos de encuentro Grab).
  - **Acceso Directo a Reserva:** Botón *"Reservar vuelo a este destino"* que preconfigura automáticamente el buscador.

### D. Mejoras Globales de Calidad de Vida (QoL)
- **Barra Flotante de Reserva en Dispositivos Móviles:** Resumen de itinerario y precio siempre visible sin tapar la navegación.
- **Accesibilidad y Atajos de Teclado:** Soporte para tecla `Escape` en todos los modales y navegación fluida con tabulación.
- **Validación Amigable de Formularios:** Mensajes contextuales claros en el formulario de pasajeros y métodos de pago.

---

## 2. Sistema de Diseño y Lenguaje Visual

- **Paleta de Colores Mudik Airways:**
  - Primario Naval: `#263A79` (cabeceras, estructuras sólidas).
  - Púrpura Real: `#5F429A` (acentos activos, asientos seleccionados, badges de tarifa).
  - Oro / Ámbar Indonesia: `#D97706` / `#F59E0B` (salidas de emergencia, tips VIP de tripulación).
  - Verde Esmeralda: `#059669` (precios más bajos y confirmaciones).
  - Fondo limpio: `#FAF9FD` con tarjetas en `#FFFFFF` y bordes sutiles `neutral-200/90`.
- **Tipografía y Legibilidad:**
  - Fuentes limpias y números tabulares (`font-mono` o `tabular-nums`) para precios y horarios de vuelo.
  - Sin píldoras estáticas saturadas; uso de separadores limpios (`·`, `/`) y jerarquía de pesos tipográficos.

---

## 3. Plan de Verificación y Fases

1. **Fase 1 (Asientos y Reserva):**
   - Verificar la selección individual de asientos y el cálculo automático de extras en el precio final.
   - Comprobar que cambiar de pasajero asigna el asiento correcto en la confirmación.

2. **Fase 2 (Filtros y Alerta de Tarifas):**
   - Probar el filtrado por hora, escalas y rango de precio en `FlightSearchResults`.
   - Probar la interacción del modal de alerta de precios con feedback visual de confirmación.

3. **Fase 3 (Guías Locales MudikAirways):**
   - Abrir la guía de viaje de al menos 3 destinos emblemáticos y verificar el botón de auto-reserva hacia el destino elegido.

4. **Fase 4 (Compilación y Lint):**
   - Ejecutar `compile_applet` y `lint_applet` para garantizar cero errores de TypeScript y sintaxis.
