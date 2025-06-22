import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container-width">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={scrollToTop}
              className="text-xl font-bold text-deep-black hover:text-champagne-gold transition-colors duration-300"
            >
              Truth Bomb
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('features')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('showcase')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              App Preview
            </button>
            <button 
              onClick={() => scrollToSection('philosophy')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Stories
            </button>
            <button 
              onClick={() => scrollToSection('pricing')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Pricing
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-cta-gradient text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blush-rose/20">
              Download Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-deep-black p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <button 
                onClick={() => scrollToSection('features')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('showcase')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left"
              >
                App Preview
              </button>
              <button 
                onClick={() => scrollToSection('philosophy')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left"
              >
                Stories
              </button>
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left"
              >
                Pricing
              </button>
              <button className="w-full bg-cta-gradient text-white font-medium text-sm px-6 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 mt-4">
                Download Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;