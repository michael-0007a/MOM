import type { Metadata, Viewport } from "next";
import "./globals.css";
// Leaflet CSS (global)
import 'leaflet/dist/leaflet.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientLayout from "./components/ClientLayout";
import SmoothScrollProvider from "./components/SmoothScrollProvider";
import { Manrope, Syne, Notable } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap", weight: ["200","300","400","500","600","700","800"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", display: "swap", weight: ["400","500","600","700","800"] });
const notable = Notable({ subsets: ["latin"], variable: "--font-notable", display: "swap", weight: "400" });

export const metadata: Metadata = {
  title: "Makers of Milkshakes - Sip the Joy. Taste the Magic.",
  description: "Crafted with love, one shake at a time. Discover our premium milkshakes made with the finest ingredients.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${syne.variable} ${notable.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <ClientLayout>
            <Navbar />
            {/* Desktop-only offset so fixed header doesn't cover hero; mobile stays overlay/floating */}
            <main className="pt-0 lg:pt-20">
              {children}
            </main>
            <Footer />
          </ClientLayout>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
