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
    const lenis = new Lenis({
      // Core scroll behavior
      duration: 1.2, // Smooth but not too floaty (adjust: 0.8-2.0)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for natural feel
      orientation: 'vertical',
      gestureOrientation: 'vertical',

      // Smoothing settings
      smoothWheel: true, // Enable smooth wheel scrolling on desktop

      // Speed multipliers (adjust for scroll speed)
      wheelMultiplier: 1, // Normal wheel speed (adjust: 0.5-2.0)
      touchMultiplier: 2, // Touch speed (adjust: 1.0-3.0)

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
          // Smooth scroll to target with offset for navbar
          const offset = 80; // Adjust based on your navbar height
          const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
          lenis.scrollTo(targetPosition, {
            duration: 1.5, // Slightly longer for intentional navigation
            easing: (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
          });
        }
      }
    };

    // Add click listener for anchor links
    document.addEventListener('click', handleAnchorClick);

    // Handle browser back/forward navigation
    const handlePopState = () => {
      if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          const offset = 80;
          const targetPosition = (targetElement as HTMLElement).offsetTop - offset;
          lenis.scrollTo(targetPosition, { duration: 0 }); // Instant for browser navigation
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Sync with navbar scroll spy
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      // Dispatch custom event for navbar to listen to
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
    window.addEventListener('resize', handleResize);

    // Handle reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleReducedMotion = (e: MediaQueryListEvent) => {
      if (e.matches) {
        // Disable smooth scrolling for users who prefer reduced motion
        lenis.destroy();
      } else {
        // Re-enable if user changes preference
        lenis.start();
      }
    };

    if (mediaQuery.matches) {
      lenis.destroy();
    }

    mediaQuery.addEventListener('change', handleReducedMotion);

    // Cleanup
    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', handleResize);
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
