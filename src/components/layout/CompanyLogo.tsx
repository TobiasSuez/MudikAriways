import React, { useState } from 'react';
import { Plane, Upload, Image as ImageIcon, Check, Edit2, X, RefreshCw, Eye } from 'lucide-react';

/* 
 * =========================================================================
 * PLACEHOLDER / RANURA DEL LOGO DE LA COMPAÑÍA (MUDIK AIRWAYS)
 * =========================================================================
 * Para reemplazar este logo con tu archivo propio:
 * 1. Coloca tu archivo en la carpeta pública: /public/logo.png o /public/logo.svg
 * 2. O haz clic en el botón de edición (icono de lápiz) en la web para:
 *    - Cargar una imagen desde tu computadora/móvil
 *    - Pegar una URL externa o ruta local
 *    - Ver la vista previa en vivo y guardarla al instante
 * =========================================================================
 */

interface CompanyLogoProps {
  className?: string;
  variant?: 'navbar' | 'footer' | 'large';
  showEditHint?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ 
  className = '', 
  variant = 'navbar',
  showEditHint = true 
}) => {
  // Check if user set a custom logo in localStorage
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mudik_custom_logo_url');
    } catch {
      return null;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(logoUrl || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveLogo = (url: string) => {
    if (url.trim()) {
      localStorage.setItem('mudik_custom_logo_url', url.trim());
      setLogoUrl(url.trim());
    } else {
      localStorage.removeItem('mudik_custom_logo_url');
      setLogoUrl(null);
    }
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsModalOpen(false);
    }, 800);
  };

  const handleResetDefault = () => {
    localStorage.removeItem('mudik_custom_logo_url');
    setLogoUrl(null);
    setTempUrl('');
    setIsModalOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setTempUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const isNavbar = variant === 'navbar';
  const isLarge = variant === 'large';

  return (
    <div className={`relative group inline-flex items-center ${className}`}>
      
      {/* RENDER LOGO */}
      {logoUrl ? (
        // Custom user image logo
        <div className="flex items-center gap-3">
          <img 
            src={logoUrl} 
            alt="Company Logo" 
            className={`object-contain max-h-11 max-w-[170px] rounded-lg transition-transform group-hover:scale-105`} 
            onError={() => {
              // Fallback if image fails to load
              setLogoUrl(null);
            }}
          />
        </div>
      ) : (
        // Default Mudik Airways Brand Logo with customizable slot
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F429A] via-[#45469C] to-[#263A79] flex items-center justify-center text-white shadow-md shadow-[#5F429A]/15 group-hover:scale-105 transition-transform shrink-0">
            <Plane className="w-5 h-5 -rotate-45" />
          </div>
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black tracking-tight text-xl text-[#263A79] group-hover:text-[#5F429A] transition-colors leading-none">
                MUDIK<span className="text-[#5F429A] ml-1">AIRWAYS</span>
              </span>
            </div>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#465B71] mt-1 hidden sm:block">
              Indonesia Low-Cost
            </span>
          </div>
        </div>
      )}

      {/* Quick Edit/Replace Button for user convenience (touch & click friendly) */}
      {showEditHint && isNavbar && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTempUrl(logoUrl || '');
            setIsModalOpen(true);
          }}
          className="opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-1.5 p-1.5 rounded-lg bg-neutral-100 hover:bg-[#5F429A] hover:text-white text-[#465B71] text-xs shadow-xs cursor-pointer"
          title="Personalizar o cambiar este logo con el tuyo"
          aria-label="Personalizar logo de la compañía"
        >
          <Edit2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Interactive Modal to Paste/Select/Upload Logo with Live Preview */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-neutral-200 p-5 sm:p-6 space-y-4 animate-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#5F429A]" />
                <h3 className="font-bold text-base text-[#263A79]">
                  Ranura de Logo Corporativo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-[#465B71] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#465B71]">
              Coloca aquí el logo de tu propia compañía aérea o empresa. Puedes subir un archivo desde tu dispositivo o pegar su URL.
            </p>

            {/* LIVE PREVIEW BOX */}
            <div className="bg-[#FAF9FD] rounded-xl p-4 border border-neutral-200 text-center space-y-2">
              <span className="text-[10px] font-bold text-[#465B71] uppercase tracking-wider block flex items-center justify-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#5F429A]" />
                <span>Vista Previa del Logo:</span>
              </span>
              <div className="h-16 flex items-center justify-center bg-white rounded-lg border border-neutral-200 p-2">
                {tempUrl ? (
                  <img 
                    src={tempUrl} 
                    alt="Preview" 
                    className="max-h-12 max-w-[200px] object-contain"
                    onError={() => {}}
                  />
                ) : (
                  <span className="text-xs text-neutral-400 italic">
                    (Logo predeterminado de Mudik Airways)
                  </span>
                )}
              </div>
            </div>

            {/* File Upload Selector */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#465B71] uppercase tracking-wider">
                1. Subir archivo local (PNG, SVG, JPG):
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-50 hover:bg-neutral-100 border border-dashed border-[#5F429A]/50 rounded-xl cursor-pointer text-xs font-semibold text-[#5F429A] transition-colors">
                <Upload className="w-4 h-4" />
                <span>Elegir archivo desde tu dispositivo...</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </label>
            </div>

            {/* URL input */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#465B71] uppercase tracking-wider">
                2. O ingresar URL / ruta de imagen:
              </label>
              <input
                type="text"
                value={tempUrl}
                onChange={e => setTempUrl(e.target.value)}
                placeholder="https://ejemplo.com/tu-logo.png o /logo.svg"
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:ring-1 focus:ring-[#5F429A] font-sans"
              />
            </div>

            {/* Presets or Test Logos */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#465B71] uppercase tracking-wider block">
                Presets de ejemplo para probar:
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setTempUrl('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=160&q=80')}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-[#5F429A]/10 text-[#263A79] rounded-lg text-[11px] font-semibold transition-colors"
                >
                  Emblema Vuelo
                </button>
                <button
                  type="button"
                  onClick={() => setTempUrl('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=160&q=80')}
                  className="px-2.5 py-1 bg-neutral-100 hover:bg-[#5F429A]/10 text-[#263A79] rounded-lg text-[11px] font-semibold transition-colors"
                >
                  Aura Minimal
                </button>
              </div>
            </div>

            {savedSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>¡Logo guardado correctamente!</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <button
                type="button"
                onClick={handleResetDefault}
                className="text-xs text-[#465B71] hover:text-rose-600 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restablecer predeterminado</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveLogo(tempUrl)}
                className="px-5 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
              >
                Aplicar Logo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
