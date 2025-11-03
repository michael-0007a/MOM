'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

/**
 * SmoothScrollProvider - Ultra-smooth cinematic scrolling with Lenis
 *
 * Configuration Options:
 * - duration: How long scroll animations take (1.2 = smooth, 0.8 = snappier)
 * - easing: Easing function for scroll animations
 * - orientation: 'vertical' | 'horizontal' | 'both'
 * - gestureOrientation: 'vertical' | 'horizontal' | 'both'
 * - smoothWheel: Enable smooth wheel scrolling (true for desktop)
 * - wheelMultiplier: Wheel scroll speed multiplier (1 = normal, 0.5 = slower)
 * - touchMultiplier: Touch scroll speed multiplier
 * - infinite: Enable infinite scroll
 * - autoResize: Auto resize on window resize
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with optimized settings for cinematic feel
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const lenis = new Lenis({
      // Core scroll behavior
      duration: isTouch ? 0.9 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',

      // Smoothing settings
      smoothWheel: !isTouch, // disable wheel smoothing on touch to avoid jitter

      // Speed multipliers
      wheelMultiplier: 1,
      touchMultiplier: isTouch ? 1.2 : 2,

      // Performance optimizations
      autoResize: true,
      infinite: false,

      // Sync with browser's scroll restoration
      syncTouch: false,
      syncTouchLerp: 0.1,
    });

    lenisRef.current = lenis;

    // Animation loop for smooth scrolling
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle anchor links and hash navigation
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const link = target.closest('a') as HTMLAnchorElement | null;
      if (!link || !link.href) return;

      const url = new URL(link.href);
      // Check if it's a hash link on the same page
      if (url.pathname === window.location.pathname && url.hash) {
        e.preventDefault();
        const targetElement = document.querySelector(url.hash);
        if (targetElement) {
          const offset = 80; // Adjust based on your navbar height
          const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
          lenis.scrollTo(targetPosition, {
            duration: 1.2,
            easing: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
          });
        }
      }
    };

    // Add click listener for anchor links
    document.addEventListener('click', handleAnchorClick, { passive: false });

    // Handle browser back/forward navigation
    const handlePopState = () => {
      if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const offset = 80;
          const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
          lenis.scrollTo(targetPosition, { duration: 0 });
        }
      }
    };

    window.addEventListener('popstate', handlePopState, { passive: true } as AddEventListenerOptions);

    // Sync with navbar scroll spy
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      window.dispatchEvent(
        new CustomEvent('lenisScroll', {
          detail: { scrollY: scroll },
        })
      );
    });

    // Handle window resize
    const handleResize = () => {
      lenis.resize();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const applyReducedMotion = () => {
      if (mediaQuery.matches) {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    applyReducedMotion();
    const handleReducedMotion = () => applyReducedMotion();
    mediaQuery.addEventListener('change', handleReducedMotion);

    // Cleanup
    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick as EventListener);
      window.removeEventListener('popstate', handlePopState as EventListener);
      window.removeEventListener('resize', handleResize as EventListener);
      mediaQuery.removeEventListener('change', handleReducedMotion);
    };
  }, []);

  // Expose lenis instance for external access
  useEffect(() => {
    (window as unknown as { lenis?: Lenis | null }).lenis = lenisRef.current;
    return () => {
      delete (window as unknown as { lenis?: Lenis | null }).lenis;
    };
  }, []);

  return <>{children}</>;
}

/**
 * Hook to access Lenis instance from window
 */
export function useLenis() {
  return (typeof window !== 'undefined' && (window as unknown as { lenis?: Lenis | null }).lenis) || null;
}
