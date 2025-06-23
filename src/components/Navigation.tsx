import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useScrollSpy from '../hooks/useScrollSpy';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  const sectionIds = ['home', 'philosophy', 'features', 'interface-showcase', 'community', 'pricing'];
  const activeSection = useScrollSpy({ sectionIds });

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobile menu body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.classList.add('mobile-menu-open');
      
      return () => {
        // Restore body scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.classList.remove('mobile-menu-open');
        
        // Restore scroll position
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      };
    }
  }, [isMobileMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Handle navigation clicks
  const handleNavClick = useCallback((sectionId) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);
    
    // Small delay to allow menu to close before scrolling
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 150);
  }, [scrollToSection]);

  // Toggle mobile menu
  const toggleMobileMenu = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Close mobile menu (for overlay clicks)
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const NavItem = ({ sectionId, label }) => (
    <button 
      onClick={() => handleNavClick(sectionId)}
      className={`relative text-slate-gray hover:text-deep-black transition-all duration-300 font-medium text-sm group focus-ring ${
        activeSection === sectionId ? 'text-champagne-gold' : ''
      }`}
      type="button"
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-champagne-gold transition-all duration-300 ${
        activeSection === sectionId ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </button>
  );

  const MobileNavItem = ({ sectionId, label }) => (
    <button 
      onClick={() => handleNavClick(sectionId)}
      className={`mobile-nav-item w-full text-left py-4 px-6 text-base font-medium transition-all duration-200 rounded-xl mx-4 relative focus-ring ${
        activeSection === sectionId 
          ? 'text-champagne-gold bg-champagne-gold/10 active' 
          : 'text-deep-black hover:text-champagne-gold hover:bg-gray-50'
      }`}
      type="button"
    >
      {activeSection === sectionId && (
        <span className="absolute left-6 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-champagne-gold rounded-full" />
      )}
      <span className={activeSection === sectionId ? 'ml-4' : ''}>{label}</span>
    </button>
  );

  return (
    <div className="mobile-navigation-wrapper">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container-width">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div className="flex items-center">
              <button 
                onClick={() => handleNavClick('home')}
                className="text-xl lg:text-2xl font-bold text-deep-black hover:text-champagne-gold transition-colors duration-300 focus-ring"
                type="button"
              >
                Truth Bomb
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
              <NavItem sectionId="philosophy" label="Philosophy" />
              <NavItem sectionId="features" label="Features" />
              <NavItem sectionId="interface-showcase" label="App Preview" />
              <NavItem sectionId="community" label="Community" />
              <NavItem sectionId="pricing" label="Pricing" />
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:block">
              <button 
                className="bg-cta-gradient text-white font-medium text-sm lg:text-base px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blush-rose/20 focus-ring"
                type="button"
              >
                Download Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button md:hidden text-deep-black p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 relative z-[60] focus-ring"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              type="button"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 transition-transform duration-200" />
              ) : (
                <Menu className="w-6 h-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-menu-overlay fixed inset-0 bg-black/50 z-[55] md:hidden transition-opacity duration-300"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        id="mobile-menu"
        className={`mobile-menu-panel fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-[60] md:hidden transform transition-all duration-300 ease-out shadow-2xl ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100 open' : 'translate-x-full opacity-0'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        style={{
          height: '100vh',
          height: '100dvh'
        }}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <h2 id="mobile-menu-title" className="text-xl font-bold text-deep-black">Menu</h2>
          <button 
            onClick={closeMobileMenu}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-deep-black focus-ring"
            aria-label="Close menu"
            type="button"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Items */}
        <div className="py-6 space-y-2 overflow-y-auto flex-1 bg-white">
          <MobileNavItem sectionId="philosophy" label="Philosophy" />
          <MobileNavItem sectionId="features" label="Features" />
          <MobileNavItem sectionId="interface-showcase" label="App Preview" />
          <MobileNavItem sectionId="community" label="Community" />
          <MobileNavItem sectionId="pricing" label="Pricing" />
        </div>

        {/* Mobile CTA Button */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <button 
            onClick={() => handleNavClick('home')}
            className="mobile-menu-cta w-full bg-cta-gradient text-white font-semibold text-base py-4 rounded-xl transition-all duration-200 shadow-lg focus-ring"
            type="button"
          >
            Download Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;