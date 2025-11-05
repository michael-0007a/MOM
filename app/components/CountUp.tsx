'use client';

import { useCallback, useEffect, useRef } from 'react';

type CountUpProps = {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number; // seconds
  duration?: number; // seconds
  className?: string;
  startWhen?: boolean; // start when in view
  separator?: string; // thousands separator
};

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2.8,
  className = '',
  startWhen = true,
  separator = ''
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  // Basic formatter with optional thousands separator
  const format = useCallback((n: number) => {
    if (!separator) return String(n);
    // Use locale formatting then replace comma with custom separator
    return Intl.NumberFormat('en-US').format(n).replace(/,/g, separator);
  }, [separator]);

  // Ease-out cubic for a smoother slow finish
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = typeof window !== 'undefined'
      && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set initial text content
    const initial = direction === 'down' ? to : from;
    el.textContent = format(initial);

    if (prefersReducedMotion) {
      // If reduced motion, jump directly after the delay
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        el.textContent = format(direction === 'down' ? from : to);
      }, Math.max(0, delay * 1000));
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }

    const start = () => {
      if (startedRef.current || !startWhen) return;
      startedRef.current = true;

      const startVal = direction === 'down' ? to : from;
      const endVal = direction === 'down' ? from : to;
      const totalChange = endVal - startVal;
      const startTime = performance.now() + Math.max(0, delay * 1000);
      const totalDuration = Math.max(0.2, duration) * 1000; // clamp

      const loop = (now: number) => {
        if (!ref.current) return;
        // Wait for delay
        if (now < startTime) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }
        const t = Math.min(1, (now - startTime) / totalDuration);
        const eased = easeOutCubic(t);
        const value = Math.round(startVal + totalChange * eased);
        ref.current.textContent = format(value);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(loop);
        }
      };

      rafRef.current = requestAnimationFrame(loop);
    };

    // Start when in view using IntersectionObserver
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          try { observer.unobserve(entry.target); } catch {}
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(el);

    return () => {
      try { observer.disconnect(); } catch {}
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current != null) clearTimeout(timeoutRef.current);
    };
  }, [to, from, direction, delay, duration, startWhen, format]);

  return <span ref={ref} className={className} />;
}
