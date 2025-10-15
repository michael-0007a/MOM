import Link from 'next/link';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#2b91cb] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="Makers of Milkshakes Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-lg font-bold">Makers of Milkshakes</span>
            </Link>
            <p className="text-white/80 text-sm">
              Crafted with love, one shake at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/our-story" className="text-white/80 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/menu" className="text-white/80 hover:text-white transition-colors">Menu</Link></li>
              <li><Link href="/gallery" className="text-white/80 hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/franchise" className="text-white/80 hover:text-white transition-colors">Franchise</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-white/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@makersofmilkshakes.com</span>
              </li>
              <li className="flex items-center space-x-2 text-white/80">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-white/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">123 Shake Street, NY</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-[#2b91cb] transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80 text-sm">
          <p>&copy; {new Date().getFullYear()} Makers of Milkshakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
