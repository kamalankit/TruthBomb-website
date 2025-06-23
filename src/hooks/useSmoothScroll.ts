import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollOptions {
  duration?: number;
  smooth?: boolean;
  disabled?: boolean;
}

export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
  const smoothScrollEnabled = useRef(false);
  
  const {
    duration = 1.2,
    smooth = true,
    disabled = false
  } = options;

  // Simple scroll to function using native smooth scrolling
  const scrollTo = useCallback((target: string | number, scrollOptions?: { offset?: number; duration?: number }) => {
    const offset = scrollOptions?.offset || -80;
    
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition + offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: smooth && !disabled ? 'smooth' : 'auto'
        });
      }
    } else {
      window.scrollTo({
        top: target,
        behavior: smooth && !disabled ? 'smooth' : 'auto'
      });
    }
  }, [smooth, disabled]);

  const scrollToTop = useCallback(() => {
    scrollTo(0);
  }, [scrollTo]);

  const scrollToSection = useCallback((sectionId: string) => {
    scrollTo(`#${sectionId}`);
  }, [scrollTo]);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    smoothScrollEnabled.current = smooth && !disabled && !prefersReducedMotion;

    // Set CSS scroll behavior
    if (smoothScrollEnabled.current) {
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      document.documentElement.style.scrollBehavior = 'auto';
    }

    // Cleanup
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, [smooth, disabled]);

  return {
    lenis: null, // Keep for compatibility but return null
    scrollTo,
    scrollToTop,
    scrollToSection,
  };
};

export default useSmoothScroll;