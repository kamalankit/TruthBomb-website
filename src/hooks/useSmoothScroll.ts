import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  smoothTouch?: boolean;
  touchMultiplier?: number;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>();

  const defaultOptions: SmoothScrollOptions = {
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple-style easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false, // Disable on touch for better mobile performance
    touchMultiplier: 2,
    ...options,
  };

  const scrollTo = useCallback((target: string | number, options?: { offset?: number; duration?: number }) => {
    if (!lenisRef.current) return;

    const offset = options?.offset || -80; // Account for fixed nav
    const duration = options?.duration || 1.2;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        lenisRef.current.scrollTo(element, {
          offset,
          duration,
          easing: defaultOptions.easing,
        });
      }
    } else {
      lenisRef.current.scrollTo(target, {
        duration,
        easing: defaultOptions.easing,
      });
    }
  }, [defaultOptions.easing]);

  const scrollToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  const scrollToSection = useCallback((sectionId: string) => {
    scrollTo(`#${sectionId}`);
  }, [scrollTo]);

  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis(defaultOptions);

    // Animation frame loop
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    // GSAP ScrollTrigger integration
    lenisRef.current.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Handle reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (lenisRef.current) {
        if (mediaQuery.matches) {
          lenisRef.current.options.smooth = false;
        } else {
          lenisRef.current.options.smooth = defaultOptions.smooth || true;
        }
      }
    };

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [defaultOptions.smooth]);

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToSection,
  };
};

export default useSmoothScroll;