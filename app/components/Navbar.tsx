'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'Our Story', href: '/#our-story' },
    { name: 'Menu', href: '/#menu' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Franchise', href: '/#franchise' },
    { name: 'Store Locator', href: '/store-locator' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = original || '';
    }
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [isOpen]);

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

  const mobileBg = isOpen ? 'bg-white' : (scrolled ? 'bg-white' : 'bg-white/80 backdrop-blur');

  return (
    <nav
      className={`sticky top-0 w-full z-50 transition-colors ${mobileBg} md:bg-white md:shadow-md`}
      aria-label="Main Navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-20">
          {/* Logo (left) - hide on mobile when scrolled */}
          <Link
            href="/"
            className={`${scrolled ? 'hidden md:flex' : 'flex md:flex'} items-center space-x-3 group`}
          >
            <Image
              src="/logo.png"
              alt="Makers of Milkshakes Logo"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-110"
            />
            <span className="text-lg syne-bold text-[#2b91cb] hidden md:block">
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
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 manrope-medium cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-gray-700 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 manrope-medium"
                >
                  {link.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button (right) - circular */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full bg-white/80 backdrop-blur ring-1 ring-blue-100 shadow-sm hover:bg-white transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#2b91cb]" />
            ) : (
              <Menu className="w-6 h-6 text-[#2b91cb]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-40 bg-white overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Make space for the header height */}
          <div className="pt-20 px-6">
            <div className="space-y-2">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <button
                    key={link.name}
                    onClick={() => handleClick(link.href)}
                    className="block w-full text-left px-4 py-4 rounded-xl text-gray-800 bg-white/90 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 manrope-medium cursor-pointer shadow-sm ring-1 ring-gray-100"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 rounded-xl text-gray-800 bg-white/90 hover:bg-blue-50 hover:text-[#2b91cb] transition-all duration-300 manrope-medium shadow-sm ring-1 ring-gray-100"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}