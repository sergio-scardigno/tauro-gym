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

// ✅ Tamaño del logo - más grande y sobresale del navbar
const LOGO_SIZE = {
  mobile: { h: 'h-20', w: 'w-20' },        // 80px x 80px en mobile
  tablet: { h: 'md:h-24', w: 'md:w-24' },  // 96px x 96px en tablet
  desktop: { h: 'lg:h-28', w: 'lg:w-28' }, // 112px x 112px en desktop
};

// ✅ Espacio central reservado para balance visual
const CENTER_SLOT = {
  mobile: 'w-20',           // 80px
  tablet: 'md:w-24',        // 96px
  desktop: 'lg:w-28',       // 112px
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
      <div className="fixed top-8 md:top-10 left-0 right-0 z-50">
        <div className="px-4">
          {/* ✅ Pill centrado con ancho consistente */}
          <div
            className={cn(
              'relative mx-auto',
              'w-[min(1400px,calc(100vw-2rem))]',
              'rounded-full border backdrop-blur-xl',
              !scrolled && 'bg-black/25 border-white/15',
              scrolled &&
                'bg-black/55 border-white/15 shadow-[0_16px_40px_-22px_rgba(0,0,0,0.75)]',
              'transition-all duration-300'
            )}
            role="navigation"
            aria-label="Navegación principal"
          >
            {/* ✅ Grid 3 columnas: izq | slot central | der */}
            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center h-14 md:h-16 px-3 md:px-4">
              {/* IZQUIERDA (links pegados al centro) */}
              <div className="hidden md:flex items-center justify-end gap-1">
                {navLinksLeft.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => go(l.id)}
                    className={cn(
                      'rounded-full px-3 py-2 text-sm font-medium',
                      'text-white/85 hover:text-white',
                      'hover:bg-white/10 transition',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    )}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* SLOT CENTRAL reservado */}
              <div
                className={cn(
                  'flex items-center justify-center',
                  CENTER_SLOT.mobile,
                  CENTER_SLOT.tablet,
                  CENTER_SLOT.desktop
                )}
                aria-hidden="true"
              />

              {/* DERECHA (links pegados al centro + CTA) */}
              <div className="flex items-center justify-end md:justify-start gap-2">
                <div className="hidden md:flex items-center gap-1">
                  {navLinksRight.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => go(l.id)}
                      className={cn(
                        'rounded-full px-3 py-2 text-sm font-medium',
                        'text-white/85 hover:text-white',
                        'hover:bg-white/10 transition',
                        'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                      )}
                    >
                      {l.label}
                    </button>
                  ))}

                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      'ml-1 rounded-full px-4 py-2 text-sm font-semibold',
                      'bg-red-600 text-white hover:bg-red-500 transition',
                      'shadow-[0_14px_30px_-18px_rgba(239,68,68,0.9)]',
                      'focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                    )}
                  >
                    WhatsApp
                  </a>
                </div>

                {/* Mobile: CTA + menú */}
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    'md:hidden rounded-full px-3 py-2 text-xs font-semibold',
                    'bg-red-600 text-white hover:bg-red-500 transition'
                  )}
                  aria-label="Abrir WhatsApp"
                >
                  WhatsApp
                </a>

                <button
                  onClick={() => setOpen(true)}
                  className={cn(
                    'md:hidden rounded-full p-2',
                    'text-white/90 hover:text-white hover:bg-white/10 transition',
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

              {/* ✅ LOGO OVERLAY - Grande y sobresale del navbar */}
              <div
                className={cn(
                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                  'z-[70]'
                )}
              >
                <button
                  onClick={() => go('hero')}
                  className={cn(
                    'group relative rounded-full p-2',
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
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú mobile */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-[60] transition',
          open ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            'absolute inset-0 bg-black/60 transition-opacity',
            open ? 'opacity-100' : 'opacity-0'
          )}
          onClick={() => setOpen(false)}
        />

        <div
          className={cn(
            'absolute left-1/2 top-20 w-[92%] -translate-x-1/2',
            'rounded-2xl border border-white/15 bg-black/55 backdrop-blur-xl',
            'shadow-2xl',
            'transition-all duration-300',
            open ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <p className="text-sm font-semibold text-white">Menú</p>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-2 text-white/90 hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Cerrar menú"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-3">
            {[...navLinksLeft, ...navLinksRight].map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="w-full text-left rounded-xl px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              >
                {l.label}
              </button>
            ))}

            <button
              onClick={() => go('contacto')}
              className="mt-2 w-full rounded-xl px-4 py-3 font-semibold bg-red-600 text-white hover:bg-red-500 transition"
            >
              Reservar clase
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
