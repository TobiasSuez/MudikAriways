import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, User, Mail, Lock, Sparkles, Check } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, t } = useApp();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('budi.santoso@nusantara.id');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Budi Santoso');
  const [joinLoyalty, setJoinLoyalty] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginUser(email, name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl relative border border-neutral-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-6 right-6 p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="font-display font-extrabold text-xl text-[#263A79]">
            MUDIK<span className="text-[#5F429A] ml-1">AIRWAYS</span>
          </div>
          <h2 className="font-bold text-lg text-[#191A23]">
            {mode === 'login' ? t('Iniciar Sesión en Tu Cuenta', 'Sign In to Your Account') : t('Crear Cuenta Mudik', 'Create Mudik Account')}
          </h2>
          <p className="text-xs text-[#465B71]">
            {mode === 'login'
              ? t('Gestioná tus viajes y canjeá tus Mudik Points acumulados.', 'Manage your trips and redeem your Mudik Points.')
              : t('Registrate y sumá 2.000 Mudik Points de bienvenida.', 'Register now and get 2,000 welcome points.')}
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-neutral-200 text-xs font-bold">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 pb-2 text-center transition-colors ${
              mode === 'login' ? 'text-[#5F429A] border-b-2 border-[#5F429A]' : 'text-[#465B71]'
            }`}
          >
            {t('INICIAR SESIÓN', 'SIGN IN')}
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 pb-2 text-center transition-colors ${
              mode === 'register' ? 'text-[#5F429A] border-b-2 border-[#5F429A]' : 'text-[#465B71]'
            }`}
          >
            {t('REGISTRARME', 'REGISTER')}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'register' && (
            <div>
              <label className="block font-bold text-[#465B71] uppercase tracking-wider mb-1">
                {t('NOMBRE COMPLETO', 'FULL NAME')}
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-[#191A23]"
              />
            </div>
          )}

          <div>
            <label className="block font-bold text-[#465B71] uppercase tracking-wider mb-1">
              {t('CORREO ELECTRÓNICO', 'EMAIL')}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-[#191A23]"
            />
          </div>

          <div>
            <label className="block font-bold text-[#465B71] uppercase tracking-wider mb-1">
              {t('CONTRASEÑA', 'PASSWORD')}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full h-11 px-3 bg-neutral-50 border border-neutral-300 rounded-xl text-sm font-semibold text-[#191A23]"
            />
          </div>

          {mode === 'register' && (
            <label className="flex items-center gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={joinLoyalty}
                onChange={e => setJoinLoyalty(e.target.checked)}
                className="w-4 h-4 accent-[#5F429A]"
              />
              <span className="text-[11px] font-bold text-[#5F429A]">
                {t('Inscribirme gratis en Mudik Points (+2.000 pts)', 'Join Mudik Points for free (+2,000 pts)')}
              </span>
            </label>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-[#5F429A] hover:bg-[#45469C] text-white font-extrabold text-xs tracking-wider rounded-xl transition-all shadow-md shadow-[#5F429A]/20 cursor-pointer"
          >
            {mode === 'login' ? t('INGRESAR', 'SIGN IN') : t('CREAR CUENTA', 'CREATE ACCOUNT')}
          </button>
        </form>

        {/* Google Continue Simulator */}
        <div className="space-y-3 pt-2 border-t border-neutral-100">
          <button
            type="button"
            onClick={() => loginUser('budi.santoso@gmail.com', 'Budi Santoso')}
            className="w-full py-2.5 border border-neutral-300 hover:bg-neutral-50 text-[#191A23] font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>{t('Continuar con Google', 'Continue with Google')}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
