'use client';

import Image from 'next/image';
import { CONFIG } from '@/lib/constants';
import { scrollToSection, generateWhatsAppLink } from '@/lib/utils';

export default function Hero() {
  const handleWhatsAppClick = () => {
    const link = generateWhatsAppLink(
      CONFIG.WHATSAPP_NUMBER,
      CONFIG.WHATSAPP_MESSAGE
    );
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleReservarClick = () => {
    scrollToSection('contacto');
    // Focus en el formulario después de un pequeño delay
    setTimeout(() => {
      const nameInput = document.getElementById('nombre') as HTMLInputElement;
      if (nameInput) {
        nameInput.focus();
      }
    }, 500);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 scroll-mt-24 md:scroll-mt-32 overflow-hidden bg-white"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/hero.png"
          alt="Kickboxing y Muay Thai"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Overlay sutil para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
        <div className="absolute inset-0 bg-white/10"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
          Kickboxing & Muay Thai en{' '}
          <span className="text-red-500 drop-shadow-lg">{CONFIG.CITY}</span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg">
          Clases para principiantes y avanzados. Entrenamiento profesional y personalizado.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={handleReservarClick}
            className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Contactar"
          >
            Contactar
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-red-50 text-red-600 font-semibold rounded-lg border-2 border-red-600 hover:border-red-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Hablar por WhatsApp"
          >
            Hablar por WhatsApp
          </button>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border-2 border-red-500 shadow-lg">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-gray-900 font-semibold">Clases guiadas</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border-2 border-red-500 shadow-lg">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="text-gray-900 font-semibold">Grupos por nivel</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border-2 border-red-500 shadow-lg">
            <svg
              className="w-5 h-5 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-gray-900 font-semibold">Entrenamiento seguro</span>
          </div>
        </div>
      </div>
    </section>
  );
}
