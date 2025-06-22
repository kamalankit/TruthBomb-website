
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100' 
        : 'bg-transparent'
    }`}>
      <div className="container-width">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-deep-black">Truth Bomb</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            <a href="#features" className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-lg">
              Features
            </a>
            <a href="#philosophy" className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-lg">
              About
            </a>
            <a href="#testimonials" className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-lg">
              Stories
            </a>
            <a href="#pricing" className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-lg">
              Pricing
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="cta-button mt-2">
              Download Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-deep-black p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-lg">Features</a>
              <a href="#philosophy" className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-lg">About</a>
              <a href="#testimonials" className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-lg">Stories</a>
              <a href="#pricing" className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-lg">Pricing</a>
              <button className="w-full cta-button mt-4">Download Now</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
