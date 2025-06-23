import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PhilosophySection from '../components/PhilosophySection';
import FeaturesSection from '../components/FeaturesSection';
import InterfaceShowcase from '../components/InterfaceShowcase';
import CommunitySection from '../components/CommunitySection';
import PricingSection from '../components/PricingSection';
import FinalCTASection from '../components/FinalCTASection';
import FloatingQRWidget from '../components/FloatingQRWidget';
import SoloLevelingNotification from '../components/SoloLevelingNotification';
import useSmoothScroll from '../hooks/useSmoothScroll';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Performance optimization constants
const MOBILE_THRESHOLD = 1024;
const ANIMATION_DELAY = 150;
const RESIZE_DEBOUNCE = 200;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Enhanced mobile and performance detection
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= MOBILE_THRESHOLD || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      setIsMobile(mobile);
      setPrefersReducedMotion(reducedMotion);
    };
    
    checkDevice();
    
    const debouncedResize = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(checkDevice, RESIZE_DEBOUNCE);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(window.resizeTimer);
    };
  }, []);

  // Simplified smooth scroll - only on desktop and when motion is allowed
  const shouldUseSmoothing = !isMobile && !prefersReducedMotion;
  const { lenis } = useSmoothScroll({
    duration: shouldUseSmoothing ? 1.2 : 0,
    easing: shouldUseSmoothing ? (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) : undefined,
    smooth: shouldUseSmoothing,
    smoothTouch: false,
  });

  useEffect(() => {
    // Minimal, performance-optimized animations
    const initScrollAnimations = () => {
      // Clear existing animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Skip heavy animations on mobile or when reduced motion is preferred
      if (isMobile || prefersReducedMotion) {
        // Simple fade-in for accessibility
        gsap.utils.toArray('.scroll-fade-in').forEach((element: any) => {
          gsap.fromTo(element, 
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 95%",
                toggleActions: "play none none none",
              }
            }
          );
        });
        return;
      }

      // Desktop-only optimized animations
      const settings = {
        duration: 0.8, // Reduced from 1
        ease: "power2.out", // Simpler easing
        yOffset: 40, // Reduced from 60
        startPosition: "top 90%", // Later trigger
        stagger: 0.08, // Reduced stagger
      };

      // Basic fade animations - most performant
      gsap.utils.toArray('.scroll-fade-in').forEach((element: any) => {
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: settings.yOffset,
          },
          {
            opacity: 1,
            y: 0,
            duration: settings.duration,
            ease: settings.ease,
            scrollTrigger: {
              trigger: element,
              start: settings.startPosition,
              toggleActions: "play none none none", // Simplified - no reverse
            }
          }
        );
      });

      // Scale animations - only for key elements
      gsap.utils.toArray('.scroll-scale-in').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            scale: 0.95, // Less dramatic scale
          },
          {
            opacity: 1,
            scale: 1,
            duration: settings.duration,
            ease: settings.ease,
            scrollTrigger: {
              trigger: element,
              start: settings.startPosition,
              toggleActions: "play none none none",
            }
          }
        );
      });

      // Simplified slide animations
      gsap.utils.toArray('.scroll-slide-left').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            x: -40, // Reduced from -100
          },
          {
            opacity: 1,
            x: 0,
            duration: settings.duration,
            ease: settings.ease,
            scrollTrigger: {
              trigger: element,
              start: settings.startPosition,
              toggleActions: "play none none none",
            }
          }
        );
      });

      gsap.utils.toArray('.scroll-slide-right').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            x: 40, // Reduced from 100
          },
          {
            opacity: 1,
            x: 0,
            duration: settings.duration,
            ease: settings.ease,
            scrollTrigger: {
              trigger: element,
              start: settings.startPosition,
              toggleActions: "play none none none",
            }
          }
        );
      });

      // Staggered animations - simplified
      gsap.utils.toArray('.stagger-children').forEach((container: any) => {
        const children = container.children;
        if (children.length > 0) {
          gsap.fromTo(children,
            {
              opacity: 0,
              y: 20, // Reduced movement
            },
            {
              opacity: 1,
              y: 0,
              duration: settings.duration,
              stagger: settings.stagger,
              ease: settings.ease,
              scrollTrigger: {
                trigger: container,
                start: settings.startPosition,
                toggleActions: "play none none none",
              }
            }
          );
        }
      });

      // Remove heavy parallax effects entirely - they cause the most lag
      // Only keep very subtle effects for hero elements if needed
      gsap.utils.toArray('.parallax-light').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -15, // Much lighter effect
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 2, // Heavier scrub for smoothness
          }
        });
      });

      // Remove pin sections on mobile - they cause layout issues
      // Keep simple version for desktop only
      ScrollTrigger.refresh();
    };

    // Delay initialization to prevent layout shift
    const timer = setTimeout(() => {
      initScrollAnimations();
      setIsLoading(false);
    }, ANIMATION_DELAY);

    // Simplified resize handler
    const handleResize = () => {
      clearTimeout(window.animationTimer);
      window.animationTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, RESIZE_DEBOUNCE);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearTimeout(window.animationTimer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile, prefersReducedMotion]);

  // Update ScrollTrigger when Lenis is ready (Desktop only)
  useEffect(() => {
    if (lenis && shouldUseSmoothing) {
      lenis.on('scroll', ScrollTrigger.update);
      
      return () => {
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, [lenis, shouldUseSmoothing]);

  // Handle initial loading
  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`
        min-h-screen bg-soft-white text-deep-black overflow-x-hidden overflow-hidden
        ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}
      `}
      style={{
        minHeight: isMobile ? '100vh' : 'auto',
        width: '100%',
        position: 'relative'
      }}
    >
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section 
        id="home" 
        className="scroll-fade-in"
      >
        <HeroSection />
      </section>

      {/* Philosophy Section - Remove heavy animations class */}
      <section 
        id="philosophy" 
        className="scroll-fade-in"
      >
        <PhilosophySection />
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className={isMobile ? 'scroll-fade-in' : 'scroll-slide-left'}
      >
        <FeaturesSection />
      </section>

      {/* Interface Showcase */}
      <section 
        id="interface-showcase" 
        className={isMobile ? 'scroll-fade-in' : 'scroll-slide-right'}
      >
        <InterfaceShowcase />
      </section>

      {/* Community Section */}
      <section 
        id="community" 
        className="scroll-fade-in"
      >
        <CommunitySection />
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing" 
        className="scroll-scale-in stagger-children"
      >
        <PricingSection />
      </section>

      {/* Final CTA Section */}
      <section 
        id="cta" 
        className="scroll-fade-in"
      >
        <FinalCTASection />
      </section>

      {/* Solo Leveling Notification - Hidden on small mobile screens */}
      <div className="hidden sm:block">
        <SoloLevelingNotification />
      </div>

      {/* Floating QR Widget */}
      <FloatingQRWidget />

      {/* Footer */}
      <footer className="bg-warm-gray scroll-fade-in">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <span className="text-lg lg:text-xl font-bold text-deep-black">Truth Bomb</span>
              <p className="text-sm text-slate-gray mt-1 md:hidden">
                Designed with love for mindful growth
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-slate-gray text-sm lg:text-base">
              <a 
                href="#" 
                className="hover:text-deep-black transition-colors focus-ring touch-target"
                aria-label="Privacy Policy"
              >
                Privacy
              </a>
              <a 
                href="#" 
                className="hover:text-deep-black transition-colors focus-ring touch-target"
                aria-label="Terms of Service"
              >
                Terms
              </a>
              <a 
                href="#" 
                className="hover:text-deep-black transition-colors focus-ring touch-target"
                aria-label="Support"
              >
                Support
              </a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-slate-gray text-sm lg:text-base hidden md:block">
              © 2024 Truth Bomb. Designed with love for mindful growth.
            </p>
            <p className="text-slate-gray text-xs md:hidden">
              © 2024 Truth Bomb
            </p>
          </div>
        </div>
      </footer>

      {/* Loading indicator */}
      {isLoading && (
        <div className="fixed inset-0 bg-soft-white z-100 flex items-center justify-center">
          <div className="w-16 h-16 rounded-lg bg-gray-200 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default Index;