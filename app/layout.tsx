import type { Metadata } from "next";
import "./globals.css";
// Mapbox CSS (global)
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientLayout from "./components/ClientLayout";
import { Manrope, Syne, Notable } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["200","300","400","500","600","700","800"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["400","500","600","700","800"] });
const notable = Notable({ subsets: ["latin"], variable: "--font-notable", display: "swap", weight: "400" });

export const metadata: Metadata = {
  title: "Makers of Milkshakes - Sip the Joy. Taste the Magic.",
  description: "Crafted with love, one shake at a time. Discover our premium milkshakes made with the finest ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable} ${notable.variable}`}>
      <body className="antialiased">
        <ClientLayout>
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
