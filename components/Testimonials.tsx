import { CONFIG } from '@/lib/constants';

const testimonials = [
  {
    name: 'María González',
    level: 'Principiante',
    text: 'Empecé sin experiencia y en pocos meses ya me siento mucho más segura y en forma. Los profesores son excelentes.',
    initials: 'MG',
  },
  {
    name: 'Carlos Rodríguez',
    level: 'Intermedio',
    text: 'El ambiente es increíble, todos se apoyan mutuamente. He mejorado mucho mi técnica y condición física.',
    initials: 'CR',
  },
  {
    name: 'Ana Martínez',
    level: 'Principiante',
    text: 'La primera clase fue genial, me sentí muy cómoda. Ahora voy 3 veces por semana y no puedo parar.',
    initials: 'AM',
  },
  {
    name: 'Diego Fernández',
    level: 'Intermedio',
    text: 'Entrenamiento profesional con horarios que se adaptan a mi trabajo. Muy recomendable.',
    initials: 'DF',
  },
  {
    name: 'Laura Sánchez',
    level: 'Principiante',
    text: 'Me ayudó mucho a bajar de peso y ganar confianza. Los grupos por nivel hacen que sea más fácil empezar.',
    initials: 'LS',
  },
  {
    name: 'Roberto López',
    level: 'Intermedio',
    text: 'Excelente para defensa personal y fitness. Los planes son flexibles y los precios justos.',
    initials: 'RL',
  },
];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-semibold">
      {initials}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50 scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Lo que dicen nuestros alumnos
        </h2>

        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg border-2 border-red-100 text-center shadow-sm">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {CONFIG.METRICS.students}
            </div>
            <div className="text-gray-700">alumnos activos</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-red-100 text-center shadow-sm">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {CONFIG.METRICS.months}
            </div>
            <div className="text-gray-700">meses de experiencia</div>
          </div>
          <div className="bg-white p-6 rounded-lg border-2 border-red-100 text-center shadow-sm">
            <div className="text-4xl font-bold text-red-600 mb-2">
              {CONFIG.METRICS.recommend}
            </div>
            <div className="text-gray-700">nos recomiendan</div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border-2 border-red-100 hover:border-red-500 transition-all duration-300 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar initials={testimonial.initials} />
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {testimonial.level}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
