'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Phone as PhoneIcon, Store as StoreIcon, Building2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// Minimal Lenis type to avoid any
type LenisLike = { scrollTo: (t: HTMLElement | number, opts?: { duration?: number; offset?: number }) => void };

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
  const bottomBarRef = useRef<HTMLDivElement | null>(null);

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

  // Initialize active from hash on mount and on route change
  useEffect(() => {
    setMobileOpen(false);
    if (typeof window !== 'undefined') {
      if (isHome) {
        const hash = window.location.hash.replace('#', '');
        setActive(hash || 'home');
      } else {
        setActive('');
      }
    }
  }, [pathname, isHome]);

  // Close mobile menu with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  // Scroll: toggle scrolled state (minimal work to avoid jank)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy via IntersectionObserver (desktop only to avoid mobile re-renders)
  useEffect(() => {
    const isDesktop = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    if (!isHome || !isDesktop) return;

    const sectionIds = links.map(l => l.sectionId).filter((v): v is string => Boolean(v));
    const observer = new IntersectionObserver(
      entries => {
        let best: { id: string; ratio: number } | null = null;
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          const ratio = entry.intersectionRatio;
          if (ratio > 0.15 && (!best || ratio > best.ratio)) best = { id, ratio };
        }
        if (best) setActive(best.id);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] }
    );

    const els = sectionIds.map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome, links]);

  // Prevent background scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) document.body.classList.add('overflow-hidden');
    else document.body.classList.remove('overflow-hidden');
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen]);

  // Ensure page content bottom padding accommodates mobile bottom nav
  useEffect(() => {
    const apply = () => {
      const isMobile = window.matchMedia('(max-width: 1023.98px)').matches;
      if (isMobile) {
        const h = bottomBarRef.current?.offsetHeight || 0;
        document.body.style.paddingBottom = h ? `${h}px` : '64px';
      } else {
        document.body.style.paddingBottom = '';
      }
    };
    apply();
    window.addEventListener('resize', apply);
    window.addEventListener('orientationchange', apply);
    return () => {
      window.removeEventListener('resize', apply);
      window.removeEventListener('orientationchange', apply);
      document.body.style.paddingBottom = '';
    };
  }, []);

  const getHeaderOffset = () => {
    const isLg = typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    if (!isLg) return 0;
    const header = headerRef.current;
    if (!header) return 0;
    const rect = header.getBoundingClientRect();
    return Math.ceil(rect.height) + 1;
  };

  const smoothScrollTo = (hashHref: string) => {
    if (!hashHref.startsWith('/#')) return;
    const id = hashHref.replace('/#', '');
    const el = document.getElementById(id);
    if (!el) {
      if (pathname !== '/') window.location.href = hashHref;
      return;
    }
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 1023.98px)').matches;

    // Use Lenis if present for consistent behavior with SmoothScrollProvider
    const lenis = (window as unknown as { lenis?: LenisLike }).lenis;
    if (lenis) {
      const offset = isMobile ? 0 : -getHeaderOffset();
      lenis.scrollTo(el, { duration: prefersReduced ? 0 : 1.0, offset });
      return;
    }

    if (isMobile) {
      // On mobile (bottom nav), align the section's top exactly to viewport top
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    } else {
      // Desktop: subtract fixed header height
      const y = el.offsetTop - getHeaderOffset();
      window.scrollTo({ top: Math.max(0, y), behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  // Visual styles
  // Force transparent on mobile until scrolled; opaque on lg+
  const mobileBg = scrolled
    ? 'bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60 ring-1 ring-black/5'
    : 'bg-transparent';
  const baseBg = `${mobileBg} lg:bg-white lg:shadow-md`;

  function NavLink({ label, href, sectionId, onNavigate, className = '' }: NavItem & { onNavigate?: () => void; className?: string }) {
    const isActive = sectionId ? active === sectionId : pathname === href;
    const onClick = (e: React.MouseEvent) => {
      if (sectionId) {
        e.preventDefault();
        setActive(sectionId);
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
        onClick={onClick}
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
  }

  function MobileTabButton({ label, icon: Icon, href, sectionId, className = '' }: { label: string; icon: LucideIcon; href: string; sectionId?: string; className?: string }) {
    const pathname = usePathname();
    const isActive = sectionId ? false : pathname === href;
    const onClick = (e: React.MouseEvent) => {
      if (sectionId) {
        e.preventDefault();
        smoothScrollTo(href);
      }
    };
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`w-full flex flex-col items-center justify-center gap-1 px-2.5 py-2 rounded-2xl text-[11px] font-medium transition-colors ${
          isActive ? 'text-[#2b91cb]' : 'text-gray-600 hover:text-[#2b91cb]'
        } ${className}`}
        aria-current={isActive ? 'page' : undefined}
      >
        <Icon className={`h-6 w-6 ${isActive ? 'text-[#2b91cb]' : 'text-gray-600'}`} />
        <span className="leading-tight">{label}</span>
      </Link>
    );
  }

  return (
    <>
      {/* Desktop header */}
      <header ref={(el) => { headerRef.current = el; }} className={`fixed top-0 left-0 right-0 z-[1000] hidden lg:block ${baseBg}`} style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8" aria-label="Primary">
          <div className="h-14 md:h-20 flex items-center justify-between gap-2 md:gap-3">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="Makers of Milkshakes - Home">
              <Image src="/logo.png" alt="Makers of Milkshakes Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105" priority />
              <span className="hidden md:inline text-lg syne-bold text-[#2b91cb]">Makers of Milkshakes</span>
            </Link>

            {/* Links */}
            <div className="hidden lg:flex items-center gap-1">
              {links.map(l => (
                <NavLink key={l.label} {...l} />
              ))}
            </div>

            {/* CTA */}
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
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed inset-x-0 bottom-0 z-[999]">
        <div className="relative max-w-7xl mx-auto px-4">
          <div ref={(el) => { bottomBarRef.current = el; }} className="h-14 rounded-2xl bg-white shadow-md ring-1 ring-black/10 grid grid-cols-5 gap-0 px-3 items-center">
            <MobileTabButton label="Home" icon={Home} href="/#home" sectionId="home" />
            <MobileTabButton label="Menu" icon={BookOpen} href="/#menu" sectionId="menu" />
            <div aria-hidden className="w-full" />
            <MobileTabButton label="Stores" icon={StoreIcon} href="/store-locator" />
            <MobileTabButton label="Contact" icon={PhoneIcon} href="/contact" />
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
            <Link
              href="/#franchise"
              onClick={e => {
                if (isHome) {
                  e.preventDefault();
                  smoothScrollTo('/#franchise');
                }
              }}
              className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#2b91cb] text-white shadow-md ring-4 ring-white hover:bg-[#1e7bb8] transition-colors"
              aria-label="Franchise With Us"
            >
              <Building2 className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </>
  );
}
