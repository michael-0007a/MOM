'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Story', href: '#our-story' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Franchise', href: '#franchise' },
    { name: 'Store Locator', href: '/store-locator' },
    { name: 'Contact', href: '/contact' },
  ];

  const handleClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => handleClick('#home')}
            className="flex items-center space-x-2 group"
          >
            <div className="relative w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="w-8 h-10 bg-blue-600 rounded-b-lg"></div>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-white rounded-full"></div>
            </div>
            <span className="text-xl font-bold text-blue-800 hidden sm:block">
              Makers of Milkshakes
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) =>
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 font-medium cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 font-medium"
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
              <X className="w-6 h-6 text-blue-800" />
            ) : (
              <Menu className="w-6 h-6 text-blue-800" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              link.href.startsWith('#') ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 font-medium cursor-pointer"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-300 font-medium"
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
