'use client';

import { CONFIG } from '@/lib/constants';

const scheduleData = [
  {
    title: 'Entrenamiento de la fuerza en grupo reducido',
    schedule: [
      { days: 'Lunes a viernes', times: ['6:30hs', '11:00hs'] },
      { days: 'Martes y jueves', times: ['19:30hs'] },
      { days: 'Sábado', times: ['11:30hs'] },
    ],
  },
  {
    title: 'Gimnasia Funcional',
    schedule: [
      { days: 'Lunes a viernes', times: ['8:00hs'] },
      { days: 'Lunes, miércoles y viernes', times: ['19:00hs'] },
    ],
  },
  {
    title: 'Kick boxing infantil',
    schedule: [{ days: 'Martes y jueves', times: ['19:30hs'] }],
  },
  {
    title: 'Kick boxing y Muay Thai (Profesor Javier)',
    schedule: [
      { days: 'Lunes a viernes', times: ['9:00hs'] },
      { days: 'Lunes, miércoles y viernes', times: ['18:00hs', '20:00hs', '21:00hs'] },
      { days: 'Martes y jueves', times: ['20:30hs'] },
    ],
  },
  {
    title: 'Kick boxing (Instructor Franco)',
    schedule: [
      { days: 'Lunes a viernes', times: ['14:30hs'] },
      { days: 'Martes y jueves', times: ['18:30hs'] },
    ],
  },
];

export default function ScheduleLocation() {
  const handleDirectionsClick = () => {
    window.open(CONFIG.MAPS_DIRECTIONS_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="horarios"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50 scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Horarios y Ubicación
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Horarios */}
          <div className="space-y-6">
            {scheduleData.map((classType, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border-2 border-red-100 shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-4 text-red-600">
                  {classType.title}
                </h3>
                <div className="space-y-3">
                  {classType.schedule.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="text-gray-800 font-medium min-w-[140px]">
                        {item.days}:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {item.times.map((time, timeIdx) => (
                          <span
                            key={timeIdx}
                            className="px-3 py-1 bg-red-100 text-red-700 rounded-md text-sm font-medium"
                          >
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mapa */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border-2 border-red-100 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Ubicación
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                  src={CONFIG.MAPS_EMBED_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del gimnasio"
                  className="w-full h-full"
                ></iframe>
              </div>
              <button
                onClick={handleDirectionsClick}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white"
                aria-label="Abrir Google Maps para obtener direcciones"
              >
                Cómo llegar
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-red-100 shadow-sm">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Dirección
              </h3>
              <p className="text-gray-700">{CONFIG.ADDRESS}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
