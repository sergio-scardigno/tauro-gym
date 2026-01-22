'use client';

import { useState } from 'react';

const faqs = [
  {
    question: '¿Puedo empezar sin experiencia?',
    answer:
      '¡Absolutamente! Nuestras clases están diseñadas para todos los niveles. Los principiantes reciben atención especial y progresan a su propio ritmo. La primera clase es guiada y te ayudamos a familiarizarte con las técnicas básicas.',
  },
  {
    question: '¿Qué llevo a la primera clase?',
    answer:
      'Para la primera clase solo necesitas ropa cómoda para hacer ejercicio (pantalón corto o largo, remera). No es necesario traer guantes propios para empezar, aunque si tienes puedes traerlos. Te recomendamos traer una botella de agua.',
  },
  {
    question: '¿Hay clases para mujeres / adolescentes?',
    answer:
      'Sí, tenemos grupos mixtos y también clases específicas. Nuestro ambiente es inclusivo y respetuoso. Para adolescentes, tenemos clases de Kick boxing infantil. Consulta los horarios en la sección correspondiente.',
  },
  {
    question: '¿Necesito guantes propios?',
    answer:
      'No es obligatorio para empezar. Tenemos guantes disponibles para préstamo durante las primeras clases. Sin embargo, recomendamos adquirir tus propios guantes una vez que decidas continuar, por higiene y comodidad.',
  },
  {
    question: '¿Cuánto dura la clase?',
    answer:
      'Las clases duran aproximadamente 60 minutos. Incluyen calentamiento, técnica, práctica y estiramiento final. Algunas clases especiales pueden variar, pero siempre se informa con anticipación.',
  },
  {
    question: '¿Puedo entrenar si quiero bajar de peso?',
    answer:
      '¡Por supuesto! El Kickboxing y Muay Thai son excelentes para quemar calorías y tonificar. Muchos de nuestros alumnos han logrado sus objetivos de pérdida de peso combinando las clases con una alimentación balanceada. Es un entrenamiento completo que trabaja todo el cuerpo.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white scroll-mt-24 md:scroll-mt-32">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Preguntas Frecuentes
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-lg border-2 border-red-100 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset hover:bg-red-50 transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-red-600 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 text-gray-700 border-t border-red-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
