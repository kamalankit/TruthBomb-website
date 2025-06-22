import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import useSmoothScroll from '../hooks/useSmoothScroll';
import useScrollSpy from '../hooks/useScrollSpy';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollToSection } = useSmoothScroll();

  const sectionIds = ['home', 'philosophy', 'features', 'interface-showcase', 'community', 'pricing'];
  const activeSection = useScrollSpy({ sectionIds });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ sectionId, label }: { sectionId: string; label: string }) => (
    <button 
      onClick={() => handleNavClick(sectionId)}
      className={`relative text-slate-gray hover:text-deep-black transition-all duration-300 font-medium text-sm group ${
        activeSection === sectionId ? 'text-champagne-gold' : ''
      }`}
    >
      {label}
      <span className={`absolute -bottom-1 left-0 h-0.5 bg-champagne-gold transition-all duration-300 ${
        activeSection === sectionId ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </button>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container-width">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavClick('home')}
              className="text-xl lg:text-2xl font-bold text-deep-black hover:text-champagne-gold transition-colors duration-300"
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-cta-gradient text-white font-medium text-sm lg:text-base px-6 lg:px-8 py-2.5 lg:py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blush-rose/20">
              Download Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-deep-black p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="py-4 space-y-4 bg-white/95 backdrop-blur-xl border-t border-gray-100 rounded-b-2xl shadow-lg">
            <NavItem sectionId="philosophy" label="Philosophy" />
            <NavItem sectionId="features" label="Features" />
            <NavItem sectionId="interface-showcase" label="App Preview" />
            <NavItem sectionId="community" label="Community" />
            <NavItem sectionId="pricing" label="Pricing" />
            <button className="w-full bg-cta-gradient text-white font-medium text-base px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 mt-4">
              Download Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;