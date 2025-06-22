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

  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const targetY = element.offsetTop - 80;
      const startY = window.pageYOffset;
      const distance = targetY - startY;
      const duration = 1000;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Apple-style easing
        const ease = progress < 0.5 
          ? 4 * progress * progress * progress 
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        window.scrollTo(0, startY + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    smoothScrollTo('home');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container-width">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={scrollToTop}
              className="text-lg font-semibold text-deep-black hover:text-champagne-gold transition-colors duration-300"
            >
              Truth Bomb
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => smoothScrollTo('philosophy')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Philosophy
            </button>
            <button 
              onClick={() => smoothScrollTo('features')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Features
            </button>
            <button 
              onClick={() => smoothScrollTo('interface-showcase')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              App Preview
            </button>
            <button 
              onClick={() => smoothScrollTo('community')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Community
            </button>
            <button 
              onClick={() => smoothScrollTo('pricing')}
              className="text-slate-gray hover:text-deep-black transition-colors duration-300 font-medium text-sm"
            >
              Pricing
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button className="bg-cta-gradient text-white font-medium text-sm px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-blush-rose/20">
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
          <div className="md:hidden absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <button 
                onClick={() => smoothScrollTo('philosophy')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left py-2"
              >
                Philosophy
              </button>
              <button 
                onClick={() => smoothScrollTo('features')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left py-2"
              >
                Features
              </button>
              <button 
                onClick={() => smoothScrollTo('interface-showcase')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left py-2"
              >
                App Preview
              </button>
              <button 
                onClick={() => smoothScrollTo('community')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left py-2"
              >
                Community
              </button>
              <button 
                onClick={() => smoothScrollTo('pricing')}
                className="block text-slate-gray hover:text-deep-black transition-colors font-medium text-sm w-full text-left py-2"
              >
                Pricing
              </button>
              <button className="w-full bg-cta-gradient text-white font-medium text-sm px-5 py-2 rounded-lg transition-all duration-300 hover:scale-105 mt-3">
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