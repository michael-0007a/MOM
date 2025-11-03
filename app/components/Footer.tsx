import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { CONTACT, SOCIAL, LINKS } from '@/lib/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-[#2b91cb] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-8">
          {/* Brand */}
          <div className="space-y-2.5 sm:space-y-4">
            <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3">
              <Image
                src="/logo_white.png"
                alt="Makers of Milkshakes Logo"
                width={32}
                height={32}
                className="rounded-lg"
                style={{ height: 'auto' }}
              />
              <span className="text-sm sm:text-lg syne-bold">Makers of Milkshakes</span>
            </Link>
            <p className="text-white/80 text-xs sm:text-sm manrope-regular">
              Crafted with love, one shake at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="syne-semibold text-sm sm:text-lg mb-2.5 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li><Link href="/our-story" className="text-white/80 hover:text-white transition-colors manrope-regular">Our Story</Link></li>
              <li><Link href="/menu" className="text-white/80 hover:text-white transition-colors manrope-regular">Menu</Link></li>
              <li><Link href="/gallery" className="text-white/80 hover:text-white transition-colors manrope-regular">Gallery</Link></li>
              <li><Link href="/#franchise" className="text-white/80 hover:text-white transition-colors manrope-regular">Franchise</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="syne-semibold text-sm sm:text-lg mb-2.5 sm:mb-4">Contact</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start space-x-2 text-white/80">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" />
                <a href={LINKS.mailtoHref} className="text-xs sm:text-sm manrope-regular hover:underline break-all inline-block">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-white/80">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <a href={LINKS.telHref} className="text-xs sm:text-sm manrope-regular hover:underline">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-white/80">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5" />
                <div className="text-xs sm:text-sm manrope-regular">
                  <p>{CONTACT.addressLines[0]}</p>
                  <p>{CONTACT.addressLines[1]}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="syne-semibold text-sm sm:text-lg mb-2.5 sm:mb-4">Follow Us</h3>
            <div className="flex space-x-2.5 sm:space-x-4">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-5 sm:mt-8 pt-5 sm:pt-8 text-center text-white/80 text-xs sm:text-sm">
          <p className="manrope-regular">&copy; {new Date().getFullYear()} Makers of Milkshakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
