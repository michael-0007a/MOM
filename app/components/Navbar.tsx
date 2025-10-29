'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// Link type for nav items
type NavItem = {
  label: string;
  href: string; // can be "/#section" or a route
  sectionId?: string; // present if it's a home section link
};

// A fresh, polished navbar optimized for the homepage but safe globally
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const topBarRef = useRef<HTMLDivElement | null>(null);

  // Central definition of links; section links are anchored to home
  const links: NavItem[] = useMemo(
    () => [
      { label: 'Home', href: '/#home', sectionId: 'home' },
      { label: 'Our Story', href: '/#our-story', sectionId: 'our-story' },
      { label: 'Menu', href: '/#menu', sectionId: 'menu' },
      { label: 'Gallery', href: '/#gallery', sectionId: 'gallery' },
      // Removed 'Franchise' from main links to avoid repetition with CTA
      { label: 'Store Locator', href: '/store-locator' },
      { label: 'Contact', href: '/contact' },
    ],
    []
  );

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Escape key to close
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Scroll listener for background/blur changes
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy for homepage sections only
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = links
      .map(l => l.sectionId)
      .filter((v): v is string => Boolean(v));

    const observer = new IntersectionObserver(
      entries => {
        // Pick the section most in view by intersection ratio
        let top: { id: string; ratio: number } | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const id = e.target.id;
          const ratio = e.intersectionRatio;
          if (!top || ratio > top.ratio) top = { id, ratio };
        }
        if (top) setActive(top.id);
      },
      {
        // Root margin to account for sticky header height
        rootMargin: '-96px 0px -60% 0px',
        threshold: [0.2, 0.4, 0.6, 0.8, 1],
      }
    );

    const els = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [isHome, links]);

  // Smooth scroll helper that also works when already on the homepage
  const smoothScrollTo = (hashHref: string) => {
    if (!hashHref.startsWith('/#')) return; // Non-section link

    const id = hashHref.replace('/#', '');
    const el = document.getElementById(id);
    if (!el) {
      if (pathname !== '/') {
        window.location.href = hashHref;
      }
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLg = window.matchMedia('(min-width: 1024px)').matches;
    const barH = (topBarRef.current?.getBoundingClientRect().height || 80) + 8; // only top bar height
    const offset = isLg ? barH : 0; // exact top on small screens
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  // Adjust hash-based scrolling to account for fixed header on initial load and on hash changes
  useEffect(() => {
    const adjust = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const isLg = window.matchMedia('(min-width: 1024px)').matches;
      const barH = (topBarRef.current?.getBoundingClientRect().height || 80) + 8;
      const offset = isLg ? barH : 0;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      setTimeout(() => window.scrollTo({ top: y, behavior: 'auto' }), 0);
    };

    // Run on mount and when pathname changes
    adjust();
    window.addEventListener('hashchange', adjust);
    return () => window.removeEventListener('hashchange', adjust);
  }, [pathname]);

  // Visual styles
  const translucent = !scrolled && isHome;
  // Force transparent on mobile, opaque on lg+
  const baseBg = 'bg-transparent lg:bg-white lg:shadow-md';

  const NavLink = ({
    label,
    href,
    sectionId,
    onNavigate,
    className = '',
  }: NavItem & { onNavigate?: () => void; className?: string }) => {
    const isActive = sectionId ? active === sectionId : pathname === href;

    // For section links, intercept click to smooth scroll when possible
    const handleClick = (e: React.MouseEvent) => {
      if (sectionId) {
        e.preventDefault();
        // Close any open mobile panel first, then scroll on next frame
        onNavigate?.();
        requestAnimationFrame(() => smoothScrollTo(href));
      } else {
        onNavigate?.();
      }
    };

    return (
      <Link
        href={href}
        aria-current={isActive ? 'page' : undefined}
        className={`relative px-3 py-2 rounded-full text-sm md:text-base manrope-medium transition-colors ${
          isActive ? 'text-[#2b91cb]' : 'text-gray-700 hover:text-[#2b91cb]'
        } ${className}`}
        onClick={handleClick}
      >
        <span>{label}</span>
        <span
          className={`absolute left-1/2 -translate-x-1/2 -bottom-0.5 h-0.5 rounded-full transition-all ${
            isActive ? 'w-6 bg-[#2b91cb]' : 'w-0 bg-transparent'
          }`}
          aria-hidden
        />
      </Link>
    );
  };

  return (
    <header ref={(el) => { headerRef.current = el; }} className={`fixed top-0 left-0 right-0 z-[1000] ${baseBg}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Primary">
        {/* Top bar */}
        <div ref={topBarRef} className="h-16 md:h-20 flex items-center justify-between gap-3">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Makers of Milkshakes - Home">
            <Image
              src="/logo.png"
              alt="Makers of Milkshakes Logo"
              width={40}
              height={40}
              className="transition-transform group-hover:scale-105"
              priority
            />
            <span className="hidden md:inline text-lg syne-bold text-[#2b91cb]">Makers of Milkshakes</span>
          </Link>

          {/* Center: Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(l => (
              <NavLink key={l.label} label={l.label} href={l.href} sectionId={l.sectionId} />
            ))}
          </div>

          {/* Right: Desktop CTA & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
              <Link
                href="/#franchise"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
                onClick={e => {
                  if (isHome) {
                    e.preventDefault();
                    smoothScrollTo('/#franchise');
                  }
                }}
              >
                Franchise With Us
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-gray-800 ring-1 ring-black/10 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2b91cb]"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen(o => !o)}
            >
              {!mobileOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile: slide-down panel below top bar */}
        <div className="lg:hidden" id="mobile-menu" role="region" aria-label="Mobile menu">
          {mobileOpen && (
            <div className="mt-2 mb-3 rounded-2xl bg-white ring-1 ring-gray-200 shadow-md p-2 animate-fade-in">
              <div className="flex flex-col gap-1">
                {links.map(l => (
                  <NavLink
                    key={l.label}
                    label={l.label}
                    href={l.href}
                    sectionId={l.sectionId}
                    onNavigate={() => setMobileOpen(false)}
                    className="block w-full px-3 py-3 rounded-xl text-base hover:bg-gray-50"
                  />
                ))}
              </div>
              <div className="pt-2">
                <Link
                  href="/#franchise"
                  className="block w-full text-center px-4 py-3 rounded-xl text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-colors shadow-sm"
                  onClick={e => {
                    if (isHome) {
                      e.preventDefault();
                      smoothScrollTo('/#franchise');
                    }
                    setMobileOpen(false);
                  }}
                >
                  Franchise With Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
