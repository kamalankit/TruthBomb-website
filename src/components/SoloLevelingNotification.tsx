
import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

const SoloLevelingNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(15);

  const notifications = [
    {
      title: "⚡ AWAKENING PROTOCOL DETECTED",
      message: "You are qualified to become an AWAKENED TRUTH SEEKER",
      warning: "Your current mindset will limit your growth potential in",
      consequence: "If you choose not to evolve, you will remain in the ordinary realm."
    },
    {
      title: "🌟 GROWTH SYSTEM ACTIVATED", 
      message: "A powerful transformation opportunity has appeared",
      warning: "This window of opportunity closes in",
      consequence: "Missing this chance means staying at your current level."
    },
    {
      title: "💫 CONSCIOUSNESS UPGRADE AVAILABLE",
      message: "Your awareness level qualifies for premium enhancement", 
      warning: "Access expires in",
      consequence: "Without action, your potential remains locked."
    }
  ];

  const [currentNotification] = useState(
    notifications[Math.floor(Math.random() * notifications.length)]
  );

  useEffect(() => {
    // Show notification after exactly 10 seconds of user being on the website
    const showTimer = setTimeout(() => {
      const hasSeenToday = localStorage.getItem('truthBombNotificationShown');
      const today = new Date().toDateString();
      
      if (hasSeenToday !== today) {
        setIsVisible(true);
        localStorage.setItem('truthBombNotificationShown', today);
      }
    }, 10000); // Exactly 10 seconds

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (isVisible && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, countdown]);

  const handleDownload = () => {
    setIsVisible(false);
    // Handle download logic here
    console.log('Download initiated from Solo Leveling notification');
    window.open('https://apps.apple.com/app/truth-bomb', '_blank');
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-deep-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      {/* Screen shake effect */}
      <div className="animate-gentle-bounce">
        <div className="premium-card max-w-md w-full p-8 border-2 border-champagne-gold/50 relative overflow-hidden bg-gradient-to-br from-soft-white to-warm-gray">
          {/* Close button */}
          <button 
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-slate-gray hover:text-deep-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Notification Header */}
          <div className="text-center mb-6">
            <div className="text-champagne-gold font-mono text-sm mb-2 font-medium">
              [SYSTEM NOTIFICATION]
            </div>
            <div className="text-champagne-gold font-mono text-xs mb-4 opacity-70">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
            <h3 className="text-xl font-bold text-deep-black mb-4">
              {currentNotification.title}
            </h3>
          </div>

          {/* Notification Content */}
          <div className="space-y-4 text-center mb-8">
            <p className="text-deep-black font-medium leading-relaxed">
              {currentNotification.message}
            </p>
            
            <div className="bg-gradient-to-r from-blush-rose/20 to-champagne-gold/20 border border-blush-rose/30 rounded-xl p-4">
              <p className="text-deep-black text-sm mb-2 font-medium">
                {currentNotification.warning}
              </p>
              <div className="text-champagne-gold font-bold text-2xl font-mono">
                00:{countdown.toString().padStart(2, '0')}
              </div>
            </div>

            <p className="text-slate-gray text-sm italic leading-relaxed">
              {currentNotification.consequence}
            </p>

            <div className="text-center text-lg font-bold text-deep-black">
              Will you accept the awakening?
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleDownload}
              className="cta-button w-full py-4 text-lg font-bold flex items-center justify-center space-x-3"
            >
              <Download className="w-5 h-5" />
              <span>YES - DOWNLOAD TRUTH BOMB</span>
            </button>
            <button 
              onClick={handleDismiss}
              className="outline-button w-full py-4 flex items-center justify-center space-x-3"
            >
              <Smartphone className="w-5 h-5" />
              <span>NO - STAY ASLEEP</span>
            </button>
          </div>

          {/* Animated border effect */}
          <div className="absolute inset-0 border-2 border-gradient-to-r from-champagne-gold to-blush-rose rounded-2xl opacity-30 animate-pulse pointer-events-none"></div>
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-champagne-gold/5 to-blush-rose/5 rounded-2xl blur-xl -z-10"></div>
        </div>
      </div>
    </div>
  );
};

export default SoloLevelingNotification;
