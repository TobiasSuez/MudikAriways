import React from 'react';
import logoImg from '../../public/logo.svg';
/* 

 * =========================================================================
 * LOGOTIPO CORPORATIVO DE MUDIK AIRWAYS (ARCHIVO ESTÁTICO)
 * =========================================================================
 * Para reemplazar este logo en tu repositorio de GitHub:
 * Simplemente reemplaza el archivo /public/logo.svg con tu propio archivo SVG.
 * Cualquier cambio en /public/logo.svg se reflejará automáticamente en toda la web.
 * =========================================================================
 */

interface CompanyLogoProps {
  className?: string;
  variant?: 'navbar' | 'footer' | 'large';
  showEditHint?: boolean;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ 
  className = '', 
  variant = 'navbar' 
}) => {
  const isFooter = variant === 'footer';
  const isLarge = variant === 'large';
  const isNavbar = variant === 'navbar';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Logotipo SVG oficial de archivo estático /public/logo.svg */}
     <div className={`flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${
        isLarge 
          ? 'h-16 w-16' 
          : isFooter 
          ? 'h-11 w-11 bg-white/10 p-1.5 rounded-xl border border-white/15' 
          : 'h-11 w-11 sm:h-12 sm:w-12'
      }`}>
        <img 
          src={logoImg} /* Reemplazás el string estático por la variable importada */
          alt="Mudik Airways" 
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>

      {/* Identidad de Marca: Oculta en navbar para maximizar espacio libre y dejar ítems en 1 sola línea */}
      {!isNavbar && (
        <div className="flex flex-col text-left">
          <span className={`font-display font-black tracking-tight leading-none ${
            isFooter 
              ? 'text-white text-xl sm:text-2xl' 
              : 'text-[#25356D] group-hover:text-[#5F429A] text-lg sm:text-xl transition-colors'
          }`}>
            MUDIK<span className={isFooter ? 'text-white ml-1' : 'text-[#5F429A] ml-1'}>AIRWAYS</span>
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-widest uppercase font-bold mt-1 ${
            isFooter ? 'text-neutral-400' : 'text-[#465B71]'
          }`}>
            Nusantara Low-Cost
          </span>
        </div>
      )}
    </div>
  );
};
