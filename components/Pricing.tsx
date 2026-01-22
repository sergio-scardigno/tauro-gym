'use client';

import { CONFIG } from '@/lib/constants';
import { scrollToSection } from '@/lib/utils';

const plans = [
  {
    id: 'two-classes',
    name: '2 clases por semana',
    price: CONFIG.PRICES.TWO_CLASSES,
    features: [
      '2 clases semanales',
      'Acceso a todas las disciplinas',
      'Seguimiento personalizado',
      'Sin permanencia',
    ],
  },
  {
    id: 'unlimited',
    name: 'Ilimitado',
    price: CONFIG.PRICES.UNLIMITED,
    features: [
      'Clases ilimitadas',
      'Acceso a todas las disciplinas',
      'Seguimiento personalizado',
      'Entrenamiento de fuerza incluido',
      'Sin permanencia',
    ],
    popular: true,
  },
  {
    id: 'pack-10',
    name: 'Pack 10 clases',
    price: CONFIG.PRICES.PACK_10,
    features: [
      '10 clases para usar cuando quieras',
      'Válido por 3 meses',
      'Acceso a todas las disciplinas',
      'Ideal para probar',
    ],
  },
];

export default function Pricing() {
  const handleSelectPlan = (planId: string) => {
    // Guardar plan seleccionado en sessionStorage
    sessionStorage.setItem('selectedPlan', planId);
    // Scroll a contacto
    scrollToSection('contacto');
    // Disparar evento personalizado para que Contact lo detecte
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('planSelected', { detail: planId }));
    }, 500);
  };

  return (
    <section
      id="planes"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
          Planes y Precios
        </h2>
        <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a tus objetivos y disponibilidad
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white p-8 rounded-lg border-2 transition-all duration-300 ${
                plan.popular
                  ? 'border-red-600 shadow-lg shadow-red-500/20 scale-105'
                  : 'border-red-200 hover:border-red-500'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Más Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {plan.name}
              </h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-red-600">
                  {plan.price}
                </span>
                <span className="text-gray-600 text-sm ml-2">/mes</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white ${
                  plan.popular
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 hover:border-red-700'
                }`}
                aria-label={`Seleccionar plan ${plan.name}`}
              >
                Quiero este plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
