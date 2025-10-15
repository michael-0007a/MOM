'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Our Story', href: '/#our-story' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Franchise', href: '/#franchise' },
    { name: 'Store Locator', href: '/store-locator' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      // If we're navigating to a homepage section
      if (window.location.pathname !== '/') {
        // If we're not on the homepage, navigate to home first then scroll
        window.location.href = href;
      } else {
        // If we're already on homepage, just scroll to section
        const sectionId = href.substring(2); // Remove '/#'
        const element = document.querySelector(`#${sectionId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
          >
            <Image
              src="/logo.png"
              alt="Makers of Milkshakes Logo"
              width={48}
              height={48}
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-xl font-bold text-[#2b91cb] hidden sm:block">
              Makers of Milkshakes
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) =>
              link.href.startsWith('/#') ? (
                <button
                  key={link.name}
                  onClick={() => handleClick(link.href)}
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 font-medium"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#2b91cb]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2b91cb]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <button
                  key={link.name}
                  onClick={() => handleClick(link.href)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 font-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 font-medium"
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
