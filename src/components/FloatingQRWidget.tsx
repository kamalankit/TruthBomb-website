
import React, { useState } from 'react';
import { X } from 'lucide-react';

const FloatingQRWidget = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="premium-card p-4 flex items-center space-x-4 hover:scale-105 transition-all duration-300 group cursor-pointer gentle-shadow">
        {/* QR Code */}
        <div className="w-16 h-16 bg-gradient-to-br from-champagne-gold/20 to-blush-rose/20 rounded-lg p-3 flex items-center justify-center">
          <div className="w-full h-full bg-deep-black rounded-sm relative">
            {/* Simple QR-like pattern */}
            <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
              <div className="bg-white"></div>
              <div className="bg-transparent"></div>
              <div className="bg-white"></div>
              <div className="bg-transparent"></div>
              <div className="bg-white"></div>
              <div className="bg-transparent"></div>
              <div className="bg-white"></div>
              <div className="bg-transparent"></div>
              <div className="bg-white"></div>
            </div>
            <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-sm"></div>
            <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-sm"></div>
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-white rounded-sm"></div>
          </div>
        </div>

        {/* Text */}
        <div className="text-deep-black">
          <div className="text-xs text-slate-gray group-hover:text-champagne-gold transition-colors">
            download
          </div>
          <div className="text-sm font-bold group-hover:text-champagne-gold transition-colors">
            TRUTH BOMB
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="text-slate-gray hover:text-deep-black transition-colors text-xs p-1"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default FloatingQRWidget;
