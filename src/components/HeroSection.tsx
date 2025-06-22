import React, { useEffect, useRef } from 'react';
import { Play, ArrowDown, Home, BookOpen, Target, MessageCircle, User } from 'lucide-react';

const HeroSection = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const mobileAppRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gentle parallax effect on scroll
    const handleScroll = () => {
      if (phoneRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        phoneRef.current.style.transform = `translateY(${rate}px)`;
      }

      if (mobileAppRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        mobileAppRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-white to-warm-gray relative overflow-hidden">
      {/* Background Elements with floating animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-soft-lavender rounded-full filter blur-3xl floating-bg"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pale-aqua rounded-full filter blur-3xl floating-bg"></div>
      </div>

      <div className="relative z-10 container-width pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content with staggered animations */}
          <div className="text-center lg:text-left space-y-8 stagger-children">
            {/* Main Headlines */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-deep-black leading-tight animate-on-scroll">
                Drop a Truth.
                <span className="gradient-text block">Track Your Growth.</span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-slate-gray font-medium leading-relaxed animate-on-scroll">
                Your 5-minute daily ritual for self-awareness and clarity.
              </p>
              
              <p className="text-xl text-slate-gray leading-relaxed animate-on-scroll">
                Join thousands discovering mindful growth through ancient wisdom and modern design.
              </p>
            </div>

            {/* CTAs with shimmer effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 animate-on-scroll">
              <button className="cta-button text-xl px-12 py-5 shimmer-effect cta-glow">
                Download Now
              </button>
              <button className="outline-button text-xl px-12 py-5 flex items-center justify-center space-x-3">
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Social Proof with ambient pulse */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-8 animate-on-scroll">
              <div className="premium-card px-6 py-3 ambient-pulse">
                <span className="text-champagne-gold text-lg">★★★★★</span>
                <span className="ml-2 text-deep-black font-semibold">4.8 Rating</span>
              </div>
              <div className="premium-card px-6 py-3 ambient-pulse">
                <span className="text-deep-black font-bold text-lg">500K+</span>
                <span className="ml-2 text-slate-gray">Downloads</span>
              </div>
              <div className="premium-card px-6 py-3 ambient-pulse">
                <span className="text-deep-black font-bold text-lg">Daily</span>
                <span className="ml-2 text-slate-gray">Growth</span>
              </div>
            </div>
          </div>

          {/* Right Content - Enhanced Mobile App Preview */}
          <div className="flex justify-center lg:justify-end relative">
            {/* Floating Mobile App Preview */}
            <div 
              ref={mobileAppRef}
              className="relative w-80 h-[650px] scale-on-scroll sticky-parallax"
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 gentle-shadow">
                {/* Screen */}
                <div className="h-full bg-gradient-to-br from-soft-white to-warm-gray rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center px-6 pt-4 pb-2 text-xs text-slate-gray">
                    <span className="font-semibold">9:41</span>
                    <div className="flex space-x-1">
                      <div className="w-4 h-2 bg-champagne-gold rounded-sm"></div>
                      <div className="w-4 h-2 bg-champagne-gold rounded-sm opacity-70"></div>
                      <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="px-6 pb-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="text-center mb-6">
                      <div className="text-2xl mb-2">🌅</div>
                      <h3 className="text-lg font-semibold text-deep-black">Good Morning!</h3>
                      <p className="text-sm text-slate-gray">Ready for today's growth?</p>
                    </div>
                    
                    {/* Daily Truth Card */}
                    <div className="premium-card p-6 mb-6 gentle-shadow">
                      <h4 className="font-medium text-deep-black mb-3 text-sm">Today's Truth</h4>
                      <p className="text-slate-gray text-sm leading-relaxed italic mb-3">
                        "The best time to plant a tree was 20 years ago. The second best time is now."
                      </p>
                      <p className="text-xs text-champagne-gold font-medium">— Chinese Proverb</p>
                    </div>
                    
                    {/* Progress Row */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-gradient-to-r from-blush-rose to-champagne-gold text-white p-4 rounded-xl text-center gentle-shadow">
                        <div className="text-lg font-semibold">7</div>
                        <div className="text-xs opacity-90">Day Streak</div>
                      </div>
                      <div className="bg-gradient-to-r from-soft-lavender to-pale-aqua text-white p-4 rounded-xl text-center gentle-shadow">
                        <div className="text-lg font-semibold">3</div>
                        <div className="text-xs opacity-90">Active Goals</div>
                      </div>
                    </div>

                    {/* Daily Intention */}
                    <div className="premium-card p-4 mb-6">
                      <p className="text-xs text-slate-gray mb-2">Today's Intention</p>
                      <p className="text-sm text-deep-black italic">"Focus on progress, not perfection"</p>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-auto">
                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-3 gentle-shadow">
                        <div className="flex justify-around items-center">
                          <div className="flex flex-col items-center space-y-1 text-champagne-gold">
                            <Home className="w-5 h-5" />
                            <span className="text-xs font-medium">Home</span>
                          </div>
                          <div className="flex flex-col items-center space-y-1 text-slate-gray">
                            <BookOpen className="w-5 h-5" />
                            <span className="text-xs">Journal</span>
                          </div>
                          <div className="flex flex-col items-center space-y-1 text-slate-gray">
                            <Target className="w-5 h-5" />
                            <span className="text-xs">Goals</span>
                          </div>
                          <div className="flex flex-col items-center space-y-1 text-slate-gray">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-xs">Community</span>
                          </div>
                          <div className="flex flex-col items-center space-y-1 text-slate-gray">
                            <User className="w-5 h-5" />
                            <span className="text-xs">Profile</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-champagne-gold/10 to-blush-rose/10 rounded-[3rem] blur-2xl -z-10"></div>
              
              {/* Floating elements around the phone */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-champagne-gold to-blush-rose rounded-full animate-gentle-bounce opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-soft-lavender to-pale-aqua rounded-full animate-gentle-bounce opacity-80" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -left-6 w-4 h-4 bg-gradient-to-r from-pale-aqua to-champagne-gold rounded-full animate-gentle-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator with ambient animation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-gentle-bounce ambient-pulse">
          <ArrowDown className="w-6 h-6 text-slate-gray" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;