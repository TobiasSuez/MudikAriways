# Plan de Implementación: Clases de Cabina, Red de Rutas Internacionales Realistas y Refinamiento de UI

Este plan detalla las mejoras arquitectónicas y visuales para incorporar las 4 clases de vuelo (Economy, Premium Economy, Business, First Class), reconfigurar la red de precios reales desde Buenos Aires (cabotaje, Sudamérica, EE.UU. y Europa), limpiar el espacio de la barra de navegación para evitar saltos de línea, unificar el footer y hero, y bloquear la selección de aeropuertos idénticos.

---

## Decisiones Críticas y Confirmaciones

> [!IMPORTANT]
> Decisiones confirmadas durante la etapa de consulta y alineación con el usuario:

- **Red de Rutas y Precios Reales**: Incorporación de rutas internacionales desde Buenos Aires (EZE/AEP) hacia Sudamérica (US$ 375 – US$ 450), Estados Unidos (US$ 700 – US$ 1.150) y Europa (US$ 950 – US$ 1.550+), más vuelos de cabotaje (US$ 30 – US$ 150 ida y vuelta).
- **Estructura de 4 Clases de Cabina**: Selector y soporte integral para `Economy`, `Premium Economy`, `Business` y `First Class`, con sus respectivos beneficios de confort y multiplicadores de tarifa realistas.
- **Top Bar Contract y Espaciado**: Eliminación de textos secundarios del logo en el Navbar ("Mudik Airways Nusantara Low-Cost") para garantizar espacio horizontal suficiente, asegurando que enlaces como "Tu viaje" y "A bordo" se mantengan en una sola línea fija (`whitespace-nowrap`).
- **Footer y Hero**: Cambio del color del texto "Airways" en el footer de amarillo a blanco puro (`text-white`). Remoción total del texto "Línea Aérea Nacional de Indonesia" del Hero sin reemplazos decorativos.
- **Restricción de Ruta Origen/Destino**: Si se selecciona un aeropuerto en "Desde", este queda deshabilitado en "Hasta", impidiendo vuelos con origen y destino idénticos.

---

## 1. Visión General y Valor para el Usuario

- **Experiencia de Reserva Completa**: Los pasajeros podrán buscar y reservar en las 4 clases internacionales con amenidades específicas para cada cabina.
- **Tarifas Reales y Transparentes**: Visualización de pasajes con precios fidedignos de mercado expresados en USD y convertibles a Pesos Argentinos (ARS a $2.000).
- **Interfaz Limpia y Sin Fricciones**: Navegación pulida sin envoltorios de texto innecesarios, selectores de ruta inteligentes sin errores de origen=destino, y diseño visual austero.

---

## 2. Experiencia de Usuario y Diseño Visual

### A. Top Navigation Bar (Navbar)
- **Wordmark Limpio**: En `CompanyLogo.tsx` se muestra el emblema del logo y el nombre de la aerolínea sin el subtítulo `Nusantara Low-Cost`.
- **Items de Menú en 1 Sola Línea**: "Tu viaje" y "A bordo" se consolidan en una sola línea fija (`whitespace-nowrap shrink-0 text-sm font-semibold`), resolviendo los quiebres de línea en pantallas medianas y de escritorio.

### B. Hero Section
- **Eliminación del Kicker**: Se remueve el badge superior que dice *"LÍNEA AÉREA NACIONAL DE INDONESIA"*. El Hero inicia directamente con el título de impacto en `text-balance` y el buscador de vuelos.

### C. Footer
- **Texto Airways Unificado**: El fragmento "AIRWAYS" del logotipo en el footer cambia de `text-amber-400` a `text-white` para un acabado sobrio y elegante.

### D. Selector de Aeropuertos "Desde" y "Hasta"
- **Validación Antiduplicados**: Al abrir el menú de selección "Hasta", el aeropuerto seleccionado en "Desde" se marca como no seleccionable (`disabled / opacity-40`) con la aclaración *"Origen actual"*.
- **Ajuste Automático**: Si el usuario cambia el origen al mismo aeropuerto que ya tenía como destino, el sistema reasigna automáticamente el destino al siguiente aeropuerto disponible para mantener la coherencia.

