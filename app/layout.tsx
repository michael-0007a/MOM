import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ClientLayout from "./components/ClientLayout";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&family=Manrope:wght@200..800&family=Notable&family=Syne:wght@400..800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <ClientLayout>
          <Navbar />
          <main className="pt-20">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
