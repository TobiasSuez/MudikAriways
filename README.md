# MUDIK AIRWAYS | Prototipo Interactivo de Aerolínea

Prototipo web funcional e interactivo para **Mudik Airways**, aerolínea low-cost de Indonesia.

---

## 🚀 Cómo publicar en GitHub Pages (Sin Pantalla Blanca)

Para que el sitio se visualice correctamente en GitHub Pages sin pantallas en blanco, sigue estos 2 sencillos pasos en tu repositorio de GitHub:

### Opción A: Usando GitHub Actions (Recomendado y Automático)
1. En tu repositorio en GitHub, ve a **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
2. En la sección **Build and deployment** (Construcción y despliegue):
   - En **Source** (Origen), selecciona **`GitHub Actions`** en lugar de "Deploy from a branch".
3. ¡Listo! La acción de despliegue (`.github/workflows/deploy.yml`) se ejecutará automáticamente y publicará el sitio compilado con todas sus rutas y estilos.

### Opción B: Despliegue desde la rama (Deploy from a branch)
1. Ve a **Settings** > **Pages**.
2. En **Source**, selecciona **`Deploy from a branch`**.
3. En **Branch**, selecciona tu rama (`main` o `master`) y en la carpeta elige **`/docs`** (NO `/root`).
4. Haz clic en **Save** (Guardar).

---

## 🛠 Desarrollo Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
