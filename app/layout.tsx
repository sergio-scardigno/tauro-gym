import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import StickyWhatsAppBar from "@/components/StickyWhatsAppBar";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Kickboxing & Muay Thai en Chascomús | Escuela de Artes Marciales",
  description: "Clases de Kickboxing y Muay Thai en Chascomús. Entrenamiento para principiantes y avanzados. Horarios flexibles, entrenadores certificados.",
  keywords: "kickboxing, muay thai, artes marciales, chascomús, entrenamiento, defensa personal, fitness, clases",
  openGraph: {
    title: "Kickboxing & Muay Thai en Chascomús",
    description: "Clases de Kickboxing y Muay Thai en Chascomús. Entrenamiento profesional y personalizado.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = "G-7ZE7R2GTHB";
  const gaInlineScript = `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${gaId}');`;

  return (
    <html lang="es" className={nunito.variable}>
      <head>
        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-MJ2HRP27" />
        {/* End Google Tag Manager */}
        {/* Google tag (gtag.js) */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
        <script dangerouslySetInnerHTML={{ __html: gaInlineScript }} />
        {/* End Google tag (gtag.js) */}
      </head>
      <body className="antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MJ2HRP27"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <StickyWhatsAppBar />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
