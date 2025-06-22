
import React, { useEffect, useRef } from 'react';
import { Play, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Gentle parallax effect on scroll
    const handleScroll = () => {
      if (phoneRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        phoneRef.current.style.transform = `translateY(${rate}px)`;
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

          {/* Right Content - Phone Mockup with scale animation */}
          <div className="flex justify-center lg:justify-end -mt-16">
            <div 
              ref={phoneRef}
              className="relative w-80 h-[650px] scale-on-scroll sticky-parallax"
            >
              {/* Phone Frame */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 gentle-shadow">
                {/* Screen */}
                <div className="h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Mock App Interface */}
                  <div className="h-full bg-gradient-to-b from-soft-white to-warm-gray p-6">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center mb-8 text-xs text-slate-gray">
                      <span className="font-semibold">9:41</span>
                      <div className="flex space-x-1">
                        <div className="w-4 h-2 bg-champagne-gold rounded-sm"></div>
                        <div className="w-4 h-2 bg-champagne-gold rounded-sm opacity-70"></div>
                        <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-deep-black mb-4">Today's Truth</h3>
                        <div className="premium-card p-6 gentle-shadow">
                          <p className="text-lg italic text-deep-black leading-relaxed">
                            "The unexamined life is not worth living"
                          </p>
                          <p className="text-sm text-slate-gray mt-3 font-medium">— Socrates</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="premium-card p-4 flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blush-rose to-champagne-gold rounded-xl flex items-center justify-center">
                            <span className="text-xl">📊</span>
                          </div>
                          <div>
                            <p className="font-semibold text-deep-black">Mood Tracking</p>
                            <p className="text-sm text-slate-gray">7-day streak!</p>
                          </div>
                        </div>

                        <div className="premium-card p-4 flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-soft-lavender to-pale-aqua rounded-xl flex items-center justify-center">
                            <span className="text-xl">🎯</span>
                          </div>
                          <div>
                            <p className="font-semibold text-deep-black">Growth Goals</p>
                            <p className="text-sm text-slate-gray">3 active goals</p>
                          </div>
                        </div>

                        <div className="premium-card p-4 flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-champagne-gold to-blush-rose rounded-xl flex items-center justify-center">
                            <span className="text-xl">💭</span>
                          </div>
                          <div>
                            <p className="font-semibold text-deep-black">Daily Journal</p>
                            <p className="text-sm text-slate-gray">Today's entry</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soft glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-champagne-gold/10 to-blush-rose/10 rounded-[3rem] blur-2xl -z-10"></div>
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
