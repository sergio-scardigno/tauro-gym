import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="es" className={nunito.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
