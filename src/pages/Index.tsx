
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
    // Apple-style scroll animation system
    const observerOptions = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -10% 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target as HTMLElement;
        const ratio = entry.intersectionRatio;
        
        // Smooth fade-in with upward movement
        if (entry.isIntersecting) {
          if (target.classList.contains('animate-on-scroll')) {
            target.style.opacity = Math.min(ratio * 2, 1).toString();
            target.style.transform = `translateY(${Math.max(30 - (ratio * 30), 0)}px)`;
            
            if (ratio > 0.3) {
              target.classList.add('in-view');
            }
          }
          
          // Parallax effect for backgrounds
          if (target.classList.contains('parallax-bg')) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.1;
            target.style.transform = `translateY(${rate}px)`;
          }
          
          // Scale animation for mockups
          if (target.classList.contains('scale-on-scroll')) {
            const scale = 0.9 + (ratio * 0.1);
            target.style.transform = `scale(${scale})`;
            target.style.opacity = ratio.toString();
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .parallax-bg, .scale-on-scroll');
    animatedElements.forEach((el) => scrollObserver.observe(el));

    // Smooth scroll behavior
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const viewHeight = window.innerHeight;
      
      // Ambient background movement
      const backgrounds = document.querySelectorAll('.floating-bg');
      backgrounds.forEach((bg, index) => {
        const rate = scrolled * (0.02 + index * 0.01);
        (bg as HTMLElement).style.transform = `translateY(${rate}px) rotate(${rate * 0.1}deg)`;
      });
      
      // Sticky elements parallax
      const stickyElements = document.querySelectorAll('.sticky-parallax');
      stickyElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const rate = (viewHeight - rect.top) / viewHeight;
        (element as HTMLElement).style.transform = `translateY(${rate * 20}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Staggered animation delays for child elements
    const staggerElements = document.querySelectorAll('.stagger-children > *');
    staggerElements.forEach((child, index) => {
      (child as HTMLElement).style.animationDelay = `${index * 150}ms`;
    });

    return () => {
      scrollObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
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
