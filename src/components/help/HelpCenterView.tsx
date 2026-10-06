import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FAQ_ITEMS } from '../../data/mockData';
import { 
  Search, 
  HelpCircle, 
  ChevronDown, 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle2,
  Send
} from 'lucide-react';

export const HelpCenterView: React.FC = () => {
  const { t } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const categories = [
    'TODAS',
    'Reservas',
    'Check-in',
    'Equipaje',
    'Mudik Points',
    'Mudik Lounge',
    'Accesibilidad',
  ];

  const filteredFaqs = FAQ_ITEMS.filter(item => {
    const query = searchQuery.trim().toLowerCase();
    const matchQuery = !query || item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query);
    const matchCat = selectedCategory === 'TODAS' || item.category === selectedCategory;
    return matchQuery && matchCat;
  });

  const handleSendContact = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FD] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Hero Search */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5F429A]/10 text-xs font-bold tracking-widest uppercase text-[#5F429A]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CENTRO DE ATENCIÓN AL PASAJERO</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-black text-[#263A79] tracking-tight">
            ¿EN QUÉ PODEMOS AYUDARTE?
          </h1>

          <div className="relative pt-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-6" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('Buscar respuestas sobre equipaje, check-in, cambios de fecha...', 'Search answers about baggage, check-in, changes...')}
              className="w-full h-12 pl-11 pr-4 bg-white border border-neutral-300 rounded-2xl shadow-sm text-sm font-medium text-[#191A23] focus:ring-2 focus:ring-[#5F429A]/20 focus:border-[#5F429A]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-[#5F429A] text-white shadow-xs'
                  : 'bg-white text-[#465B71] hover:text-[#263A79] border border-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordions List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-neutral-200 text-xs text-[#465B71]">
              {t('No encontramos preguntas frecuentes que coincidan con tu búsqueda.', 'No FAQs match your search.')}
            </div>
          ) : (
            filteredFaqs.map(item => {
              const isOpen = expandedFaqId === item.id;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isOpen ? null : item.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] uppercase font-bold text-[#5F429A] bg-[#5F429A]/10 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <span className="font-bold text-sm text-[#191A23]">
                        {item.question}
                      </span>
                    </div>

                    <ChevronDown className={`w-4 h-4 text-neutral-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#465B71] leading-relaxed border-t border-neutral-100 bg-neutral-50/40">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Contact Us Channels */}
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm space-y-8">
          <div className="border-b border-neutral-200 pb-4">
            <h3 className="font-display text-xl font-bold text-[#263A79]">
              {t('¿No encontraste lo que buscabas? Contáctanos', 'Need personalized assistance? Contact us')}
            </h3>
            <p className="text-xs text-[#465B71]">
              {t('Nuestro equipo en Jakarta atiende 24/7 en indonesio, inglés y español.', 'Our multilingual support team is available 24/7.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-[#191A23]">WhatsApp Soporte 24/7</div>
              <p className="text-xs text-[#465B71]">+62 811 9823 4400</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#263A79]/10 text-[#263A79] flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-[#191A23]">Call Center Indonesia</div>
              <p className="text-xs text-[#465B71]">(021) 500-68345 (Línea directa)</p>
            </div>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="w-9 h-9 rounded-xl bg-[#5F429A]/10 text-[#5F429A] flex items-center justify-center">
                <Mail className="w-4 h-4" />
              </div>
              <div className="font-bold text-sm text-[#191A23]">Correo Oficial</div>
              <p className="text-xs text-[#465B71]">ayuda@mudikairways.co.id</p>
            </div>
          </div>

          {/* Quick Message Simulation Form */}
          <form onSubmit={handleSendContact} className="p-6 bg-[#FAF9FD] rounded-2xl border border-neutral-200 space-y-4">
            <h4 className="font-bold text-xs text-[#263A79] uppercase tracking-wider">
              {t('Envianos tu consulta directa', 'Send us a direct inquiry')}
            </h4>

            {contactSent && (
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{t('¡Mensaje enviado con éxito! Te responderemos a la brevedad.', 'Message sent! We will reply promptly.')}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <input
                type="text"
                placeholder={t('Tu nombre', 'Your name')}
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                required
                className="h-10 px-3 bg-white border border-neutral-300 rounded-lg text-xs"
              />
              <input
                type="email"
                placeholder={t('Tu correo electrónico', 'Your email')}
                value={contactEmail}
                onChange={e => setContactEmail(e.target.value)}
                required
                className="h-10 px-3 bg-white border border-neutral-300 rounded-lg text-xs"
              />
            </div>

            <textarea
              placeholder={t('¿Cómo podemos ayudarte con tu vuelo o reserva?', 'Describe your question or flight query...')}
              value={contactMessage}
              onChange={e => setContactMessage(e.target.value)}
              required
              rows={3}
              className="w-full p-3 bg-white border border-neutral-300 rounded-lg text-xs"
            />

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#5F429A] hover:bg-[#45469C] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t('ENVIAR CONSULTA', 'SEND INQUIRY')}</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
};
