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
}

export const useParallaxSection = (options: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      speed = 0.5,
      direction = 'up',
      scale = false,
      opacity = false,
      rotate = false,
      trigger,
      start = 'top bottom',
      end = 'bottom top',
      scrub = true,
    } = options;

    const yPercent = direction === 'up' ? -100 * speed : 100 * speed;

    const animation: any = {
      yPercent,
    };

    if (scale) {
      animation.scale = 1 + speed * 0.2;
    }

    if (opacity) {
      animation.opacity = 1 - speed * 0.3;
    }

    if (rotate) {
      animation.rotation = speed * 10;
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: trigger || element,
      start,
      end,
      scrub,
      animation: gsap.to(element, {
        ...animation,
        ease: 'none',
      }),
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [options]);

  return elementRef;
};

export default useParallaxSection;