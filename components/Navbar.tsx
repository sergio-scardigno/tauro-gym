'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { scrollToSection } from '@/lib/utils';

const navLinksLeft = [
  { id: 'beneficios', label: 'Beneficios' },
  { id: 'horarios', label: 'Horarios' },
  { id: 'planes', label: 'Planes' },
];

const navLinksRight = [
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacto', label: 'Contacto' },
];

// ✅ Configurables
const WHATSAPP_NUMBER = '54911XXXXXXXX'; // tu número sin "+"
const WHATSAPP_TEXT = encodeURIComponent(
  'Hola! Quiero reservar una clase de prueba. Mi nivel es __ y puedo entrenar en __. ¿Me pasan horarios?'
);

// ✅ Tamaño del logo optimizado para cada breakpoint
const LOGO_SIZE = {
  mobile: { h: 'h-16', w: 'w-16' },        // 64px x 64px en mobile (más compacto)
  tablet: { h: 'md:h-20', w: 'md:w-20' },  // 80px x 80px en tablet
  desktop: { h: 'lg:h-24', w: 'lg:w-24' }, // 96px x 96px en desktop
};

// ✅ Espacio central reservado para balance visual
const CENTER_SLOT = {
  mobile: 'w-16',           // 64px
  tablet: 'md:w-20',        // 80px
  desktop: 'lg:w-24',       // 96px
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const whatsappHref = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`,
    []
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      {/* Contenedor flotante */}
      <div className="fixed top-4 md:top-8 lg:top-10 left-0 right-0 z-50">
        <div className="px-3 md:px-4">
          {/* ✅ Pill centrado con ancho responsivo */}
          <div
            className={cn(
              'relative mx-auto',
              'w-full max-w-[95vw] md:max-w-[90vw] lg:w-[min(1400px,calc(100vw-2rem))]',
              'rounded-full border backdrop-blur-xl',
              !scrolled && 'bg-black/25 border-white/15',
              scrolled &&
                'bg-black/55 border-white/15 shadow-[0_16px_40px_-22px_rgba(0,0,0,0.75)]',
              'transition-all duration-300'
            )}
            role="navigation"
            aria-label="Navegación principal"
          >
            {/* ✅ Grid responsivo: mobile (2 cols) | tablet+ (3 cols) */}
            <div className="relative grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center h-12 md:h-14 lg:h-16 px-3 md:px-4">
              {/* IZQUIERDA (solo desktop) */}
              <div className="hidden lg:flex items-center justify-end gap-1">
                {navLinksLeft.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className={cn(
                      'rounded-full px-3 py-2 text-sm font-medium',
                      'text-white/85 hover:text-white',
                      'hover:bg-white/10 transition-all duration-200',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* SLOT CENTRAL reservado (solo tablet+) */}
              <div
                className={cn(
                  'hidden md:flex items-center justify-center',
                  CENTER_SLOT.tablet,
                  CENTER_SLOT.desktop
                )}
                aria-hidden="true"
              />

              {/* DERECHA */}
              <div className="flex items-center justify-end gap-2">
                {/* Desktop: links + CTA */}
                <div className="hidden lg:flex items-center gap-1">
                  {navLinksRight.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => go(l.id)}
                      className={cn(
                        'rounded-full px-3 py-2 text-sm font-medium',
                        'text-white/85 hover:text-white',
                        'hover:bg-white/10 transition-all duration-200',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                      )}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>

                {/* CTA WhatsApp (siempre visible) */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'rounded-full px-3 py-2 text-xs md:text-sm font-semibold',
                    'bg-red-600 text-white hover:bg-red-500 transition-all duration-200',
                    'shadow-[0_8px_20px_-8px_rgba(239,68,68,0.6)]',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
                    'lg:ml-1 lg:px-4'
                  )}
                  aria-label="Contactar por WhatsApp"
                >
                  WhatsApp
                </a>

                {/* Menú hamburguesa (mobile + tablet) */}
                <button
                  onClick={() => setOpen(true)}
                  className={cn(
                    'lg:hidden rounded-full p-2',
                    'text-white/90 hover:text-white hover:bg-white/10',
                    'transition-all duration-200 active:scale-95',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                  )}
                  aria-expanded={open}
                  aria-label="Abrir menú"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* ✅ LOGO OVERLAY - Centrado y responsivo */}
              <div
                className={cn(
                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'z-[70]'
                )}
              >
                <button
                  onClick={() => go('hero')}
                  className={cn(
                    'group relative rounded-full p-1.5 md:p-2',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
                    'transition-transform hover:scale-105 active:scale-95'
                  )}
                  aria-label="Ir al inicio"
                >
                  {/* Glow effect en hover */}
                  <div className="absolute inset-0 rounded-full bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div
                    className={cn(
                      'relative',
                      LOGO_SIZE.mobile.h,
                      LOGO_SIZE.mobile.w,
                      LOGO_SIZE.tablet.h,
                      LOGO_SIZE.tablet.w,
                      LOGO_SIZE.desktop.h,
                      LOGO_SIZE.desktop.w
                    )}
                  >
                    <Image
                      src="/img/logo.png"
                      alt="Tauro Team"
                      fill
                      priority
                      className="object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú mobile/tablet mejorado */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-[60] transition-all duration-300',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        {/* Backdrop con blur */}
        <div
          className={cn(
            'absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />

        {/* Panel del menú */}
        <div
          className={cn(
            'absolute left-1/2 top-16 md:top-20 w-[min(90vw,400px)] -translate-x-1/2',
            'rounded-2xl border border-white/15 bg-black/80 backdrop-blur-xl',
            'shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]',
            'transition-all duration-300 ease-out',
            open ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          {/* Header del menú */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative">
                <Image
                  src="/img/logo.png"
                  alt="Tauro Team"
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold text-white">Menú</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Cerrar menú"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links de navegación */}
          <div className="p-4 space-y-1">
            {[...navLinksLeft, ...navLinksRight].map((l, index) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className={cn(
                  'w-full text-left rounded-xl px-4 py-3.5 text-white/90 hover:text-white',
                  'hover:bg-white/10 transition-all duration-200 active:scale-[0.98]',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
                  'flex items-center justify-between group'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="font-medium">{l.label}</span>
                <svg 
                  className="h-4 w-4 text-white/40 group-hover:text-white/60 transition-colors" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}

            {/* CTA destacado */}
            <div className="pt-3 mt-3 border-t border-white/10">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'w-full rounded-xl px-4 py-4 font-semibold text-center',
                  'bg-gradient-to-r from-red-600 to-red-500 text-white',
                  'hover:from-red-500 hover:to-red-400 transition-all duration-200',
                  'shadow-[0_8px_30px_-8px_rgba(239,68,68,0.6)]',
                  'active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500',
                  'flex items-center justify-center gap-2'
                )}
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Reservar clase
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}