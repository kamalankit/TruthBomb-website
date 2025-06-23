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

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Enhanced mobile detection
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth <= 1024 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice, { passive: true });
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Conditional smooth scroll - only on desktop
  const { lenis } = useSmoothScroll({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: !isMobile, // Disable on mobile for better performance
    smoothTouch: false,
  });

  useEffect(() => {
    // Enhanced scroll-triggered animations with mobile optimization
    const initScrollAnimations = () => {
      // Clear existing animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Mobile-optimized animation settings
      const mobileSettings = {
        duration: isMobile ? 0.6 : 1,
        ease: isMobile ? "power2.out" : "power3.out",
        yOffset: isMobile ? 30 : 60,
        startPosition: isMobile ? "top 90%" : "top 85%",
        scale: isMobile ? 0.98 : 0.95
      };

      // Fade in animations
      gsap.utils.toArray('.scroll-fade-in').forEach((element: any) => {
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: mobileSettings.yOffset,
            scale: mobileSettings.scale
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: mobileSettings.duration,
            ease: mobileSettings.ease,
            scrollTrigger: {
              trigger: element,
              start: mobileSettings.startPosition,
              end: "bottom 15%",
              toggleActions: "play none none reverse",
              // Disable on mobile if reduced motion preferred
              disabled: isMobile && window.matchMedia('(prefers-reduced-motion: reduce)').matches
            }
          }
        );
      });

      // Scale in animations
      gsap.utils.toArray('.scroll-scale-in').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            scale: isMobile ? 0.95 : 0.8,
            rotation: isMobile ? 0 : -5
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: mobileSettings.duration * 1.2,
            ease: isMobile ? "power2.out" : "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: mobileSettings.startPosition,
              end: "bottom 20%",
              toggleActions: "play none none reverse",
              disabled: isMobile && window.matchMedia('(prefers-reduced-motion: reduce)').matches
            }
          }
        );
      });

      // Slide animations - simplified for mobile
      if (!isMobile) {
        gsap.utils.toArray('.scroll-slide-left').forEach((element: any) => {
          gsap.fromTo(element,
            {
              opacity: 0,
              x: -100
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });

        gsap.utils.toArray('.scroll-slide-right').forEach((element: any) => {
          gsap.fromTo(element,
            {
              opacity: 0,
              x: 100
            },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      } else {
        // Mobile: Convert slide animations to fade animations
        gsap.utils.toArray('.scroll-slide-left, .scroll-slide-right').forEach((element: any) => {
          gsap.fromTo(element,
            {
              opacity: 0,
              y: 20
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: element,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // Staggered children animations
      gsap.utils.toArray('.stagger-children').forEach((container: any) => {
        const children = container.children;
        if (children.length > 0) {
          gsap.fromTo(children,
            {
              opacity: 0,
              y: isMobile ? 20 : 50
            },
            {
              opacity: 1,
              y: 0,
              duration: mobileSettings.duration,
              stagger: isMobile ? 0.05 : 0.1,
              ease: mobileSettings.ease,
              scrollTrigger: {
                trigger: container,
                start: mobileSettings.startPosition,
                toggleActions: "play none none reverse",
                disabled: isMobile && window.matchMedia('(prefers-reduced-motion: reduce)').matches
              }
            }
          );
        }
      });

      // Parallax effects - Desktop only
      if (!isMobile && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.utils.toArray('.parallax-slow').forEach((element: any) => {
          gsap.to(element, {
            yPercent: -30,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });

        gsap.utils.toArray('.parallax-medium').forEach((element: any) => {
          gsap.to(element, {
            yPercent: -50,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });

        gsap.utils.toArray('.parallax-fast').forEach((element: any) => {
          gsap.to(element, {
            yPercent: -80,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          });
        });
      }

      // Pin sections - Desktop only
      if (!isMobile) {
        const pinSections = gsap.utils.toArray('.pin-section');
        pinSections.forEach((section: any) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false
          });
        });
      }

      // Refresh ScrollTrigger
      ScrollTrigger.refresh();
    };

    // Initialize animations after content is loaded
    const timer = setTimeout(() => {
      initScrollAnimations();
      setIsLoading(false);
    }, 100);

    // Mobile scroll snap setup
    const setupMobileScrollSnap = () => {
      if (isMobile && containerRef.current) {
        containerRef.current.classList.add('mobile-scroll-container');
        
        const sections = containerRef.current.querySelectorAll('section');
        sections.forEach(section => {
          section.classList.add('mobile-scroll-section');
        });
      } else if (containerRef.current) {
        containerRef.current.classList.remove('mobile-scroll-container');
        
        const sections = containerRef.current.querySelectorAll('section');
        sections.forEach(section => {
          section.classList.remove('mobile-scroll-section');
        });
      }
    };

    setupMobileScrollSnap();

    // Handle resize with debouncing
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        setupMobileScrollSnap();
        initScrollAnimations();
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Handle orientation change on mobile
    const handleOrientationChange = () => {
      if (isMobile) {
        setTimeout(() => {
          ScrollTrigger.refresh();
          setupMobileScrollSnap();
        }, 500);
      }
    };

    window.addEventListener('orientationchange', handleOrientationChange, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]);

  // Update ScrollTrigger when Lenis is ready (Desktop only)
  useEffect(() => {
    if (lenis && !isMobile) {
      lenis.on('scroll', ScrollTrigger.update);
      
      return () => {
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, [lenis, isMobile]);

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
        min-h-screen bg-soft-white text-deep-black overflow-x-hidden
        ${isMobile ? 'mobile-scroll-container' : ''}
        ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}
      `}
      style={{
        // Ensure proper mobile viewport
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
        className={`
          scroll-fade-in
          ${isMobile ? 'mobile-scroll-section mobile-safe-top' : ''}
        `}
      >
        <HeroSection />
      </section>

      {/* Philosophy Section */}
      <section 
        id="philosophy" 
        className={`
          scroll-scale-in
          ${isMobile ? 'mobile-scroll-section' : ''}
        `}
      >
        <PhilosophySection />
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className={`
          ${isMobile ? 'scroll-fade-in mobile-scroll-section' : 'scroll-slide-left'}
        `}
      >
        <FeaturesSection />
      </section>

      {/* Interface Showcase */}
      <section 
        id="interface-showcase" 
        className={`
          ${isMobile ? 'scroll-fade-in mobile-scroll-section' : 'scroll-slide-right'}
        `}
      >
        <InterfaceShowcase />
      </section>

      {/* Community Section */}
      <section 
        id="community" 
        className={`
          scroll-fade-in
          ${isMobile ? 'mobile-scroll-section' : ''}
        `}
      >
        <CommunitySection />
      </section>

      {/* Pricing Section */}
      <section 
        id="pricing" 
        className={`
          scroll-scale-in stagger-children
          ${isMobile ? 'mobile-scroll-section' : ''}
        `}
      >
        <PricingSection />
      </section>

      {/* Final CTA Section */}
      <section 
        id="cta" 
        className={`
          scroll-fade-in
          ${isMobile ? 'mobile-scroll-section mobile-safe-bottom' : ''}
        `}
      >
        <FinalCTASection />
      </section>

      {/* Solo Leveling Notification - Hidden on small mobile screens */}
      <div className="hidden sm:block">
        <SoloLevelingNotification />
      </div>

      {/* Floating QR Widget - Repositioned for mobile */}
      <div className={isMobile ? 'mobile-widget-container' : ''}>
        <FloatingQRWidget />
      </div>

      {/* Footer */}
      <footer className={`
        bg-warm-gray mobile-section scroll-fade-in
        ${isMobile ? 'mobile-safe-bottom' : ''}
      `}>
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

      {/* Loading indicator for mobile */}
      {isLoading && (
        <div className="fixed inset-0 bg-soft-white z-100 flex items-center justify-center">
          <div className="loading-shimmer w-16 h-16 rounded-lg bg-gray-200"></div>
        </div>
      )}
    </div>
  );
};

export default Index;