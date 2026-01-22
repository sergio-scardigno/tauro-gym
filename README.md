# TAURO TEAM - Landing Page

Landing page moderna para escuela de Kickboxing y Muay Thai en Chascomús.

## 🚀 Tecnologías

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React 19**

## 📦 Instalación

```bash
npm install
```

## 🛠️ Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Build

```bash
npm run build
npm start
```

## ⚙️ Configuración

Edita el archivo `lib/constants.ts` para configurar:

- Ciudad/Barrio
- Número de WhatsApp
- URLs de Google Maps (embed y direcciones)
- Precios de los planes
- Dirección física
- Redes sociales
- Métricas

## 📁 Estructura

```
app/
  layout.tsx          # Layout principal con metadata
  page.tsx            # Página principal
  globals.css         # Estilos globales

components/
  Navbar.tsx          # Navegación sticky
  Hero.tsx            # Sección hero
  Benefits.tsx        # Beneficios
  ScheduleLocation.tsx # Horarios y ubicación
  Pricing.tsx         # Planes y precios
  Testimonials.tsx    # Testimonios
  FAQ.tsx             # Preguntas frecuentes
  Contact.tsx         # Formulario de contacto
  Footer.tsx          # Footer
  WhatsAppFloatingButton.tsx # Botón flotante WhatsApp

lib/
  constants.ts        # Constantes configurables
  utils.ts            # Utilidades
```

## ✨ Características

- ✅ Diseño responsive y accesible
- ✅ Tema oscuro con acento rojo
- ✅ Navegación smooth scroll
- ✅ Formulario de contacto con validación
- ✅ Integración con WhatsApp
- ✅ SEO optimizado
- ✅ Sin dependencias pesadas

## 📝 Notas

- Los horarios están hardcodeados en `components/ScheduleLocation.tsx`
- Las imágenes usan avatares con iniciales (sin imágenes externas)
- El mapa de Google Maps requiere configuración de URL en `lib/constants.ts`
