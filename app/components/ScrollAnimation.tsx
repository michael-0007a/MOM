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

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;

        if (isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          }, delay);
        } else if (!once && !isIntersecting) {
          setIsVisible(false);
        }
      },
      {
        threshold: triggerPoint,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element is fully visible
      }
    );

    observer.observe(element);

    // Handle parallax animation
    let rafId: number;
    if (animation === 'parallax') {
      const handleScroll = () => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const scrolled = window.scrollY;
        const rate = scrolled * parallaxSpeed;

        // Only apply parallax when element is in viewport
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
          element.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
      };

      const smoothParallax = () => {
        handleScroll();
        rafId = requestAnimationFrame(smoothParallax);
      };

      // Listen to Lenis scroll events if available, otherwise use native scroll
      if (window.lenis) {
        window.lenis.on('scroll', handleScroll);
      } else {
        window.addEventListener('scroll', handleScroll, { passive: true });
        smoothParallax();
      }

      return () => {
        observer.disconnect();
        if (window.lenis) {
          window.lenis.off('scroll', handleScroll);
        } else {
          window.removeEventListener('scroll', handleScroll);
          cancelAnimationFrame(rafId);
        }
      };
    }

    return () => observer.disconnect();
  }, [animation, delay, parallaxSpeed, triggerPoint, once, hasAnimated]);

  // Animation styles
  const getAnimationStyles = () => {
    const baseStyles = {
      transition: animation !== 'parallax' ? `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
      willChange: 'transform, opacity',
    };

    if (animation === 'parallax') {
      return {
        ...baseStyles,
        transition: 'none',
      };
    }

    if (!isVisible) {
      switch (animation) {
        case 'fadeUp':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translate3d(0, 40px, 0)',
          };
        case 'fadeDown':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translate3d(0, -40px, 0)',
          };
        case 'fadeLeft':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translate3d(-40px, 0, 0)',
          };
        case 'fadeRight':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translate3d(40px, 0, 0)',
          };
        case 'scale':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'scale3d(0.9, 0.9, 1)',
          };
        default:
          return baseStyles;
      }
    }

    // Visible state
    return {
      ...baseStyles,
      opacity: 1,
      transform: 'translate3d(0, 0, 0) scale3d(1, 1, 1)',
    };
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
