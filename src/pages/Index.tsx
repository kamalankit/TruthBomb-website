import React, { useEffect, useRef } from 'react';
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
  const { lenis } = useSmoothScroll({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false, // Better mobile performance
  });

  useEffect(() => {
    // Enhanced scroll-triggered animations
    const initScrollAnimations = () => {
      // Fade in animations
      gsap.utils.toArray('.scroll-fade-in').forEach((element: any) => {
        gsap.fromTo(element, 
          { 
            opacity: 0, 
            y: 60,
            scale: 0.95
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Scale in animations
      gsap.utils.toArray('.scroll-scale-in').forEach((element: any) => {
        gsap.fromTo(element,
          {
            opacity: 0,
            scale: 0.8,
            rotation: -5
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Slide animations
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

      // Staggered children animations
      gsap.utils.toArray('.stagger-children').forEach((container: any) => {
        const children = container.children;
        gsap.fromTo(children,
          {
            opacity: 0,
            y: 50
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Parallax effects for backgrounds
      gsap.utils.toArray('.parallax-slow').forEach((element: any) => {
        gsap.to(element, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
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
            scrub: true
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
            scrub: true
          }
        });
      });

      // Pin sections on desktop
      if (window.innerWidth > 1024) {
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
    };

    // Initialize animations after a short delay
    const timer = setTimeout(initScrollAnimations, 100);

    // Mobile scroll snap setup
    const setupMobileScrollSnap = () => {
      if (window.innerWidth <= 1024 && containerRef.current) {
        containerRef.current.classList.add('mobile-scroll-container');
        
        const sections = containerRef.current.querySelectorAll('section');
        sections.forEach(section => {
          section.classList.add('mobile-scroll-section');
        });
      }
    };

    setupMobileScrollSnap();

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
      setupMobileScrollSnap();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Update ScrollTrigger when Lenis is ready
  useEffect(() => {
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      
      return () => {
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, [lenis]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-soft-white text-deep-black overflow-x-hidden"
    >
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="scroll-fade-in">
        <HeroSection />
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="scroll-scale-in">
        <PhilosophySection />
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-slide-left">
        <FeaturesSection />
      </section>

      {/* Interface Showcase */}
      <section id="interface-showcase" className="scroll-slide-right">
        <InterfaceShowcase />
      </section>

      {/* Community Section */}
      <section id="community" className="scroll-fade-in">
        <CommunitySection />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="scroll-scale-in stagger-children">
        <PricingSection />
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="scroll-fade-in">
        <FinalCTASection />
      </section>

      {/* Solo Leveling Notification */}
      <SoloLevelingNotification />

      {/* Floating QR Widget */}
      <FloatingQRWidget />

      {/* Footer */}
      <footer className="bg-warm-gray mobile-section scroll-fade-in">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <span className="text-lg lg:text-xl font-bold text-deep-black">Truth Bomb</span>
            </div>
            
            <div className="flex flex-wrap justify-center space-x-6 text-slate-gray text-sm lg:text-base">
              <a href="#" className="hover:text-deep-black transition-colors focus-ring">Privacy</a>
              <a href="#" className="hover:text-deep-black transition-colors focus-ring">Terms</a>
              <a href="#" className="hover:text-deep-black transition-colors focus-ring">Support</a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-slate-gray text-sm lg:text-base">
              © 2024 Truth Bomb. Designed with love for mindful growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;