'use client';

import { useState, useEffect } from 'react';
import { CONFIG } from '@/lib/constants';
import { validateWhatsApp, generateWhatsAppLink } from '@/lib/utils';

const objectives = [
  'Bajar de peso',
  'Aprender técnica',
  'Defensa personal',
  'Competir',
  'Fitness',
];

const timePreferences = ['Mañana', 'Tarde', 'Noche'];

const planNames: Record<string, string> = {
  'two-classes': '2 clases por semana',
  'unlimited': 'Ilimitado',
  'pack-10': 'Pack 10 clases',
};

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    whatsapp: '',
    objetivo: '',
    horario: '',
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Detectar plan seleccionado desde Pricing
    const handlePlanSelected = (event: CustomEvent) => {
      const planId = event.detail;
      setSelectedPlan(planId);
    };

    // Verificar si hay plan en sessionStorage
    const storedPlan = sessionStorage.getItem('selectedPlan');
    if (storedPlan) {
      setSelectedPlan(storedPlan);
      sessionStorage.removeItem('selectedPlan');
    }

    window.addEventListener('planSelected', handlePlanSelected as EventListener);

    return () => {
      window.removeEventListener(
        'planSelected',
        handlePlanSelected as EventListener
      );
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo al escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'El WhatsApp es requerido';
    } else if (!validateWhatsApp(formData.whatsapp)) {
      newErrors.whatsapp = 'Ingresa un número de WhatsApp válido';
    }

    if (!formData.objetivo) {
      newErrors.objetivo = 'Selecciona un objetivo';
    }

    if (!formData.horario) {
      newErrors.horario = 'Selecciona un horario preferido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Construir mensaje para WhatsApp
    let message = `Hola! Quiero reservar una clase de prueba.\n\n`;
    message += `Nombre: ${formData.nombre}\n`;
    message += `WhatsApp: ${formData.whatsapp}\n`;
    message += `Objetivo: ${formData.objetivo}\n`;
    message += `Horario preferido: ${formData.horario}\n`;
    if (selectedPlan) {
      message += `Plan de interés: ${planNames[selectedPlan] || selectedPlan}\n`;
    }
    message += `\n¿Me pasan horarios disponibles?`;

    // Generar link y abrir WhatsApp
    const whatsappLink = generateWhatsAppLink(CONFIG.WHATSAPP_NUMBER, message);
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');

    // Mostrar toast de éxito
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);

    // Resetear formulario
    setFormData({
      nombre: '',
      whatsapp: '',
      objetivo: '',
      horario: '',
    });
    setSelectedPlan(null);
  };

  return (
    <section
      id="contacto"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50 scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-gray-900">
          Reservá tu clase de prueba
        </h2>
        <p className="text-center text-gray-700 mb-8">
          Completa el formulario y te contactamos por WhatsApp
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-lg border-2 border-red-100 shadow-sm space-y-6"
          noValidate
        >
          {selectedPlan && (
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-1">
                Plan seleccionado:
              </p>
              <p className="font-semibold text-red-600">
                {planNames[selectedPlan] || selectedPlan}
              </p>
            </div>
          )}

          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Nombre <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.nombre ? 'border-red-500' : 'border-red-200'
              }`}
              placeholder="Tu nombre completo"
              aria-required="true"
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? 'nombre-error' : undefined}
            />
            {errors.nombre && (
              <p id="nombre-error" className="mt-1 text-sm text-red-600">
                {errors.nombre}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              WhatsApp <span className="text-red-600">*</span>
            </label>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.whatsapp ? 'border-red-500' : 'border-red-200'
              }`}
              placeholder="5491234567890"
              aria-required="true"
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined}
            />
            {errors.whatsapp && (
              <p id="whatsapp-error" className="mt-1 text-sm text-red-600">
                {errors.whatsapp}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="objetivo"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Objetivo <span className="text-red-600">*</span>
            </label>
            <select
              id="objetivo"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.objetivo ? 'border-red-500' : 'border-red-200'
              }`}
              aria-required="true"
              aria-invalid={!!errors.objetivo}
              aria-describedby={errors.objetivo ? 'objetivo-error' : undefined}
            >
              <option value="">Selecciona un objetivo</option>
              {objectives.map((obj) => (
                <option key={obj} value={obj}>
                  {obj}
                </option>
              ))}
            </select>
            {errors.objetivo && (
              <p id="objetivo-error" className="mt-1 text-sm text-red-600">
                {errors.objetivo}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="horario"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Horario preferido <span className="text-red-600">*</span>
            </label>
            <select
              id="horario"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-white border-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                errors.horario ? 'border-red-500' : 'border-red-200'
              }`}
              aria-required="true"
              aria-invalid={!!errors.horario}
              aria-describedby={errors.horario ? 'horario-error' : undefined}
            >
              <option value="">Selecciona un horario</option>
              {timePreferences.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {errors.horario && (
              <p id="horario-error" className="mt-1 text-sm text-red-600">
                {errors.horario}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
          >
            Enviar solicitud
          </button>
        </form>

        <p className="text-center text-gray-700 text-sm mt-6">
          Respondemos en menos de 24 horas. Si es urgente, contactanos directamente
          por WhatsApp.
        </p>

        {/* Toast de éxito */}
        {showToast && (
          <div
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5"
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
              <span>¡Formulario enviado! Te redirigimos a WhatsApp.</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