### E. Las 4 Clases de Cabina
El selector de cabina en el buscador (`FlightSearchWidget`) y los filtros de resultados presentarán las 4 clases oficiales:
1. **Economy**: 1 bolso de mano (7 kg), tarifa base de máxima conveniencia.
2. **Premium Economy**: Asientos con mayor reclinación y espacio, 1 valija despachada (23 kg) + bolso de mano, embarque prioritario (aprox. 1.4x).
3. **Business (Clase Ejecutiva)**: Asientos lie-flat 180°, acceso a Salón VIP / Lounge, 2 valijas de 32 kg, gastronomía en múltiples pasos y champagne (aprox. 2.4x).
4. **First Class (Primera Clase)**: Suite privada con puerta, servicio de chofer al aeropuerto, menú a la carta con caviar y maridaje premium, atención personalizada exclusiva (aprox. 3.8x).

---

## 3. Decisiones de Producto y Reglas de Negocio

### Matriz de Precios Reales (Referencia Buenos Aires / Internacional)
- **Cabotaje Nacional**:
  - Rutas: Buenos Aires (AEP/EZE) a Bariloche, Mendoza, Iguazú, Córdoba, Salta.
  - Tarifas: US$ 30 a US$ 75 por tramo (US$ 60 a US$ 150 ida y vuelta).
- **Regional Sudamérica**:
  - Rutas: Buenos Aires a Santiago de Chile (SCL), Río de Janeiro (GIG), Lima (LIM), Montevideo (MVD), São Paulo (GRU).
  - Tarifas: US$ 375 a US$ 450 base.
- **Estados Unidos**:
  - Rutas: Buenos Aires a Miami (MIA), Nueva York (JFK), Orlando (MCO).
  - Tarifas: US$ 700 a US$ 1.150 base.
- **Europa**:
  - Rutas: Buenos Aires a Madrid (MAD), Barcelona (BCN), Roma (FCO).
  - Tarifas: US$ 950 a US$ 1.550+ base.

---

## 4. Arquitectura del Sistema y Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                       AppContext                            │
│  - cabinClass: 'Economy'|'Premium'|'Business'|'First'        │
│  - originAirport / destinationAirport (Disjoint validation) │
│  - formatPrice(usd) -> USD $ o ARS $ (x 2.000)              │
└──────────────┬───────────────────────────────┬──────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│     FlightSearchWidget       │ │     FlightSearchResults      │
│  - 4 Cabin Classes Dropdown  │ │  - 4 Cabin Tier Cards        │
│  - Airport Selector Excl.    │ │  - Realistic pricing scaled  │
│  - No origin == dest         │ │  - Fare Lock 24h / 48h       │
└──────────────────────────────┘ └──────────────────────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────┐
│     Navbar & Footer Clean    │ │         SeatMap              │
│  - Single-line "Tu viaje"    │ │  - First (Suites)            │
│  - Single-line "A bordo"     │ │  - Business (Lie-flat)       │
│  - Footer "Airways" in white │ │  - Premium & Economy         │
└──────────────────────────────┘ └──────────────────────────────┘
```

---

## 5. Plan de Verificación

1. **Revisión de Navbar y Footer**:
   - Verificar que no aparezca el texto secundario debajo del logo en Navbar.
   - Comprobar que "Tu viaje" y "A bordo" permanezcan en una sola línea sin desbordes.
   - Constatar que "AIRWAYS" en el footer sea blanco (`text-white`).
2. **Revisión del Hero**:
   - Confirmar la ausencia del texto de aerolínea de Indonesia en el Hero.
3. **Validación de Selección de Aeropuertos**:
   - Probar que al elegir un origen (ej. Buenos Aires AEP/EZE), la opción quede bloqueada en el selector de destino.
4. **Verificación de 4 Clases de Cabina**:
   - Validar que el dropdown permita elegir `Economy`, `Premium Economy`, `Business` y `First Class`.
   - Verificar que las tarifas se calculen proporcionalmente con los valores indicados.
5. **Compilación y Linteo**:
   - Ejecutar `lint_applet` y `compile_applet` para confirmar cero errores de tipos o sintaxis.
