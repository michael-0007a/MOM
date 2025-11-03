'use client';

import React, { useEffect, useRef, useState } from 'react';

// Type declaration for Lenis
interface LenisInstance {
  on: (event: string, callback: (data: unknown) => void) => void;
  off: (event: string, callback: (data: unknown) => void) => void;
}

declare global {
  interface Window {
    lenis?: LenisInstance;
  }
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  /** Animation type */
  animation?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'parallax' | 'none';
  /** Animation delay in ms */
  delay?: number;
  /** Animation duration in ms */
  duration?: number;
  /** Parallax speed (only for parallax animation) - negative values move opposite to scroll */
  parallaxSpeed?: number;
  /** Trigger point as percentage of viewport (0-1) */
  triggerPoint?: number;
  /** Whether to animate only once or every time element enters viewport */
  once?: boolean;
}

/**
 * ScrollAnimation - Cinematic scroll-triggered animations
 *
 * Animation Types:
 * - fadeUp: Fade in while moving up
 * - fadeDown: Fade in while moving down
 * - fadeLeft: Fade in while moving from left
 * - fadeRight: Fade in while moving from right
 * - scale: Scale in animation
 * - parallax: Parallax movement (use parallaxSpeed to control)
 * - none: No animation, just intersection tracking
 */
export default function ScrollAnimation({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 800,
  parallaxSpeed = -0.5,
  triggerPoint = 0.1,
  once = true,
}: ScrollAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // track animation lifecycle
  const delayTimeoutRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const parallaxActiveRef = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Feature detection for reduced motion / mobile
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileOrCoarse = typeof window !== 'undefined' && window.matchMedia && (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(max-width: 768px)').matches);
    const disableParallax = animation === 'parallax' && (prefersReducedMotion || isMobileOrCoarse);

    // Helper to clean up parallax loop
    const stopParallax = () => {
      parallaxActiveRef.current = false;
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      if (window.lenis && handleLenisScroll) {
        window.lenis.off('scroll', handleLenisScroll);
      }
      // Reset transform if we disabled parallax
      if (animation === 'parallax') {
        element.style.transform = '';
      }
    };

    // Parallax updater
    const updateParallax = () => {
      if (!parallaxActiveRef.current || !element) return;
      const rect = element.getBoundingClientRect();
      // Only update when in viewport to avoid extra work
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        // Translate relative to total scroll for simplicity; cheap math
        const offset = window.scrollY * parallaxSpeed;
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    };

    // Lenis callback wrapper
    const handleLenisScroll = () => {
      updateParallax();
    };

    const startParallax = () => {
      if (disableParallax) return; // disabled on mobile/reduced motion
      if (parallaxActiveRef.current) return;
      parallaxActiveRef.current = true;

      if (window.lenis) {
        // Use Lenis scroll events for sync
        window.lenis.on('scroll', handleLenisScroll);
        // Do an initial update
        updateParallax();
      } else {
        const loop = () => {
          if (!parallaxActiveRef.current) return;
          updateParallax();
          rafIdRef.current = requestAnimationFrame(loop);
        };
        loop();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        // Reveal logic
        if (isIntersecting && (!once || !hasAnimated)) {
          // Debounced reveal with optional delay
          if (delayTimeoutRef.current != null) {
            clearTimeout(delayTimeoutRef.current);
          }
          delayTimeoutRef.current = window.setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
            // Unobserve immediately when once=true to avoid toggles/jitter
            if (once) {
              try { observer.unobserve(element); } catch {}
            }
          }, Math.max(0, delay));
        } else if (!once && !isIntersecting) {
          setIsVisible(false);
        }

        // Parallax start/stop tied to intersection visibility
        if (animation === 'parallax') {
          if (isIntersecting) {
            startParallax();
          } else {
            stopParallax();
          }
        }
      },
      {
        threshold: triggerPoint,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      try { observer.disconnect(); } catch {}
      if (delayTimeoutRef.current != null) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }
      stopParallax();
    };
  // We intentionally do not include hasAnimated in deps to avoid re-instantiating observer after once
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animation, delay, parallaxSpeed, triggerPoint, once]);

  // Animation styles
  const getAnimationStyles = () => {
    // Only apply will-change when we expect an animation to occur
    const applyWillChange = animation === 'parallax' || !isVisible;

    const baseStyles: React.CSSProperties = {
      transition: animation !== 'parallax' ? `opacity ${duration}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
      willChange: applyWillChange ? 'transform, opacity' : undefined,
    };

    if (animation === 'parallax') {
      return {
        ...baseStyles,
        transition: 'none',
      } as React.CSSProperties;
    }

    if (!isVisible) {
      switch (animation) {
        case 'fadeUp':
          return { ...baseStyles, opacity: 0, transform: 'translate3d(0, 40px, 0)' } as React.CSSProperties;
        case 'fadeDown':
          return { ...baseStyles, opacity: 0, transform: 'translate3d(0, -40px, 0)' } as React.CSSProperties;
        case 'fadeLeft':
          return { ...baseStyles, opacity: 0, transform: 'translate3d(-40px, 0, 0)' } as React.CSSProperties;
        case 'fadeRight':
          return { ...baseStyles, opacity: 0, transform: 'translate3d(40px, 0, 0)' } as React.CSSProperties;
        case 'scale':
          return { ...baseStyles, opacity: 0, transform: 'scale3d(0.9, 0.9, 1)' } as React.CSSProperties;
        default:
          return baseStyles;
      }
    }

    // Visible state
    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)'
    } as React.CSSProperties;
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={getAnimationStyles()}
    >
      {children}
    </div>
  );
}

/**
 * ParallaxContainer - Wrapper for multiple parallax elements
 */
export function ParallaxContainer({
  children,
  className = ''
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-visible ${className}`}>
      {children}
    </div>
  );
}

/**
 * SmoothReveal - Staggered animation for multiple children
 */
export function SmoothReveal({
  children,
  stagger = 100,
  className = '',
  animation = 'fadeUp'
}: {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  animation?: ScrollAnimationProps['animation'];
}) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <ScrollAnimation
          key={index}
          animation={animation}
          delay={index * stagger}
          once={true}
        >
          {child}
        </ScrollAnimation>
      ))}
    </div>
  );
}
