import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { CONTACT, SOCIAL, LINKS } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-white animated-gradient"
    >
      {/* Background: soft fade from page white into brand blues */}
      <div
        className="absolute inset-0 -z-10"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(1200px_480px_at_50%_0%, rgba(43,145,203,0.18), transparent 60%), linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.94) 6%, rgba(43,145,203,0.12) 12%, #2b91cb 70%, #1f6ea0 100%)',
          }}
        />
        {/* gentle highlight blobs */}
        <div className="pointer-events-none absolute -top-16 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-blue-200/10 blur-3xl animate-float-slower" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-10">
          {/* Brand */}
          <div className="space-y-3 sm:space-y-4">
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3">
              <Image
                src="/logo_white.png"
                alt="Makers of Milkshakes Logo"
                width={36}
                height={36}
                className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                style={{ height: 'auto' }}
              />
              <span className="text-base sm:text-xl syne-bold tracking-tight">Makers of Milkshakes</span>
            </Link>
            <p className="text-white/85 text-xs sm:text-sm manrope-regular">
              Crafted with love, one shake at a time.
            </p>

            {/* Social - compact pill on mobile */}
            <div className="mt-3 sm:mt-4">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-2.5 py-1.5">
                <a
                  aria-label="Instagram"
                  href={SOCIAL.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300 hover:scale-110 hover:-rotate-3"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  aria-label="Facebook"
                  href={SOCIAL.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300 hover:scale-110 hover:rotate-3"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  aria-label="Twitter/X"
                  href={SOCIAL.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300 hover:scale-110 hover:-rotate-2"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links - desktop */}
          <div className="hidden md:block">
            <h3 className="syne-semibold text-sm sm:text-lg mb-2.5 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/#our-story" className="text-white/85 hover:text-white transition-colors manrope-regular">Our Story</Link></li>
              <li><Link href="/#menu" className="text-white/85 hover:text-white transition-colors manrope-regular">Menu</Link></li>
              <li><Link href="/#gallery" className="text-white/85 hover:text-white transition-colors manrope-regular">Gallery</Link></li>
              <li><Link href="/#franchise" className="text-white/85 hover:text-white transition-colors manrope-regular">Franchise</Link></li>
            </ul>
          </div>

          {/* Contact - desktop */}
          <div className="hidden md:block">
            <h3 className="syne-semibold text-sm sm:text-lg mb-2.5 sm:mb-4">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 text-white/85">
                <Mail className="w-4 h-4 sm:w-4 sm:h-4 mt-0.5" />
                <a href={LINKS.mailtoHref} className="text-xs sm:text-sm manrope-regular hover:underline break-all inline-block">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-white/85">
                <Phone className="w-4 h-4" />
                <a href={LINKS.telHref} className="text-xs sm:text-sm manrope-regular hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-white/85">
                <MapPin className="w-4 h-4 mt-0.5" />
                <div className="text-xs sm:text-sm manrope-regular">
                  <p>{CONTACT.addressLines[0]}</p>
                  <p>{CONTACT.addressLines[1]}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Follow Us - desktop (title aligned) */}
          <div className="hidden md:block">
            <h3 className="syne-semibold text-sm sm:text-lg mb-2.5 sm:mb-4">Follow Us</h3>
            <div className="flex space-x-3 sm:space-x-4">
              <a
                href={SOCIAL.instagram}
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-11 sm:h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300 hover:scale-110 hover:-rotate-2"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.facebook}
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-11 sm:h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300 hover:scale-110 hover:rotate-2"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.twitter}
                aria-label="Twitter/X"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-11 sm:h-11 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300 hover:scale-110 hover:-rotate-1"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mobile accordions */}
          <div className="md:hidden space-y-2">
            <details className="group rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <summary className="cursor-pointer flex items-center justify-between text-sm syne-semibold select-none">
                Quick Links
              </summary>
              <ul className="mt-2 space-y-1.5 text-xs">
                <li><Link href="/#our-story" className="text-white/85 hover:text-white transition-colors manrope-regular">Our Story</Link></li>
                <li><Link href="/#menu" className="text-white/85 hover:text-white transition-colors manrope-regular">Menu</Link></li>
                <li><Link href="/#gallery" className="text-white/85 hover:text-white transition-colors manrope-regular">Gallery</Link></li>
                <li><Link href="/#franchise" className="text-white/85 hover:text-white transition-colors manrope-regular">Franchise</Link></li>
              </ul>
            </details>

            <details className="group rounded-xl bg-white/5 border border-white/10 px-3 py-2">
              <summary className="cursor-pointer flex items-center justify-between text-sm syne-semibold select-none">
                Contact
              </summary>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start space-x-2 text-white/85">
                  <Mail className="w-4 h-4 mt-0.5" />
                  <a href={LINKS.mailtoHref} className="text-xs manrope-regular hover:underline break-all inline-block">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-center space-x-2 text-white/85">
                  <Phone className="w-4 h-4" />
                  <a href={LINKS.telHref} className="text-xs manrope-regular hover:underline">
                    {CONTACT.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start space-x-2 text-white/85">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <div className="text-xs manrope-regular">
                    <p>{CONTACT.addressLines[0]}</p>
                    <p>{CONTACT.addressLines[1]}</p>
                  </div>
                </li>
              </ul>
            </details>
          </div>
        </div>

        <div className="border-t border-white/20 mt-6 sm:mt-10 pt-4 sm:pt-6 text-center text-white/85 text-[11px] sm:text-sm">
          <p className="manrope-regular">&copy; {new Date().getFullYear()} Makers of Milkshakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
