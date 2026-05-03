const testimonialVideos = [
  {
    src: '/video/testimonios/VID_20260224_214817.mp4',
    title: 'Testimonio 1',
  },
  {
    src: '/video/testimonios/VID_20260224_214853.mp4',
    title: 'Testimonio 2',
  },
  {
    src: '/video/testimonios/VID_20260224_215011.mp4',
    title: 'Testimonio 3',
  },
  {
    src: '/video/testimonios/VID_20260224_215104.mp4',
    title: 'Testimonio 4',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonios"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50 scroll-mt-24 md:scroll-mt-32"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900">
          Testimonios en video
        </h2>
        <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
          Conocé la experiencia de nuestros alumnos en sus propias palabras.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialVideos.map((video) => (
            <div
              key={video.src}
              className="bg-white p-4 rounded-lg border-2 border-red-100 shadow-sm"
            >
              <video
                controls
                preload="none"
                className="w-full aspect-[9/16] rounded-md bg-black object-cover"
                aria-label={video.title}
              >
                <source src={video.src} type="video/mp4" />
                Tu navegador no soporta videos HTML5.
              </video>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
