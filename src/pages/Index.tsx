import React, { useEffect } from 'react';
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

const Index = () => {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    let isScrolling = false;

    // Apple-style scrollbar visibility
    const showScrollbar = () => {
      document.body.classList.add('scrolling');
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 1000);
    };

    // Enhanced smooth scroll function
    const smoothScrollTo = (targetY: number, duration: number = 800) => {
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      let startTime: number | null = null;

      // Add smooth scrolling class to hide scrollbar
      document.body.classList.add('smooth-scrolling');

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Apple-style easing function
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startY + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          document.body.classList.remove('smooth-scrolling');
        }
      };

      requestAnimationFrame(animation);
    };

    // Enhanced scroll observer
    const observerOptions = {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      rootMargin: '-10% 0px -10% 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;
        
        if (entry.isIntersecting && ratio > 0.1) {
          target.classList.add('in-view');
          
          // Stagger child animations with reduced delay
          const children = target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              (child as HTMLElement).style.opacity = '1';
              (child as HTMLElement).style.transform = 'translateY(0)';
            }, index * 60);
          });
        }
      });
    }, observerOptions);

    // Optimized scroll handler
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          showScrollbar();
          
          const scrolled = window.pageYOffset;
          const viewHeight = window.innerHeight;

          // Reduced parallax effects for smoother performance
          const parallaxElements = document.querySelectorAll('.parallax-bg');
          parallaxElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.05);
            const yPos = -(scrolled * speed);
            (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
          });

          // Subtle floating animations
          const floatingElements = document.querySelectorAll('.floating-bg');
          floatingElements.forEach((element, index) => {
            const speed = 0.01 + (index * 0.005);
            const yPos = Math.sin(scrolled * 0.0005 + index) * 10;
            (element as HTMLElement).style.transform = 
              `translate3d(0, ${scrolled * speed + yPos}px, 0)`;
          });

          // Progressive reveal animations
          const revealElements = document.querySelectorAll('.reveal-on-scroll');
          revealElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            
            if (elementTop < viewHeight * 0.85) {
              (element as HTMLElement).classList.add('revealed');
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    // Smooth navigation for anchor links
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = target.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          const targetY = targetElement.offsetTop - 80; // Account for fixed nav
          smoothScrollTo(targetY, 1000);
        }
      }
    };

    // Initialize observers and event listeners
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-up, .scale-in');
    animatedElements.forEach((el) => scrollObserver.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleAnchorClick);

    // Add scroll snap to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('scroll-snap-section');
    });

    // Cleanup
    return () => {
      scrollObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-soft-white text-deep-black overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="scroll-snap-section">
        <HeroSection />
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="scroll-snap-section">
        <PhilosophySection />
      </section>

      {/* Features Section */}
      <section id="features" className="scroll-snap-section">
        <FeaturesSection />
      </section>

      {/* Interface Showcase */}
      <section id="interface-showcase" className="scroll-snap-section">
        <InterfaceShowcase />
      </section>

      {/* Community Section */}
      <section id="community" className="scroll-snap-section">
        <CommunitySection />
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="scroll-snap-section">
        <PricingSection />
      </section>

      {/* Final CTA Section */}
      <section id="cta" className="scroll-snap-section">
        <FinalCTASection />
      </section>

      {/* Solo Leveling Notification */}
      <SoloLevelingNotification />

      {/* Floating QR Widget */}
      <FloatingQRWidget />

      {/* Footer */}
      <footer className="bg-warm-gray py-8 animate-on-scroll">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-lg font-semibold text-deep-black">Truth Bomb</span>
            </div>
            
            <div className="flex space-x-6 text-slate-gray text-sm">
              <a href="#" className="hover:text-deep-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-deep-black transition-colors">Terms</a>
              <a href="#" className="hover:text-deep-black transition-colors">Support</a>
            </div>
          </div>
          
          <div className="text-center mt-6 pt-6 border-t border-gray-200">
            <p className="text-slate-gray text-sm">
              © 2024 Truth Bomb. Designed with love for mindful growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;