import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  scale?: boolean;
  opacity?: boolean;
  rotate?: boolean;
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  disabled?: boolean; // Add option to disable completely
}

export const useParallaxSection = (options: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || options.disabled) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth <= 1024 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Disable heavy animations on mobile or when reduced motion is preferred
    if (prefersReducedMotion || isMobile) {
      return;
    }

    const {
      speed = 0.3, // Reduced from 0.5
      direction = 'up',
      scale = false,
      opacity = false,
      rotate = false,
      trigger,
      start = 'top bottom',
      end = 'bottom top',
      scrub = 1, // Use lighter scrub value
    } = options;

    // Simplified animation object - only essential properties
    const yPercent = direction === 'up' ? -50 * speed : 50 * speed; // Reduced movement range
    const animation: any = { yPercent };

    // Only add complex properties if explicitly requested
    if (scale) animation.scale = 1 + speed * 0.1; // Reduced scale effect
    if (opacity) animation.opacity = 1 - speed * 0.2; // Reduced opacity effect
    if (rotate) animation.rotation = speed * 5; // Reduced rotation

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger || element,
      start,
      end,
      scrub,
      animation: gsap.to(element, {
        ...animation,
        ease: 'none',
        overwrite: 'auto', // Prevent animation conflicts
      }),
      invalidateOnRefresh: true,
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [options]);

  return elementRef;
};

export default useParallaxSection;