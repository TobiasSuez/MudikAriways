# Plan de Implementación: Adaptación Móvil, Multidestino, Fotos en Tarjetas, Placeholder de Logo y Página 'Sobre Nosotros'

Este plan aborda las solicitudes de optimización móvil, la activación funcional del flujo multidestino (hasta 4 tramos con selección de vuelos por segmento), la integración de fotos reales en las tarjetas, una ranura interactiva para el logo corporativo y la nueva página institucional «Sobre Nosotros».

---

## 1. Cambios Propuestos y Arquitectura

### A. Adaptación y Ergonomía Móvil (`CustomDatePicker.tsx`, `FareCalendarView.tsx`, `FlightSearchWidget.tsx`)
- **Calendarios en Pantallas Pequeñas (< 640px):**
  - Alternar a vista de **un solo mes a la vez** en móviles con botones de navegación anterior/siguiente de tacto amplio (mínimo 44px).
  - Celdas con tamaño adaptativo (`w-full aspect-square` o altura reducida) para evitar que los números o precios se corten o generen scroll horizontal.
  - Barra de resumen y confirmación adherida al fondo (*sticky bottom sheet*) con botón ancho para confirmar fechas fácilmente.
- **Buscador en Móvil:**
  - Espaciado vertical optimizado, etiquetas claras y selector de fechas sin desbordamiento tipográfico.

### B. Buscador Multidestino Funcional con hasta 4 Tramos
- **Gestión de Segmentos Multitrayecto en `FlightSearchWidget.tsx`:**
  - Permitir agregar entre 2 y 4 tramos independientes (ejemplo: Tramo 1: Yakarta → Bali, Tramo 2: Bali → Labuan Bajo, Tramo 3: Labuan Bajo → Lombok, Tramo 4: Lombok → Yakarta).
  - Cada tramo cuenta con selector de origen, destino y fecha de vuelo con validación de fechas cronológicas.
  - Botones interactivos para «+ Agregar trayecto» y «Eliminar tramo».
- **Flujo de Resultados Multidestino (`FlightSearchResults.tsx` & `BookingFlow.tsx`):**
  - Pantalla de selección secuencial tramo a tramo (Tramo 1 de N) o resumen consolidado del itinerario con desglose de precio total.

### C. Fotografías Reales de Alta Calidad en Tarjetas de Destinos
- **Actualización de Tarjetas (`DestinationsView.tsx` & `EditorialDestinations.tsx`):**
  - Incorporar imágenes auténticas de alta resolución (Unsplash Indonesia: templos de Bali, dragones de Komodo, Borobudur en Yogyakarta, arrecifes de Raja Ampat, playas de Lombok, etc.).
  - Filtro degradado sutil superior e inferior para garantizar contraste tipográfico WCAG AA sobre cualquier foto.
  - Efecto de zoom suave al pasar el cursor o pulsar en móvil.

### D. Ranura / Placeholder para el Logo Corporativo (`CompanyLogo.tsx`)
- **Componente de Marca Reutilizable:**
  - Ranura lista para recibir una URL de imagen externa, un archivo local (`/public/logo.png` o `/logo.svg`) o usar el emblema vectorial predeterminado.
  - Modal o popover sutil de configuración: permite al usuario ingresar la URL de su logo o elegir entre presets para ver cómo queda en tiempo real sin tener que editar código inmediatamente.
  - Ubicación en `Navbar.tsx` y en el `Footer.tsx` con instrucciones claras en el código para reemplazo definitivo.

### E. Nueva Página Institucional «Sobre Nosotros» (`AboutUsView.tsx`)
- **Secciones Clave:**
  - **Manifiesto y Filosofía Mudik:** Conectar las 17.000 islas de Indonesia con honestidad, tarifas accesibles y calidez local.
  - **Flota Moderna y Sostenibilidad:** Ficha de aeronaves Airbus A320 y Boeing 737 de última generación, con mantenimiento certificado internacionalmente y bajo consumo de combustible.
  - **Cultura de Tripulación y Tradición Nusantara:** El valor de la hospitalidad indonesia (*gotong royong*) y testimonios de capitanes e ingenieros.
  - **Cifras y Compromiso de Seguridad:** Puntualidad de despegues, millones de pasajeros transportados y estándares IATA/DGCA.
  - Integración en la navegación superior (menú `Acerca de`) y enlaces del pie de página.

---

## 2. Sistema de Diseño y Lenguaje Visual

- **Contraste y Responsive Design:**
  - Mobile-first con breakpoints consistentes (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).
  - Cero desbordamiento horizontal (`overflow-x-hidden` en contenedores maestros).
  - Fuentes fluidas con soporte tabular (`font-mono`) en números de tarifas y códigos de aeropuerto.
- **Paleta de Colores:**
  - Primario Naval `#263A79`, Púrpura Royal `#5F429A`, Acentos Esmeralda `#059669` y Ámbar `#D97706`.

---

## 3. Plan de Verificación y Fases

1. **Fase 1 (Móvil y Calendarios):**
   - Verificar la respuesta visual en anchos móviles (360px a 420px) en `CustomDatePicker` y `FareCalendarView`.
2. **Fase 2 (Multidestino):**
   - Probar la adición y eliminación de tramos en el buscador, búsqueda de vuelos y cotización multidestino.
3. **Fase 3 (Fotos y Logo):**
   - Comprobar la carga de imágenes reales en las tarjetas y la funcionalidad de la ranura de logo en la cabecera.
4. **Fase 4 (Página Sobre Nosotros):**
   - Navegar a la nueva vista y verificar enlaces, responsividad y coherencia editorial.
5. **Fase 5 (Compilación y Lint):**
   - Ejecutar `compile_applet` y `lint_applet` para garantizar cero errores en TypeScript.
