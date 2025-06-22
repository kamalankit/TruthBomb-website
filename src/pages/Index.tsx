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
    // Enhanced Apple-style scroll animation system
    let ticking = false;

    const observerOptions = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '-5% 0px -5% 0px'
    };

    // Smooth scroll observer for fade-in animations
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;
        
        if (entry.isIntersecting && ratio > 0.1) {
          target.classList.add('in-view');
          
          // Stagger child animations
          const children = target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              (child as HTMLElement).style.opacity = '1';
              (child as HTMLElement).style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    }, observerOptions);

    // Global scroll handler for parallax and smooth effects
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const viewHeight = window.innerHeight;
          const docHeight = document.documentElement.scrollHeight;
          const scrollProgress = scrolled / (docHeight - viewHeight);

          // Smooth parallax for background elements
          const parallaxElements = document.querySelectorAll('.parallax-bg');
          parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
          });

          // Floating background animations
          const floatingElements = document.querySelectorAll('.floating-bg');
          floatingElements.forEach((element, index) => {
            const speed = 0.02 + (index * 0.01);
            const rotation = scrolled * speed * 0.1;
            const yPos = Math.sin(scrolled * 0.001 + index) * 20;
            (element as HTMLElement).style.transform = 
              `translate3d(0, ${scrolled * speed + yPos}px, 0) rotate(${rotation}deg)`;
          });

          // Sticky parallax elements
          const stickyElements = document.querySelectorAll('.sticky-parallax');
          stickyElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            // Calculate if element is in viewport
            if (elementTop < windowHeight && elementTop + elementHeight > 0) {
              const progress = Math.max(0, Math.min(1, (windowHeight - elementTop) / (windowHeight + elementHeight)));
              const translateY = (progress - 0.5) * 50;
              (element as HTMLElement).style.transform = `translate3d(0, ${translateY}px, 0)`;
            }
          });

          // Progressive reveal animations
          const revealElements = document.querySelectorAll('.reveal-on-scroll');
          revealElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
              (element as HTMLElement).classList.add('revealed');
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    // Smooth scroll behavior for the entire page
    const smoothScrollTo = (target: number, duration: number = 1000) => {
      const start = window.pageYOffset;
      const distance = target - start;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const ease = 1 - Math.pow(1 - progress, 3);
        
        window.scrollTo(0, start + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Initialize observers and event listeners
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .fade-in-up, .scale-in');
    animatedElements.forEach((el) => scrollObserver.observe(el));

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Enhanced CSS for smooth animations
    const style = document.createElement('style');
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(60px);
        transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
      }
      
      .animate-on-scroll.in-view {
        opacity: 1;
        transform: translateY(0);
      }
      
      .fade-in-up {
        opacity: 0;
        transform: translateY(40px);
        transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
      }
      
      .fade-in-up.in-view {
        opacity: 1;
        transform: translateY(0);
      }
      
      .scale-in {
        opacity: 0;
        transform: scale(0.9);
        transition: all 1s cubic-bezier(0.25, 1, 0.5, 1);
      }
      
      .scale-in.in-view {
        opacity: 1;
        transform: scale(1);
      }
      
      .stagger-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 1, 0.5, 1);
      }
      
      .reveal-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease-out;
      }
      
      .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
      }
      
      .parallax-bg {
        will-change: transform;
      }
      
      .floating-bg {
        will-change: transform;
      }
      
      .sticky-parallax {
        will-change: transform;
      }
      
      /* Smooth scrolling for the entire page */
      html {
        scroll-behavior: smooth;
      }
      
      /* Enhanced section transitions */
      section {
        position: relative;
        z-index: 1;
      }
      
      /* Improved mobile performance */
      @media (max-width: 768px) {
        .parallax-bg,
        .floating-bg {
          transform: none !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      scrollObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="min-h-screen bg-soft-white text-deep-black overflow-x-hidden">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Interface Showcase */}
      <InterfaceShowcase />

      {/* Community Section */}
      <CommunitySection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Solo Leveling Notification */}
      <SoloLevelingNotification />

      {/* Floating QR Widget */}
      <FloatingQRWidget />

      {/* Footer */}
      <footer className="bg-warm-gray py-12 animate-on-scroll">
        <div className="container-width">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-2xl font-bold text-deep-black">Truth Bomb</span>
            </div>
            
            <div className="flex space-x-6 text-slate-gray">
              <a href="#" className="hover:text-deep-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-deep-black transition-colors">Terms</a>
              <a href="#" className="hover:text-deep-black transition-colors">Support</a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-200">
            <p className="text-slate-gray">
              © 2024 Truth Bomb. Designed with love for mindful growth.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;