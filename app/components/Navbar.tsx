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
  const [active, setActive] = useState<string>(() => {
    // Initialize based on URL hash if present, otherwise default to home
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      return hash || 'home';
    }
    return 'home';
  });
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

  // Close mobile menu on route change and handle section activation
  useEffect(() => {
    setMobileOpen(false);

    // Reset active section when navigating to/from home
    if (isHome) {
      const hash = window.location.hash.replace('#', '');
      setActive(hash || 'home');
    } else {
      // On non-home pages, no section should be active
      setActive('');
    }
  }, [pathname, isHome]);

  // Escape key to close
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Scroll listener for background/blur changes and section tracking
  useEffect(() => {
    const onScroll = (scrollY?: number) => {
      const currentScrollY = scrollY ?? window.scrollY;
      setScrolled(currentScrollY > 8);

      // Additional scroll-based section detection for homepage
      if (isHome) {
        const sectionIds = links
          .map(l => l.sectionId)
          .filter((v): v is string => Boolean(v));

        const offset = 120; // Account for navbar height

        let currentSection = 'home'; // Default to home

        // Find which section occupies the most viewport space
        for (const sectionId of sectionIds) {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + currentScrollY;
            const elementBottom = elementTop + rect.height;

            // Check if this section is in the "active zone" (top part of viewport)
            if (elementTop <= currentScrollY + offset && elementBottom > currentScrollY + offset) {
              currentSection = sectionId;
              break;
            }
          }
        }

        setActive(currentSection);
      }
    };

    // Listen to Lenis scroll events if available
    const handleLenisScroll = (e: Event) => {
      const ce = e as CustomEvent<{ scrollY: number }>;
      onScroll(ce.detail?.scrollY);
    };

    // Listen to native scroll as fallback
    const handleNativeScroll = () => {
      onScroll();
    };

    // Initial call
    onScroll();

    // Add event listeners
    window.addEventListener('lenisScroll', handleLenisScroll as EventListener);
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      window.removeEventListener('lenisScroll', handleLenisScroll as EventListener);
      window.removeEventListener('scroll', handleNativeScroll);
    };
  }, [isHome, links]);

  // Scroll spy for homepage sections only
  useEffect(() => {
    if (!isHome) return;

    const sectionIds = links
      .map(l => l.sectionId)
      .filter((v): v is string => Boolean(v));

    let debounceTimer: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      entries => {
        // Clear any existing timer
        clearTimeout(debounceTimer);

        // Debounce the update to prevent rapid switching
        debounceTimer = setTimeout(() => {
          // Find the section that's most visible in the viewport
          let mostVisible: { id: string; ratio: number } | null = null;

          for (const entry of entries) {
            const id = entry.target.id;
            const ratio = entry.intersectionRatio;

            // Consider any section that's at least 10% visible
            if (ratio > 0.1) {
              if (!mostVisible || ratio > mostVisible.ratio) {
                mostVisible = { id, ratio };
              }
            }
          }

          // If we found a visible section, activate it
          if (mostVisible) {
            setActive(mostVisible.id);
          }
        }, 100);
      },
      {
        // Adjust root margin to account for the navbar height
        rootMargin: '-80px 0px -50% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    const els = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    els.forEach(el => observer.observe(el));

    return () => {
      clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [isHome, links]);

  // Smooth scroll helper that also works when already on the homepage
  const getHeaderOffset = () => {
    // Only offset on desktop; mobile header is floating/transparent
    const isLg = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    if (!isLg) return 0;
    const header = headerRef.current;
    if (!header) return 0;
    const rect = header.getBoundingClientRect();
    const style = getComputedStyle(header);
    const extra =
      parseFloat(style.marginBottom || '0') +
      parseFloat(style.borderBottomWidth || '0');
    // Ceil to avoid sub-pixel gaps + 1px safety
    return Math.ceil(rect.height + extra) + 1;
  };

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

    const offset = getHeaderOffset();
    const targetPosition = el.offsetTop - offset;

    // Use Lenis if available, otherwise fall back to native smooth scroll
    const lenis = (window as unknown as { lenis?: { scrollTo: (y: number, opts?: { duration?: number; easing?: (t: number) => number }) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(targetPosition, {
        duration: 1.5,
        easing: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      });
    } else {
      // Fallback to native smooth scroll
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: prefersReduced ? 'auto' : 'smooth'
      });
    }
  };

  // Adjust hash-based scrolling to account for fixed header on initial load and on hash changes
  useEffect(() => {
    const adjust = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (!el) return;
      const offset = getHeaderOffset();
      const y = Math.round(el.getBoundingClientRect().top + window.scrollY - offset);
      // Delay to run after browser's native anchor jump
      setTimeout(() => window.scrollTo({ top: Math.max(0, y), behavior: 'auto' }), 0);
    };

    // Run on mount and when pathname changes
    adjust();
    window.addEventListener('hashchange', adjust);
    return () => window.removeEventListener('hashchange', adjust);
  }, [pathname]);

  // Visual styles
  // const translucent = !scrolled && isHome; // no longer used
  // Force transparent on mobile, opaque on lg+
  const baseBg = 'bg-transparent lg:bg-white lg:shadow-md';

  function NavLink({
    label,
    href,
    sectionId,
    onNavigate,
    className = '',
  }: NavItem & { onNavigate?: () => void; className?: string }) {
    const isActive = sectionId ? active === sectionId : pathname === href;

    // For section links, intercept click to smooth scroll when possible
    const handleClick = (e: React.MouseEvent) => {
      if (sectionId) {
        e.preventDefault();
        // Immediately set the active state for better UX
        setActive(sectionId);
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
